/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { FocusEventHandler, KeyboardEvent, KeyboardEventHandler, useState } from 'react';
import {
  composeEventHandlers,
  ContainerOrientation,
  getControlledValue,
  KEYS
} from '@zendeskgarden/container-utilities';
import { useSelection } from '@zendeskgarden/container-selection';
import {
  handleArrowDown,
  handleArrowLeft,
  handleArrowRight,
  handleArrowUp,
  handleEnd,
  handleHome,
  HandlerFunction
} from './keyboardInteractions';
import { IUseTreeviewProps, IUseTreeviewReturnValue } from './types';

interface IShortcutMapping {
  horizontal: HandlerFunction;
  vertical: HandlerFunction;
}

type ShortcutMappingRecord = Record<string, IShortcutMapping>;

const hasModifierKeyPressed = (e: KeyboardEvent): boolean =>
  e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

const SUPPORTED_KEYS = [KEYS.ENTER, KEYS.HOME, KEYS.END, KEYS.UP, KEYS.DOWN, KEYS.RIGHT, KEYS.LEFT];

export const useTreeview = <Item>({
  openNodes,
  orientation = ContainerOrientation.VERTICAL,
  rtl,
  onChange = () => undefined,
  ...options
}: IUseTreeviewProps<Item> = {}): IUseTreeviewReturnValue<Item> => {
  const [ownFocusedItem, setOwnFocusedItem] = useState<Item>();
  const { selectedItem, focusedItem, getContainerProps, getItemProps } = useSelection<Item>({
    direction: orientation,
    focusedItem: ownFocusedItem,
    ...options
  });
  const [openNodesState, setOpenNodesState] = useState<Item[]>([]);
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
      setOpenNodesState(newValue);
    }
  };

  const getTreeProps: IUseTreeviewReturnValue<Item>['getTreeProps'] = ({
    role = 'tree',
    ...other
  }) => ({
    ...getContainerProps(other),
    role: role === null ? undefined : role,
    'aria-orientation': orientation,
    'data-garden-container-id': 'containers.treeview',
    'data-garden-container-version': PACKAGE_VERSION
  });

  const getNodeProps: IUseTreeviewReturnValue<Item>['getNodeProps'] = ({
    item,
    role = 'treeitem',
    nodeType = 'end',
    onClick,
    onFocus,
    onKeyDown,
    focusRef,
    ...other
  }) => {
    const expanded = nodeType === 'parent' ? isNodeExpanded(item) : undefined;

    const handleClick = composeEventHandlers(onClick, (event: MouseEvent) => {
      if (nodeType === 'parent') {
        event.preventDefault();
        toggleParent(item!);
      } else {
        event.stopPropagation();
      }
    });

    const handleFocus: FocusEventHandler = event => {
      event.stopPropagation();
      setOwnFocusedItem(item);
    };

    const handleKeyDown: KeyboardEventHandler = event => {
      const target = focusRef.current as unknown as HTMLElement;

      if (!SUPPORTED_KEYS.includes(event.key) || hasModifierKeyPressed(event)) {
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

        handleClick(event);
      };

      const shortcutMapping: ShortcutMappingRecord = {
        [KEYS.UP]: {
          vertical: handleArrowUp,
          horizontal: handleLeft
        },
        [KEYS.DOWN]: {
          vertical: handleArrowDown,
          horizontal: handleRight
        },
        [KEYS.RIGHT]: {
          vertical: rtl ? handleLeft : handleRight,
          horizontal: rtl ? handleArrowUp : handleArrowDown
        },
        [KEYS.LEFT]: {
          vertical: rtl ? handleRight : handleLeft,
          horizontal: rtl ? handleArrowDown : handleArrowUp
        },
        [KEYS.HOME]: {
          vertical: handleHome,
          horizontal: handleHome
        },
        [KEYS.END]: {
          vertical: handleEnd,
          horizontal: handleEnd
        },
        [KEYS.ENTER]: {
          vertical: handleEnter,
          horizontal: handleEnter
        }
      };

      const shortcutMappingElement = shortcutMapping[event.key];
      const handler =
        orientation === ContainerOrientation.VERTICAL
          ? shortcutMappingElement.vertical
          : shortcutMappingElement.horizontal;

      if (handler) {
        handler(target);
      }
    };

    return {
      ...getItemProps({
        item,
        focusRef,
        onClick: handleClick,
        onFocus: composeEventHandlers(onFocus, handleFocus),
        onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
        ...other
      }),
      role: role === null ? undefined : role,
      'aria-expanded': expanded,
      tabIndex: ownFocusedItem === undefined || ownFocusedItem === item ? 0 : -1,
      'data-garden-container-version': PACKAGE_VERSION
    };
  };

  const getGroupProps: IUseTreeviewReturnValue<Item>['getGroupProps'] = ({
    role = 'group',
    ...props
  } = {}) => ({
    role: role === null ? undefined : role,
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    selectedItem,
    focusedItem,
    openNodes: Array.from(openNodesState),
    getTreeProps,
    getNodeProps,
    getGroupProps
  };
};
