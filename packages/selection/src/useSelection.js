/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useEffect, useReducer } from 'react';

import {
  composeEventHandlers,
  getControlledValue,
  KEY_CODES
} from '@zendeskgarden/container-utilities';
import { DIRECTIONS } from './utils/DIRECTIONS';
import { ACTIONS } from './utils/ACTIONS';

function stateReducer(state, action, { focusedItem, selectedItem, onFocus, onSelect }) {
  const controlledFocusedItem = getControlledValue(focusedItem, state.focusedItem);
  const controlledSelectedItem = getControlledValue(selectedItem, state.selectedItem);
  const currentItemIndex =
    controlledFocusedItem === undefined
      ? action.items.indexOf(controlledSelectedItem)
      : action.items.indexOf(controlledFocusedItem);

  switch (action.type) {
    case ACTIONS.FOCUS: {
      if (onFocus) {
        onFocus(action.payload);

        return state;
      }

      return { ...state, focusedItem: action.payload };
    }
    case ACTIONS.INCREMENT: {
      const newFocusedItem = action.items[(currentItemIndex + 1) % action.items.length];

      if (onFocus) {
        onFocus(newFocusedItem);

        return state;
      }

      return { ...state, focusedItem: newFocusedItem };
    }
    case ACTIONS.DECREMENT: {
      const newFocusedItem =
        action.items[(currentItemIndex + action.items.length - 1) % action.items.length];

      if (onFocus) {
        onFocus(newFocusedItem);

        return state;
      }

      return { ...state, focusedItem: newFocusedItem };
    }
    case ACTIONS.HOME: {
      if (onFocus) {
        onFocus(action.items[0]);

        return state;
      }

      return { ...state, focusedItem: action.items[0] };
    }
    case ACTIONS.END: {
      if (onFocus) {
        onFocus(action.items[action.items.length - 1]);

        return state;
      }

      return { ...state, focusedItem: action.items[action.items.length - 1] };
    }
    case ACTIONS.MOUSE_SELECT: {
      let isSelectControlled = false;
      let isFocusControlled = false;

      if (onSelect) {
        onSelect(action.payload);
        isSelectControlled = true;
      }

      if (onFocus) {
        onFocus(undefined);
        isFocusControlled = true;
      }

      if (isFocusControlled && isSelectControlled) {
        return state;
      }

      const updatedState = { ...state };

      if (!isSelectControlled) {
        updatedState.selectedItem = action.payload;
      }

      if (!isFocusControlled) {
        updatedState.focusedItem = undefined;
      }

      return updatedState;
    }
    case ACTIONS.KEYBOARD_SELECT: {
      if (onSelect) {
        onSelect(action.payload);

        return { ...state };
      }

      return { ...state, selectedItem: action.payload };
    }
    case ACTIONS.EXIT_WIDGET: {
      if (onFocus) {
        onFocus(undefined);

        return state;
      }

      return { ...state, focusedItem: undefined };
    }
    default:
      return state;
  }
}

/**
 * Custom hook to manage selection using the Roving Tab Index strategy
 *
 * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
 */
export function useSelection({
  direction = DIRECTIONS.HORIZONTAL,
  defaultFocusedIndex = 0,
  rtl,
  selectedItem,
  focusedItem,
  onSelect,
  onFocus
} = {}) {
  const refs = [];
  const items = [];

  const [state, dispatch] = useReducer(
    (reducerState, action) =>
      stateReducer(reducerState, action, { onSelect, onFocus, selectedItem, focusedItem }),
    { selectedItem, focusedItem }
  );

  const controlledFocusedItem = getControlledValue(focusedItem, state.focusedItem);
  const controlledSelectedItem = getControlledValue(selectedItem, state.selectedItem);

  useEffect(() => {
    if (controlledFocusedItem !== undefined) {
      const focusedIndex = items.indexOf(controlledFocusedItem);

      refs[focusedIndex] && refs[focusedIndex].current.focus();
    }
  }, [controlledFocusedItem, items, refs]);

  const getContainerProps = ({ role = 'listbox', ...other } = {}) => ({
    role,
    'aria-orientation': direction === DIRECTIONS.BOTH ? undefined : direction,
    ...other
  });

  const getItemProps = (
    {
      selectedAriaKey = 'aria-selected',
      role = 'option',
      onFocus: onFocusCallback,
      onKeyDown,
      onClick,
      item,
      focusRef,
      refKey = 'ref',
      ...other
    } = {},
    propGetterName = 'getItemProps'
  ) => {
    if (item === undefined) {
      throw new Error(
        `Accessibility Error: You must provide an "item" option to "${propGetterName}()"`
      );
    }

    if (focusRef === undefined) {
      throw new Error(
        `Accessibility Error: You must provide a "focusRef" option to "${propGetterName}()"`
      );
    }

    refs.push(focusRef);
    items.push(item);

    const isSelected = controlledSelectedItem === item;
    const isFocused =
      controlledFocusedItem === undefined ? isSelected : controlledFocusedItem === item;
    const tabIndex =
      isFocused ||
      (controlledSelectedItem === undefined &&
        controlledFocusedItem === undefined &&
        items.indexOf(item) === defaultFocusedIndex)
        ? 0
        : -1;
    const verticalDirection = direction === DIRECTIONS.VERTICAL || direction === DIRECTIONS.BOTH;
    const horizontalDirection =
      direction === DIRECTIONS.HORIZONTAL || direction === DIRECTIONS.BOTH;

    return {
      role,
      tabIndex,
      [selectedAriaKey]: isSelected,
      [refKey]: focusRef,
      onFocus: composeEventHandlers(onFocusCallback, () => {
        dispatch({ type: ACTIONS.FOCUS, payload: item, items });
      }),
      onBlur: e => {
        if (e.target.tabIndex === 0) {
          dispatch({ type: ACTIONS.EXIT_WIDGET, items });
        }
      },
      onClick: composeEventHandlers(onClick, () => {
        dispatch({ type: ACTIONS.MOUSE_SELECT, payload: item, items });
      }),
      onKeyDown: composeEventHandlers(onKeyDown, e => {
        if (
          (e.keyCode === KEY_CODES.UP && verticalDirection) ||
          (e.keyCode === KEY_CODES.LEFT && horizontalDirection)
        ) {
          if (rtl) {
            dispatch({ type: ACTIONS.INCREMENT, items });
          } else {
            dispatch({ type: ACTIONS.DECREMENT, items });
          }

          e.preventDefault();
        } else if (
          (e.keyCode === KEY_CODES.DOWN && verticalDirection) ||
          (e.keyCode === KEY_CODES.RIGHT && horizontalDirection)
        ) {
          if (rtl) {
            dispatch({ type: ACTIONS.DECREMENT, items });
          } else {
            dispatch({ type: ACTIONS.INCREMENT, items });
          }

          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.HOME) {
          dispatch({ type: ACTIONS.HOME, items });
          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.END) {
          dispatch({ type: ACTIONS.END, items });
          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.SPACE || e.keyCode === KEY_CODES.ENTER) {
          dispatch({
            type: ACTIONS.KEYBOARD_SELECT,
            payload: item,
            items
          });
          e.preventDefault();
        }
      }),
      ...other
    };
  };

  return {
    focusedItem: controlledFocusedItem,
    selectedItem: controlledSelectedItem,
    getItemProps,
    getContainerProps
  };
}
