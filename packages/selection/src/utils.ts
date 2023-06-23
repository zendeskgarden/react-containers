/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

type SelectionState<T> = {
  focusedValue?: T;
  selectedValue?: T;
};

type SelectionAction =
  | { type: 'FOCUS'; payload?: any }
  | { type: 'INCREMENT'; payload: any }
  | { type: 'DECREMENT'; payload: any }
  | { type: 'HOME'; payload: any }
  | { type: 'END'; payload: any }
  | { type: 'MOUSE_SELECT'; payload: any }
  | { type: 'KEYBOARD_SELECT'; payload: any }
  | { type: 'EXIT_WIDGET' };

export const stateReducer = <T>(state: SelectionState<T>, action: SelectionAction) => {
  switch (action.type) {
    case 'END':
    case 'HOME':
    case 'FOCUS':
    case 'INCREMENT':
    case 'DECREMENT': {
      return { ...state, focusedValue: action.payload };
    }

    case 'MOUSE_SELECT': {
      return {
        ...state,
        selectedValue: action.payload,
        focusedValue: undefined
      };
    }

    case 'KEYBOARD_SELECT': {
      return { ...state, selectedValue: action.payload };
    }

    case 'EXIT_WIDGET': {
      return { ...state, focusedValue: undefined };
    }

    default:
      return state;
  }
};
