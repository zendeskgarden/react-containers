/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { RefObject, createRef, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
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
  toMenuItemKeyDownType
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
  selectedItems,
  focusedValue,
  defaultFocusedValue
}: IUseMenuProps<T, M>): IUseMenuReturnValue => {
  const prefix = `${useId(idPrefix)}-`;
  const triggerId = `${prefix}menu-trigger`;
  const isExpandedControlled = isExpanded !== undefined;
  const isSelectionValueControlled = selectedItems !== undefined;
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
    focusedValue: defaultFocusedValue,
    isExpanded: defaultExpanded,
    selectedItems: [],
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
    focusedValue: focusedValue || uncontrolledFocusedValue
  });

  /**
   * Handlers
   */

  // Internal

  const closeMenu = useCallback(
    changeType => {
      dispatch({
        type: changeType,
        payload: { ...(!isExpandedControlled && { isExpanded: false }) }
      });

      onChange({
        type: changeType,
        focusedValue: null,
        isExpanded: false
      });
    },
    [onChange, isExpandedControlled]
  );

  const isItemSelected = useCallback(
    (type, name, value) => {
      switch (type) {
        case 'checkbox': {
          return !!controlledSelectedItems.find(item => item.value === value);
        }
        case 'radio': {
          const match = controlledSelectedItems.filter(item => item.name === name)[0];

          if (match) {
            return match.value === value;
          }

          return false;
        }
        default: {
          return undefined;
        }
      }
    },
    [controlledSelectedItems]
  );

  const getNextFocusedValue = useCallback(
    ({ value, key, isAlphanumericChar }) => {
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
        } else {
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
    ({ value, type, name, label, selected }) => {
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
          changes.splice(index, 1, selectedItem);
        } else {
          changes.push(selectedItem);
        }
      }

      return changes;
    },
    [controlledSelectedItems]
  );

  // Event

  const handleTriggerClick = useCallback(
    event => {
      event.stopPropagation();

      const changeType = StateChangeTypes.TriggerClick;

      dispatch({
        type: changeType,
        payload: {
          ...(!isFocusedValueControlled && { focusedValue: null }),
          ...(!isExpandedControlled && { isExpanded: !controlledIsExpanded })
        }
      });

      onChange({
        type: changeType,
        focusedValue: null,
        isExpanded: !controlledIsExpanded
      });
    },
    [controlledIsExpanded, isFocusedValueControlled, isExpandedControlled, onChange]
  );

  const handleTriggerKeyDown = useCallback(
    event => {
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
            ...(!isFocusedValueControlled && { focusedValue: nextFocusedValue }),
            ...(!isExpandedControlled && { isExpanded: true })
          }
        });

        onChange({
          type: changeType,
          focusedValue: nextFocusedValue,
          isExpanded: true
        });
      }
    },
    [isExpandedControlled, isFocusedValueControlled, onChange, values]
  );

  // How to control open/close with keydown
  const handleMenuKeyDown = useCallback(
    ({ key }) => {
      if ([KEYS.ESCAPE, KEYS.TAB].includes(key)) {
        const type = StateChangeTypes[key === KEYS.ESCAPE ? 'MenuKeyDownEscape' : 'MenuKeyDownTab'];

        closeMenu(type);

        if (triggerRef?.current && KEYS.ESCAPE === key) {
          triggerRef.current.focus();
        }
      }
    },
    [closeMenu, triggerRef]
  );

  const handleMenuBlur = useCallback(
    event => {
      const path = event.composedPath();

      if (!path.includes(menuRef.current) && !path.includes(triggerRef.current)) {
        closeMenu(StateChangeTypes.MenuBlur);
      }
    },
    [closeMenu, menuRef, triggerRef]
  );

  const handleMenuMouseLeave = useCallback(() => {
    onChange({ type: StateChangeTypes.MenuMouseLeave });
  }, [onChange]);

  const handleItemClick = useCallback(
    item => {
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
          ...(!isFocusedValueControlled && { focusedValue: null }),
          ...(!isExpandedControlled && !isTransitionItem && { isExpanded: false }),
          ...(!isTransitionItem && { nestedPathIds: [] }),
          ...(!isSelectionValueControlled && nextSelection && { selectedItems: nextSelection })
        }
      });

      onChange({
        type: changeType,
        ...(!isTransitionItem && { isExpanded: false }),
        ...(nextSelection && { selectedItems: nextSelection })
      });
    },
    [
      state.nestedPathIds,
      isFocusedValueControlled,
      isExpandedControlled,
      isSelectionValueControlled,
      getSelectedItems,
      onChange
    ]
  );

  const handleItemKeyDown = useCallback(
    (event, item) => {
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
          ...(!isSelectionValueControlled && nextSelection && { selectedItems: nextSelection })
        };

        changes = {
          ...(!isTransitionItem && { isExpanded: false }),
          ...(nextSelection && { selectedItems: nextSelection })
        };

        if (triggerRef?.current && !isTransitionItem) {
          triggerRef.current.focus();
        }
      } else if (key === KEYS.RIGHT) {
        if (rtl && isPrevious) {
          changeType = StateChangeTypes.MenuItemKeyDownPrevious;
        }

        if (!rtl && isNext) {
          changeType = StateChangeTypes.MenuItemKeyDownNext;
        }
      } else if (key === KEYS.LEFT) {
        if (rtl && isNext) {
          changeType = StateChangeTypes.MenuItemKeyDownNext;
        }

        if (!rtl && isPrevious) {
          changeType = StateChangeTypes.MenuItemKeyDownPrevious;
        }
      } else if (isVerticalArrowKeys || isJumpKey || isAlphanumericChar) {
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
        event.preventDefault();
        event.stopPropagation();

        const transitionNext = changeType.includes('next');
        const willTransition = changeType.includes('previous') || transitionNext;

        dispatch({
          type: changeType,
          payload: {
            ...payload,
            ...(willTransition && {
              ...(isNext && { nestedPathIds: [...state.nestedPathIds, item.value] }),
              transitionType: changeType,
              isTransitionNext: isNext,
              isTransitionPrevious: isPrevious
            })
          }
        });

        onChange({ type: changeType, ...changes });
      }
    },
    [
      rtl,
      triggerRef,
      state.nestedPathIds,
      isExpandedControlled,
      isFocusedValueControlled,
      isSelectionValueControlled,
      getNextFocusedValue,
      getSelectedItems,
      onChange
    ]
  );

  const handleItemMouseEnter = useCallback(
    value => {
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
      win.document.addEventListener('click', handleMenuBlur, true);
    } else if (!controlledIsExpanded) {
      win.document.removeEventListener('click', handleMenuBlur, true);
    }

    return () => {
      win.document.removeEventListener('click', handleMenuBlur, true);
    };
  }, [controlledIsExpanded, handleMenuBlur, environment]);

  /**
   * Focus initial item when menu opens or changes due to sub-menu transition
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
    controlledIsExpanded
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
    ({ onClick, onKeyDown, type = 'button', role = 'button', disabled, ...other } = {}) => ({
      ...other,
      'data-garden-container-id': 'containers.menu.trigger',
      'data-garden-container-version': PACKAGE_VERSION,
      ref: triggerRef,
      id: triggerId,
      'aria-expanded': state.isExpanded,
      'aria-haspopup': true,
      disabled,
      tabIndex: disabled ? -1 : 0,
      type: type === null ? undefined : type,
      role: role === null ? undefined : role,
      onKeyDown: composeEventHandlers(onKeyDown, handleTriggerKeyDown),
      onClick: composeEventHandlers(onClick, handleTriggerClick)
    }),
    [triggerRef, state.isExpanded, handleTriggerClick, handleTriggerKeyDown, triggerId]
  );

  const getMenuProps = useCallback<IUseMenuReturnValue['getMenuProps']>(
    ({ role = 'menu', onKeyDown, onMouseLeave, ...other } = {}) => ({
      ...other,
      ...getGroupProps({
        onKeyDown: composeEventHandlers(onKeyDown, handleMenuKeyDown),
        onMouseLeave: composeEventHandlers(onMouseLeave, handleMenuMouseLeave)
      }),
      'data-garden-container-id': 'containers.menu',
      'data-garden-container-version': PACKAGE_VERSION,
      'aria-labelledby': triggerId,
      role: role === null ? undefined : role,
      ref: menuRef as any
    }),
    [triggerId, menuRef, getGroupProps, handleMenuMouseLeave, handleMenuKeyDown]
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

      const selected = isItemSelected(type, name, value);

      /**
       * The "select" of useSelection isn't
       * leveraged in useMenu, so `aria-selected` attribute
       * is intentionally `undefined` in all cases.
       *
       * Instead, `aria-checked` is used, but not managed
       * by useSelection.
       */
      const elementProps = {
        ...other,
        'data-garden-container-id': 'containers.menu.item',
        'data-garden-container-version': PACKAGE_VERSION,
        'aria-selected': undefined,
        'aria-checked': selected,
        'aria-disabled': itemDisabled,
        role: itemRole === null ? undefined : itemRole,
        onClick,
        onKeyDown,
        onMouseEnter
      };

      if (itemDisabled) {
        return elementProps;
      }

      const itemProps = getElementProps({
        value: value as any,
        ...elementProps,
        onClick: composeEventHandlers(onClick, () =>
          handleItemClick({ ...item, label, selected, isNext, isPrevious })
        ),
        onKeyDown: composeEventHandlers(onKeyDown, (e: KeyboardEvent) =>
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
