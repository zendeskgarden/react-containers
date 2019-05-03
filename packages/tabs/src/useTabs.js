/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useSelection } from '@zendeskgarden/container-selection';

export function useTabs({ vertical, ...options } = {}) {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection({
    direction: vertical ? 'vertical' : 'horizontal',
    ...options
  });

  const getTabListProps = ({ role = 'tablist', ...other } = {}) => {
    return {
      role,
      ...other
    };
  };

  const getTabProps = ({ role = 'tab', key, ...other } = {}) => {
    return {
      key,
      role,
      ...other
    };
  };

  const getTabPanelProps = ({ role = 'tabpanel', key, ...other } = {}) => {
    if (typeof key === 'undefined' || key === null) {
      throw new Error(
        '"key" must be defined within getTabPanelProps regardless of being used within a .map()'
      );
    }

    const isHidden = key !== selectedItem;

    return {
      key,
      role,
      'aria-hidden': isHidden,
      ...other
    };
  };

  return {
    selectedItem,
    focusedItem,
    getTabPanelProps,
    getTabListProps: props => getContainerProps(getTabListProps(props)),
    getTabProps: props => getItemProps(getTabProps(props))
  };
}
