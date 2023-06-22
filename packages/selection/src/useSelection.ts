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

export const useSelection = <Item>({
  values,
  direction = 'horizontal',
  defaultFocusedItem = values[0],
  defaultSelectedItem,
  rtl,
  selectedItem,
  focusedItem,
  onSelect,
  onFocus
}: IUseSelectionProps<Item>): IUseSelectionReturnValue<Item> => {
  const isSelectedItemControlled = selectedItem !== undefined;
  const isFocusedItemControlled = focusedItem !== undefined;

  // Create a ref dictionary from `values`.
  // Refs are created/assigned as part of `getItemProps`.
  const refs: Record<string, any> = useMemo(
    () =>
      values.reduce((all: Record<string, MutableRefObject<any>>, value) => {
        all[String(value)] = { current: null };

        return all;
      }, {}),
    [values]
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

      focusItemTarget?.current && focusItemTarget.current.focus();
    }
  }, [controlledFocusedItem]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedItem === undefined && defaultSelectedItem !== undefined) {
      onSelect && onSelect(defaultSelectedItem);

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
    value,
    focusRef,
    refKey = 'ref',
    ...other
  }) => {
    const isSelected = controlledSelectedItem === value;
    const isFocused =
      controlledFocusedItem === undefined ? isSelected : controlledFocusedItem === value;
    const tabIndex =
      isFocused ||
      (controlledSelectedItem === undefined &&
        controlledFocusedItem === undefined &&
        value === defaultFocusedItem)
        ? 0
        : -1;
    const verticalDirection = direction === 'vertical' || direction === 'both';
    const horizontalDirection = direction === 'horizontal' || direction === 'both';

    const handleFocus = () => {
      onFocus && onFocus(value);

      !isFocusedItemControlled && dispatch({ type: 'FOCUS', payload: value });
    };

    const handleClick = () => {
      onSelect && onSelect(value);
      onFocus && onFocus(value);
      !isSelectedItemControlled && dispatch({ type: 'MOUSE_SELECT', payload: value });
    };

    const handleKeyDown: KeyboardEventHandler = event => {
      let nextItem: Item;
      let currentItem: Item;

      if (isFocusedItemControlled) {
        currentItem = values.find(id => focusedItem === id)!;
      } else {
        currentItem = values.find(id => state.focusedItem === id)!;
      }

      const onIncrement = () => {
        const nextItemIndex = values.indexOf(currentItem) + 1;

        nextItem = values[nextItemIndex];

        if (!nextItem) {
          nextItem = values[0];
        }

        !isFocusedItemControlled && dispatch({ type: 'INCREMENT', payload: nextItem });

        onFocus && onFocus(nextItem);
      };

      const onDecrement = () => {
        const nextItemIndex = values.indexOf(currentItem) - 1;

        nextItem = values[nextItemIndex];

        if (!nextItem) {
          nextItem = values[values.length - 1];
        }

        !isFocusedItemControlled && dispatch({ type: 'DECREMENT', payload: nextItem });

        onFocus && onFocus(nextItem);
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
          const firstItem = values[0];

          !isFocusedItemControlled && dispatch({ type: 'HOME', payload: firstItem });

          onFocus && onFocus(firstItem);
          event.preventDefault();
        } else if (event.key === KEYS.END) {
          const lastItem = values[values.length - 1];

          !isFocusedItemControlled && dispatch({ type: 'END', payload: lastItem });

          onFocus && onFocus(lastItem);
          event.preventDefault();
        } else if (event.key === KEYS.SPACE || event.key === KEYS.ENTER) {
          onSelect && onSelect(value);
          !isSelectedItemControlled && dispatch({ type: 'KEYBOARD_SELECT', payload: value });

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
      [refKey]: mergeRefs([focusRef, refs[String(value)]]),
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
