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

const HOOK_ID = 'tabs';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function useTabs({ vertical, idPrefix, ...options } = {}) {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection({
    direction: vertical ? 'vertical' : 'horizontal',
    defaultSelectedIndex: 0,
    ...options
  });
  const [_id] = useState(idPrefix || generateId('garden-tabs-container'));
  const PANEL_ID = `${_id}--panel`;
  const TAB_ID = `${_id}--tab`;

  const getTabListProps = ({ role = 'tablist', ...other } = {}) => {
    return {
      role,
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
      ...other
    };
  };

  const getTabProps = ({ role = 'tab', index, ...other } = {}) => {
    requiredArguments(index, 'index', 'getTabProps');

    return {
      id: `${TAB_ID}:${index}`,
      'aria-controls': `${PANEL_ID}:${index}`,
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
      id: `${PANEL_ID}:${index}`,
      hidden: isHidden,
      'aria-labelledby': `${TAB_ID}:${index}`,
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
