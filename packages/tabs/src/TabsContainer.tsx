/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTabs } from './useTabs';
import { ITabsContainerProps } from './types';

export const TabsContainer: React.FC<ITabsContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useTabs(options))}</>;

TabsContainer.defaultProps = {
  orientation: 'horizontal'
};

TabsContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.any).isRequired,
  rtl: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  idPrefix: PropTypes.string,
  defaultSelectedValue: PropTypes.any,
  selectedValue: PropTypes.any,
  onSelect: PropTypes.func
};
