/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export * from './constants';
export { generateTimingHooks } from './generateTimingHooks';
export { useTiming } from './useTiming';
export { useTimingMeasurement } from './useTimingMeasurement';
export { ActionLog } from './actionLog';
export { useActionLogRef, getExternalApi } from './useActionLogRef';

// utils
export { performanceMark, performanceMeasure } from './performanceMark';
export { switchFn } from './switchFn';
export { ErrorBoundary, useOnErrorBoundaryDidCatch } from './ErrorBoundary';
export { getCurrentBrowserSupportForNonResponsiveStateDetection } from './utilities';
export { debounce } from './debounce';
export type { DebounceOptionsRef } from './debounce';
