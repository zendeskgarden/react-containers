/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';
import {
  composeEventHandlers,
  getControlledValue,
  KEY_CODES
} from '@zendeskgarden/container-utilities';
import {
  useSelection,
  IGetItemPropsOptions,
  IUseSelectionState,
  IUseSelectionProps
} from '@zendeskgarden/container-selection';
import {
  handleArrowDown,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleEnd,
  handleHome
} from './keyboardInteractions';

export interface IUseTreeviewProps<Item> extends IUseSelectionProps<Item> {
  /** Determines which sections are expanded in a controlled treeview */
  openNodes?: Item[];
  /** Determines the orientation of the tree */
  horizontal?: boolean;
  /** Determines if selection uses right-to-left writing direction */
  rtl?: boolean;
  /** A callback function that receives the new collection of expanded items. */
  onChange?: (expandedNodes: Item[]) => void;
}

export interface IGetTreeProps extends HTMLProps<any> {
  label?: string;
  labelledBy?: string;
}

export interface IGetTreeItemProps<Item> extends IGetItemPropsOptions<Item>, HTMLProps<any> {
  item: Item;
  nodeType?: 'parent' | 'end';
}

export interface IUseTreeviewReturnValue<Item> extends IUseSelectionState<Item> {
  openNodes: Item[];
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

const hasModifierKeyPressed = (e: KeyboardEvent): boolean =>
  e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

const SUPPORTED_KEYS = [
  KEY_CODES.HOME,
  KEY_CODES.END,
  KEY_CODES.UP,
  KEY_CODES.DOWN,
  KEY_CODES.RIGHT,
  KEY_CODES.LEFT
];

/**
 * TODO:
 * - expandable: PropTypes.bool,
 * - collapsible
 * @param expandedNodes
 * @param onChange
 */
export function useTreeview<Item = any>({
  openNodes,
  horizontal,
  rtl,
  onChange = () => undefined,
  ...options
}: IUseTreeviewProps<Item> = {}): IUseTreeviewReturnValue<Item> {
  const [ownFocusedItem, setFocusedItem] = useState<Item>();
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection<Item>({
    direction: horizontal ? 'horizontal' : 'vertical',
    defaultSelectedIndex: 0,
    focusedItem: ownFocusedItem,
    ...options
  });
  const [openNodesState, setOpenNodes] = useState<Item[]>([]);
  const controlledOpenedState = getControlledValue<Item[] | undefined>(
    openNodes,
    Array.from(openNodesState)
  )!;

  const isControlled = openNodes !== null && openNodes !== undefined;
  const isNodeExpanded = (item: Item | undefined): boolean => {
    if (!item) {
      return false;
    }

    return controlledOpenedState.includes(item);
  };

  const toggleParent = (item: Item) => {
    const newValue = controlledOpenedState.includes(item)
      ? controlledOpenedState.filter(i => i !== item)
      : [...controlledOpenedState, item];

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
      'aria-labelledby': labelledBy,
      'data-garden-container-id': 'containers.treeview',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  const getTreeItemProps = (
    {
      item,
      role = 'treeitem',
      nodeType = 'end',
      onClick,
      onFocus,
      onKeyDown,
      focusRef,
      ...props
    }: IGetTreeItemProps<Item> = {} as any
  ) => {
    requiredArguments(item, 'item', 'getTreeItemProps');
    // TODO: Throw error role is not treeitem?

    const expanded = nodeType === 'parent' ? isNodeExpanded(item) : undefined;

    return {
      role: role === null || role === undefined ? role : 'treeitem',
      item,
      focusRef,
      'aria-expanded': expanded,
      tabIndex: ownFocusedItem === item ? 0 : -1,
      'data-garden-container-version': PACKAGE_VERSION,
      onClick: composeEventHandlers(onClick, (e: MouseEvent) => {
        if (nodeType !== 'parent') {
          return;
        }
        e.preventDefault();
        toggleParent(item!);
      }),
      onFocus: composeEventHandlers(onFocus, (event: Event) => {
        event.stopPropagation();
        setFocusedItem(item);
      }),
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent): void => {
        const target = focusRef.current as HTMLElement;

        if (!SUPPORTED_KEYS.includes(event.keyCode) || hasModifierKeyPressed(event)) {
          return;
        }

        event.preventDefault();

        const handleRight = () =>
          nodeType === 'parent' && expanded ? handleArrowRight(target) : toggleParent(item);

        const handleLeft = () =>
          nodeType === 'parent' && expanded ? toggleParent(item) : handleArrowLeft(target);

        const direction = horizontal ? 'horizontal' : 'vertical';
        const shortcutMapping = {
          [KEY_CODES.UP]: {
            vertical: handleArrowUp,
            horizontal: rtl ? handleRight : handleLeft
          },
          [KEY_CODES.DOWN]: {
            vertical: handleArrowDown,
            horizontal: rtl ? handleArrowLeft : handleRight
          },
          [KEY_CODES.RIGHT]: {
            vertical: rtl ? handleLeft : handleRight,
            horizontal: handleArrowDown
          },
          [KEY_CODES.LEFT]: {
            vertical: rtl ? handleRight : handleLeft,
            horizontal: handleArrowUp
          },
          [KEY_CODES.HOME]: {
            vertical: handleHome,
            horizontal: handleHome
          },
          [KEY_CODES.END]: {
            vertical: handleEnd,
            horizontal: handleEnd
          }
        };

        const handler = shortcutMapping[event.keyCode][direction];
        if (handler) {
          handler(target);
        }
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
