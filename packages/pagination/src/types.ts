/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';
import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';

export interface IUsePaginationReturnValue<Item>
  extends Pick<IUseSelectionReturnValue<Item>, 'focusedItem' | 'selectedItem'> {
  getContainerProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'list' | null;
    }
  ) => HTMLProps<T>;
  getPageProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label' | 'role'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
      role?: 'listitem' | null;
      item: Item;
      focusRef: RefObject<T>;
    }
  ) => HTMLProps<T>;
  getPreviousPageProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label' | 'role'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
      role?: 'listitem' | null;
      item: Item;
      focusRef: RefObject<T>;
    }
  ) => HTMLProps<T>;
  getNextPageProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label' | 'role'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
      role?: 'listitem' | null;
      item: Item;
      focusRef: RefObject<T>;
    }
  ) => HTMLProps<T>;
}

export interface IPaginationContainerProps<Item> extends IUseSelectionProps<Item> {
  /**
   * Provides pagination render prop state and functions
   *
   * @param {*} [options.focusedItem] Controlled focused item
   * @param {*} [options.selectedItem] Controlled selected item
   * @param {function} [options.getContainerProps] Container props getter
   * @param {function} [options.getPageProps] Page props getter
   * @param {function} [options.getPreviousPageProps] Previous page navigation props getter
   * @param {function} [options.getNextPageProps] Next page navigation props getter
   */
  render?: (options: {
    focusedItem?: IUsePaginationReturnValue<Item>['focusedItem'];
    selectedItem?: IUsePaginationReturnValue<Item>['selectedItem'];
    getContainerProps: IUsePaginationReturnValue<Item>['getContainerProps'];
    getPageProps: IUsePaginationReturnValue<Item>['getPageProps'];
    getPreviousPageProps: IUsePaginationReturnValue<Item>['getPreviousPageProps'];
    getNextPageProps: IUsePaginationReturnValue<Item>['getNextPageProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUsePaginationReturnValue<Item>) => ReactNode;
}
