/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useId } from '@zendeskgarden/container-utilities';
import { useSelection } from '@zendeskgarden/container-selection';
import { IUseTabsProps, IUseTabsReturnValue } from './types';

export const useTabs = <Value>({
  values,
  orientation = 'horizontal',
  idPrefix,
  ...options
}: IUseTabsProps<Value>): IUseTabsReturnValue<Value> => {
  const prefix = useId(idPrefix);
  const PANEL_ID = `${prefix}__panel`;
  const TAB_ID = `${prefix}__tab`;
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection<Value>({
    values,
    direction: orientation,
    defaultSelectedItem: values[0],
    ...options
  });

  const getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'] = ({
    role = 'tablist',
    ...other
  } = {}) => ({
    ...getContainerProps(other),
    role: role === null ? undefined : role,
    'aria-orientation': orientation,
    'data-garden-container-id': 'containers.tabs',
    'data-garden-container-version': PACKAGE_VERSION
  });

  const getTabProps: IUseTabsReturnValue<Value>['getTabProps'] = ({
    role = 'tab',
    value,
    ...other
  }) => ({
    ...getItemProps({ value, ...other }),
    role: role === null ? undefined : role,
    id: `${TAB_ID}:${value}`,
    'aria-controls': `${PANEL_ID}:${value}`
  });

  const getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'] = ({
    role = 'tabpanel',
    value,
    ...other
  }) => ({
    role: role === null ? undefined : role,
    id: `${PANEL_ID}:${value}`,
    hidden: value !== selectedItem,
    'aria-labelledby': `${TAB_ID}:${value}`,
    ...other
  });

  return {
    selectedItem,
    focusedItem,
    getTabListProps,
    getTabProps,
    getTabPanelProps
  };
};
