/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, MutableRefObject, ReactNode } from 'react';

export interface IUseSelectionProps<Value> {
  /** Provides an ordered list of unique selection values */
  values: Value[];
  /** Determines the orientation of the selection */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Sets the initial focused item */
  defaultFocusedItem?: Value;
  /** Sets the initial selected item */
  defaultSelectedItem?: Value;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Sets controlled item selection */
  selectedItem?: Value;
  /** Sets controlled item focus */
  focusedItem?: Value;
  /**
   * Handles controlled item selection
   *
   * @param selectedItem The selected item
   */
  onSelect?: (selectedItem: Value) => void;
  /**
   * Handles controlled item focus
   *
   * @param focusedItem The focused item
   */
  onFocus?: (focusedItem?: Value) => void;
}

export interface IUseSelectionReturnValue<Value> {
  focusedItem?: IUseSelectionProps<Value>['focusedItem'];
  selectedItem?: IUseSelectionProps<Value>['selectedItem'];
  getContainerProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'listbox' | null;
    }
  ) => HTMLProps<T>;
  getItemProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      value: Value;
      focusRef?: MutableRefObject<T>;
      refKey?: string;
      role?: 'option' | null;
      selectedAriaKey?: any;
    }
  ) => HTMLProps<T>;
}

export interface ISelectionContainerProps<Value> extends IUseSelectionProps<Value> {
  /**
   * Provides selection render prop state and functions
   *
   * @param {*} [options.focusedItem] Controlled focused item
   * @param {*} [options.selectedItem] Controlled selected item
   * @param {function} [options.getContainerProps] Container props getter
   * @param {function} [options.getItemProps] Value props getter
   */
  render?: (options: {
    focusedItem?: IUseSelectionReturnValue<Value>['focusedItem'];
    selectedItem?: IUseSelectionReturnValue<Value>['selectedItem'];
    getContainerProps: IUseSelectionReturnValue<Value>['getContainerProps'];
    getItemProps: IUseSelectionReturnValue<Value>['getItemProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSelectionReturnValue<Value>) => ReactNode;
}
