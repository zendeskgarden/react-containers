/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

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
  return render!(useTabs(options)) as React.ReactElement;
};

TabsContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  vertical: PropTypes.bool,
  idPrefix: PropTypes.string,
  defaultSelectedIndex: PropTypes.number,
  onSelect: PropTypes.func
};
