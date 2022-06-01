/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

let uid = 0;
const getUniqueMarkName = (name: string) => `useTiming: ${name}/${uid++}`;

export const performanceMark = (name: string): PerformanceMark => {
  // We want to use performance.mark, instead of performance.now or Date.now,
  // because those named metrics will then show up in the profiler and in Lighthouse audits
  // see: https://web.dev/user-timings/
  // incidentally, this also makes testing waaay easier, because we don't have to deal with timestamps

  // Since Firefox (Gecko) unfortunately behaves differently to other browsers,
  // in that it doesn't immediately return the instance of PerformanceMark object
  // so we sort-of polyfill it cheaply below.
  // see: https://bugzilla.mozilla.org/show_bug.cgi?id=1724645
  // It does mean we need unique mark names, though.
  const markName = getUniqueMarkName(name);

  try {
    // we know this entry exists, because we created it above
    const mark = performance.mark(markName) ?? performance.getEntriesByName(name)[0];

    if (mark) return mark;
  } catch {
    // do nothing, polyfill below
  }

  // polyfill:
  return {
    name: markName,
    duration: 0,
    startTime: performance.now(),
    entryType: 'mark',
    toJSON: () => ({}),
    detail: null
  };
};

export const performanceMeasure = (
  name: string,
  startMark: PerformanceEntry,
  endMark?: PerformanceEntry
): PerformanceMeasure => {
  // same story as above
  const measureName = getUniqueMarkName(name);

  // some old browsers might not like performance.measure / performance.mark
  // we don't want to crash due to reporting, so we'll polyfill instead
  try {
    // create a mark of the same name, so we can create future measures from this point:
    performance.mark(measureName);

    const measure =
      performance.measure(measureName, startMark.name, endMark?.name) ??
      // we know this object exists, because we created it above

      performance.getEntriesByName(name)[0];

    if (measure) return measure;
  } catch {
    // do nothing, polyfill below
  }

  return {
    name: measureName,
    duration: performance.now() - startMark.startTime,
    startTime: startMark.startTime,
    entryType: 'measure',
    toJSON: () => ({}),
    detail: null
  };
};
