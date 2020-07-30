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
  render?: (options: IUsePaginationReturnValue<Item>) => React.ReactNode;
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
  /** A children render prop function which receives the newly selected item */
  children: PropTypes.func,
  /** A render prop function which receives the newly selected item */
  render: PropTypes.func,
  /** Sets the focused pagination item. Useful for controlled usages */
  focusedItem: PropTypes.any,
  /** Sets the focused pagination item. Useful for controlled usages */
  selectedItem: PropTypes.any,
  /** A callback function that receives the selected pagination item */
  onSelect: PropTypes.func,
  /** A callback function that receives the focused pagination item */
  onFocus: PropTypes.func
};
