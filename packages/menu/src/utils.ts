/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { Reducer } from 'react';
import { KEYS } from '@zendeskgarden/container-utilities';
import {
  MenuItem,
  IMenuItemBase,
  IMenuItemSeparator,
  ISelectedItem,
  IMenuItemGroup
} from './types';

export const triggerLink = (element: HTMLAnchorElement, view: Window) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view
  });

  element.dispatchEvent(event);
};

export const StateChangeTypes: Record<string, string> = {
  FnSetStateRefs: 'fn:setStateRefs',
  FnMenuTransitionFinish: 'fn:menuTransitionFinish',
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

export const isItemGroup = (item: MenuItem): item is IMenuItemGroup => Object.hasOwn(item, 'items');

export const isValidItem = (item: MenuItem): item is IMenuItemBase =>
  !(item as IMenuItemBase).disabled &&
  !(item as IMenuItemSeparator).separator &&
  !isItemGroup(item);

export const toMenuItemKeyDownType = (type: string): keyof typeof StateChangeTypes =>
  `MenuItemKeyDown${type === KEYS.SPACE ? 'Space' : type}`;

const getStateChanges = (changes: Record<string, any>): Record<string, any> | null => {
  let retVal = null;

  for (const change in changes) {
    if (changes[change] === undefined) continue;

    retVal ||= {} as Record<string, any>;
    retVal[change] = changes[change];
  }

  return retVal;
};

type ReducerState = {
  /** Nested menu transition state */
  focusOnOpen: boolean;
  isTransitionNext: boolean;
  isTransitionPrevious: boolean;
  transitionType: string | null;
  nestedPathIds: string[];
  valuesRef: string[];

  /** Uncontrolled state */
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
      const stateChanges = getStateChanges({ focusOnOpen, focusedValue, isExpanded });

      if (stateChanges) {
        changes = {
          ...(changes || state),
          ...stateChanges
        };
      }

      break;
    }

    case StateChangeTypes.MenuItemClick:
    case StateChangeTypes.MenuItemClickNext:
    case StateChangeTypes.MenuItemClickPrevious:
    case StateChangeTypes.MenuItemKeyDownSpace:
    case StateChangeTypes.MenuItemKeyDownEnter: {
      const {
        selectedItems,
        isExpanded,
        nestedPathIds,
        transitionType,
        isTransitionNext,
        isTransitionPrevious
      } = action.payload;
      const stateChanges = getStateChanges({
        selectedItems,
        isExpanded,
        nestedPathIds,
        transitionType,
        isTransitionNext,
        isTransitionPrevious
      });

      if (stateChanges) {
        changes = {
          ...(changes || state),
          ...stateChanges
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
      const {
        focusedValue,
        nestedPathIds,
        transitionType,
        isTransitionNext,
        isTransitionPrevious
      } = action.payload;
      const stateChanges = getStateChanges({
        focusedValue,
        nestedPathIds,
        transitionType,
        isTransitionNext,
        isTransitionPrevious
      });

      if (stateChanges) {
        changes = {
          ...(changes || state),
          ...stateChanges
        };
      }

      break;
    }

    case StateChangeTypes.FnMenuTransitionFinish: {
      const { focusOnOpen, focusedValue, nestedPathIds, valuesRef } = action.payload;
      const stateChanges = getStateChanges({ focusOnOpen, focusedValue, nestedPathIds, valuesRef });

      if (stateChanges) {
        changes = {
          ...(changes || state),
          ...stateChanges,
          transitionType: null,
          isTransitionNext: false,
          isTransitionPrevious: false
        };
      }

      break;
    }

    case StateChangeTypes.FnSetStateRefs: {
      const { ...props } = action.payload;

      changes = { ...(changes || state), ...props };

      break;
    }

    default: {
      throw new Error('Error: unexpected menu action provided: ', action.type as ErrorOptions);
    }
  }

  return changes || state;
};
