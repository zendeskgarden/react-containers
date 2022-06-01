/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export type DebounceOptionsRef<T> = {
  fn: T;
  debounceMs: number;
  timeoutMs?: number;
};

/**
 * A simple debounce function that is easier to test against than the lodash one.
 * In addition it offers a way to check whether the last call was due to a timeout or not,
 * and a way to manually clear that timeout state.
 * Options may change even after the debounce was created by the means of a ref.
 */
export const debounce = <Args extends any[], T extends (...args: Args) => any>(
  optionsRef: DebounceOptionsRef<T>
): ((...args: Args) => void) & {
  cancel: () => Args | undefined;
  flush: () => boolean;
  getHasTimedOut: () => boolean;
  getIsScheduled: () => boolean;
  resetTimedOutState: () => void;
} => {
  let timeoutTimer: number | undefined;
  let debounceTimer: number | undefined;
  let lastArgs: Args | undefined;
  let timedOut = false;
  const cancel = () => {
    if (debounceTimer) window.clearTimeout(debounceTimer);
    debounceTimer = undefined;
    if (timeoutTimer) window.clearTimeout(timeoutTimer);
    timeoutTimer = undefined;
    const args = lastArgs;

    lastArgs = undefined;

    return args;
  };
  const resetTimedOutState = () => {
    timedOut = false;
  };
  const flush = () => {
    const args = lastArgs;

    cancel();
    if (args) {
      optionsRef.fn(...args);

      return true;
    }

    return false;
  };
  const getHasTimedOut = () => timedOut;
  const getIsScheduled = () => Boolean(debounceTimer);

  return Object.assign(
    (...args: Args) => {
      if (timedOut) {
        cancel();

        // previously timed out and didn't reset; this call will be ignored
        return;
      }
      lastArgs = args;
      if (debounceTimer) window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(flush, optionsRef.debounceMs);
      if (!timeoutTimer && typeof optionsRef.timeoutMs === 'number') {
        timeoutTimer = window.setTimeout(() => {
          timedOut = true;
          flush();
        }, optionsRef.timeoutMs);
      }
    },
    { flush, cancel, getHasTimedOut, getIsScheduled, resetTimedOutState }
  );
};
