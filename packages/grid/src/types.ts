/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUseGridProps {
  /** Sets the two-dimension array to render the grid */
  matrix: unknown[][];
  /** Determines if navigation uses right-to-left direction */
  rtl?: boolean;
  /** Enables wrapped keyboard navigation  */
  wrap?: boolean;
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
  /** Sets the environment where the grid is rendered */
  environment?: Document;
}

export interface IUseGridReturnValue {
  getGridCellProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'gridcell' | null;
      rowIndex: number;
      colIndex: number;
    }
  ) => HTMLProps<T>;
}

export interface IGridContainerProps extends IUseGridProps {
  /**
   * Provides grid render prop functions
   *
   * @param {function} [options.getGridCellProps] Grid cell props getter
   */
  render?: (options: { getGridCellProps: IUseGridReturnValue['getGridCellProps'] }) => ReactNode;
  /** @ignore */
  children?: (options: IUseGridReturnValue) => ReactNode;
}
