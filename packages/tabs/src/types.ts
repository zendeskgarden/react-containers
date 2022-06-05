/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';
import { HTMLProps, ReactNode, RefObject } from 'react';

export interface IUseTabsProps<Item> extends IUseSelectionProps<Item> {
  /** Determines the orientation of the tabs */
  vertical?: boolean;
  /** Prefixes IDs for tab elements */
  idPrefix?: string;
}

export interface IUseTabsReturnValue<Item>
  extends Pick<IUseSelectionReturnValue<Item>, 'focusedItem' | 'selectedItem'> {
  getTabListProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: HTMLProps<T>['role'] | null;
    }
  ) => HTMLProps<T>;
  getTabProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      index: number;
      item: Item;
      focusRef: RefObject<T>;
      refKey?: string;
      role?: HTMLProps<T>['role'] | null;
    }
  ) => HTMLProps<T>;
  getTabPanelProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      index: number;
      item: Item;
      role?: HTMLProps<T>['role'] | null;
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
