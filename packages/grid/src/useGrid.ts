/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, KeyboardEventHandler, useCallback, useMemo } from 'react';
import { composeEventHandlers, KEYS, useId } from '@zendeskgarden/container-utilities';
import { IUseGridProps, IUseGridReturnValue } from './types';
import { getCellDown, getCellLeft, getCellRight, getCellUp, getId } from './utils';

const GRID_KEYS = [KEYS.LEFT, KEYS.RIGHT, KEYS.UP, KEYS.DOWN, KEYS.HOME, KEYS.END];

export function useGrid({
  rtl,
  wrap,
  matrix,
  idPrefix,
  onChange = () => undefined,
  environment,
  rowIndex: controlledRowIndex,
  colIndex: controlledColIndex,
  defaultRowIndex,
  defaultColIndex
}: IUseGridProps): IUseGridReturnValue {
  const doc = environment || document;
  const prefix = useId(idPrefix);
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

  const getGridCellProps: IUseGridReturnValue['getGridCellProps'] = useCallback(
    (
      {
        role = 'gridcell',
        rowIndex: _rowIndex,
        colIndex: _colIndex,
        onFocus,
        onKeyDown,
        ...other
      } = { rowIndex: 0, colIndex: 0 }
    ) => {
      const handleFocus = () => {
        if (!isControlled) {
          setUncontrolledRowIndex(_rowIndex);
          setUncontrolledColIndex(_colIndex);
        }

        onChange(_rowIndex, _colIndex);
      };

      const handleKeyDown: KeyboardEventHandler = event => {
        if (GRID_KEYS.includes(event.key)) {
          event.preventDefault();

          let row = rowIndex;
          let col = colIndex;

          switch (event.key) {
            case KEYS.RIGHT:
              [row, col] = rtl
                ? getCellLeft(matrix, rowIndex, colIndex, wrap)
                : getCellRight(matrix, rowIndex, colIndex, wrap);
              break;

            case KEYS.LEFT:
              [row, col] = rtl
                ? getCellRight(matrix, rowIndex, colIndex, wrap)
                : getCellLeft(matrix, rowIndex, colIndex, wrap);
              break;

            case KEYS.DOWN:
              [row, col] = getCellDown(matrix, rowIndex, colIndex, wrap);
              break;

            case KEYS.UP:
              [row, col] = getCellUp(matrix, rowIndex, colIndex, wrap);
              break;

            case KEYS.HOME:
              row = event.ctrlKey ? 0 : rowIndex;
              col = 0;
              break;

            case KEYS.END: {
              const rowCount = matrix.length;
              const lastRowIndex = rowCount - 1;
              const lastColIndex = matrix[lastRowIndex].length - 1;

              row = event.ctrlKey ? lastRowIndex : rowIndex;
              col = event.ctrlKey ? lastColIndex : matrix[rowIndex].length - 1;
              break;
            }
          }

          if (row !== rowIndex || col !== colIndex) {
            const id = getId(prefix!, row, col);
            const element = doc.getElementById(id);

            element?.focus();
          }
        }
      };

      return {
        id: getId(prefix!, _rowIndex, _colIndex),
        role: role === null ? undefined : role,
        tabIndex: rowIndex === _rowIndex && colIndex === _colIndex ? 0 : -1,
        onFocus: composeEventHandlers(onFocus, handleFocus),
        onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
        ...other
      };
    },
    [matrix, rowIndex, colIndex, doc, prefix, isControlled, onChange, rtl, wrap]
  );

  return useMemo<IUseGridReturnValue>(
    () => ({
      getGridCellProps
    }),
    [getGridCellProps]
  );
}
