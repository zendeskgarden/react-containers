/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { Reducer } from 'react';
import { KEYS } from '@zendeskgarden/container-utilities';
import { MenuItem, IMenuItemBase, IMenuItemSeparator, ISelectedItem } from './types';

export const StateChangeTypes: Record<string, string> = {
  TriggerClick: 'trigger:click',
  TriggerKeyDownEnter: `trigger:keyDown:${KEYS.ENTER}`,
  TriggerKeyDownSpace: `trigger:keyDown:Space`,
  TriggerKeyDownArrowDown: `trigger:keyDown:${KEYS.DOWN}`,
  TriggerKeyDownArrowUp: `trigger:keyDown:${KEYS.UP}`,
  MenuKeyDownEscape: `menu:keyDown:${KEYS.ESCAPE}`,
  MenuKeyDownTab: `menu:keyDown:${KEYS.TAB}`,
  MenuBlur: 'menu:blur',
  MenuMouseLeave: 'menu:mouseLeave',
  MenuItemClick: 'menuItem:click',
  MenuItemClickPrevious: `menuItem:click:previous`,
  MenuItemClickNext: `menuItem:click:next`,
  MenuItemMouseMove: `menuItem:mouseMove`,
  MenuItemKeyDown: 'menuItem:keyDown',
  MenuItemKeyDownPrevious: `menuItem:keyDown:previous`,
  MenuItemKeyDownNext: `menuItem:keyDown:next`,
  MenuItemKeyDownEnter: `menuItem:keyDown:${KEYS.ENTER}`,
  MenuItemKeyDownSpace: `menuItem:keyDown:Space`,
  MenuItemKeyDownArrowUp: `menuItem:keyDown:${KEYS.UP}`,
  MenuItemKeyDownArrowDown: `menuItem:keyDown:${KEYS.DOWN}`,
  MenuItemKeyDownHome: `menuItem:keyDown:${KEYS.HOME}`,
  MenuItemKeyDownEnd: `menuItem:keyDown:${KEYS.END}`
};

export const isItemGroup = (item: MenuItem) => Object.hasOwn(item, 'items');

export const isValidItem = (item: MenuItem) =>
  !(item as IMenuItemBase).disabled &&
  !(item as IMenuItemSeparator).separator &&
  !isItemGroup(item);

export const toMenuItemKeyDownType = (type: string): keyof typeof StateChangeTypes =>
  `MenuItemKeyDown${type === KEYS.SPACE ? 'Space' : type}`;

type ReducerState = {
  focusOnOpen: boolean;
  focusedValue?: string | null;
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
    case StateChangeTypes.TriggerKeyDownEnter:
    case StateChangeTypes.TriggerKeyDownSpace:
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
    case StateChangeTypes.MenuItemClickNext:
    case StateChangeTypes.MenuItemClickPrevious:
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

    case StateChangeTypes.MenuItemKeyDownArrowUp:
    case StateChangeTypes.MenuItemKeyDownArrowDown:
    case StateChangeTypes.MenuItemKeyDownNext:
    case StateChangeTypes.MenuItemKeyDownPrevious:
    case StateChangeTypes.MenuItemKeyDownHome:
    case StateChangeTypes.MenuItemKeyDownEnd:
    case StateChangeTypes.MenuItemKeyDown:
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
