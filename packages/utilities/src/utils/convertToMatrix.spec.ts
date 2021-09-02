/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { convertToMatrix } from './convertToMatrix';

describe('convertToMatrix', () => {
  it('converts a flat array into a 2D array', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const matrix = convertToMatrix(list, 3);

    expect(matrix).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]);
  });
});
