/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { usePagination, IUsePaginationProps, IUsePaginationReturnValue } from './usePagination';

export interface IPaginationContainerProps<Item> extends IUsePaginationProps<Item> {
  /** A render prop function which receives the newly selected item */
  render?: (options: IUsePaginationReturnValue<Item>) => React.ReactNode;
  /** A children render prop function which receives the newly selected item */
  children?: (options: IUsePaginationReturnValue<Item>) => React.ReactNode;
}

export const PaginationContainer: React.FunctionComponent<IPaginationContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(usePagination(options)) as React.ReactElement}</>;
};

PaginationContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func
};
