/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useReducer, useEffect, createRef } from 'react';

import useControlledState from './useControlled';
import composeEventHandlers from './utils/composeEventHandlers';
import KEY_CODES from './utils/KEY_CODES';
import DIRECTION from './utils/DIRECTIONS';
import ACTIONS from './utils/ACTIONS';

function stateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FOCUS:
      return { ...state, focusedIndex: action.payload };
    case ACTIONS.INCREMENT: {
      const currentIndex =
        state.focusedIndex === undefined ? state.selectedIndex : state.focusedIndex;

      return { ...state, focusedIndex: (currentIndex + 1) % action.payload };
    }
    case ACTIONS.DECREMENT: {
      const currentIndex =
        state.focusedIndex === undefined ? state.selectedIndex : state.focusedIndex;

      return {
        ...state,
        focusedIndex: (currentIndex + action.payload - 1) % action.payload
      };
    }
    case ACTIONS.HOME:
      return { ...state, focusedIndex: 0 };
    case ACTIONS.END:
      return { ...state, focusedIndex: action.payload - 1 };
    case ACTIONS.MOUSE_SELECT:
      return {
        ...state,
        selectedIndex: action.payload,
        focusedIndex: undefined
      };
    case ACTIONS.KEYBOARD_SELECT:
      return { ...state, selectedIndex: action.payload };
    case ACTIONS.EXIT_WIDGET:
      return { ...state, focusedIndex: undefined };
    default:
      return state;
  }
}

function useSelection({
  defaultFocusedIndex,
  direction = DIRECTION.HORIZONTAL,
  selectedIndex,
  focusedIndex,
  onStateChange,
  defaultRefKey = 'ref'
} = {}) {
  const [state, dispatch] = useReducer(stateReducer, {
    focusedIndex: focusedIndex || defaultFocusedIndex,
    selectedIndex: selectedIndex
  });

  const refs = [];
  let numItems = 0;

  useEffect(
    () => {
      if (state.focusedIndex !== undefined) {
        refs[state.focusedIndex] && refs[state.focusedIndex].current.focus();
      }
    },
    [state.focusedIndex]
  );

  const getContainerProps = ({ role = 'listbox', ...other } = {}) => ({
    role,
    ...other
  });

  const getItemProps = ({
    key,
    refKey = defaultRefKey,
    selectedAriaKey = 'aria-selected',
    role = 'option',
    onFocus,
    onKeyDown,
    onClick,
    ...other
  } = {}) => {
    if (typeof key === 'undefined') {
      throw new Error(
        '"key" must be defined within getItemProps regardless of being used within a .map()'
      );
    }

    const currentIndex = numItems;
    const isFocused =
      state.focusedIndex === undefined
        ? currentIndex === state.selectedIndex
        : currentIndex === state.focusedIndex;
    const isSelected = currentIndex === state.selectedIndex;

    let tabIndex = -1;

    if (!isFocused && !isSelected) {
      if (currentIndex === defaultFocusedIndex) {
        tabIndex = 0;
      } else if (defaultFocusedIndex === undefined && currentIndex === 0) {
        tabIndex = 0;
      } else if (defaultFocusedIndex === -1) {
        // Figure out when it's the last child and set tabIndex to 0 for that
      }
    } else {
      tabIndex = isFocused ? 0 : -1;
    }

    refs[currentIndex] = createRef(null);

    numItems++;

    return {
      role,
      tabIndex,
      [refKey]: refs[currentIndex],
      [selectedAriaKey]: isSelected,
      onFocus: composeEventHandlers(onFocus, () => {
        dispatch({ type: ACTIONS.FOCUS, payload: currentIndex });
      }),
      onBlur: e => {
        if (e.target.tabIndex === 0) {
          dispatch({ type: ACTIONS.EXIT_WIDGET });
        }
      },
      onClick: composeEventHandlers(onClick, () => {
        dispatch({ type: ACTIONS.MOUSE_SELECT, payload: currentIndex });
      }),
      onKeyDown: composeEventHandlers(onKeyDown, e => {
        if (
          (e.keyCode === KEY_CODES.UP && direction === DIRECTION.VERTICAL) ||
          (e.keyCode === KEY_CODES.LEFT && direction === DIRECTION.HORIZONTAL)
        ) {
          dispatch({ type: ACTIONS.DECREMENT, payload: numItems });
          e.preventDefault();
        } else if (
          (e.keyCode === KEY_CODES.DOWN && direction === DIRECTION.VERTICAL) ||
          (e.keyCode === KEY_CODES.RIGHT && direction === DIRECTION.HORIZONTAL)
        ) {
          dispatch({ type: ACTIONS.INCREMENT, payload: numItems });
          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.HOME) {
          dispatch({ type: ACTIONS.HOME });
          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.END) {
          dispatch({ type: ACTIONS.END, payload: numItems });
          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.SPACE || e.keyCode === KEY_CODES.ENTER) {
          dispatch({
            type: ACTIONS.KEYBOARD_SELECT,
            payload: currentIndex
          });
          e.preventDefault();
        }
      }),
      ...other
    };
  };

  return {
    focusedIndex: state.focusedIndex,
    selectedIndex: state.selectedIndex,
    getItemProps,
    getContainerProps
  };
}

export default useSelection;
