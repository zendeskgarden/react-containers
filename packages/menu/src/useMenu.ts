/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
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
  toMenuItemKeyDownType
} from './utils';
import {
  MenuItem,
  IMenuItemBase,
  IUseMenuProps,
  IUseMenuReturnValue,
  ItemValue,
  MenuItemGroup,
  ISelectedItem
} from './types';

const ItemRoles: Record<string, 'menuitemradio' | 'menuitemcheckbox'> = {
  radio: 'menuitemradio',
  checkbox: 'menuitemcheckbox'
};

export const useMenu = <T extends HTMLElement = HTMLElement, L extends HTMLElement = HTMLElement>({
  items: rawItems,
  disabled = false,
  idPrefix,
  environment,
  menuRef,
  triggerRef,
  onChange = () => undefined,
  isExpanded,
  initialExpanded = false,
  // defaultExpanded,
  selectedItems,
  focusedValue,
  initialFocusedValue,
  defaultFocusedValue
}: IUseMenuProps<T, L>): IUseMenuReturnValue<T, L> => {
  const prefix = `${useId(idPrefix)}-`;
  const triggerId = `${prefix}menu-trigger`;
  const isExpandedControlled = isExpanded !== undefined;
  const isSelectionValueControlled = selectedItems !== undefined;
  const isFocusedValueControlled = focusedValue !== undefined;

  const menuItems = useMemo(
    () =>
      rawItems.reduce((items, item: MenuItem) => {
        if (isItemGroup(item)) {
          items.push(...((item as MenuItemGroup).items.filter(isValidItem) as IMenuItemBase[]));
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
      values.reduce((acc: Record<ItemValue, RefObject<any | null>>, v) => {
        acc[v] = createRef();

        return acc;
      }, {}),
    [values]
  );

  /**
   * Validate controlled params
   */

  if (selectedItems !== undefined && selectedItems !== null) {
    if (!Array.isArray(selectedItems)) {
      throw new Error('Error: expected useMenu `selectedItems` to be an array.');
    }
  }

  /**
   * State
   */

  const returnFocusRef = useRef<T | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const [state, dispatch] = useReducer(stateReducer, {
    focusedValue: initialFocusedValue,
    isExpanded: initialExpanded,
    selectedItems: [],
    focusOnOpen: false
  });

  const controlledIsExpanded = getControlledValue(isExpanded, state.isExpanded)!;
  const controlledSelectedItems = getControlledValue(selectedItems, state.selectedItems)!;

  /**
   * selection isn't a single-item construct in menus, so it
   * isn't used, but its value is kept in sync with focusedValue
   * to ensure roving tabindex is N*Sync with focusedValue
   */
  const {
    focusedValue: controlledFocusedValue,
    getGroupProps,
    getElementProps
  } = useSelection({
    values,
    direction: 'vertical',
    selectedValue: focusedValue || state.focusedValue,
    focusedValue: focusedValue || state.focusedValue
  });

  /**
   * Handlers
   */

  // Internal

  const closeMenu = useCallback(
    changeType => {
      if (!isExpandedControlled) {
        dispatch({
          type: changeType,
          payload: { isExpanded: false }
        });
      }

      onChange({ type: changeType, isExpanded: false });
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
    (value, key, isAlphanumericChar) => {
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

  const getSelectionValue = useCallback(
    ({ value, type, name, label, selected }) => {
      let changes: ISelectedItem[] | null = [...controlledSelectedItems];

      if (!type) return null;

      const selectedItem = {
        value,
        type,
        label,
        ...(name ? { name } : {})
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
          ...(isExpandedControlled
            ? {}
            : {
                isExpanded: !controlledIsExpanded,
                focusOnOpen: !controlledIsExpanded
              }),
          ...(isFocusedValueControlled ? {} : { focusedValue: defaultFocusedValue || values[0] })
        }
      });

      onChange({
        type: changeType,
        focusedValue: values[0],
        isExpanded: !controlledIsExpanded
      });
    },
    [
      defaultFocusedValue,
      controlledIsExpanded,
      values,
      isFocusedValueControlled,
      isExpandedControlled,
      onChange
    ]
  );

  const handleTriggerKeyDown = useCallback(
    event => {
      const { key } = event;

      if ([KEYS.DOWN, KEYS.UP].includes(key)) {
        event.preventDefault();

        const changeType = StateChangeTypes[`TriggerKeyDown${key}`];
        const nextFocusedValue =
          defaultFocusedValue || (KEYS.UP === key ? values[values.length - 1] : values[0]);

        dispatch({
          type: changeType,
          payload: {
            ...(isExpandedControlled ? {} : { isExpanded: true, focusOnOpen: true }),
            ...(isFocusedValueControlled ? {} : { focusedValue: nextFocusedValue })
          }
        });

        onChange({
          type: changeType,
          focusedValue: nextFocusedValue,
          isExpanded: true
        });
      }
    },
    [defaultFocusedValue, isExpandedControlled, isFocusedValueControlled, onChange, values]
  );

  // How to control open/close with keydown
  const handleMenuKeyDown = useCallback(
    ({ key }) => {
      if ([KEYS.ESCAPE, KEYS.TAB].includes(key)) {
        const type = StateChangeTypes[key === KEYS.ESCAPE ? 'MenuKeyDownEscape' : 'MenuKeyDownTab'];

        closeMenu(type);

        const triggerEl = triggerRef?.current;

        if (triggerEl && KEYS.TAB === key) {
          triggerEl.focus();
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
    dispatch({
      type: StateChangeTypes.MenuMouseLeave,
      payload: {}
    });

    onChange({ type: StateChangeTypes.MenuMouseLeave });
  }, [onChange]);

  /**
   * Effects
   */

  /**
   * Sets a state value to ensure 1 render happens after
   * opening so a menu item can be focused.
   */
  useEffect(() => {
    setMenuVisible(controlledIsExpanded);
  }, [controlledIsExpanded, menuRef, environment]);

  /**
   * Respond to clicks outside the  open menu
   */
  useEffect(() => {
    const doc = environment || document;

    if (controlledIsExpanded) {
      doc.addEventListener('click', handleMenuBlur, true);
    } else if (!controlledIsExpanded) {
      doc.removeEventListener('click', handleMenuBlur, true);
    }

    return () => {
      doc.removeEventListener('click', handleMenuBlur, true);
    };
  }, [controlledIsExpanded, handleMenuBlur, environment]);

  /**
   * Return focus to trigger when menu closes
   */
  useEffect(() => {
    if (controlledIsExpanded && !returnFocusRef.current) {
      returnFocusRef.current = triggerRef.current;
    }

    if (!controlledIsExpanded && returnFocusRef.current) {
      setTimeout(() => {
        returnFocusRef.current!.focus();
        returnFocusRef.current = null;
      });
    }
  }, [triggerRef, controlledIsExpanded]);

  /**
   * Focus initial item when menu opens
   */
  useEffect(() => {
    if (state.focusOnOpen && menuVisible && controlledFocusedValue && controlledIsExpanded) {
      const ref = itemRefs[controlledFocusedValue]?.current;

      ref && ref.focus();
    }
  }, [menuVisible, itemRefs, controlledFocusedValue, state.focusOnOpen, controlledIsExpanded]);

  /**
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseMenuReturnValue<T, L>['getTriggerProps']>(
    ({ onClick, onKeyDown, role = 'button', ...other } = {}) => ({
      'data-garden-container-id': 'containers.menu.trigger',
      'data-garden-container-version': PACKAGE_VERSION,
      ref: triggerRef,
      id: triggerId,
      'aria-expanded': state.isExpanded,
      'aria-haspopup': true,
      disabled,
      tabIndex: disabled ? -1 : 0,
      role: role === null ? undefined : role,
      ...other,
      onKeyDown: composeEventHandlers(onKeyDown, disabled ? undefined : handleTriggerKeyDown),
      onClick: composeEventHandlers(onClick, disabled ? undefined : handleTriggerClick)
    }),
    [triggerRef, disabled, state.isExpanded, handleTriggerClick, handleTriggerKeyDown, triggerId]
  );

  const getMenuProps = useCallback<IUseMenuReturnValue<T, L>['getMenuProps']>(
    ({ role = 'menu', onKeyDown, onMouseLeave, ...other } = {}) => ({
      ...getGroupProps({
        onKeyDown: composeEventHandlers(onKeyDown, disabled ? undefined : handleMenuKeyDown),
        onMouseLeave: composeEventHandlers(
          onMouseLeave,
          disabled ? undefined : handleMenuMouseLeave
        )
      }),
      'data-garden-container-id': 'containers.menu',
      'data-garden-container-version': PACKAGE_VERSION,
      'aria-labelledby': triggerId,
      role: role === null ? undefined : role,
      ref: menuRef,
      ...other
    }),
    [triggerId, menuRef, getGroupProps, handleMenuMouseLeave, handleMenuKeyDown, disabled]
  );

  const getSeparatorProps = useCallback<IUseMenuReturnValue<T, L>['getSeparatorProps']>(
    ({ role = 'separator', ...props } = {}) => ({
      'data-garden-container-id': 'containers.menu.separator',
      'data-garden-container-version': PACKAGE_VERSION,
      role: role === null ? undefined : role,
      ...props
    }),
    []
  );

  const getItemGroupProps = useCallback<IUseMenuReturnValue<T, L>['getItemGroupProps']>(
    ({ role = 'group', ...props }) => ({
      'data-garden-container-id': 'containers.menu.item_group',
      'data-garden-container-version': PACKAGE_VERSION,
      role: role === null ? undefined : role,
      ...props
    }),
    []
  );

  const getItemProps = useCallback<IUseMenuReturnValue<T, L>['getItemProps']>(
    ({
      role = 'menuitem',
      disabled: itemDisabled,
      onClick,
      onKeyDown,
      onMouseEnter,
      type,
      name,
      value,
      label = value,
      ...other
    }) => {
      let itemRole = role;

      if (type) {
        itemRole = ItemRoles[type];
      }

      const selected = isItemSelected(type, name, value);

      /**
       * Since the "select" behavior of useSelection isn't
       * leveraged in useMenu, the `aria-selected` attribute
       * is intentionally null in all cases.
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

      const handleItemClick = () => {
        const changeType = StateChangeTypes.MenuItemClick;

        const nextSelection = getSelectionValue({ value, type, name, label, selected });

        if (!isExpandedControlled || !isSelectionValueControlled) {
          dispatch({
            type: changeType,
            payload: {
              ...(isExpandedControlled ? {} : { isExpanded: false }),
              ...(!isSelectionValueControlled && nextSelection
                ? { selectedItems: nextSelection }
                : {})
            }
          });
        }

        onChange({
          type: changeType,
          isExpanded: false,
          ...(nextSelection ? { selectedItems: nextSelection } : {})
        });
      };

      const handleItemKeyDown = (event: KeyboardEvent) => {
        const { key } = event;
        const isJumpKey = [KEYS.HOME, KEYS.END].includes(key);
        const isSelectKey = [KEYS.SPACE, KEYS.ENTER].includes(key);
        const isArrowKey = [KEYS.UP, KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT].includes(key);
        const isAlphanumericChar = key.length === 1 && /\S/u.test(key);

        let changeType;
        let payload;
        let changes;

        if (isSelectKey) {
          event.preventDefault();

          changeType = StateChangeTypes[toMenuItemKeyDownType(key)];
          const nextSelection = getSelectionValue({ value, type, name, label, selected });

          if (!isExpandedControlled || !isSelectionValueControlled) {
            payload = {
              ...(isExpandedControlled ? {} : { isExpanded: false }),
              ...(!isSelectionValueControlled && nextSelection
                ? { selectedItems: nextSelection }
                : {})
            };
          }

          changes = {
            isExpanded: false,
            ...(nextSelection ? { selectedItems: nextSelection } : {})
          };
        }

        if (isArrowKey || isJumpKey || isAlphanumericChar) {
          changeType = StateChangeTypes[toMenuItemKeyDownType(key)];
          const nextFocusedValue = getNextFocusedValue(value, key, isAlphanumericChar);

          if (isAlphanumericChar) {
            changeType = isAlphanumericChar ? StateChangeTypes.MenuItemKeyDown : changeType;
          }

          payload = {
            ...(isFocusedValueControlled ? {} : { focusedValue: nextFocusedValue })
          };

          changes = { focusedValue: nextFocusedValue };
        }

        if (changeType) {
          payload && dispatch({ type: changeType, payload });

          onChange({ type: changeType, ...(changes || {}) });
        }
      };

      const handleItemMouseEnter = () => {
        const changeType = StateChangeTypes.MenuItemMouseMove;

        dispatch({
          type: changeType,
          payload: {
            ...(isFocusedValueControlled ? {} : { focusedValue: value })
          }
        });

        onChange({
          type: changeType,
          focusedValue: value
        });
      };

      const itemProps = getElementProps({
        value,
        ...elementProps,
        onClick: composeEventHandlers(onClick, handleItemClick),
        onKeyDown: composeEventHandlers(onKeyDown, handleItemKeyDown),
        onMouseEnter: composeEventHandlers(onMouseEnter, handleItemMouseEnter)
      });

      if (itemProps.ref !== itemRefs[value]) {
        itemRefs[value] = itemProps.ref as RefObject<any>;
      }

      return itemProps;
    },
    [
      isFocusedValueControlled,
      isExpandedControlled,
      isItemSelected,
      isSelectionValueControlled,
      getElementProps,
      getNextFocusedValue,
      getSelectionValue,
      onChange,
      itemRefs
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
