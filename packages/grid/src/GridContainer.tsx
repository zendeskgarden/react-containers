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
  /** Documents the render function */
  render?: (options: IUseGridReturnValue) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUseGridReturnValue) => React.ReactNode;
}

export const GridContainer: React.FC<IGridContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useGrid(options)) as React.ReactElement}</>;
};

GridContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
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
