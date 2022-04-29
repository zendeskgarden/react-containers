/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, HTMLProps, HTMLAttributes, KeyboardEvent } from 'react';
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
  /** Sets the focused column index in a controlled grid */
  colIndex?: number;
  /** Sets the default focused row index in a uncontrolled grid */
  defaultRowIndex?: number;
  /** Sets the default focused column index in a uncontrolled grid */
  defaultColIndex?: number;
  /** Handles grid change event */
  onChange?: (rowIndex: number, colIndex: number) => void;
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
  rowIndex,
  colIndex,
  defaultRowIndex,
  defaultColIndex
}: IUseGridProps): IUseGridReturnValue {
  const rowCount = matrix.length;
  const columnCount = matrix[0].length;
  const lastRowLength = matrix[rowCount - 1].length;
  const [uncontrolledRowIndex, setUncontrolledRowIndex] = useState(
    defaultRowIndex !== null && defaultRowIndex !== undefined ? defaultRowIndex : 0
  );
  const [uncontrolledColIndex, setUncontrolledColIndex] = useState(
    defaultColIndex !== null && defaultColIndex !== undefined ? defaultColIndex : 0
  );
  const isControlled =
    rowIndex !== null && colIndex !== null && rowIndex !== undefined && colIndex !== undefined;

  const setFocusedCell = (rowIdx: number, colIdx: number) => {
    setUncontrolledRowIndex(rowIdx);
    setUncontrolledColIndex(colIdx);
  };

  const setFocus = (rowIdx: number, colIdx: number) => {
    const id = `${idPrefix}-${rowIdx}-${colIdx}`;
    const element = document.getElementById(id);

    element && element.focus();
  };

  const onNavigate = (e: KeyboardEvent<HTMLElement>) => {
    if (GRID_KEYS.includes(e.key)) {
      e.preventDefault();
    }

    if (isControlled) {
      const onLastRow = rowIndex === rowCount - 1;
      const onLastCol = colIndex === columnCount - 1;
      const rightEnd = onLastRow && colIndex === lastRowLength - 1;
      const downEnd = rowIndex === rowCount - 2 && (colIndex as number) >= lastRowLength;
      const backward = () => {
        if ((colIndex as number) > 0) {
          onChange && onChange(rowIndex as number, (colIndex as number) - 1);
          setFocus(rowIndex as number, (colIndex as number) - 1);
        }
        if (wrap && colIndex === 0 && (rowIndex as number) > 0) {
          onChange && onChange((rowIndex as number) - 1, columnCount - 1);
          setFocus((rowIndex as number) - 1, columnCount - 1);
        }
      };

      const forward = () => {
        if ((colIndex as number) < columnCount - 1 && !rightEnd) {
          onChange && onChange(rowIndex as number, (colIndex as number) + 1);
          setFocus(rowIndex as number, (colIndex as number) + 1);
        }
        if (wrap && onLastCol && !onLastRow) {
          onChange && onChange((rowIndex as number) + 1, 0);
          setFocus((rowIndex as number) + 1, 0);
        }
      };

      switch (e.key) {
        case KEYS.LEFT:
          return rtl ? forward() : backward();
        case KEYS.RIGHT:
          return rtl ? backward() : forward();
        case KEYS.UP:
          if (rowIndex === 0 && colIndex === 0) {
            break;
          }
          if ((rowIndex as number) > 0) {
            onChange && onChange((rowIndex as number) - 1, colIndex as number);
            setFocus((rowIndex as number) - 1, colIndex as number);
            break;
          }
          if (wrap) {
            if ((colIndex as number) <= lastRowLength) {
              setFocus(rowCount - 1, (colIndex as number) - 1);
              onChange && onChange(rowCount - 1, (colIndex as number) - 1);
            } else {
              setFocus(rowCount - 2, (colIndex as number) - 1);
              onChange && onChange(rowCount - 2, (colIndex as number) - 1);
            }
          }
          break;
        case KEYS.DOWN:
          if ((rowIndex as number) < rowCount - 1 && !downEnd) {
            onChange && onChange((rowIndex as number) + 1, colIndex as number);
            setFocus((rowIndex as number) + 1, colIndex as number);
          }
          if (wrap) {
            if ((colIndex as number) < columnCount - 1 && onLastRow) {
              setFocus(0, (colIndex as number) + 1);
              onChange && onChange(0, (colIndex as number) + 1);
            }

            if (
              (colIndex as number) >= lastRowLength &&
              rowCount - 1 === (rowIndex as number) + 1 &&
              (colIndex as number) < columnCount - 1
            ) {
              setFocus(0, (colIndex as number) + 1);
              onChange && onChange(0, (colIndex as number) + 1);
              break;
            }
          }
          break;
        case KEYS.HOME:
          if (e.ctrlKey) {
            onChange && onChange(0, 0);
            setFocus(0, 0);
          } else {
            onChange && onChange(rowIndex as number, 0);
            setFocus(rowIndex as number, 0);
          }
          break;
        case KEYS.END:
          if (e.ctrlKey) {
            onChange && onChange(rowCount - 1, matrix[rowCount - 1].length - 1);
            setFocus(rowCount - 1, matrix[rowCount - 1].length - 1);
          } else {
            onChange && onChange(rowIndex as number, matrix[rowIndex as number].length - 1);
            setFocus(rowIndex as number, matrix[rowIndex as number].length - 1);
          }
          break;
        default:
      }
    } else {
      const onLastRow = uncontrolledRowIndex === rowCount - 1;
      const onLastCol = uncontrolledColIndex === columnCount - 1;
      const rightEnd = onLastRow && uncontrolledColIndex === lastRowLength - 1;
      const downEnd =
        uncontrolledRowIndex === rowCount - 2 && uncontrolledColIndex >= lastRowLength;

      const forward = () => {
        if (uncontrolledColIndex < columnCount - 1 && !rightEnd) {
          setUncontrolledColIndex(uncontrolledColIndex + 1);
          setFocus(uncontrolledRowIndex, uncontrolledColIndex + 1);
          onChange && onChange(uncontrolledRowIndex, uncontrolledColIndex + 1);
        }
        if (wrap && onLastCol && !onLastRow) {
          setUncontrolledRowIndex(uncontrolledRowIndex + 1);
          setUncontrolledColIndex(0);
          setFocus(uncontrolledRowIndex + 1, 0);
          onChange && onChange(uncontrolledRowIndex + 1, 0);
        }
      };

      const backward = () => {
        if (uncontrolledColIndex > 0) {
          setUncontrolledColIndex(uncontrolledColIndex - 1);
          setFocus(uncontrolledRowIndex, uncontrolledColIndex - 1);
          onChange && onChange(uncontrolledRowIndex, uncontrolledColIndex - 1);
        }
        if (wrap && uncontrolledColIndex === 0 && uncontrolledRowIndex > 0) {
          setUncontrolledRowIndex(uncontrolledRowIndex - 1);
          setUncontrolledColIndex(columnCount - 1);
          setFocus(uncontrolledRowIndex - 1, columnCount - 1);
          onChange && onChange(uncontrolledRowIndex - 1, columnCount - 1);
        }
      };

      switch (e.key) {
        case KEYS.LEFT:
          return rtl ? forward() : backward();
        case KEYS.RIGHT:
          return rtl ? backward() : forward();
        case KEYS.UP:
          if (uncontrolledRowIndex === 0 && uncontrolledColIndex === 0) {
            break;
          }
          if (uncontrolledRowIndex > 0) {
            setUncontrolledRowIndex(uncontrolledRowIndex - 1);
            setFocus(uncontrolledRowIndex - 1, uncontrolledColIndex);
            onChange && onChange(uncontrolledRowIndex - 1, uncontrolledColIndex);
            break;
          }
          if (wrap) {
            if (uncontrolledColIndex <= lastRowLength) {
              setUncontrolledRowIndex(rowCount - 1);
              setUncontrolledColIndex(uncontrolledColIndex - 1);
              setFocus(rowCount - 1, uncontrolledColIndex - 1);
              onChange && onChange(rowCount - 1, uncontrolledColIndex - 1);
            } else {
              setUncontrolledRowIndex(rowCount - 2);
              setUncontrolledColIndex(uncontrolledColIndex - 1);
              setFocus(rowCount - 2, uncontrolledColIndex - 1);
              onChange && onChange(rowCount - 2, uncontrolledColIndex - 1);
            }
          }
          break;
        case KEYS.DOWN:
          if (uncontrolledRowIndex < rowCount - 1 && !downEnd) {
            setUncontrolledRowIndex(uncontrolledRowIndex + 1);
            setFocus(uncontrolledRowIndex + 1, uncontrolledColIndex);
            onChange && onChange(uncontrolledRowIndex + 1, uncontrolledColIndex);
          }
          if (wrap) {
            if (uncontrolledColIndex < columnCount - 1 && onLastRow) {
              setUncontrolledRowIndex(0);
              setUncontrolledColIndex(uncontrolledColIndex + 1);
              setFocus(0, uncontrolledColIndex + 1);
              onChange && onChange(0, uncontrolledColIndex + 1);
            }
            if (
              uncontrolledColIndex >= lastRowLength &&
              rowCount - 1 === uncontrolledRowIndex + 1 &&
              uncontrolledColIndex < columnCount - 1
            ) {
              setUncontrolledRowIndex(0);
              setUncontrolledColIndex(uncontrolledColIndex + 1);
              setFocus(0, uncontrolledColIndex + 1);
              onChange && onChange(0, uncontrolledColIndex + 1);
              break;
            }
          }
          break;
        case KEYS.HOME:
          if (e.ctrlKey) {
            setFocusedCell(0, 0);
            setFocus(0, 0);
            onChange && onChange(0, 0);
          } else {
            setFocusedCell(uncontrolledRowIndex, 0);
            setFocus(uncontrolledRowIndex, 0);
            onChange && onChange(uncontrolledRowIndex, 0);
          }
          break;
        case KEYS.END:
          if (e.ctrlKey) {
            setFocusedCell(rowCount - 1, lastRowLength - 1);
            setFocus(rowCount - 1, lastRowLength - 1);
            onChange && onChange(rowCount - 1, lastRowLength - 1);
          } else {
            setFocusedCell(uncontrolledRowIndex, matrix[uncontrolledRowIndex].length - 1);
            setFocus(uncontrolledRowIndex, matrix[uncontrolledRowIndex].length - 1);
            onChange && onChange(uncontrolledRowIndex, matrix[uncontrolledRowIndex].length - 1);
          }
          break;
        default:
      }
    }

    return undefined;
  };

  const getTabIndex = (rowIdx: number, colIdx: number) => {
    if (isControlled) {
      if (rowIndex === -1 && colIndex === -1 && rowIdx === 0 && colIdx === 0) {
        return 0;
      }

      return rowIndex === rowIdx && colIndex === colIdx ? 0 : -1;
    }

    if (rowIdx <= 0 && colIdx <= 0 && uncontrolledRowIndex <= 0 && uncontrolledColIndex <= 0) {
      return 0;
    }

    return uncontrolledRowIndex === rowIdx && uncontrolledColIndex === colIdx ? 0 : -1;
  };

  const getGridCellProps = ({
    rowIdx,
    colIdx,
    onClick,
    onFocus,
    onKeyDown,
    ...other
  }: IGetGridCellProps) => {
    return {
      tabIndex: getTabIndex(rowIdx, colIdx),
      role: 'gridcell',
      id: `${idPrefix}-${rowIdx}-${colIdx}`,
      onClick: composeEventHandlers(onClick, () => {
        if (isControlled === false) {
          setFocusedCell(rowIdx, colIdx);
        }
        onChange && onChange(rowIdx, colIdx);
      }),
      onFocus: composeEventHandlers(onFocus, () => {
        if (isControlled) {
          rowIndex === -1 && colIndex === -1 && onChange && onChange(0, 0);
        }
      }),
      onKeyDown: composeEventHandlers(onKeyDown, onNavigate),
      ...other
    };
  };

  return {
    getGridCellProps
  };
}
