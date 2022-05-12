/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, HTMLProps, HTMLAttributes, KeyboardEventHandler } from 'react';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';

const GRID_KEYS = [KEYS.LEFT, KEYS.RIGHT, KEYS.UP, KEYS.DOWN, KEYS.HOME, KEYS.END];

export interface IUseGridProps {
  /** Determines if navigation uses right-to-left direction */
  rtl?: boolean;
  /** Enables wrapped keyboard navigation  */
  wrap?: boolean;
  /** Sets the two-dimension array to render the grid */
  matrix: any[][];
  /** Prefixes IDs for the grid and cells  */
  idPrefix?: string;
  /** Sets the focused row index in a controlled grid */
  rowIndex?: number;
  /** Sets the focused col index in a controlled grid */
  colIndex?: number;
  /** Sets the default focused row index in a uncontrolled grid */
  defaultRowIndex?: number;
  /** Sets the default focused col index in a uncontrolled grid */
  defaultColIndex?: number;
  /** Handles grid change event */
  onChange?: (rowIndex: number, colIndex: number) => void;
  /** The environment where the grid is rendered */
  environment?: Document;
}

interface IGetGridCellProps extends HTMLProps<any> {
  rowIdx: number;
  colIdx: number;
}

export interface IUseGridReturnValue {
  getGridCellProps: (options: IGetGridCellProps) => HTMLAttributes<any>;
}

export function useGrid({
  rtl,
  wrap,
  matrix,
  idPrefix,
  onChange,
  environment = document,
  rowIndex: controlledRowIndex,
  colIndex: controlledColIndex,
  defaultRowIndex,
  defaultColIndex
}: IUseGridProps): IUseGridReturnValue {
  const [uncontrolledRowIndex, setUncontrolledRowIndex] = useState(
    defaultRowIndex !== null && defaultRowIndex !== undefined ? defaultRowIndex : 0
  );
  const [uncontrolledColIndex, setUncontrolledColIndex] = useState(
    defaultColIndex !== null && defaultColIndex !== undefined ? defaultColIndex : 0
  );
  const isControlled =
    controlledRowIndex !== null &&
    controlledColIndex !== null &&
    controlledRowIndex !== undefined &&
    controlledColIndex !== undefined;
  const rowIndex = isControlled ? controlledRowIndex : uncontrolledRowIndex;
  const colIndex = isControlled ? controlledColIndex : uncontrolledColIndex;
  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  const getCellRight = () => {
    let retVal: number[] = [];
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

  const getCellLeft = () => {
    let retVal: number[] = [];
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

  const getCellDown = () => {
    let retVal: number[] = [];
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

  const getCellUp = () => {
    let retVal: number[] = [];
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

  const handleKeyDown: KeyboardEventHandler = event => {
    if (GRID_KEYS.includes(event.key)) {
      event.preventDefault();

      let row = rowIndex;
      let col = colIndex;

      switch (event.key) {
        case KEYS.RIGHT:
          [row, col] = rtl ? getCellLeft() : getCellRight();
          break;

        case KEYS.LEFT:
          [row, col] = rtl ? getCellRight() : getCellLeft();
          break;

        case KEYS.DOWN:
          [row, col] = getCellDown();
          break;

        case KEYS.UP:
          [row, col] = getCellUp();
          break;

        case KEYS.HOME:
          row = event.ctrlKey ? 0 : rowIndex;
          col = 0;
          break;

        case KEYS.END: {
          const lastRowIndex = rowCount - 1;
          const lastColIndex = matrix[lastRowIndex].length - 1;

          row = event.ctrlKey ? lastRowIndex : rowIndex;
          col = event.ctrlKey ? lastColIndex : matrix[rowIndex].length - 1;
          break;
        }
      }

      if (row !== rowIndex || col !== colIndex) {
        const id = `${idPrefix}-${row}-${col}`;
        const element = environment.getElementById(id);

        element?.focus();
      }
    }
  };

  const getGridCellProps = ({
    rowIdx,
    colIdx,
    onFocus,
    onKeyDown,
    ...other
  }: IGetGridCellProps) => ({
    tabIndex: rowIndex === rowIdx && colIndex === colIdx ? 0 : -1,
    role: 'gridcell',
    id: `${idPrefix}-${rowIdx}-${colIdx}`,
    onFocus: composeEventHandlers(onFocus, () => {
      if (!isControlled) {
        setUncontrolledRowIndex(rowIdx);
        setUncontrolledColIndex(colIdx);
      }

      onChange && onChange(rowIdx, colIdx);
    }),
    onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
    ...other
  });

  return {
    getGridCellProps
  };
}
