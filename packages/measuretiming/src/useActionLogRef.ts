/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type {
  UseActionLogRefOptions,
  ActionLogExternalApi,
  GetPrefixedUseTimingHooksConfiguration
} from './types';
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { ActionLog } from './actionLog';
import { performanceMark, performanceMeasure } from './performanceMark';
import { ACTION_TYPE } from './constants';

export const useActionLogRef = <
  CustomMetadata extends Record<string, unknown> = Record<string, unknown>
>({
  id,
  actionLogCache,
  garbageCollectMs,
  ...actionLogOptions
}: UseActionLogRefOptions<CustomMetadata>): MutableRefObject<ActionLog<CustomMetadata>> => {
  // reuse ActionLog of the same ID:
  const originalActionLog = useMemo(
    () => actionLogCache.get(id) ?? new ActionLog(actionLogOptions),
    // we do not want to change the instance when the ID or options change,
    // rather, we do the opposite - we update the cache to also reflect the new ID below
    // hence this eslint rule is silenced on purpose
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const actionLogRef = useRef<ActionLog<CustomMetadata>>(originalActionLog);
  const currentActionLog = actionLogCache.get(id);

  if (currentActionLog !== originalActionLog) {
    // when ID changes, we transfer the state from the old actionLog to the new one
    // because of the edge case when the child with the new ID
    // is re-rendered *before* the parent beacon gets the new ID
    if (currentActionLog) {
      if (!originalActionLog.wasImported) currentActionLog.importState(originalActionLog);
      actionLogRef.current = currentActionLog;
    } else {
      actionLogRef.current = originalActionLog;
    }
    // side effect, but we want to set this as soon as possible,
    // before other timing hooks are mounted, so we ideally don't end up with multiple instances
    actionLogCache.set(id, actionLogRef.current);
  }

  actionLogRef.current.updateStaticOptions(actionLogOptions);

  const storedInCacheWithIds = useMemo(() => new Set<string>(), []);

  storedInCacheWithIds.add(id);

  // this will be run after all the hooks tied to this ActionLog are no longer in use and garbageCollectMs passed
  const garbageCollect = useMemo(
    () => () => {
      // we don't want to clear the cache just yet, in case the ID flips back to the old one
      // plus we want to decouple this logic from React implementation details (render order)
      // so let's do that with a little bit of a delay
      setTimeout(() => {
        if (originalActionLog.isInUse) return;
        storedInCacheWithIds.forEach(prevId => {
          // another component might have overwritten that entry by this time, so we need to check to be sure:
          if (actionLogCache.get(prevId) === originalActionLog) actionLogCache.delete(prevId);
          storedInCacheWithIds.delete(prevId);
        });
      }, garbageCollectMs);
    },
    [originalActionLog, actionLogCache, garbageCollectMs, storedInCacheWithIds]
  );

  useEffect(() => {
    originalActionLog.onDispose('garbage-collect', garbageCollect);
  }, [originalActionLog, garbageCollect]);

  const cleanupOldIdsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // the whole component tree might unmount and remount,
  // and yet we want to resume timing as if this had not happened
  // at the same time, we can clean-up instances that really unmounted and won't remount again
  useEffect(() => {
    if (storedInCacheWithIds.size === 1) return;

    // if we're stored under more than one ID, it means it has changed
    // and we need to clean-up the old cache reference
    // we delay this because the beacon might have not unmounted yet and still request it
    // or it might flip back to the old one
    // there's no rush to clean-up, so we can easily do it in a few seconds

    if (cleanupOldIdsTimeoutRef.current) clearTimeout(cleanupOldIdsTimeoutRef.current);

    cleanupOldIdsTimeoutRef.current = setTimeout(() => {
      storedInCacheWithIds.forEach(storedId => {
        // current ID should not be removed:
        if (id === storedId) return;

        // another component might have overwritten that entry by this time, so we need to check to be sure:
        if (actionLogCache.get(storedId) === originalActionLog) actionLogCache.delete(storedId);
        storedInCacheWithIds.delete(storedId);
      });
    }, garbageCollectMs);
  }, [
    id,
    storedInCacheWithIds.size,
    originalActionLog,
    storedInCacheWithIds,
    garbageCollectMs,
    actionLogCache
  ]);

  return actionLogRef;
};

/** used to generate timing API that can be used outside of React, or together with React */
export const getExternalApi = <CustomMetadata extends Record<string, unknown>>({
  actionLogCache,
  idPrefix,
  placement,
  ...actionLogOptions
}: GetPrefixedUseTimingHooksConfiguration<
  string,
  CustomMetadata
>): ActionLogExternalApi<CustomMetadata> => {
  const getFullId = (idSuffix: string) => `${idPrefix}/${idSuffix}`;
  const getActionLogForIdIfExists = (idSuffix: string) => {
    const id = getFullId(idSuffix);

    return actionLogCache.get(id);
  };
  const getActionLogForId = (idSuffix: string) => {
    const id = getFullId(idSuffix);
    const actionLog = actionLogCache.get(id) ?? new ActionLog(actionLogOptions);

    actionLogCache.set(id, actionLog);
    actionLog.onDispose('external-api', () => {
      // if this is the last place where the component is used, we can clean-up the cache
      actionLogCache.delete(id);
    });

    return actionLog;
  };
  let renderStartMark: PerformanceMark | null = null;

  return {
    getActionLogForId,
    getActionLogForIdIfExists,
    markRenderStart: (idSuffix: string) => {
      const id = getFullId(idSuffix);
      const actionLog = getActionLogForId(idSuffix);

      actionLog.ensureReporting();
      actionLog.setActive(true, placement);
      renderStartMark = renderStartMark || performanceMark(`${id}/${placement}/render-start`);
    },
    markRenderEnd: (idSuffix: string) => {
      const id = getFullId(idSuffix);
      const actionLog = getActionLogForId(idSuffix);

      actionLog.setActive(true, placement);
      if (!renderStartMark) {
        actionLog.onInternalError(
          new Error(
            `ComponentTiming: markRenderDone called without a corresponding markRenderStart in '${placement}' for id: '${id}.`
          )
        );

        return;
      }

      actionLog.addSpan({
        type: ACTION_TYPE.RENDER,
        entry: Object.assign(performanceMeasure(`${id}/${placement}/render`, renderStartMark), {
          startMark: renderStartMark
        }),
        source: placement
      });

      renderStartMark = null;
    },
    markStage: (idSuffix: string, stage: string, stageMeta?: Record<string, unknown>) => {
      const actionLog = getActionLogForId(idSuffix);

      actionLog.setActive(true, placement);
      actionLog.markStage({ stage, source: placement, metadata: stageMeta });
    },
    setActive: (idSuffix: string, active: boolean) => {
      const actionLog = getActionLogForId(idSuffix);

      actionLog.setActive(active, placement);
    },
    dispose: (idSuffix: string) => {
      const actionLog = actionLogCache.get(getFullId(idSuffix));

      if (!actionLog) return;
      actionLog.onBeaconRemoved(placement);
    },
    clear: (idSuffix: string) => {
      const actionLog = getActionLogForIdIfExists(idSuffix);

      if (actionLog) {
        actionLog.clear();
      }
    },
    setMetadata: (idSuffix: string, metadata: CustomMetadata) => {
      const actionLog = getActionLogForId(idSuffix);

      actionLog.customMetadataBySource.set(placement, metadata);
    }
  };
};
