/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useGrid, IUseGridProps, IUseGridReturnValue } from './useGrid';

export interface IGridContainerProps extends IUseGridProps {
  /** A render prop function which receives grid a prop getter */
  render?: (options: IUseGridReturnValue) => React.ReactNode;
  /** A children render prop function which receives a grid prop getter */
  children?: (options: IUseGridReturnValue) => React.ReactNode;
}

export const GridContainer: React.FC<IGridContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useGrid(options)) as React.ReactElement}</>;
};

GridContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  rtl: PropTypes.bool,
  wrap: PropTypes.bool,
  selection: PropTypes.bool,
  matrix: PropTypes.any,
  idPrefix: PropTypes.string,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  selectedRowIndex: PropTypes.number,
  selectedColIndex: PropTypes.number,
  defaultRowIndex: PropTypes.number,
  defaultColIndex: PropTypes.number,
  defaultSelectedRowIndex: PropTypes.number,
  defaultSelectedColIndex: PropTypes.number
};
