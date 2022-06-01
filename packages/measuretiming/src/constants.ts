/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export const DEFAULT_STAGES = {
  INACTIVE: 'inactive',
  LOADING: 'loading',
  LOADING_MORE: 'loading-more',
  ERROR: 'error',
  ERROR_BOUNDARY: 'error-caught-by-error-boundary',
  READY: 'ready'
} as const;

export const ERROR_STAGES: readonly string[] = [
  DEFAULT_STAGES.ERROR,
  DEFAULT_STAGES.ERROR_BOUNDARY
];

export const INFORMATIVE_STAGES = {
  INITIAL: 'initial',
  TIMEOUT: 'timeout',
  DEPENDENCY_CHANGE: 'dependency-change',
  INTERACTIVE: 'interactive',
  RENDERED: 'rendered',
  INCOMPLETE_RENDER: 'incomplete-render'
} as const;

export const ACTION_TYPE = {
  RENDER: 'render',
  UNRESPONSIVE: 'unresponsive',
  STAGE_CHANGE: 'stage-change',
  DEPENDENCY_CHANGE: 'dependency-change'
} as const;

export const MARKER = {
  START: 'start',
  END: 'end',
  POINT: 'point'
} as const;

export const OBSERVER_SOURCE = 'observer';

export const DEFAULT_GARBAGE_COLLECT_MS = 2000;
export const DEFAULT_DEBOUNCE_MS = 500;
export const DEFAULT_TIMEOUT_MS = 45000;
