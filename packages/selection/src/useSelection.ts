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

interface IUseSelectionPropGetters<Item> {
  getContainerProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getItemProps: <T extends IGetItemPropsOptions<Item>>(options: T, propGetterName?: string) => any;
}

export interface IUseSelectionState<Item> {
  focusedItem?: Item;
  selectedItem?: Item;
}

export interface IGetItemPropsOptions<Item> extends React.HTMLProps<any> {
  selectedAriaKey?: string;
  item: Item;
  focusRef: React.RefObject<any>;
  refKey?: string;
}

export type UseSelectionReturnValue<Item> = IUseSelectionState<Item> &
  IUseSelectionPropGetters<Item>;

export interface IUseSelectionProps<Item> {
  /** Determines the orientation of the selection */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Sets the initial focused item */
  defaultFocusedIndex?: number;
  /** Sets the initial selected item */
  defaultSelectedIndex?: number;
  /** Determines if selection uses right-to-left writing direction */
  rtl?: boolean;
  /** Sets the selected item in a controlled selection */
  selectedItem?: Item;
  /** Sets the focused item in a controlled selection */
  focusedItem?: Item;
  /** A callback function that receives the selected item */
  onSelect?: (selectedItem: Item) => void;
  /** A callback function that receives the focused item */
  onFocus?: (focusedItem?: Item) => void;
}

export type SELECTION_ACTION =
  | { type: 'FOCUS'; payload?: any }
  | {
      type: 'INCREMENT';
      payload: any;
    }
  | {
      type: 'DECREMENT';
      payload: any;
    }
  | { type: 'HOME'; payload: any }
  | { type: 'END'; payload: any }
  | {
      type: 'MOUSE_SELECT';
      payload: any;
    }
  | { type: 'KEYBOARD_SELECT'; payload: any }
  | { type: 'EXIT_WIDGET' };

function stateReducer(state: IUseSelectionState<any>, action: SELECTION_ACTION) {
  switch (action.type) {
    case 'END':
    case 'HOME':
    case 'FOCUS':
    case 'INCREMENT':
    case 'DECREMENT': {
      return { ...state, focusedItem: action.payload };
    }

    case 'MOUSE_SELECT': {
      return {
        ...state,
        selectedItem: action.payload,
        focusedItem: undefined
      };
    }
    case 'KEYBOARD_SELECT': {
      return { ...state, selectedItem: action.payload };
    }
    case 'EXIT_WIDGET': {
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
export function useSelection<Item = any>({
  direction = 'horizontal',
  defaultFocusedIndex = 0,
  defaultSelectedIndex,
  rtl,
  selectedItem,
  focusedItem,
  onSelect,
  onFocus
}: IUseSelectionProps<Item> = {}): UseSelectionReturnValue<Item> {
  const isSelectedItemControlled = selectedItem !== undefined;
  const isFocusedItemControlled = focusedItem !== undefined;
  const refs: React.MutableRefObject<any | null>[] = [];
  const items: Item[] = [];

  const [state, dispatch] = useReducer(stateReducer, {
    selectedItem,
    focusedItem
  });

  const controlledFocusedItem = getControlledValue(focusedItem, state.focusedItem);
  const controlledSelectedItem = getControlledValue(selectedItem, state.selectedItem);

  useEffect(() => {
    if (controlledFocusedItem !== undefined) {
      const focusedIndex = items.indexOf(controlledFocusedItem);

      refs[focusedIndex] && refs[focusedIndex].current!.focus();
    }
  }, [controlledFocusedItem]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedItem === undefined && defaultSelectedIndex !== undefined) {
      onSelect && onSelect(items[defaultSelectedIndex]);
      if (!isSelectedItemControlled) {
        dispatch({
          type: 'KEYBOARD_SELECT',
          payload: items[defaultSelectedIndex]
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getContainerProps = ({ role = 'listbox', ...other }: React.HTMLProps<any> = {}) =>
    ({
      role,
      'data-garden-container-id': 'containers.selection',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    } as any);

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
    }: IGetItemPropsOptions<Item> = {} as any,
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
    const verticalDirection = direction === 'vertical' || direction === 'both';
    const horizontalDirection = direction === 'horizontal' || direction === 'both';

    return {
      role,
      tabIndex,
      [selectedAriaKey]: selectedAriaKey ? isSelected : undefined,
      [refKey]: focusRef,
      onFocus: composeEventHandlers(onFocusCallback, () => {
        onFocus && onFocus(item);
        if (!isFocusedItemControlled) {
          dispatch({ type: 'FOCUS', payload: item });
        }
      }),
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        if (e.target.tabIndex === 0) {
          if (!isFocusedItemControlled) {
            dispatch({ type: 'EXIT_WIDGET' });
          }
          onFocus && onFocus();
        }
      },
      onClick: composeEventHandlers(onClick, () => {
        onSelect && onSelect(item);
        onFocus && onFocus();
        if (!isSelectedItemControlled) {
          dispatch({ type: 'MOUSE_SELECT', payload: item });
        }
      }),
      onKeyDown: composeEventHandlers(onKeyDown, (e: React.KeyboardEvent) => {
        let nextIndex: number;
        let currentIndex: number;

        if (isFocusedItemControlled) {
          currentIndex = items.indexOf(focusedItem as any);
        } else {
          currentIndex = items.indexOf(state.focusedItem || state.selectedItem);
        }

        const onIncrement = () => {
          nextIndex = currentIndex + 1;

          if (currentIndex === items.length - 1) {
            nextIndex = 0;
          }

          !isFocusedItemControlled && dispatch({ type: 'INCREMENT', payload: items[nextIndex] });

          onFocus && onFocus(items[nextIndex]);
        };

        const onDecrement = () => {
          nextIndex = currentIndex - 1;

          if (currentIndex === 0) {
            nextIndex = items.length - 1;
          }

          !isFocusedItemControlled && dispatch({ type: 'DECREMENT', payload: items[nextIndex] });

          onFocus && onFocus(items[nextIndex]);
        };

        if (
          (e.keyCode === KEY_CODES.UP && verticalDirection) ||
          (e.keyCode === KEY_CODES.LEFT && horizontalDirection)
        ) {
          if (rtl && !verticalDirection) {
            onIncrement();
          } else {
            onDecrement();
          }

          e.preventDefault();
        } else if (
          (e.keyCode === KEY_CODES.DOWN && verticalDirection) ||
          (e.keyCode === KEY_CODES.RIGHT && horizontalDirection)
        ) {
          if (rtl && !verticalDirection) {
            onDecrement();
          } else {
            onIncrement();
          }

          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.HOME) {
          if (!isFocusedItemControlled) {
            dispatch({ type: 'HOME', payload: items[0] });
          }
          onFocus && onFocus(items[0]);
          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.END) {
          if (!isFocusedItemControlled) {
            dispatch({ type: 'END', payload: items[items.length - 1] });
          }
          onFocus && onFocus(items[items.length - 1]);

          e.preventDefault();
        } else if (e.keyCode === KEY_CODES.SPACE || e.keyCode === KEY_CODES.ENTER) {
          onSelect && onSelect(item);
          if (!isSelectedItemControlled) {
            dispatch({
              type: 'KEYBOARD_SELECT',
              payload: item
            });
          }
          e.preventDefault();
        }
      }),
      ...other
    } as any;
  };

  return {
    focusedItem: controlledFocusedItem,
    selectedItem: controlledSelectedItem,
    getItemProps,
    getContainerProps
  };
}
