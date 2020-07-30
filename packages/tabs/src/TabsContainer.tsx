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
  render?: (options: IUseTabsReturnValue<any>) => React.ReactNode;
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
  /** A children render prop function */
  children: PropTypes.func,
  /** A render prop function */
  render: PropTypes.func,
  /** Determines the orientation of the tabs */
  vertical: PropTypes.bool,
  /** Prefix used for generating tab element IDs */
  idPrefix: PropTypes.string,
  /** Sets the default selected tab */
  defaultSelectedIndex: PropTypes.number,
  /** Provides a callback function that returns the `selectedItem` when a `Tab` has been selected by keyboard or mouse */
  onSelect: PropTypes.func
};
