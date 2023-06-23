/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUseSelectionProps<Value> {
  /** Provides an ordered list of unique selection values */
  values: Value[];
  /** Determines the orientation of the selection */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Sets the initial focused value */
  defaultFocusedValue?: Value;
  /** Sets the initial selected value */
  defaultSelectedValue?: Value;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Sets controlled value selection */
  selectedValue?: Value;
  /** Sets controlled value focus */
  focusedValue?: Value;
  /**
   * Handles controlled value selection
   *
   * @param selectedValue The selected value
   */
  onSelect?: (selectedValue: Value) => void;
  /**
   * Handles controlled value focus
   *
   * @param focusedValue The focused value
   */
  onFocus?: (focusedValue?: Value) => void;
}

export interface IUseSelectionReturnValue<Value> {
  focusedValue?: IUseSelectionProps<Value>['focusedValue'];
  selectedValue?: IUseSelectionProps<Value>['selectedValue'];
  getGroupProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'group' | null;
    }
  ) => HTMLProps<T>;
  getElementProps: <T extends Element>(
    props: HTMLProps<T> & {
      value: Value;
      selectedAriaKey?: any;
    }
  ) => HTMLProps<T>;
}

export interface ISelectionContainerProps<Value> extends IUseSelectionProps<Value> {
  /**
   * Provides selection render prop state and functions
   *
   * @param {*} [options.focusedValue] Controlled focused value
   * @param {*} [options.selectedValue] Controlled selected value
   * @param {function} [options.getGroupProps] Container props getter
   * @param {function} [options.getElementProps] Value props getter
   */
  render?: (options: {
    focusedValue?: IUseSelectionReturnValue<Value>['focusedValue'];
    selectedValue?: IUseSelectionReturnValue<Value>['selectedValue'];
    getGroupProps: IUseSelectionReturnValue<Value>['getGroupProps'];
    getElementProps: IUseSelectionReturnValue<Value>['getElementProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSelectionReturnValue<Value>) => ReactNode;
}
