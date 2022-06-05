/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  useSelection,
  IUseSelectionProps as IUseButtonGroupProps
} from '@zendeskgarden/container-selection';
import { IUseButtonGroupReturnValue } from './types';

export const useButtonGroup = <Item>(
  options: IUseButtonGroupProps<Item>
): IUseButtonGroupReturnValue<Item> => {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } =
    useSelection<Item>(options);

  const getGroupProps: IUseButtonGroupReturnValue<Item>['getGroupProps'] = ({
    role = 'group',
    ...other
  } = {}) => ({
    role: role === null ? undefined : role,
    'data-garden-container-id': 'containers.buttongroup',
    'data-garden-container-version': PACKAGE_VERSION,
    ...other
  });

  const getButtonProps: IUseButtonGroupReturnValue<Item>['getButtonProps'] = ({
    role = 'button',
    selectedAriaKey = 'aria-pressed',
    ...other
  }) =>
    getItemProps({
      role: role === null ? undefined : role,
      selectedAriaKey,
      ...other
    });

  return {
    selectedItem,
    focusedItem,
    getGroupProps: props => getContainerProps(getGroupProps(props)),
    getButtonProps
  };
};
