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
  KEYS
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
  HandlerFunction,
  IGetNodeProps,
  IGetTreeProps,
  IShortcutMapping,
  IUseTreeviewProps,
  IUseTreeviewReturnValue,
  ShortcutMappingRecord
} from './types';

function requiredArguments(arg: any, argStr: string, methodName: string) {
  if (typeof arg === 'undefined' || arg === null) {
    throw new Error(
      `Accessibility Error: You must provide an "${argStr}" option to "${methodName}()"`
    );
  }
}

const hasModifierKeyPressed = (e: KeyboardEvent): boolean =>
  e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

const SUPPORTED_KEYS = [KEYS.ENTER, KEYS.HOME, KEYS.END, KEYS.UP, KEYS.DOWN, KEYS.RIGHT, KEYS.LEFT];

/**
 * Custom hook to manage a TreeView component.
 *
 * https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView
 */
export function useTreeview<Item = any>({
  openNodes,
  orientation = ContainerOrientation.VERTICAL,
  rtl,
  onChange = () => undefined,
  ...options
}: IUseTreeviewProps<Item> = {}): IUseTreeviewReturnValue<Item> {
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

  const getTreeProps = ({ label, role = 'tree', onFocus, ...props }: IGetTreeProps = {}) => {
    if (role !== 'tree') {
      throw new Error(
        `Accessibility Error: "role" prop must have value "tree" in "getTreeProps()"`
      );
    }

    return {
      role,
      'aria-label': label,
      'aria-orientation': orientation,
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
    requiredArguments(focusRef, 'focusRef', 'getNodeProps');

    if (role !== 'treeitem') {
      throw new Error(
        `Accessibility Error: "role" prop must have value "treeitem" in "getNodeProps()"`
      );
    }

    if (nodeType !== 'end' && nodeType !== 'parent') {
      throw new Error(
        `Accessibility Error: "nodeType" prop value must be either "parent" or "end" in "getNodeProps()"`
      );
    }

    const expanded = nodeType === 'parent' ? isNodeExpanded(item) : undefined;

    const onClickFn = composeEventHandlers(onClick, (e: MouseEvent) => {
      if (nodeType === 'parent') {
        e.preventDefault();
        toggleParent(item!);
      } else {
        e.stopPropagation();
      }
    });

    return {
      role,
      item,
      focusRef,
      'aria-expanded': expanded,
      tabIndex: ownFocusedItem === undefined || ownFocusedItem === item ? 0 : -1,
      'data-garden-container-version': PACKAGE_VERSION,
      onClick: onClickFn,
      onFocus: composeEventHandlers(onFocus, (event: Event) => {
        event.stopPropagation();
        setOwnFocusedItem(item);
      }),
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent): void => {
        const target = focusRef.current as HTMLElement;

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

          onClickFn(event);
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

        const shortcutMappingElement: IShortcutMapping = shortcutMapping[event.key];
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
    if (role !== 'group') {
      throw new Error(
        `Accessibility Error: "role" prop must have value "group" in "getGroupProps()"`
      );
    }

    return {
      role,
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
