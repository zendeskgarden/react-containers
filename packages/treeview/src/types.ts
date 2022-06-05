/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';
import { IUseSelectionProps, IUseSelectionReturnValue } from '@zendeskgarden/container-selection';

export interface IUseTreeviewProps<Item> extends Omit<IUseSelectionProps<Item>, 'direction'> {
  /** Determines the orientation of the tree */
  orientation?: 'horizontal' | 'vertical';
  /** Determines which sections are expanded in a controlled treeview */
  openNodes?: Item[];
  /**
   * Handles node expansion changes
   *
   * @param expandedNodes The list of currently expanded nodes
   */
  onChange?: (expandedNodes: Item[]) => void;
}

export interface IUseTreeviewReturnValue<Item>
  extends Pick<IUseSelectionReturnValue<Item>, 'focusedItem' | 'selectedItem'> {
  openNodes: NonNullable<IUseTreeviewProps<Item>['openNodes']>;
  getTreeProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label' | 'role'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
      role?: 'tree' | null;
    }
  ) => HTMLProps<T>;
  getNodeProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      item: Item;
      focusRef: RefObject<T>;
      refKey?: string;
      role?: 'treeitem' | null;
      nodeType?: 'parent' | 'end';
    }
  ) => HTMLProps<T>;
  getGroupProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'group' | null;
    }
  ) => HTMLProps<T>;
}

export interface ITreeviewContainerProps<Item> extends IUseTreeviewProps<Item> {
  /**
   * Provides treeview render prop state and functions
   *
   * @param {*} [options.focusedItem] Controlled focused item
   * @param {*} [options.selectedItem] Controlled selected item
   * @param {Array} [options.openNodes] Controlled open nodes
   * @param {function} [options.getTreeProps] Tree props getter
   * @param {function} [options.getNodeProps] Node props getter
   * @param {function} [options.getGroupProps] Group props getter
   */
  render?: (options: {
    focusedItem?: IUseTreeviewReturnValue<Item>['focusedItem'];
    selectedItem?: IUseTreeviewReturnValue<Item>['selectedItem'];
    openNodes: IUseTreeviewReturnValue<Item>['openNodes'];
    getTreeProps: IUseTreeviewReturnValue<Item>['getTreeProps'];
    getNodeProps: IUseTreeviewReturnValue<Item>['getNodeProps'];
    getGroupProps: IUseTreeviewReturnValue<Item>['getGroupProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseTreeviewReturnValue<Item>) => ReactNode;
}
