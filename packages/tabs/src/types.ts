/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';
import { HTMLProps, MutableRefObject, ReactNode } from 'react';

export interface IUseTabsProps<Value> extends Omit<IUseSelectionProps<Value>, 'direction'> {
  /** Provides an ordered list of unique selection values */
  values: Value[];
  /** Determines the orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Prefixes IDs for tab elements */
  idPrefix?: string;
}

export interface IUseTabsReturnValue<Value>
  extends Pick<IUseSelectionReturnValue<Value>, 'focusedItem' | 'selectedItem'> {
  getTabListProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'tablist' | null;
    }
  ) => HTMLProps<T>;
  getTabProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      value: Value;
      focusRef?: MutableRefObject<T>;
      refKey?: string;
      role?: 'tab' | null;
    }
  ) => HTMLProps<T>;
  getTabPanelProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      value: Value;
      role?: 'tabpanel' | null;
    }
  ) => HTMLProps<T>;
}

export interface ITabsContainerProps<Value> extends IUseTabsProps<Value> {
  /**
   * Provides tabs render prop state and functions
   *
   * @param {*} [options.focusedItem] Controlled focused tab
   * @param {*} [options.selectedItem] Controlled selected tab
   * @param {function} [options.getTabListProps] Tab list props getter
   * @param {function} [options.getTabProps] Tab props getter
   * @param {function} [options.getTabPanelProps] Tab panel props getter
   */
  render?: (options: {
    focusedItem?: IUseTabsReturnValue<Value>['focusedItem'];
    selectedItem?: IUseTabsReturnValue<Value>['selectedItem'];
    getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'];
    getTabProps: IUseTabsReturnValue<Value>['getTabProps'];
    getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseTabsReturnValue<Value>) => ReactNode;
}
