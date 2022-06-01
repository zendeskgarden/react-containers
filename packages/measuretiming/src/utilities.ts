/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export const noop = () => {
  /* noop */
};

export const every = <T>(iterable: Iterable<T>, predicate: (value: T) => boolean) => {
  for (const value of iterable) if (!predicate(value)) return false;

  return true;
};

let memoizedCurrentBrowserSupportForNonResponsiveStateDetection: boolean | undefined = undefined;

/** can be easily mocked if needed */
export const getCurrentBrowserSupportForNonResponsiveStateDetection = (): boolean =>
  memoizedCurrentBrowserSupportForNonResponsiveStateDetection ??
  (memoizedCurrentBrowserSupportForNonResponsiveStateDetection =
    typeof PerformanceObserver !== 'undefined' &&
    Array.isArray(PerformanceObserver.supportedEntryTypes) &&
    PerformanceObserver.supportedEntryTypes.includes('longtask'));

export const resetMemoizedCurrentBrowserSupportForNonResponsiveStateDetection = () => {
  memoizedCurrentBrowserSupportForNonResponsiveStateDetection = undefined;
};
