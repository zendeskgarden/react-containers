/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';
import {
  composeEventHandlers,
  ContainerOrientation,
  getControlledValue,
  KEY_CODES
} from '@zendeskgarden/container-utilities';
import { useSelection } from '@zendeskgarden/container-selection';

import {
  handleArrowDown,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleEnd,
  handleHome
} from './keyboardInteractions';
import {
  IGetNodeProps,
  IGetTreeProps,
  IShortcutMapping,
  IUseTreeviewProps,
  IUseTreeviewReturnValue
} from './types';
import { HandlerFunction } from './utils';

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
  KEY_CODES.ENTER,
  KEY_CODES.HOME,
  KEY_CODES.END,
  KEY_CODES.UP,
  KEY_CODES.DOWN,
  KEY_CODES.RIGHT,
  KEY_CODES.LEFT
];

/**
 * Custom hook to manage a TreeView component.
 *
 * https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView
 *
 */
export function useTreeview<Item = any>({
  openNodes,
  orientation = ContainerOrientation.HORIZONTAL,
  rtl,
  onChange = () => undefined,
  ...options
}: IUseTreeviewProps<Item> = {}): IUseTreeviewReturnValue<Item> {
  const [ownFocusedItem, setFocusedItem] = useState<Item>();
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection<Item>({
    direction: orientation,
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

  const getTreeProps = ({
    label,
    labelledBy,
    role = 'tree',
    onFocus,
    ...props
  }: IGetTreeProps = {}) => {
    // TODO: Throw error if no label or labelledBy?
    // TODO: Throw error role is not tree?

    return {
      role: role === null || role === undefined ? role : 'tree',
      'aria-label': label,
      'aria-labelledby': labelledBy,
      'data-garden-container-id': 'containers.treeview',
      'data-garden-container-version': PACKAGE_VERSION,
      onFocus,
      ...props
    };
  };

  const getNodeProps = (
    {
      item,
      role = 'treeitem',
      nodeType = 'end',
      onClick,
      onFocus,
      onKeyDown,
      focusRef,
      ...props
    }: IGetNodeProps<Item> = {} as any
  ) => {
    requiredArguments(item, 'item', 'getNodeProps');

    const expanded = nodeType === 'parent' ? isNodeExpanded(item) : undefined;

    const onClickFn = composeEventHandlers(onClick, (e: MouseEvent) => {
      if (nodeType !== 'parent') {
        return;
      }
      e.preventDefault();
      toggleParent(item!);
    });

    return {
      role: role === null || role === undefined ? role : 'treeitem',
      item,
      focusRef,
      'aria-expanded': expanded,
      tabIndex: ownFocusedItem === undefined || ownFocusedItem === item ? 0 : -1,
      'data-garden-container-version': PACKAGE_VERSION,
      onClick: onClickFn,
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

        const handleRight: HandlerFunction = () =>
          nodeType === 'parent' && expanded ? handleArrowRight(target) : toggleParent(item);

        const handleLeft: HandlerFunction = () =>
          nodeType === 'parent' && expanded ? toggleParent(item) : handleArrowLeft(target);

        const handleEnter: HandlerFunction = () => {
          if (nodeType === 'parent') {
            toggleParent(item);
          }

          onClickFn(event);
        };

        const shortcutMapping = {
          [KEY_CODES.UP]: {
            vertical: handleArrowUp,
            horizontal: rtl ? handleRight : handleLeft
          },
          [KEY_CODES.DOWN]: {
            vertical: handleArrowDown,
            horizontal: rtl ? handleLeft : handleRight
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
          },
          [KEY_CODES.ENTER]: {
            vertical: handleEnter,
            horizontal: handleEnter
          }
        };

        const shortcutMappingElement: IShortcutMapping = shortcutMapping[event.keyCode];
        const handler: HandlerFunction =
          orientation === ContainerOrientation.VERTICAL
            ? shortcutMappingElement.vertical
            : shortcutMappingElement.horizontal;

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
    getNodeProps: props => getItemProps(getNodeProps(props) as any),
    getGroupProps
  };
}
