/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useTabs, IUseTabsProps, IUseTabsReturnValue } from './useTabs';

export interface ITabsContainerProps extends IUseTabsProps<any> {
  /** A render prop function */
  render?: (options: IUseTabsReturnValue<any>) => React.ReactNode;
  /** A children render prop function */
  children?: (options: IUseTabsReturnValue<any>) => React.ReactNode;
}

export const TabsContainer: React.FunctionComponent<ITabsContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useTabs(options)) as React.ReactElement}</>;
};

TabsContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  vertical: PropTypes.bool,
  rtl: PropTypes.bool,
  idPrefix: PropTypes.string,
  defaultSelectedIndex: PropTypes.number,
  selectedItem: PropTypes.any,
  onSelect: PropTypes.func
};
