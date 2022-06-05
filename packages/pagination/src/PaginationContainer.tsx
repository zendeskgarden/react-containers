/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { usePagination } from './usePagination';
import { IPaginationContainerProps } from './types';

export const PaginationContainer: React.FC<IPaginationContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => <>{render!(usePagination(options))}</>;

PaginationContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func
};
