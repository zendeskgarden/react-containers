/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps } from 'react';
import {
  IGetItemPropsOptions,
  IUseSelectionProps,
  IUseSelectionState
} from '@zendeskgarden/container-selection';
import { ContainerOrientation } from '@zendeskgarden/container-utilities';
import { HandlerFunction } from './utils';

export interface IUseTreeviewProps<Item> extends IUseSelectionProps<Item> {
  /** Determines which sections are expanded in a controlled treeview */
  openNodes?: Item[];
  /** Determines the orientation of the tree */
  orientation?: ContainerOrientation;
  /** Determines if selection uses right-to-left writing direction */
  rtl?: boolean;
  /** A callback function that receives the new collection of expanded items. */
  onChange?: (expandedNodes: Item[]) => void;
}

export interface IGetTreeProps extends HTMLProps<any> {
  /** See W3 [`aria-label` specification](https://www.w3.org/TR/wai-aria-1.1/#aria-label) **/
  label?: string;
  /** See W3 [`aria-labelledby` specification](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby) **/
  labelledBy?: string;
}

export interface IGetNodeProps<Item> extends IGetItemPropsOptions<Item>, HTMLProps<any> {
  item: Item;
  nodeType?: 'parent' | 'end';
}

export interface IUseTreeviewReturnValue<Item> extends IUseSelectionState<Item> {
  openNodes: Item[];
  getTreeProps: <T extends IGetTreeProps>(options?: T) => any;
  getNodeProps: <T extends IGetNodeProps<Item>>(options?: T) => any;
  getGroupProps: <T>(options?: T & HTMLProps<any>) => any;
}

export interface IShortcutMapping {
  horizontal: HandlerFunction;
  vertical: HandlerFunction;
}
