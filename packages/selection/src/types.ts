/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';

export interface IUseSelectionProps<Item> {
  /** Determines the orientation of the selection */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Sets the initial focused item */
  defaultFocusedIndex?: number;
  /** Sets the initial selected item */
  defaultSelectedIndex?: number;
  /** Determines if selection uses right-to-left writing direction */
  rtl?: boolean;
  /** Sets the selected item in a controlled selection */
  selectedItem?: Item;
  /** Sets the focused item in a controlled selection */
  focusedItem?: Item;
  /** A callback function that receives the selected item */
  onSelect?: (selectedItem: Item) => void;
  /** A callback function that receives the focused item */
  onFocus?: (focusedItem?: Item) => void;
}

export interface IUseSelectionReturnValue<Item> {
  focusedItem?: IUseSelectionProps<Item>['focusedItem'];
  selectedItem?: IUseSelectionProps<Item>['selectedItem'];
  getContainerProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: HTMLProps<T>['role'] | null;
    }
  ) => HTMLProps<T>;
  getItemProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      item: Item;
      focusRef: RefObject<T>;
      refKey?: string;
      role?: HTMLProps<T>['role'] | null;
      selectedAriaKey?: string;
    },
    propGetterName?: string
  ) => HTMLProps<T>;
}

export interface ISelectionContainerProps<Item> extends IUseSelectionProps<Item> {
  /**
   * Provides selection render prop functions
   *
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
