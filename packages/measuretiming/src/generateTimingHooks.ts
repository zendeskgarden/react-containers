/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type {
  GeneratedTimingHooks,
  GeneratedUseTimingBeaconHook,
  GeneratedUseTimingBeaconHookConfiguration,
  GenerateUseTimingHooksConfiguration,
  GetPrefixedUseTimingHooksConfiguration
} from './types';
import type { ActionLog } from './actionLog';
import { DEFAULT_GARBAGE_COLLECT_MS } from './constants';
import { useTiming } from './useTiming';
import { getExternalApi } from './useActionLogRef';

export const getPrefixedUseTiming =
  <Placements extends string, Metadata extends Record<string, unknown>>({
    idPrefix,
    ...options
  }: GetPrefixedUseTimingHooksConfiguration<Placements, Metadata>): GeneratedUseTimingBeaconHook =>
  ({ idSuffix, ...beaconOptions } = {}, restartWhenChanged = []) =>
    useTiming(
      {
        id: idSuffix ? `${idPrefix}/${idSuffix}` : idPrefix,
        ...options,
        ...(beaconOptions as GeneratedUseTimingBeaconHookConfiguration<Metadata>)
      },
      restartWhenChanged
    );

export const generateTimingHooks = <
  Name extends string,
  PlacementsArray extends readonly string[],
  Metadata extends Record<string, unknown>
>(
  {
    name,
    idPrefix,
    actionLogCache = new Map<string, ActionLog<Metadata>>(),
    garbageCollectMs = DEFAULT_GARBAGE_COLLECT_MS,
    ...config
  }: GenerateUseTimingHooksConfiguration<Name, PlacementsArray[number], Metadata>,
  ...placements: PlacementsArray
): GeneratedTimingHooks<Name, PlacementsArray> =>
  Object.fromEntries(
    placements.flatMap(placement => {
      const options: GetPrefixedUseTimingHooksConfiguration<PlacementsArray[number], Metadata> = {
        idPrefix,
        actionLogCache,
        garbageCollectMs,
        expectedSimultaneouslyRenderableBeaconsCount: placements.length,
        placement,
        ...config
      };

      return [
        [`use${name}TimingIn${placement}`, getPrefixedUseTiming(options)] as const,
        [`imperative${placement}TimingApi`, getExternalApi(options)] as const
      ];
    })
  );
