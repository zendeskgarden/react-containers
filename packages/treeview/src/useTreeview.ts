/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';
import { composeEventHandlers, getControlledValue } from '@zendeskgarden/container-utilities';

export interface IUseTreeviewProps {
  /** Determines which sections are expanded in a controlled treeview */
  openNodes?: string[];
  onChange?: (expandedNodes: string[]) => void;
}

export interface IGetTreeItemProps extends HTMLProps<any> {
  index?: string;
  itemType?: 'parent' | 'end';
}

export interface IUseTreeviewReturnValue {
  getTreeProps: <T>(options?: T & HTMLProps<any>) => any;
  getTreeItemProps: <T>(options?: T & IGetTreeItemProps) => any;
  getGroupProps: <T>(options?: T & HTMLProps<any>) => any;
  openNodes: string[];
}

/**
 * TODO:
 * - expandable: PropTypes.bool,
 * - collapsible
 * - a11y controls
 * @param expandedNodes
 * @param onChange
 */
export function useTreeview({
  openNodes,
  onChange = () => undefined
}: IUseTreeviewProps = {}): IUseTreeviewReturnValue {
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

  const getTreeProps = ({ role = 'tree', ...props }: HTMLProps<any> = {}) => ({
    role: role === null || role === undefined ? role : 'tree',
    'data-garden-container-id': 'containers.treeview',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  const getTreeItemProps = ({
    index,
    role = 'treeitem',
    itemType = 'end',
    onClick,
    ...props
  }: IGetTreeItemProps = {}) => {
    if (itemType === 'parent' && index === undefined) {
      throw new Error(
        'Accessibility Error: You must provide an `index` option to `getTreeItemProps()` for parent nodes'
      );
    }

    const expanded = itemType === 'parent' ? isNodeExpanded(index) : undefined;

    return {
      role: role === null || role === undefined ? role : 'treeitem',
      'aria-expanded': expanded,
      'data-garden-container-version': PACKAGE_VERSION,
      onClick: composeEventHandlers(onClick, (e: MouseEvent) => {
        if (itemType !== 'parent') {
          return;
        }
        e.stopPropagation();
        toggleParent(index!);
      }),
      ...props
    };
  };

  const getGroupProps = ({ role = 'group', ...props }: HTMLProps<any> = {}) => {
    return {
      role: role === null || role === undefined ? role : 'group',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  return {
    getTreeProps,
    getTreeItemProps,
    getGroupProps,
    openNodes: Array.from(openNodesState)
  };
}
