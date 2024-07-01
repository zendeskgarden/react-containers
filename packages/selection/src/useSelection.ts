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
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import { composeEventHandlers, getControlledValue, KEYS } from '@zendeskgarden/container-utilities';
import { IUseSelectionProps, IUseSelectionReturnValue } from './types';
import { stateReducer } from './utils';

export const useSelection = <Value>({
  values,
  direction = 'horizontal',
  defaultFocusedValue = values[0],
  defaultSelectedValue,
  rtl,
  selectedValue,
  focusedValue,
  allowDefaultOnSelect = false,
  onSelect,
  onFocus
}: IUseSelectionProps<Value>): IUseSelectionReturnValue<Value> => {
  const isSelectedValueControlled = selectedValue !== undefined;
  const isFocusedValueControlled = focusedValue !== undefined;

  // Create a ref dictionary from `values`.
  // Refs are created/assigned as part of `getElementProps`.
  const refs = useMemo(
    () =>
      values.reduce((all: Record<any, MutableRefObject<any | null>>, value: any) => {
        all[value] = createRef();

        return all;
      }, {}),
    [values]
  );

  const [state, dispatch] = useReducer(stateReducer, {
    selectedValue,
    focusedValue
  });

  const controlledFocusedValue = getControlledValue(focusedValue, state.focusedValue);
  const controlledSelectedValue = getControlledValue(selectedValue, state.selectedValue);

  useEffect(() => {
    if (controlledFocusedValue !== undefined) {
      const targetRef = refs[controlledFocusedValue];

      targetRef?.current && targetRef.current.focus();
    }
  }, [controlledFocusedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedValue === undefined && defaultSelectedValue !== undefined) {
      onSelect && onSelect(defaultSelectedValue);

      if (!isSelectedValueControlled) {
        dispatch({
          type: 'KEYBOARD_SELECT',
          payload: defaultSelectedValue
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getGroupProps: IUseSelectionReturnValue<Value>['getGroupProps'] = useCallback(
    ({ role = 'group', ...other } = {}) => ({
      role: role === null ? undefined : role,
      'data-garden-container-id': 'containers.selection',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    }),
    []
  );

  const getElementProps: IUseSelectionReturnValue<Value>['getElementProps'] = ({
    selectedAriaKey = 'aria-selected',
    onFocus: onFocusCallback,
    onKeyDown,
    onClick,
    value,
    ...other
  }) => {
    const isSelected = controlledSelectedValue === value;
    const isFocused =
      controlledFocusedValue === undefined ? isSelected : controlledFocusedValue === value;
    const tabIndex =
      isFocused ||
      (controlledSelectedValue === undefined &&
        controlledFocusedValue === undefined &&
        value === defaultFocusedValue)
        ? 0
        : -1;
    const verticalDirection = direction === 'vertical' || direction === 'both';
    const horizontalDirection = direction === 'horizontal' || direction === 'both';

    const handleFocus = () => {
      onFocus && onFocus(value);

      !isFocusedValueControlled && dispatch({ type: 'FOCUS', payload: value });
    };

    const handleClick = () => {
      onSelect && onSelect(value);
      onFocus && onFocus(value);
      !isSelectedValueControlled && dispatch({ type: 'MOUSE_SELECT', payload: value });
    };

    const handleKeyDown: KeyboardEventHandler = event => {
      let nextItem: Value;
      let currentItem: Value;

      if (isFocusedValueControlled) {
        currentItem = values.find(id => focusedValue === id)!;
      } else {
        currentItem = values.find(id => state.focusedValue === id)!;
      }

      const onIncrement = () => {
        const nextItemIndex = values.indexOf(currentItem) + 1;

        nextItem = values[nextItemIndex];

        if (!nextItem) {
          nextItem = values[0];
        }

        !isFocusedValueControlled && dispatch({ type: 'INCREMENT', payload: nextItem });

        onFocus && onFocus(nextItem);
      };

      const onDecrement = () => {
        const nextItemIndex = values.indexOf(currentItem) - 1;

        nextItem = values[nextItemIndex];

        if (!nextItem) {
          nextItem = values[values.length - 1];
        }

        !isFocusedValueControlled && dispatch({ type: 'DECREMENT', payload: nextItem });

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

          !isFocusedValueControlled && dispatch({ type: 'HOME', payload: firstItem });

          onFocus && onFocus(firstItem);
          event.preventDefault();
        } else if (event.key === KEYS.END) {
          const lastItem = values[values.length - 1];

          !isFocusedValueControlled && dispatch({ type: 'END', payload: lastItem });

          onFocus && onFocus(lastItem);
          event.preventDefault();
        } else if (event.key === KEYS.SPACE || event.key === KEYS.ENTER) {
          onSelect && onSelect(value);
          !isSelectedValueControlled && dispatch({ type: 'KEYBOARD_SELECT', payload: value });

          !allowDefaultOnSelect && event.preventDefault();
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
      tabIndex,
      [selectedAriaKey]: selectedAriaKey ? isSelected : undefined,
      ref: refs[value as any],
      onFocus: composeEventHandlers(onFocusCallback, handleFocus),
      onClick: composeEventHandlers(onClick, handleClick),
      onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
      onBlur,
      ...other
    };
  };

  return {
    focusedValue: controlledFocusedValue,
    selectedValue: controlledSelectedValue,
    getElementProps,
    getGroupProps
  };
};
