/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useSelection, composeEventHandlers } from '@zendeskgarden/container-selection';
import closest from 'dom-helpers/query/closest';

export function useButtonGroup(options) {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection(options);

  const getGroupProps = ({ role = 'group', ...other } = {}) => {
    return {
      role,
      ...other
    };
  };

  const getButtonProps = ({
    role = 'button',
    key,
    onFocus,
    selectedAriaKey = 'aria-pressed',
    ...other
  } = {}) => {
    if (typeof key === 'undefined' || key === null) {
      throw new Error(
        '"key" must be defined within getButtonProps regardless of being used within a .map()'
      );
    }

    return {
      role,
      key,
      selectedAriaKey,
      onFocus: composeEventHandlers(onFocus, ({ target }) => {
        // Chrome puts focus on a button and returns it upon window focus
        // this just makes sure the focus is on the ButtonGroupView instead
        // to avoid a double focus bug
        const { role: roleProp } = getGroupProps();

        closest(target, `[role="${roleProp}"]`).focus();
      }),
      ...other
    };
  };

  return {
    selectedItem,
    focusedItem,
    getGroupProps: props => getContainerProps(getGroupProps(props)),
    getButtonProps: props => getItemProps(getButtonProps(props))
  };
}
