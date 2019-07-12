/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useSelection } from '@zendeskgarden/container-selection';

const HOOK_ID = 'buttongroup';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function useButtonGroup(options) {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection(options);

  const getGroupProps = ({ role = 'group', ...other } = {}) => {
    return {
      role,
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
      ...other
    };
  };

  const getButtonProps = ({
    role = 'button',
    key,
    selectedAriaKey = 'aria-pressed',
    ...other
  } = {}) => {
    return {
      role,
      key,
      selectedAriaKey,
      ...other
    };
  };

  return {
    selectedItem,
    focusedItem,
    getGroupProps: props => getContainerProps(getGroupProps(props)),
    getButtonProps: props => getItemProps(getButtonProps(props), 'getButtonProps')
  };
}
