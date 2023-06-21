/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, MutableRefObject, ReactNode } from 'react';

export interface IUseSelectionProps<Item> {
  /** The array of IDs used for managing selection */
  items: Item[];
  /** Determines the orientation of the selection */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Sets the initial focused item */
  defaultFocusedItem?: Item;
  /** Sets the initial selected item */
  defaultSelectedItem?: Item;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Sets controlled item selection */
  selectedItem?: Item;
  /** Sets controlled item focus */
  focusedItem?: Item;
  /**
   * Handles controlled item selection
   *
   * @param selectedItem The selected item
   */
  onSelect?: (selectedItem: Item) => void;
  /**
   * Handles controlled item focus
   *
   * @param focusedItem The focused item
   */
  onFocus?: (focusedItem?: Item) => void;
}

export interface IUseSelectionReturnValue<Item> {
  focusedItem?: IUseSelectionProps<Item>['focusedItem'];
  selectedItem?: IUseSelectionProps<Item>['selectedItem'];
  getContainerProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'listbox' | null;
    }
  ) => HTMLProps<T>;
  getItemProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      item: Item;
      focusRef?: MutableRefObject<T>;
      refKey?: string;
      role?: 'option' | null;
      selectedAriaKey?: any;
    }
  ) => HTMLProps<T>;
}

export interface ISelectionContainerProps<Item> extends IUseSelectionProps<Item> {
  /**
   * Provides selection render prop state and functions
   *
   * @param {*} [options.focusedItem] Controlled focused item
   * @param {*} [options.selectedItem] Controlled selected item
   * @param {function} [options.getContainerProps] Container props getter
   * @param {function} [options.getItemProps] Item props getter
   */
  render?: (options: {
    focusedItem?: IUseSelectionReturnValue<Item>['focusedItem'];
    selectedItem?: IUseSelectionReturnValue<Item>['selectedItem'];
    getContainerProps: IUseSelectionReturnValue<Item>['getContainerProps'];
    getItemProps: IUseSelectionReturnValue<Item>['getItemProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSelectionReturnValue<Item>) => ReactNode;
}
