/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useId } from '@zendeskgarden/container-utilities';
import { useSelection } from '@zendeskgarden/container-selection';
import { IUseTabsProps, IUseTabsReturnValue } from './types';

export const useTabs = <Item>({
  vertical,
  idPrefix,
  ...options
}: IUseTabsProps<Item> = {}): IUseTabsReturnValue<Item> => {
  const prefix = useId(idPrefix);
  const PANEL_ID = `${prefix}__panel`;
  const TAB_ID = `${prefix}__tab`;
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection<Item>({
    direction: vertical ? 'vertical' : 'horizontal',
    defaultSelectedIndex: 0,
    ...options
  });

  const getTabListProps: IUseTabsReturnValue<Item>['getTabListProps'] = ({
    role = 'tablist',
    ...other
  } = {}) => ({
    role: role === null ? undefined : role,
    'aria-orientation': vertical ? 'vertical' : 'horizontal',
    'data-garden-container-id': 'containers.tabs',
    'data-garden-container-version': PACKAGE_VERSION,
    ...other
  });

  const getTabProps: IUseTabsReturnValue<Item>['getTabProps'] = ({
    role = 'tab',
    index,
    ...other
  }) =>
    getItemProps({
      id: `${TAB_ID}:${index}`,
      'aria-controls': `${PANEL_ID}:${index}`,
      role: role === null ? undefined : role,
      ...other
    });

  const getTabPanelProps: IUseTabsReturnValue<Item>['getTabPanelProps'] = ({
    role = 'tabpanel',
    index,
    item,
    ...other
  }) => ({
    role: role === null ? undefined : role,
    id: `${PANEL_ID}:${index}`,
    hidden: item !== selectedItem,
    'aria-labelledby': `${TAB_ID}:${index}`,
    ...other
  });

  return {
    selectedItem,
    focusedItem,
    getTabListProps: props => getContainerProps(getTabListProps(props)),
    getTabProps,
    getTabPanelProps
  };
};
