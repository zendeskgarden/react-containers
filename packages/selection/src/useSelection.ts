/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  FocusEventHandler,
  KeyboardEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { composeEventHandlers, getControlledValue, KEYS } from '@zendeskgarden/container-utilities';
import { IUseSelectionProps, IUseSelectionReturnValue } from './types';
import { stateReducer } from './utils';

/**
 * Require items up front?
 * 1. Order is guaranteed
 * 2. Can be optimized between renders
 * 3. items/ref dictionary can never be duplicated
 */
export const useSelection = <Item>({
  items,
  direction = 'horizontal',
  defaultFocusedItem = items[0],
  defaultSelectedItem,
  rtl,
  selectedItem,
  focusedItem,
  onSelect,
  onFocus
}: IUseSelectionProps<Item>): IUseSelectionReturnValue<Item> => {
  const isSelectedItemControlled = selectedItem !== undefined;
  const isFocusedItemControlled = focusedItem !== undefined;

  // Create a ref dictionary from `items`.
  // Refs are created/assigned as part of `getItemProps`.
  const refs: Record<string, any> = useMemo(
    () =>
      items.reduce((all: Record<string, MutableRefObject<any>>, item) => {
        all[String(item)] = { current: null };

        return all;
      }, {}),
    [items]
  );

  const [state, dispatch] = useReducer(stateReducer, {
    selectedItem,
    focusedItem
  });

  const controlledFocusedItem = getControlledValue(focusedItem, state.focusedItem);
  const controlledSelectedItem = getControlledValue(selectedItem, state.selectedItem);

  useEffect(() => {
    if (controlledFocusedItem !== undefined) {
      const focusItemTarget = refs[controlledFocusedItem];

      if (focusItemTarget?.current) focusItemTarget.current.focus();
    }
  }, [controlledFocusedItem]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedItem === undefined && defaultSelectedItem !== undefined) {
      if (onSelect) onSelect(defaultSelectedItem);

      if (!isSelectedItemControlled) {
        dispatch({
          type: 'KEYBOARD_SELECT',
          payload: defaultSelectedItem
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getContainerProps: IUseSelectionReturnValue<Item>['getContainerProps'] = useCallback(
    ({ role = 'listbox', ...other } = {}) => ({
      role: role === null ? undefined : role,
      'data-garden-container-id': 'containers.selection',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    }),
    []
  );

  const getItemProps: IUseSelectionReturnValue<Item>['getItemProps'] = ({
    selectedAriaKey = 'aria-selected',
    role = 'option',
    onFocus: onFocusCallback,
    onKeyDown,
    onClick,
    item,
    focusRef,
    refKey = 'ref',
    ...other
  }) => {
    const isSelected = controlledSelectedItem === item;
    const isFocused =
      controlledFocusedItem === undefined ? isSelected : controlledFocusedItem === item;
    const tabIndex =
      isFocused ||
      (controlledSelectedItem === undefined &&
        controlledFocusedItem === undefined &&
        item === defaultFocusedItem)
        ? 0
        : -1;
    const verticalDirection = direction === 'vertical' || direction === 'both';
    const horizontalDirection = direction === 'horizontal' || direction === 'both';

    const handleFocus = () => {
      if (onFocus) onFocus(item);

      if (!isFocusedItemControlled) {
        dispatch({ type: 'FOCUS', payload: item });
      }
    };

    const handleClick = () => {
      if (onSelect) onSelect(item);
      if (onFocus) onFocus(item);
      if (!isSelectedItemControlled) dispatch({ type: 'MOUSE_SELECT', payload: item });
    };

    const handleKeyDown: KeyboardEventHandler = event => {
      let nextItem: Item;
      let currentItem: Item;

      if (isFocusedItemControlled) {
        currentItem = items.find(id => focusedItem === id)!;
      } else {
        currentItem = items.find(id => state.focusedItem === id)!;
      }

      const onIncrement = () => {
        const nextItemIndex = items.findIndex(id => id === currentItem) + 1;

        nextItem = items[nextItemIndex];

        if (!nextItem) {
          nextItem = items[0];
        }

        if (!isFocusedItemControlled) {
          dispatch({ type: 'INCREMENT', payload: nextItem });
        }

        if (onFocus) {
          onFocus(nextItem);
        }
      };

      const onDecrement = () => {
        const nextItemIndex = items.findIndex(id => id === currentItem) - 1;

        nextItem = items[nextItemIndex];

        if (!nextItem) {
          nextItem = items[items.length - 1];
        }

        if (!isFocusedItemControlled) {
          dispatch({ type: 'DECREMENT', payload: nextItem });
        }

        if (onFocus) {
          onFocus(nextItem);
        }
      };

      const hasModifierKeyPressed =
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;

      if (!hasModifierKeyPressed) {
        if (
          (event.key === KEYS.UP && verticalDirection) ||
          (event.key === KEYS.LEFT && horizontalDirection)
        ) {
          if (rtl && horizontalDirection) {
            onIncrement();
          } else {
            onDecrement();
          }

          event.preventDefault();
        } else if (
          (event.key === KEYS.DOWN && verticalDirection) ||
          (event.key === KEYS.RIGHT && horizontalDirection)
        ) {
          if (rtl && horizontalDirection) {
            onDecrement();
          } else {
            onIncrement();
          }

          event.preventDefault();
        } else if (event.key === KEYS.HOME) {
          const firstItem = items[0];

          if (!isFocusedItemControlled) {
            dispatch({ type: 'HOME', payload: firstItem });
          }

          if (onFocus) onFocus(firstItem);
          event.preventDefault();
        } else if (event.key === KEYS.END) {
          const lastItem = items[items.length - 1];

          if (!isFocusedItemControlled) {
            dispatch({ type: 'END', payload: lastItem });
          }

          if (onFocus) onFocus(lastItem);
          event.preventDefault();
        } else if (event.key === KEYS.SPACE || event.key === KEYS.ENTER) {
          if (onSelect) onSelect(item);

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
        dispatch({ type: 'EXIT_WIDGET' });

        onFocus && onFocus();
      }
    };

    return {
      role: role === null ? undefined : role,
      tabIndex,
      [selectedAriaKey]: selectedAriaKey ? isSelected : undefined,
      [refKey]: mergeRefs([focusRef, refs[String(item)]]),
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
};
