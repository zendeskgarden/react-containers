/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';
import { HTMLProps, MutableRefObject, ReactNode } from 'react';

export interface IUseTabsProps<Item> extends Omit<IUseSelectionProps<Item>, 'direction'> {
  /** Provides an ordered list of unique selection values */
  values: Item[];
  /** Determines the orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Prefixes IDs for tab elements */
  idPrefix?: string;
}

export interface IUseTabsReturnValue<Item>
  extends Pick<IUseSelectionReturnValue<Item>, 'focusedItem' | 'selectedItem'> {
  getTabListProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'tablist' | null;
    }
  ) => HTMLProps<T>;
  getTabProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      value: Item;
      focusRef?: MutableRefObject<T>;
      refKey?: string;
      role?: 'tab' | null;
    }
  ) => HTMLProps<T>;
  getTabPanelProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      value: Item;
      role?: 'tabpanel' | null;
    }
  ) => HTMLProps<T>;
}

export interface ITabsContainerProps<Item> extends IUseTabsProps<Item> {
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
    focusedItem?: IUseTabsReturnValue<Item>['focusedItem'];
    selectedItem?: IUseTabsReturnValue<Item>['selectedItem'];
    getTabListProps: IUseTabsReturnValue<Item>['getTabListProps'];
    getTabProps: IUseTabsReturnValue<Item>['getTabProps'];
    getTabPanelProps: IUseTabsReturnValue<Item>['getTabPanelProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseTabsReturnValue<Item>) => ReactNode;
}
