/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { ActionWithStateMetadata, StageDescription } from './types';
import {
  ACTION_TYPE,
  INFORMATIVE_STAGES,
  MARKER,
  OBSERVER_SOURCE,
  ERROR_STAGES
} from './constants';
import { getCurrentBrowserSupportForNonResponsiveStateDetection } from './utilities';

export type ReportFn<Metadata extends Record<string, unknown>> = (
  report: Report,
  metadata: Metadata
) => void;

export interface Report {
  ttr: number | null;
  tti: number | null;
  timeSpent: Record<string, number>;
  counts: Record<string, number>;
  stages: Record<string, StageDescription>;
  durations: Record<string, number[]>;
  id: string;
  isFirstLoad: boolean;
  lastStage: string;
  includedStages: string[];
  hadError: boolean;
  handled: boolean;
}

export function generateReport({
  actions,
  timingId,
  isFirstLoad,
  immediateSendStages
}: {
  readonly actions: readonly ActionWithStateMetadata[];
  readonly timingId: string;
  readonly isFirstLoad: boolean;
  readonly immediateSendStages: readonly string[];
}): Report {
  const lastStart: Record<string, number> = {};
  const lastEnd: Record<string, number> = {};
  const timeSpent: Record<string, number> = {};
  let startTime: number | null = null;
  let endTime: number | null = null;
  const counts: Record<string, number> = {};
  let previousStageTime: number | null = null;
  let previousStage: string = INFORMATIVE_STAGES.INITIAL;
  const stageDescriptions: StageDescription[] = [];
  const durations: Record<string, number[]> = {};
  const hasObserverSupport = getCurrentBrowserSupportForNonResponsiveStateDetection();
  const allImmediateSendStages = [...immediateSendStages, INFORMATIVE_STAGES.TIMEOUT];
  const lastAction = actions.slice().reverse()[0];
  const includedStages = new Set<string>();

  actions.forEach((action, index) => {
    if (index === 0) {
      startTime = action.timestamp;
      previousStageTime = action.timestamp;
    } else {
      endTime = action.timestamp;
    }

    switch (action.marker) {
      case MARKER.START: {
        lastStart[action.source] = action.timestamp;
        break;
      }
      case MARKER.END: {
        lastEnd[action.source] = action.timestamp;
        counts[action.source] = (counts[action.source] ?? 0) + 1;
        const duration = action.entry.duration;
        const sourceDurations = durations[action.source] ?? [];

        sourceDurations.push(duration);
        durations[action.source] = sourceDurations;
        timeSpent[action.source] = (timeSpent[action.source] ?? 0) + duration;
        break;
      }
      case MARKER.POINT: {
        const timeToStage = action.entry.duration;
        const stage =
          action.type === ACTION_TYPE.DEPENDENCY_CHANGE
            ? INFORMATIVE_STAGES.DEPENDENCY_CHANGE
            : action.stage;

        // guard for the case where the initial stage is customized by the initial render
        if (action.timestamp !== startTime) {
          includedStages.add(previousStage);
          includedStages.add(stage);

          stageDescriptions.push({
            previousStage,
            stage,
            timeToStage,
            ...(action.metadata
              ? {
                  metadata: action.metadata
                }
              : {}),
            mountedPlacements: action.mountedPlacements,
            timingId: action.timingId
          });
        }
        previousStage = stage;
        previousStageTime = action.timestamp;
        break;
      }
    }
  });

  const lastRenderEnd =
    Object.entries(lastEnd)
      .filter(([source]) => source !== OBSERVER_SOURCE)
      .map(([, time]) => time)
      .sort((a, b) => b - a)[0] ?? 0;

  const lastTimedEvent = Math.max(lastRenderEnd, previousStageTime ?? 0);
  const isInCompleteState = Boolean(lastAction && lastAction.type !== ACTION_TYPE.STAGE_CHANGE);

  const didImmediateSend = allImmediateSendStages.includes(previousStage);

  if (
    lastAction &&
    endTime !== null &&
    previousStageTime !== null &&
    previousStage !== INFORMATIVE_STAGES.TIMEOUT
  ) {
    const lastStageToLastRender = lastRenderEnd - previousStageTime;
    const lastStageToEnd = endTime - previousStageTime;

    if (hasObserverSupport && isInCompleteState && !didImmediateSend) {
      stageDescriptions.push({
        previousStage,
        stage: INFORMATIVE_STAGES.RENDERED,
        mountedPlacements: lastAction.mountedPlacements,
        timingId: lastAction.timingId,
        timeToStage: lastStageToLastRender
      });
      const lastRenderToEndTime = endTime - lastRenderEnd;

      stageDescriptions.push({
        previousStage: INFORMATIVE_STAGES.RENDERED,
        stage: INFORMATIVE_STAGES.INTERACTIVE,
        mountedPlacements: lastAction.mountedPlacements,
        timingId: lastAction.timingId,
        timeToStage: lastRenderToEndTime
      });
    } else if (lastStageToEnd > 0) {
      stageDescriptions.push({
        previousStage,
        stage: isInCompleteState
          ? INFORMATIVE_STAGES.RENDERED
          : INFORMATIVE_STAGES.INCOMPLETE_RENDER,
        mountedPlacements: lastAction.mountedPlacements,
        timingId: lastAction.timingId,
        timeToStage: lastStageToEnd
      });
    }
  }

  const { timestamp: firstRenderStart } = actions.find(
    action => action.type === ACTION_TYPE.RENDER && action.marker === MARKER.START
  ) ?? { timestamp: startTime };

  const tti =
    startTime !== null &&
    endTime !== null &&
    hasObserverSupport &&
    isInCompleteState &&
    !didImmediateSend
      ? endTime - startTime
      : null;

  const ttr =
    firstRenderStart !== null && previousStage !== INFORMATIVE_STAGES.TIMEOUT
      ? lastTimedEvent - firstRenderStart
      : null;

  const stages = Object.fromEntries(
    stageDescriptions.map((description, index) => {
      return [`${index}_${description.previousStage}_until_${description.stage}`, description];
    })
  );

  return {
    id: timingId,
    tti,
    ttr,
    isFirstLoad,
    lastStage: previousStage,
    timeSpent,
    counts,
    durations,
    stages,
    includedStages: [...includedStages],
    handled: isInCompleteState,
    hadError: ERROR_STAGES.includes(previousStage)
  };
}
