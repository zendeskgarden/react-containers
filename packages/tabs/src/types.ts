/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';
import { HTMLProps, ReactNode } from 'react';

export interface ITab<Value> {
  value: Value;
  disabled?: boolean;
}

export interface IUseTabsProps<Value> extends Omit<
  IUseSelectionProps<Value>,
  'direction' | 'values'
> {
  /**
   * Provides an ordered list of unique tab values
   *
   * @param {Value} tab.value Unique tab value
   * @param {boolean} tab.disabled Indicates that the tab is not interactive
   */
  tabs: ITab<Value>[];
  /** Determines the orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Prefixes IDs for tab elements */
  idPrefix?: string;
}

export interface IUseTabsReturnValue<Value> extends Pick<
  IUseSelectionReturnValue<Value>,
  'focusedValue' | 'selectedValue'
> {
  getTabListProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'tablist' | null;
    }
  ) => HTMLProps<T>;
  getTabProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      value: Value;
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
   * @param {*} [options.focusedValue] Controlled focused tab
   * @param {*} [options.selectedValue] Controlled selected tab
   * @param {function} [options.getTabListProps] Tab list props getter
   * @param {function} [options.getTabProps] Tab props getter
   * @param {function} [options.getTabPanelProps] Tab panel props getter
   */
  render?: (options: {
    focusedValue?: IUseTabsReturnValue<Value>['focusedValue'];
    selectedValue?: IUseTabsReturnValue<Value>['selectedValue'];
    getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'];
    getTabProps: IUseTabsReturnValue<Value>['getTabProps'];
    getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseTabsReturnValue<Value>) => ReactNode;
}
