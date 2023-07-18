/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { Reducer } from 'react';
import { KEYS } from '@zendeskgarden/container-utilities';
import { MenuItem, IMenuItemBase, MenuItemSeparator, ISelectedItem, ItemValue } from './types';

export const StateChangeTypes: Record<string, string> = {
  TriggerClick: 'trigger:click',
  TriggerKeyDownArrowDown: `trigger:keyDown:${KEYS.DOWN}`,
  TriggerKeyDownArrowUp: `trigger:keyDown:${KEYS.UP}`,
  MenuKeyDownEscape: `menu:keyDown:${KEYS.ESCAPE}`,
  MenuKeyDownTab: `menu:keyDown:${KEYS.TAB}`,
  MenuBlur: 'menu:blur',
  MenuMouseLeave: 'menu:mouseLeave',
  MenuItemClick: 'menuItem:click',
  MenuItemMouseMove: `menuItem:mouseMove`,
  MenuItemKeyDown: 'menuItem:keyDown',
  MenuItemKeyDownEnter: `menuItem:keyDown:${KEYS.ENTER}`,
  MenuItemKeyDownSpace: `menuItem:keyDown:Space`,
  MenuItemKeyDownArrowLeft: `menuItem:keyDown:${KEYS.LEFT}`,
  MenuItemKeyDownArrowRight: `menuItem:keyDown:${KEYS.RIGHT}`,
  MenuItemKeyDownArrowUp: `menuItem:keyDown:${KEYS.UP}`,
  MenuItemKeyDownArrowDown: `menuItem:keyDown:${KEYS.DOWN}`,
  MenuItemKeyDownHome: `menuItem:keyDown:${KEYS.HOME}`,
  MenuItemKeyDownEnd: `menuItem:keyDown:${KEYS.END}`
};

export const isValidItem = (item: MenuItem) =>
  !(item as IMenuItemBase).disabled &&
  !(item as MenuItemSeparator).separator &&
  !Object.hasOwn(item, 'items');

export const isItemGroup = (item: MenuItem) => Object.hasOwn(item, 'items');

export const toMenuItemKeyDownType = (type: string): keyof typeof StateChangeTypes =>
  `MenuItemKeyDown${type === KEYS.SPACE ? 'Space' : type}`;

type ReducerState = {
  focusOnOpen: boolean;
  focusedValue?: ItemValue;
  selectedItems?: ISelectedItem[];
  isExpanded?: boolean;
};

type ReducerAction = {
  type: string;
  payload: Record<string, any>;
};

export const stateReducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  let changes: ReducerState | null = null;

  // Reset `focusOnOpen` if it was previously set to true; this prevents
  // forced focus on the initial item in future state updates.
  if (state.focusOnOpen) {
    changes = { ...state, focusOnOpen: false };
  }

  switch (action.type) {
    case StateChangeTypes.MenuBlur:
    case StateChangeTypes.MenuKeyDownEscape:
    case StateChangeTypes.MenuKeyDownTab:
    case StateChangeTypes.TriggerClick:
    case StateChangeTypes.TriggerKeyDownArrowDown:
    case StateChangeTypes.TriggerKeyDownArrowUp: {
      const { focusOnOpen, focusedValue, isExpanded } = action.payload;

      if (isExpanded !== undefined || focusOnOpen !== undefined || focusedValue !== undefined) {
        changes = {
          ...(changes || state),
          ...(isExpanded === undefined ? {} : { isExpanded }),
          ...(focusedValue === undefined ? {} : { focusedValue }),
          ...(focusOnOpen === undefined ? {} : { focusOnOpen })
        };
      }

      break;
    }

    case StateChangeTypes.MenuItemClick:
    case StateChangeTypes.MenuItemKeyDownSpace:
    case StateChangeTypes.MenuItemKeyDownEnter: {
      const { selectedItems, isExpanded } = action.payload;

      if (isExpanded !== undefined || selectedItems !== undefined) {
        changes = {
          ...(changes || state),
          ...(isExpanded === undefined ? {} : { isExpanded }),
          ...(selectedItems === undefined ? {} : { selectedItems })
        };
      }

      break;
    }

    case StateChangeTypes.MenuItemKeyDownArrowLeft:
    case StateChangeTypes.MenuItemKeyDownArrowRight:
    case StateChangeTypes.MenuItemKeyDownArrowUp:
    case StateChangeTypes.MenuItemKeyDownArrowDown:
    case StateChangeTypes.MenuItemKeyDownHome:
    case StateChangeTypes.MenuItemKeyDownEnd:
    case StateChangeTypes.MenuItemKeyDown:
    case StateChangeTypes.MenuMouseLeave:
    case StateChangeTypes.MenuItemMouseMove: {
      const { focusedValue } = action.payload;

      if (focusedValue !== undefined) {
        changes = { ...(changes || state), focusedValue };
      }

      break;
    }

    default: {
      throw new Error('Error: unexpected menu action provided: ', action.type as ErrorOptions);
    }
  }

  return changes || state;
};
