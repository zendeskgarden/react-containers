/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { useSelection } from '@zendeskgarden/container-selection';
import { generateId } from '@zendeskgarden/container-utilities';

function requiredArguments(arg, argStr, methodName) {
  if (typeof arg === 'undefined' || arg === null) {
    throw new Error(
      `Accessibility Error: You must provide an "${argStr}" option to "${methodName}()"`
    );
  }
}

export function useTabs({ vertical, idPrefix, ...options } = {}) {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection({
    direction: vertical ? 'vertical' : 'horizontal',
    ...options
  });
  const [_id] = useState(idPrefix || generateId('garden-tabs-container'));
  const panelId = `${_id}--panel`;
  const tabId = `${_id}--tab`;

  const getTabListProps = ({ role = 'tablist', ...other } = {}) => {
    return {
      role,
      ...other
    };
  };

  const getTabProps = ({ role = 'tab', index, ...other } = {}) => {
    requiredArguments(index, 'index', 'getTabProps');

    return {
      id: `${tabId}:${index}`,
      'aria-controls': `${panelId}:${index}`,
      role,
      ...other
    };
  };

  const getTabPanelProps = ({ role = 'tabpanel', index, item, ...other } = {}) => {
    requiredArguments(index, 'index', 'getTabPanelProps');
    requiredArguments(item, 'item', 'getTabPanelProps');

    const isHidden = item !== selectedItem;

    return {
      role,
      tabIndex: 0,
      id: `${panelId}:${index}`,
      hidden: isHidden,
      'aria-labelledby': `${tabId}:${index}`,
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
