/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';
import { composeEventHandlers, getControlledValue } from '@zendeskgarden/container-utilities';
import {
  useSelection,
  IGetItemPropsOptions,
  IUseSelectionState,
  IUseSelectionProps
} from '@zendeskgarden/container-selection';

export interface IUseTreeviewProps<Item> extends IUseSelectionProps<Item> {
  /** Determines which sections are expanded in a controlled treeview */
  openNodes?: string[];
  onChange?: (expandedNodes: string[]) => void;
}

export interface IGetTreeProps extends HTMLProps<any> {
  label?: string;
  labelledBy?: string;
}

export interface IGetTreeItemProps<Item> extends IGetItemPropsOptions<Item>, HTMLProps<any> {
  index?: string;
  item: Item;
  nodeType?: 'parent' | 'end';
}

export interface IUseTreeviewReturnValue<Item> extends IUseSelectionState<Item> {
  openNodes: string[];
  getTreeProps: <T extends IGetTreeProps>(options?: T) => any;
  getTreeItemProps: <T extends IGetTreeItemProps<Item>>(options?: T) => any;
  getGroupProps: <T>(options?: T & HTMLProps<any>) => any;
}

function requiredArguments(arg: any, argStr: string, methodName: string) {
  if (typeof arg === 'undefined' || arg === null) {
    throw new Error(
      `Accessibility Error: You must provide an "${argStr}" option to "${methodName}()"`
    );
  }
}

/**
 * TODO:
 * - expandable: PropTypes.bool,
 * - collapsible
 * - a11y controls
 * @param expandedNodes
 * @param onChange
 */
export function useTreeview<Item = any>({
  openNodes,
  onChange = () => undefined,
  ...options
}: IUseTreeviewProps<Item> = {}): IUseTreeviewReturnValue<Item> {
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection<Item>({
    direction: 'vertical', // TODO: implement direction
    defaultSelectedIndex: 0,
    ...options
  });
  const [openNodesState, setOpenNodes] = useState<string[]>([]);
  const controlledOpenedState = getControlledValue<string[] | undefined>(
    openNodes,
    Array.from(openNodesState)
  )!;

  const isControlled = openNodes !== null && openNodes !== undefined;
  const isNodeExpanded = (index: string | undefined): boolean => {
    if (!index) {
      return false;
    }

    return controlledOpenedState.includes(index);
  };

  const toggleParent = (index: string) => {
    const newValue = controlledOpenedState.includes(index)
      ? controlledOpenedState.filter(i => i !== index)
      : [...controlledOpenedState, index];

    onChange(newValue);
    if (!isControlled) {
      setOpenNodes(newValue);
    }
  };

  const getTreeProps = ({ label, labelledBy, role = 'tree', ...props }: IGetTreeProps = {}) => {
    // TODO: Throw error if no label or labelledBy?
    // TODO: Throw error role is not tree?

    return {
      role: role === null || role === undefined ? role : 'tree',
      'aria-label': label,
      'aria-labelledBy': labelledBy,
      'data-garden-container-id': 'containers.treeview',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  const getTreeItemProps = (
    {
      index,
      item,
      role = 'treeitem',
      nodeType = 'end',
      onClick,
      ...props
    }: IGetTreeItemProps<Item> = {} as any
  ) => {
    requiredArguments(item, 'item', 'getTreeItemProps');
    if (nodeType === 'parent' && index === undefined) {
      throw new Error(
        'Accessibility Error: You must provide an `index` option to `getTreeItemProps()` for parent nodes'
      );
    }
    // TODO: Throw error role is not treeitem?

    const expanded = nodeType === 'parent' ? isNodeExpanded(index) : undefined;

    return {
      role: role === null || role === undefined ? role : 'treeitem',
      item,
      'aria-expanded': expanded,
      'data-garden-container-version': PACKAGE_VERSION,
      onClick: composeEventHandlers(onClick, (e: MouseEvent) => {
        if (nodeType !== 'parent') {
          return;
        }
        e.stopPropagation();
        toggleParent(index!);
      }),
      ...props
    };
  };

  const getGroupProps = ({ role = 'group', ...props }: HTMLProps<any> = {}) => {
    // TODO: Throw error role is not group?
    return {
      role: role === null || role === undefined ? role : 'group',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  return {
    selectedItem,
    focusedItem,
    openNodes: Array.from(openNodesState),
    getTreeProps: props => getContainerProps(getTreeProps(props) as any),
    getTreeItemProps: props => getItemProps(getTreeItemProps(props) as any),
    getGroupProps
  };
}
