/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { FocusEventHandler, KeyboardEventHandler, useEffect, useReducer } from 'react';
import {
  composeEventHandlers,
  getControlledValue,
  KEY_CODES
} from '@zendeskgarden/container-utilities';
import { IUseSelectionProps, IUseSelectionReturnValue } from './types';
import { stateReducer } from './utils';

/**
 * Custom hook to manage selection using the Roving Tab Index strategy
 *
 * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
 */
export function useSelection<Item>({
  direction = 'horizontal',
  defaultFocusedIndex = 0,
  defaultSelectedIndex,
  rtl,
  selectedItem,
  focusedItem,
  onSelect,
  onFocus
}: IUseSelectionProps<Item> = {}): IUseSelectionReturnValue<Item> {
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

  const getContainerProps: IUseSelectionReturnValue<Item>['getContainerProps'] = ({
    role = 'listbox',
    ...other
  } = {}) => ({
    role: role === null ? undefined : role,
    'data-garden-container-id': 'containers.selection',
    'data-garden-container-version': PACKAGE_VERSION,
    ...other
  });

  const getItemProps: IUseSelectionReturnValue<Item>['getItemProps'] = (
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
    },
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

    const handleFocus = () => {
      onFocus && onFocus(item);

      if (!isFocusedItemControlled) {
        dispatch({ type: 'FOCUS', payload: item });
      }
    };

    const handleClick = () => {
      onSelect && onSelect(item);
      onFocus && onFocus();

      if (!isSelectedItemControlled) {
        dispatch({ type: 'MOUSE_SELECT', payload: item });
      }
    };

    const handleKeyDown: KeyboardEventHandler = event => {
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

      const hasModifierKeyPressed =
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;

      if (!hasModifierKeyPressed) {
        if (
          (event.keyCode === KEY_CODES.UP && verticalDirection) ||
          (event.keyCode === KEY_CODES.LEFT && horizontalDirection)
        ) {
          if (rtl && horizontalDirection) {
            onIncrement();
          } else {
            onDecrement();
          }

          event.preventDefault();
        } else if (
          (event.keyCode === KEY_CODES.DOWN && verticalDirection) ||
          (event.keyCode === KEY_CODES.RIGHT && horizontalDirection)
        ) {
          if (rtl && horizontalDirection) {
            onDecrement();
          } else {
            onIncrement();
          }

          event.preventDefault();
        } else if (event.keyCode === KEY_CODES.HOME) {
          if (!isFocusedItemControlled) {
            dispatch({ type: 'HOME', payload: items[0] });
          }

          onFocus && onFocus(items[0]);
          event.preventDefault();
        } else if (event.keyCode === KEY_CODES.END) {
          if (!isFocusedItemControlled) {
            dispatch({ type: 'END', payload: items[items.length - 1] });
          }

          onFocus && onFocus(items[items.length - 1]);
          event.preventDefault();
        } else if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.ENTER) {
          onSelect && onSelect(item);

          if (!isSelectedItemControlled) {
            dispatch({
              type: 'KEYBOARD_SELECT',
              payload: item
            });
          }

          event.preventDefault();
        }
      }
    };

    const onBlur: FocusEventHandler = event => {
      if ((event.target as HTMLElement).tabIndex === 0) {
        if (!isFocusedItemControlled) {
          dispatch({ type: 'EXIT_WIDGET' });
        }

        onFocus && onFocus();
      }
    };

    return {
      role: role === null ? undefined : role,
      tabIndex,
      [selectedAriaKey]: selectedAriaKey ? isSelected : undefined,
      [refKey]: focusRef,
      onFocus: composeEventHandlers(onFocusCallback, handleFocus),
      onClick: composeEventHandlers(onClick, handleClick),
      onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
      onBlur,
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
