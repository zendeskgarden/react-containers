/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseGridProps } from './types';

export const getCellDown = (
  matrix: IUseGridProps['matrix'],
  rowIndex: number,
  colIndex: number,
  wrap?: boolean
) => {
  let retVal: number[] = [];
  const rowCount = matrix.length;
  const colCount = matrix[0].length;
  const lastRowLength = matrix[rowCount - 1].length;
  const isLastCellFocused =
    rowIndex === rowCount - (colCount > lastRowLength ? 2 : 1) && colIndex === colCount - 1;

  if (!isLastCellFocused) {
    if (rowIndex === rowCount - (colIndex >= lastRowLength ? 2 : 1) /* last row is focused */) {
      if (wrap) {
        retVal = [0, colIndex + 1]; // top cell of next col
      }
    } else {
      retVal = [rowIndex + 1, colIndex]; // cell below
    }
  }

  return retVal;
};

export const getCellLeft = (
  matrix: IUseGridProps['matrix'],
  rowIndex: number,
  colIndex: number,
  wrap?: boolean
) => {
  let retVal: number[] = [];
  const colCount = matrix[0].length;
  const isFirstCellFocused = rowIndex === 0 && colIndex === 0;

  if (!isFirstCellFocused) {
    if (colIndex === 0 /* first col is focused */) {
      if (wrap) {
        retVal = [rowIndex - 1, colCount - 1]; // last cell of previous row
      }
    } else {
      retVal = [rowIndex, colIndex - 1]; // previous cell
    }
  }

  return retVal;
};

export const getCellRight = (
  matrix: IUseGridProps['matrix'],
  rowIndex: number,
  colIndex: number,
  wrap?: boolean
) => {
  let retVal: number[] = [];
  const rowCount = matrix.length;
  const colCount = matrix[0].length;
  const lastRowIndex = rowCount - 1;
  const lastColIndex = matrix[lastRowIndex].length - 1;
  const isLastCellFocused = rowIndex === lastRowIndex && colIndex === lastColIndex;

  if (!isLastCellFocused) {
    if (colIndex === colCount - 1 /* last col is focused */) {
      if (wrap) {
        retVal = [rowIndex + 1, 0]; // first cell of next row
      }
    } else {
      retVal = [rowIndex, colIndex + 1]; // next cell
    }
  }

  return retVal;
};

export const getCellUp = (
  matrix: IUseGridProps['matrix'],
  rowIndex: number,
  colIndex: number,
  wrap?: boolean
) => {
  let retVal: number[] = [];
  const rowCount = matrix.length;
  const isFirstCellFocused = rowIndex === 0 && colIndex === 0;

  if (!isFirstCellFocused) {
    if (rowIndex === 0 /* first row is focused */) {
      if (wrap) {
        const lastRowLength = matrix[rowCount - 1].length;
        const col = colIndex - 1;
        const row = rowCount - (col >= lastRowLength ? 2 : 1);

        retVal = [row, col]; // bottom cell of previous col
      }
    } else {
      retVal = [rowIndex - 1, colIndex]; // cell above
    }
  }

  return retVal;
};

export const getId = (idPrefix: string, rowIndex: number, colIndex: number) =>
  `${idPrefix}--R${rowIndex + 1}C${colIndex + 1}`;
