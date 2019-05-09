/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { useSelection } from '@zendeskgarden/container-selection';
import { generateId } from '@zendeskgarden/container-utilities';

const useTabThing = ({ idPrefix, selectedItem }) => {
  const [prefix] = useState(idPrefix || generateId('garden-container-tabs'));
  const panelId = `${prefix}--panel`;
  const tabId = `${prefix}--tab`;
  const [tabItem, setTabItem] = useState();

  const getTabProps = ({ role = 'tab', item, ...other } = {}) => {
    setTabItem(item);

    return {
      id: tabId,
      'aria-controls': panelId,
      role,
      ...other
    };
  };

  const getTabPanelProps = ({ role = 'tabpanel', ...other } = {}) => {
    const isHidden = tabItem !== selectedItem;

    return {
      role,
      tabIndex: 0,
      id: panelId,
      hidden: isHidden,
      'aria-labelledby': tabId,
      ...other
    };
  };

  return {
    getTabProps,
    getTabPanelProps,
    panelId,
    tabId
  };
};

let count = 0;
const idSuffix = () => count;

export function useTabs({ vertical, ...options } = {}) {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection({
    direction: vertical ? 'vertical' : 'horizontal',
    ...options
  });
  const [_id] = useState(generateId('garden-container-tabs'));
  const panelId = `${_id}--panel`;
  const tabId = `${_id}--tab`;

  const getTabListProps = ({ role = 'tablist', ...other } = {}) => {
    console.log('calling getTabListProps');
    return {
      role,
      ...other
    };
  };

  const getTabProps = ({ role = 'tab', index, ...other } = {}) => {
    if (typeof index === 'undefined' || index === null) {
      throw new Error('Accessibility Error: You must provide an "index" option to "getTabProps()"');
    }

    return {
      id: `${tabId}_${index}`,
      'aria-controls': `${panelId}_${index}`,
      role,
      ...other
    };
  };

  const getTabPanelProps = ({ role = 'tabpanel', index, item, ...other } = {}) => {
    if (typeof index === 'undefined' || index === null) {
      throw new Error(
        'Accessibility Error: You must provide an "index" option to "getTabPanelProps()"'
      );
    }

    const isHidden = item !== selectedItem;

    return {
      role,
      tabIndex: 0,
      id: `${panelId}_${index}`,
      hidden: isHidden,
      'aria-labelledby': `${tabId}_${index}`,
      ...other
    };
  };

  return {
    selectedItem,
    focusedItem,
    getTabPanelProps,
    getTabListProps: props => getContainerProps(getTabListProps(props)),
    getTabProps: props => getItemProps(getTabProps(props)),
    getTabsProps: ({ idPrefix, selectedItem } = {}) => {
      return useTabThing({
        idPrefix,
        selectedItem
      });
    }
  };
}
