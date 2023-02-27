/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useGrid } from './useGrid';
import { IGridContainerProps } from './types';

export const GridContainer: React.FC<IGridContainerProps> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useGrid(options))}</>;

GridContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  rtl: PropTypes.bool,
  wrap: PropTypes.bool,
  matrix: PropTypes.any,
  idPrefix: PropTypes.string,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  defaultRowIndex: PropTypes.number,
  defaultColIndex: PropTypes.number,
  onChange: PropTypes.func,
  environment: PropTypes.any
};
