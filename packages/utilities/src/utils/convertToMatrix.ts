/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Given a column count, converts a flat array into a 2D array
 * @param {Array} array an array of elements
 * @return {columnCount} number of columns in the 2D array
 */

export const convertToMatrix = <T>(array: T[], columnCount: number) => {
  return array.reduce((acc: T[][], curr: T) => {
    if (acc.length === 0) return [[curr]];

    if (acc[acc.length - 1].length < columnCount) {
      acc[acc.length - 1].push(curr);
    } else {
      acc.push([curr]);
    }

    return acc;
  }, []);
};
