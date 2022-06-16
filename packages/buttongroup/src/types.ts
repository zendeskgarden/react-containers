/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';
import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';

export interface IUseButtonGroupReturnValue<Item>
  extends Pick<IUseSelectionReturnValue<Item>, 'focusedItem' | 'selectedItem'> {
  getGroupProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'group' | null;
    }
  ) => HTMLProps<T>;
  getButtonProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      item: Item;
      focusRef: RefObject<T>;
      refKey?: string;
      role?: 'button' | null;
    }
  ) => HTMLProps<T>;
}

export interface IButtonGroupContainerProps<Item> extends IUseSelectionProps<Item> {
  /**
   * Provides button group render prop state and functions
   *
   * @param {*} [options.focusedItem] Controlled focused item
   * @param {*} [options.selectedItem] Controlled selected item
   * @param {function} [options.getGroupProps] Group props getter
   * @param {function} [options.getButtonProps] Button props getter
   */
  render?: (options: {
    focusedItem?: IUseButtonGroupReturnValue<Item>['focusedItem'];
    selectedItem?: IUseButtonGroupReturnValue<Item>['selectedItem'];
    getGroupProps: IUseButtonGroupReturnValue<Item>['getGroupProps'];
    getButtonProps: IUseButtonGroupReturnValue<Item>['getButtonProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseButtonGroupReturnValue<Item>) => ReactNode;
}
