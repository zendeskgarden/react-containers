/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import { useSelection } from '@zendeskgarden/container-selection';
import {
  KEYS,
  getControlledValue,
  composeEventHandlers,
  useId
} from '@zendeskgarden/container-utilities';
import {
  isItemGroup,
  isValidItem,
  StateChangeTypes,
  stateReducer,
  toMenuItemKeyDownType,
  triggerLink
} from './utils';
import {
  MenuItem,
  IMenuItemBase,
  IUseMenuProps,
  IUseMenuReturnValue,
  IMenuItemGroup,
  ISelectedItem
} from './types';

export const useMenu = <T extends HTMLElement = HTMLElement, M extends HTMLElement = HTMLElement>({
  items: rawItems,
  idPrefix,
  environment,
  menuRef,
  triggerRef,
  rtl = false,
  onChange = () => undefined,
  isExpanded,
  defaultExpanded = false,
  restoreFocus = true,
  selectedItems,
  focusedValue,
  defaultFocusedValue
}: IUseMenuProps<T, M>): IUseMenuReturnValue => {
  const prefix = `${useId(idPrefix)}-`;
  const triggerId = `${prefix}menu-trigger`;
  const isExpandedControlled = isExpanded !== undefined;
  const isSelectedItemsControlled = selectedItems !== undefined;
  const isFocusedValueControlled = focusedValue !== undefined;
  const menuItems = useMemo(
    () =>
      rawItems.reduce((items, item: MenuItem) => {
        if (isItemGroup(item)) {
          items.push(...((item as IMenuItemGroup).items.filter(isValidItem) as IMenuItemBase[]));
        } else if (isValidItem(item)) {
          items.push(item as IMenuItemBase);
        }

        return items;
      }, [] as IMenuItemBase[]),
    [rawItems]
  );
  const initialSelectedItems = useMemo(
    () =>
      menuItems.filter(
        item => !!(item.type && ['radio', 'checkbox'].includes(item.type) && item.selected)
      ),
    [menuItems]
  );
  const values = useMemo(() => menuItems.map(item => item.value), [menuItems]);
  const itemRefs = useMemo(
    () =>
      values.reduce((acc: Record<string, RefObject<any>>, v) => {
        acc[v] = createRef();

        return acc;
      }, {}),
    [values]
  );

  /**
   * State
   */

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [state, dispatch] = useReducer(stateReducer, {
    focusedValue,
    isExpanded: isExpanded || defaultExpanded,
    selectedItems: initialSelectedItems,
    valuesRef: values,
    focusOnOpen: false,
    isTransitionNext: false,
    isTransitionPrevious: false,
    transitionType: null,
    nestedPathIds: []
  });

  const controlledIsExpanded = getControlledValue(isExpanded, state.isExpanded)!;
  const controlledSelectedItems = getControlledValue(selectedItems, state.selectedItems)!;
  const uncontrolledFocusedValue = state.focusedValue === null ? undefined : state.focusedValue;

  /**
   * selection isn't a single-item construct in menus, so it
   * isn't used, but its value is kept in sync with focusedValue
   * to ensure roving tabindex is N*Sync with focusedValue
   */
  const {
    focusedValue: controlledFocusedValue,
    getGroupProps,
    getElementProps
  } = useSelection<string>({
    values,
    direction: 'vertical',
    selectedValue: focusedValue || uncontrolledFocusedValue,
    focusedValue: focusedValue || uncontrolledFocusedValue,
    allowDefaultOnSelect: true
  });

  /**
   * Handlers
   */

  // Internal

  const returnFocusToTrigger = useCallback(
    (skip?: boolean) => {
      if (!skip && restoreFocus && triggerRef.current) {
        triggerRef.current.focus();
      }
    },
    [triggerRef, restoreFocus]
  );

  const closeMenu = useCallback(
    (changeType: string) => {
      dispatch({
        type: changeType,
        payload: { ...(!isExpandedControlled && { isExpanded: false }) }
      });

      onChange({ type: changeType, isExpanded: false });
    },
    [onChange, isExpandedControlled]
  );

  const isItemSelected = useCallback(
    (value: string, type?: string, name?: string): boolean | undefined => {
      let isSelected;

      if (type === 'checkbox') {
        isSelected = !!controlledSelectedItems.find(item => item.value === value);
      } else if (type === 'radio') {
        const match = controlledSelectedItems.filter(item => item.name === name)[0];

        isSelected = match?.value === value;
      }

      return isSelected;
    },
    [controlledSelectedItems]
  );

  const getNextFocusedValue = useCallback(
    ({
      value,
      key,
      isAlphanumericChar
    }: {
      value: string;
      key: string;
      isAlphanumericChar?: boolean;
    }) => {
      let nextFocusedValue = value;

      if (isAlphanumericChar) {
        const firstChars = menuItems.map(item =>
          item.label ? item.label[0].toLowerCase() : String(item.value)[0].toLowerCase()
        );
        const index = firstChars.indexOf(key);
        const item = menuItems[index];

        if (item) {
          nextFocusedValue = item.value;
        }
      } else {
        const index = values.indexOf(value);
        let nextIndex: number;

        if (key === KEYS.UP) {
          nextIndex = (index === 0 ? values.length : index) - 1;
        } else if (key === KEYS.DOWN) {
          nextIndex = (index === values.length - 1 ? -1 : index) + 1;
        } else if (key === KEYS.END) {
          nextIndex = values.length - 1;
        } else if (key === KEYS.HOME) {
          nextIndex = 0;
        }

        const item = menuItems[nextIndex!];

        nextFocusedValue = item.value;
      }

      return nextFocusedValue;
    },
    [menuItems, values]
  );

  const getSelectedItems = useCallback(
    ({ value, type, name, label, selected }: IMenuItemBase) => {
      let changes: ISelectedItem[] | null = [...controlledSelectedItems];

      if (!type) return null;

      const selectedItem = {
        value,
        type,
        label,
        ...(name && { name })
      };

      if (type === 'checkbox') {
        if (selected) {
          changes = changes.filter(item => item.value !== value);
        } else {
          changes.push(selectedItem);
        }
      } else if (type === 'radio') {
        const index = changes.findIndex(item => item.name === name);

        if (index > -1) {
          changes.splice(index, 1);
        }

        changes.push(selectedItem);
      }

      return changes;
    },
    [controlledSelectedItems]
  );

  const anchorItemError = ({ isNext, isPrevious, type, value }: IMenuItemBase) => {
    let invariantKey: string;

    if (isNext) {
      invariantKey = 'isNext';
    } else if (isPrevious) {
      invariantKey = 'isPrevious';
    } else {
      invariantKey = type!;
    }

    const invariantType = {
      isNext: 'isNext',
      isPrevious: 'isPrevious',
      radio: 'radio',
      checkbox: 'checkbox'
    }[invariantKey];

    throw new Error(`Error: expected useMenu anchor item '${value}' to not use '${invariantType}'`);
  };

  // Event

  const handleTriggerClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      const changeType = StateChangeTypes.TriggerClick;

      dispatch({
        type: changeType,
        payload: {
          ...(!isFocusedValueControlled && { focusedValue: null }),
          ...(!isExpandedControlled && { isExpanded: !controlledIsExpanded })
        }
      });

      // Skip focus return when isExpanded === true
      returnFocusToTrigger(!controlledIsExpanded);

      onChange({
        type: changeType,
        focusedValue: null,
        isExpanded: !controlledIsExpanded
      });
    },
    [
      isFocusedValueControlled,
      isExpandedControlled,
      controlledIsExpanded,
      returnFocusToTrigger,
      onChange
    ]
  );

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;
      const isArrowKey = [KEYS.DOWN, KEYS.UP].includes(key);
      const isSelectKey = [KEYS.ENTER, KEYS.SPACE].includes(key);

      let changeType;
      let nextFocusedValue;

      if (isArrowKey) {
        changeType = StateChangeTypes[`TriggerKeyDown${key}`];
        nextFocusedValue = KEYS.UP === key ? values[values.length - 1] : values[0];
      } else if (isSelectKey) {
        changeType = StateChangeTypes[`TriggerKeyDown${key === KEYS.SPACE ? 'Space' : key}`];
        nextFocusedValue = values[0];
      }

      if (changeType) {
        event.preventDefault();

        dispatch({
          type: changeType,
          payload: {
            focusOnOpen: true,
            ...(!isFocusedValueControlled && {
              focusedValue: defaultFocusedValue || nextFocusedValue
            }),
            ...(!isExpandedControlled && { isExpanded: true })
          }
        });

        returnFocusToTrigger();

        onChange({
          type: changeType,
          focusedValue: defaultFocusedValue || nextFocusedValue,
          isExpanded: true
        });
      }
    },
    [
      values,
      isFocusedValueControlled,
      defaultFocusedValue,
      isExpandedControlled,
      returnFocusToTrigger,
      onChange
    ]
  );

  const handleMenuKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if ([KEYS.ESCAPE, KEYS.TAB].includes(key)) {
        event.preventDefault();
        event.stopPropagation();

        const type = StateChangeTypes[key === KEYS.ESCAPE ? 'MenuKeyDownEscape' : 'MenuKeyDownTab'];

        // TODO: Investigate why focus goes to body instead of next interactive element on TAB keydown. Meanwhile, returning focus to trigger.
        returnFocusToTrigger();

        closeMenu(type);
      }
    },
    [closeMenu, returnFocusToTrigger]
  );

  /**
   * 1. Determine if the next element receiving focus is focusable
   *    (event.relatedTarget is null when focus moves to non-focusable elements or body).
   *
   * 2. When an element loses focus (on blur), and focus moves to a non-focusable element
   *    like <body>, `event.relatedTarget` should be `null`. However, due to a bug in jsdom
   *    (prior to version 24.1.2), `relatedTarget` is incorrectly set to the `Document` node
   *    (`nodeName === '#document'`).
   *
   *    Currently, `jest-environment-jsdom` (v29.7.0) uses jsdom@20.0.3, which still has this issue.
   *    Until Jest updates its jsdom dependency, this workaround ensures accurate
   *    testing of focus behavior.
   *
   *    @see https://github.com/jsdom/jsdom/pull/3767
   *    @see https://github.com/jsdom/jsdom/releases/tag/24.1.2
   *    @see https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-environment-jsdom/package.json
   *
   * 3. Skip focus-return to trigger in these scenarios:
   *    a. Focus is moving to another focusable element
   *    b. Menu is closed and focus would naturally go to body
   */
  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      const win = environment || window;

      setTimeout(() => {
        // Timeout is required to ensure blur is handled after focus
        const activeElement = win.document.activeElement;
        const isMenuOrTriggerFocused =
          menuRef.current?.contains(activeElement) || triggerRef.current?.contains(activeElement);

        if (!isMenuOrTriggerFocused) {
          const nextElementIsFocusable =
            !!event.relatedTarget /* [1] */ &&
            event.relatedTarget?.nodeName !== '#document'; /* [2] */

          const shouldSkipFocusReturn =
            nextElementIsFocusable || (!controlledIsExpanded && !nextElementIsFocusable); /* [3] */

          returnFocusToTrigger(shouldSkipFocusReturn);

          closeMenu(StateChangeTypes.MenuBlur);
        }
      });
    },
    [closeMenu, controlledIsExpanded, environment, menuRef, returnFocusToTrigger, triggerRef]
  );

  const handleMenuMouseLeave = useCallback(() => {
    onChange({ type: StateChangeTypes.MenuMouseLeave });
  }, [onChange]);

  const handleItemClick = useCallback(
    (item: IMenuItemBase) => {
      let changeType = StateChangeTypes.MenuItemClick;
      const { isNext, isPrevious } = item;
      const isTransitionItem = isNext || isPrevious;

      if (isNext) {
        changeType = StateChangeTypes.MenuItemClickNext;
      } else if (isPrevious) {
        changeType = StateChangeTypes.MenuItemClickPrevious;
      }

      const nextSelection = getSelectedItems(item);

      dispatch({
        type: changeType,
        payload: {
          ...(isTransitionItem && {
            ...(isNext && { nestedPathIds: [...state.nestedPathIds, item.value] }),
            transitionType: changeType,
            isTransitionNext: isNext,
            isTransitionPrevious: isPrevious
          }),
          ...(!isExpandedControlled && !isTransitionItem && { isExpanded: false }),
          ...(!isTransitionItem && { nestedPathIds: [] }),
          ...(!isSelectedItemsControlled && nextSelection && { selectedItems: nextSelection })
        }
      });

      returnFocusToTrigger(isTransitionItem);

      onChange({
        type: changeType,
        value: item.value,
        ...(!isTransitionItem && { isExpanded: false }),
        ...(nextSelection && { selectedItems: nextSelection })
      });
    },
    [
      getSelectedItems,
      state.nestedPathIds,
      isExpandedControlled,
      isSelectedItemsControlled,
      returnFocusToTrigger,
      onChange
    ]
  );

  const handleItemKeyDown = useCallback(
    (event: React.KeyboardEvent, item: IMenuItemBase) => {
      const { key } = event;
      const { isNext, isPrevious } = item;

      const isJumpKey = [KEYS.HOME, KEYS.END].includes(key);
      const isSelectKey = [KEYS.SPACE, KEYS.ENTER].includes(key);
      const isVerticalArrowKeys = [KEYS.UP, KEYS.DOWN].includes(key);
      const isAlphanumericChar = key.length === 1 && /\S/u.test(key);
      const isTransitionItem = isNext || isPrevious;

      let changeType;
      let payload = {};
      let changes = {};

      if (isSelectKey) {
        changeType = StateChangeTypes[toMenuItemKeyDownType(key)];
        const nextSelection = getSelectedItems(item);

        if (isNext) {
          changeType = StateChangeTypes.MenuItemKeyDownNext;
        } else if (isPrevious) {
          changeType = StateChangeTypes.MenuItemKeyDownPrevious;
        }

        payload = {
          ...(!isExpandedControlled && !isTransitionItem && { isExpanded: false }),
          ...(!isTransitionItem && { nestedPathIds: [] }),
          ...(!isSelectedItemsControlled && nextSelection && { selectedItems: nextSelection })
        };

        changes = {
          value: item.value,
          ...(!isTransitionItem && { isExpanded: false }),
          ...(nextSelection && { selectedItems: nextSelection })
        };

        event.preventDefault();

        if (item.href) {
          triggerLink(event.target as HTMLAnchorElement, environment || window);
        }

        returnFocusToTrigger(isTransitionItem);
      } else if (key === KEYS.RIGHT) {
        if (rtl && isPrevious) {
          changeType = StateChangeTypes.MenuItemKeyDownPrevious;
        }

        if (!rtl && isNext) {
          changeType = StateChangeTypes.MenuItemKeyDownNext;
        }

        if (changeType) {
          event.preventDefault();

          changes = { value: item.value };
        }
      } else if (key === KEYS.LEFT) {
        if (rtl && isNext) {
          changeType = StateChangeTypes.MenuItemKeyDownNext;
        }

        if (!rtl && isPrevious) {
          changeType = StateChangeTypes.MenuItemKeyDownPrevious;
        }

        if (changeType) {
          event.preventDefault();

          changes = { value: item.value };
        }
      } else if (isVerticalArrowKeys || isJumpKey || isAlphanumericChar) {
        event.preventDefault();

        changeType = isAlphanumericChar
          ? StateChangeTypes.MenuItemKeyDown
          : StateChangeTypes[toMenuItemKeyDownType(key)];
        const nextFocusedValue = getNextFocusedValue({
          value: item.value,
          key,
          isAlphanumericChar
        });

        payload = {
          ...(!isFocusedValueControlled && { focusedValue: nextFocusedValue })
        };

        changes = { focusedValue: nextFocusedValue };
      }

      if (changeType) {
        event.stopPropagation();

        const transitionNext = changeType.includes('next');
        const willTransition = changeType.includes('previous') || transitionNext;

        payload = {
          ...payload,
          ...(willTransition && {
            ...(isNext && { nestedPathIds: [...state.nestedPathIds, item.value] }),
            transitionType: changeType,
            isTransitionNext: isNext,
            isTransitionPrevious: isPrevious
          })
        };

        dispatch({ type: changeType, payload });
        onChange({ type: changeType, ...changes });
      }
    },
    [
      getSelectedItems,
      isExpandedControlled,
      isSelectedItemsControlled,
      returnFocusToTrigger,
      environment,
      rtl,
      getNextFocusedValue,
      isFocusedValueControlled,
      state.nestedPathIds,
      onChange
    ]
  );

  const handleItemMouseEnter = useCallback(
    (value: string) => {
      const changeType = StateChangeTypes.MenuItemMouseMove;

      dispatch({
        type: changeType,
        payload: {
          ...(!isFocusedValueControlled && { focusedValue: value })
        }
      });

      onChange({
        type: changeType,
        focusedValue: value
      });
    },
    [isFocusedValueControlled, onChange]
  );

  /**
   * Effects
   */

  /**
   * Sets a state value to ensure 1 render happens after
   * opening so a menu item can be focused.
   */
  useEffect(() => {
    setMenuVisible(controlledIsExpanded);
  }, [controlledIsExpanded]);

  /**
   * Respond to clicks outside the  open menu
   */
  useEffect(() => {
    const win = environment || window;

    if (controlledIsExpanded) {
      win.document.addEventListener('keydown', handleMenuKeyDown, true);
    } else if (!controlledIsExpanded) {
      win.document.removeEventListener('keydown', handleMenuKeyDown, true);
    }

    return () => {
      win.document.removeEventListener('keydown', handleMenuKeyDown, true);
    };
  }, [controlledIsExpanded, handleMenuKeyDown, environment]);

  /**
   * When the menu is opened, this effect sets focus on the current menu item using `focusedValue`
   * or on the first menu item.
   */
  useEffect(() => {
    if (state.focusOnOpen && menuVisible && controlledFocusedValue && controlledIsExpanded) {
      let ref = itemRefs[controlledFocusedValue]?.current;

      /**
       * If the ref can't be matched, fall back to the first menu item
       */
      if (!ref) {
        ref = itemRefs[values[0]].current;
      }

      ref && ref.focus();
    }
  }, [
    values,
    menuVisible,
    itemRefs,
    controlledFocusedValue,
    state.focusOnOpen,
    controlledIsExpanded,
    triggerRef
  ]);

  /**
   * Handle the uncontrolled focus transition between root and nested menu states
   */
  useEffect(() => {
    const valuesChanged = JSON.stringify(values) !== JSON.stringify(state.valuesRef);

    if (valuesChanged && !state.isTransitionNext && !state.isTransitionPrevious) {
      dispatch({
        type: StateChangeTypes.FnSetStateRefs,
        payload: { valuesRef: values }
      });
    }

    if (valuesChanged && (state.isTransitionNext || state.isTransitionPrevious)) {
      const nextFocusedValue = state.isTransitionNext
        ? values[0]
        : state.nestedPathIds.slice(-1)[0];

      dispatch({
        type: StateChangeTypes.FnMenuTransitionFinish,
        payload: {
          valuesRef: values,
          focusOnOpen: true,
          nestedPathIds: state.isTransitionNext
            ? state.nestedPathIds
            : state.nestedPathIds.slice(0, -1),
          ...(!isFocusedValueControlled && { focusedValue: nextFocusedValue })
        }
      });

      onChange({ type: StateChangeTypes.FnMenuTransitionFinish, focusedValue: nextFocusedValue });
    }
  }, [
    values,
    isFocusedValueControlled,
    state.valuesRef,
    state.transitionType,
    state.isTransitionNext,
    state.isTransitionPrevious,
    state.nestedPathIds,
    onChange
  ]);

  /**
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseMenuReturnValue['getTriggerProps']>(
    ({
      onBlur,
      onClick,
      onKeyDown,
      type = 'button',
      role = 'button',
      disabled,
      ...other
    } = {}) => ({
      ...other,
      'data-garden-container-id': 'containers.menu.trigger',
      'data-garden-container-version': PACKAGE_VERSION,
      ref: triggerRef,
      id: triggerId,
      'aria-expanded': controlledIsExpanded,
      'aria-haspopup': true,
      disabled,
      tabIndex: disabled ? -1 : 0,
      type: type === null ? undefined : type,
      role: role === null ? undefined : role,
      onBlur: composeEventHandlers(onBlur, handleBlur),
      onClick: composeEventHandlers(onClick, handleTriggerClick),
      onKeyDown: composeEventHandlers(onKeyDown, handleTriggerKeyDown)
    }),
    [
      controlledIsExpanded,
      handleBlur,
      handleTriggerClick,
      handleTriggerKeyDown,
      triggerId,
      triggerRef
    ]
  );

  const getMenuProps = useCallback<IUseMenuReturnValue['getMenuProps']>(
    ({ role = 'menu', onBlur, onMouseLeave, ...other } = {}) => ({
      ...other,
      ...getGroupProps({
        onMouseLeave: composeEventHandlers(onMouseLeave, handleMenuMouseLeave)
      }),
      'data-garden-container-id': 'containers.menu',
      'data-garden-container-version': PACKAGE_VERSION,
      'aria-labelledby': triggerId,
      tabIndex: -1,
      role: role === null ? undefined : role,
      ref: menuRef as any,
      onBlur: composeEventHandlers(onBlur, handleBlur)
    }),
    [getGroupProps, handleBlur, handleMenuMouseLeave, menuRef, triggerId]
  );

  const getSeparatorProps = useCallback<IUseMenuReturnValue['getSeparatorProps']>(
    ({ role = 'separator', ...other } = {}) => ({
      ...other,
      'data-garden-container-id': 'containers.menu.separator',
      'data-garden-container-version': PACKAGE_VERSION,
      role: role === null ? undefined : role
    }),
    []
  );

  const getItemGroupProps = useCallback<IUseMenuReturnValue['getItemGroupProps']>(
    ({ role = 'group', ...other }) => ({
      ...other,
      'data-garden-container-id': 'containers.menu.item_group',
      'data-garden-container-version': PACKAGE_VERSION,
      role: role === null ? undefined : role
    }),
    []
  );

  const getItemProps = useCallback<IUseMenuReturnValue['getItemProps']>(
    ({ role = 'menuitem', onClick, onKeyDown, onMouseEnter, item, ...other }) => {
      const {
        disabled: itemDisabled,
        type,
        name,
        value,
        href,
        isExternal,
        isNext = false,
        isPrevious = false,
        label = value
      } = item;
      let itemRole = role;

      if (type === 'radio') {
        itemRole = 'menuitemradio';
      } else if (type === 'checkbox') {
        itemRole = 'menuitemcheckbox';
      }

      const selected = isItemSelected(value, type, name);

      /**
       * The "select" of useSelection isn't
       * leveraged in useMenu, so `aria-selected` attribute
       * is intentionally `undefined` in all cases.
       *
       * Instead, `aria-checked` is used, but not managed
       * by useSelection.
       */
      const elementProps = {
        'data-garden-container-id': 'containers.menu.item',
        'data-garden-container-version': PACKAGE_VERSION,
        'aria-selected': undefined,
        'aria-checked': selected,
        'aria-disabled': itemDisabled,
        role: itemRole === null ? undefined : itemRole,
        href,
        onClick,
        onKeyDown,
        onMouseEnter,
        ...other
      };

      if (href && isExternal) {
        elementProps.target = '_blank';
        elementProps.rel = 'noopener noreferrer';
      }

      /**
       * Validation
       */

      if (href && (isNext || isPrevious || type)) {
        anchorItemError(item);
      }

      if (itemDisabled) {
        return elementProps;
      }

      const itemProps = getElementProps({
        value: value as any,
        ...elementProps,
        onClick: composeEventHandlers(onClick, () =>
          handleItemClick({ ...item, label, selected, isNext, isPrevious })
        ),
        onKeyDown: composeEventHandlers(onKeyDown, (e: React.KeyboardEvent) =>
          handleItemKeyDown(e, { ...item, label, selected, isNext, isPrevious })
        ),
        onMouseEnter: composeEventHandlers(onMouseEnter, () => handleItemMouseEnter(value))
      });

      if (itemProps.ref !== itemRefs[value]) {
        itemRefs[value] = itemProps.ref as RefObject<any>;
      }

      return itemProps;
    },
    [
      itemRefs,
      isItemSelected,
      getElementProps,
      handleItemClick,
      handleItemKeyDown,
      handleItemMouseEnter
    ]
  );

  return useMemo(
    () => ({
      /* prop getters */
      getTriggerProps,
      getMenuProps,
      getItemGroupProps,
      getItemProps,
      getSeparatorProps,
      /* state */
      isExpanded: controlledIsExpanded!,
      selection: controlledSelectedItems,
      focusedValue: controlledFocusedValue
    }),
    [
      controlledIsExpanded,
      controlledSelectedItems,
      controlledFocusedValue,
      getTriggerProps,
      getMenuProps,
      getItemGroupProps,
      getItemProps,
      getSeparatorProps
    ]
  );
};
