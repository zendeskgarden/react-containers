/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useField } from '@zendeskgarden/container-field';
import { composeEventHandlers, KEYS, useId } from '@zendeskgarden/container-utilities';
import {
  useCombobox as useDownshift,
  UseComboboxGetInputPropsOptions as IDownshiftInputProps,
  UseComboboxGetItemPropsOptions as IDownshiftOptionProps,
  UseComboboxGetMenuPropsOptions as IDownshiftListboxProps,
  UseComboboxGetToggleButtonPropsOptions as IDownshiftTriggerProps,
  UseComboboxProps as IUseDownshiftProps,
  UseComboboxState as IDownshiftState,
  UseComboboxStateChangeTypes as IDownshiftStateChangeType
} from 'downshift';
import { IOption, IUseComboboxProps, IUseComboboxReturnValue, OptionValue } from './types';
import { toLabel, toType } from './utils';

export const useCombobox = <
  T extends HTMLElement = HTMLElement,
  L extends HTMLElement = HTMLElement
>({
  idPrefix,
  triggerRef,
  inputRef,
  listboxRef,
  isAutocomplete,
  isMultiselectable,
  isEditable = true,
  disabled,
  hasHint,
  hasMessage,
  options = [],
  inputValue,
  selectionValue,
  isExpanded,
  defaultExpanded,
  initialExpanded,
  activeIndex,
  defaultActiveIndex,
  initialActiveIndex,
  onChange = () => undefined,
  environment
}: IUseComboboxProps<T, L>): IUseComboboxReturnValue => {
  const win = environment || window;

  /*
   * State
   */

  interface IPreviousState extends IDownshiftState<OptionValue> {
    type: IDownshiftStateChangeType;
    altKey?: boolean;
  }

  const [triggerContainsInput, setTriggerContainsInput] = useState<boolean>();
  const [matchValue, setMatchValue] = useState('');
  const matchTimeoutRef = useRef<number>();
  const prefixRef = useRef(`${useId(idPrefix)}-`);
  const previousStateRef = useRef<IPreviousState>();
  const labels: Record<string, string> = useMemo(() => ({}), []);
  const selectedValues: OptionValue[] = useMemo(() => [], []);
  const disabledValues: OptionValue[] = useMemo(() => [], []);
  const values = useMemo(() => {
    const retVal: OptionValue[] = [];
    const setValues = (option: IOption) => {
      if (option.disabled) {
        if (!disabledValues.includes(option.value)) {
          disabledValues.push(option.value);
        }
      } else {
        retVal.push(option.value);

        const index = disabledValues.indexOf(option.value);

        if (index !== -1) {
          disabledValues.splice(index, 1);
        }
      }

      if (option.selected && !selectedValues.includes(option.value)) {
        selectedValues.push(option.value);
      }

      const key = typeof option.value === 'string' ? option.value : JSON.stringify(option.value);

      labels[key] = option.label || key;
    };

    options.forEach(option => {
      if ('options' in option) {
        option.options.forEach(setValues);
      } else {
        setValues(option);
      }
    });

    return retVal;
  }, [options, disabledValues, selectedValues, labels]);
  const initialSelectionValue = isMultiselectable ? selectedValues : selectedValues[0];
  const initialInputValue = isMultiselectable ? '' : toLabel(labels, initialSelectionValue);
  const _defaultActiveIndex = useMemo(() => {
    if (defaultActiveIndex === undefined) {
      return isAutocomplete && isEditable ? 0 : undefined;
    }

    return defaultActiveIndex;
  }, [defaultActiveIndex, isAutocomplete, isEditable]);

  /*
   * Validation
   */

  if (selectionValue === undefined || selectionValue === null) {
    if (!isMultiselectable && selectedValues.length > 1) {
      throw new Error('Error: expected useCombobox `options` to have no more than one selected.');
    }
  }

  if (selectionValue !== undefined && selectionValue !== null) {
    if (isMultiselectable && !Array.isArray(selectionValue)) {
      throw new Error(
        'Error: expected multiselectable useCombobox `selectionValue` to be an array.'
      );
    } else if (!isMultiselectable && Array.isArray(selectionValue)) {
      throw new Error('Error: expected useCombobox `selectionValue` not to be an array.');
    }
  }

  /*
   * Handlers
   */

  const handleDownshiftStateChange: IUseDownshiftProps<
    OptionValue | OptionValue[]
  >['onStateChange'] = ({
    type,
    isOpen,
    selectedItem,
    inputValue: _inputValue,
    highlightedIndex
  }) =>
    onChange({
      type: toType(type),
      ...(isOpen !== undefined && { isExpanded: isOpen }),
      ...(selectedItem !== undefined && { selectionValue: selectedItem }),
      ...(_inputValue !== undefined && { inputValue: _inputValue }),
      ...(highlightedIndex !== undefined && { activeIndex: highlightedIndex })
    });

  const stateReducer: IUseDownshiftProps<any /* vs. state/changes `selectedItem` type flipping */>['stateReducer'] =
    (state, { type, changes, altKey }) => {
      switch (type) {
        case useDownshift.stateChangeTypes.ControlledPropUpdatedSelectedItem:
          // Prevent Downshift from overriding the `inputValue`.
          return state;

        case useDownshift.stateChangeTypes.FunctionSetHighlightedIndex:
          if (previousStateRef.current?.altKey) {
            // Prevent option activation for autocomplete selection override.
            changes.highlightedIndex = -1;
          }

          break;

        case useDownshift.stateChangeTypes.FunctionCloseMenu:
        case useDownshift.stateChangeTypes.InputBlur:
          // Prevent selection on blur; retain expansion on multiselectable tag focus.
          return {
            ...state,
            isOpen:
              (type === useDownshift.stateChangeTypes.InputBlur &&
                triggerContainsInput &&
                isMultiselectable &&
                state.isOpen) ||
              false
          };

        case useDownshift.stateChangeTypes.InputClick:
          if (!isAutocomplete) {
            // Prevent input click listbox expansion on non-autocomplete comboboxes.
            changes.isOpen = state.isOpen;
          }

          break;

        case useDownshift.stateChangeTypes.InputKeyDownArrowDown:
        case useDownshift.stateChangeTypes.FunctionOpenMenu:
          if (state.isOpen !== changes.isOpen && !altKey) {
            // Fix Downshift standard first option activation on listbox
            // expansion. Addresses problems with initial multiselectable and
            // overeager `defaultActiveIndex` comboboxes.
            changes.highlightedIndex = 0;
          }

          break;

        case useDownshift.stateChangeTypes.InputKeyDownArrowUp:
          if (state.isOpen !== changes.isOpen) {
            // Fix Downshift standard last option activation on listbox
            // expansion. Addresses problems with initial multiselectable and
            // overeager `defaultActiveIndex` comboboxes.
            changes.highlightedIndex = values.length - 1;
          }

          break;

        case useDownshift.stateChangeTypes.InputKeyDownEnter:
        case useDownshift.stateChangeTypes.FunctionSelectItem:
        case useDownshift.stateChangeTypes.ItemClick:
          // Prevent selection from altering active index.
          changes.highlightedIndex = state.highlightedIndex;

          if (isMultiselectable) {
            // A multiselectable combobox remains expanded on selection.
            changes.isOpen = state.isOpen;
            changes.inputValue = '';
          }

          break;

        // TODO [feat] add isInputResetOnEscape prop.
        case useDownshift.stateChangeTypes.InputKeyDownEscape:
          // Prevent clear on escape.
          return { ...state, isOpen: false };

        case useDownshift.stateChangeTypes.InputKeyDownPageDown:
        case useDownshift.stateChangeTypes.InputKeyDownPageUp:
          // Prevent Downshift option jump.
          return state;
      }

      // Handle multiselectable state changes
      if (isMultiselectable && state.selectedItem !== changes.selectedItem) {
        if (
          state.selectedItem !== undefined &&
          state.selectedItem !== null &&
          changes.selectedItem !== undefined &&
          changes.selectedItem !== null
        ) {
          if (state.selectedItem.includes(changes.selectedItem)) {
            changes.selectedItem = (state.selectedItem as OptionValue[]).filter(
              value => value !== changes.selectedItem
            );
          } else {
            changes.selectedItem = [...state.selectedItem, changes.selectedItem];
          }
        } else if (changes.selectedItem !== undefined && changes.selectedItem !== null) {
          changes.selectedItem = [changes.selectedItem];
        } else {
          changes.selectedItem = [];
        }
      }

      previousStateRef.current = { type, altKey, ...state };

      return changes;
    };

  const transformValue = (value: OptionValue | null) => (value ? toLabel(labels, value) : '');

  const getOptionId = useCallback(
    (index: number, isDisabled?: boolean) =>
      `${prefixRef.current}-option${isDisabled ? '-disabled' : ''}-${index}`,
    []
  );

  /** Hooks */

  const {
    selectedItem: _selectionValue,
    isOpen: _isExpanded,
    highlightedIndex: _activeIndex,
    inputValue: _inputValue,
    getToggleButtonProps: getDownshiftTriggerProps,
    getInputProps: getDownshiftInputProps,
    getMenuProps: getDownshiftListboxProps,
    getItemProps: getDownshiftOptionProps,
    closeMenu,
    openMenu,
    setHighlightedIndex,
    selectItem
  } = useDownshift<OptionValue | OptionValue[]>({
    id: prefixRef.current,
    toggleButtonId: `${prefixRef.current}-trigger`,
    menuId: `${prefixRef.current}-listbox`,
    getItemId: getOptionId,
    items: values,
    inputValue,
    initialInputValue,
    itemToString: transformValue as any /* HACK around Downshift's generic type overuse */,
    selectedItem: selectionValue,
    initialSelectedItem: initialSelectionValue,
    isOpen: isExpanded,
    defaultIsOpen: defaultExpanded,
    initialIsOpen: initialExpanded,
    highlightedIndex: activeIndex,
    defaultHighlightedIndex: _defaultActiveIndex,
    initialHighlightedIndex: initialActiveIndex,
    onStateChange: handleDownshiftStateChange,
    stateReducer,
    environment: win as any /* HACK around Downshift's addition of Node to environment */
  });

  const closeListbox = useCallback(() => {
    closeMenu();
    onChange({ type: toType(useDownshift.stateChangeTypes.FunctionCloseMenu), isExpanded: false });
  }, [closeMenu, onChange]);

  const openListbox = useCallback(() => {
    openMenu();
    onChange({ type: toType(useDownshift.stateChangeTypes.FunctionOpenMenu), isExpanded: true });
  }, [openMenu, onChange]);

  const setActiveIndex = useCallback(
    index => {
      setHighlightedIndex(index);
      onChange({
        type: toType(useDownshift.stateChangeTypes.FunctionSetHighlightedIndex),
        activeIndex: index
      });
    },
    [onChange, setHighlightedIndex]
  );

  const setDownshiftSelection = useCallback(
    (value: OptionValue | OptionValue[] | null) => {
      selectItem(value);
      onChange({
        type: toType(useDownshift.stateChangeTypes.FunctionSelectItem),
        selectionValue: value
      });
    },
    [onChange, selectItem]
  );

  const {
    getLabelProps: getFieldLabelProps,
    getHintProps,
    getInputProps: getFieldInputProps,
    getMessageProps
  } = useField({ idPrefix, hasHint, hasMessage });

  /*
   * Effects
   */

  useLayoutEffect(
    () => {
      // Trigger autocomplete/select-only selection override. Use layout effect
      // to prevent `defaultActiveIndex` flash.
      if (
        (isAutocomplete || !isEditable) &&
        _isExpanded &&
        !previousStateRef.current?.isOpen &&
        _selectionValue &&
        !matchValue
      ) {
        const value = Array.isArray(_selectionValue)
          ? _selectionValue[
              _selectionValue.length - 1 // multiselectable most recent
            ]
          : _selectionValue;
        const index = values.findIndex(current => current === value);

        if (index !== -1) {
          setActiveIndex(index);
        } else if (_defaultActiveIndex !== undefined) {
          setActiveIndex(_defaultActiveIndex);
        }
      }
    },
    /* eslint-disable-line react-hooks/exhaustive-deps */ [
      /* matchValue, // prevent match active index reset */
      isAutocomplete,
      isEditable,
      _isExpanded,
      _selectionValue,
      _inputValue,
      values,
      _defaultActiveIndex,
      setActiveIndex
    ]
  );

  useEffect(
    // Downshift does not expect a dropdown like Garden's combobox where the
    // wrapping div functions like an open/close button. Finesse state so that
    // default close-on-blur functionality is not undone by the toggle of the
    // trigger.
    () => setTriggerContainsInput(triggerRef.current?.contains(inputRef.current)),
    [triggerRef, inputRef]
  );

  useEffect(() => {
    // Clear the select-only match value after the the user stops typing for
    // half a second.
    clearTimeout(matchTimeoutRef.current);
    matchTimeoutRef.current = window.setTimeout(() => setMatchValue(''), 500);

    return () => clearTimeout(matchTimeoutRef.current);
  }, [matchValue]);

  useEffect(() => {
    if (previousStateRef.current?.type === useDownshift.stateChangeTypes.FunctionSelectItem) {
      // Keep combobox focused on selection removal.
      if (isEditable) {
        inputRef.current?.focus();
      } else {
        triggerRef.current?.focus();
      }

      previousStateRef.current = {
        ...previousStateRef.current,
        type: useDownshift.stateChangeTypes.InputClick
      };
    }
  });

  useEffect(() => {
    if (isEditable && inputRef.current === win.document.activeElement) {
      // Scroll input into view on focus.
      inputRef.current?.scrollIntoView && inputRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [inputRef, isEditable, win.document.activeElement]);

  /*
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseComboboxReturnValue['getTriggerProps']>(
    ({ onBlur, onClick, onKeyDown, ...other } = {}) => {
      const triggerProps = getDownshiftTriggerProps({
        'data-garden-container-id': 'containers.combobox',
        'data-garden-container-version': PACKAGE_VERSION,
        onBlur,
        onClick,
        onKeyDown,
        ref: triggerRef,
        disabled,
        ...other
      } as IDownshiftTriggerProps);

      const handleBlur = (event: React.FocusEvent) => {
        if (event.relatedTarget === null || !event.currentTarget?.contains(event.relatedTarget)) {
          closeListbox();
        }
      };

      if (isEditable && triggerContainsInput) {
        const handleClick = (event: React.MouseEvent) => {
          if (disabled) {
            event.preventDefault();
          } else if (isAutocomplete) {
            triggerProps.onClick && triggerProps.onClick(event);
          } else {
            inputRef.current?.focus();
          }
        };

        return {
          ...triggerProps,
          onBlur: composeEventHandlers(onBlur, handleBlur),
          onClick: composeEventHandlers(onClick, handleClick),
          /* Knock out ARIA for non-autocomplete Garden layout trigger */
          'aria-controls': isAutocomplete ? triggerProps['aria-controls'] : undefined,
          /* Knock out ARIA for Garden layout trigger */
          'aria-expanded': undefined,
          /* Handle disabled for Garden layout */
          'aria-disabled': disabled || undefined,
          disabled: undefined
        };
      } else if (!isEditable) {
        const { 'aria-activedescendant': ariaActiveDescendant, onKeyDown: onDownshiftKeyDown } =
          getDownshiftInputProps({}, { suppressRefError: true });
        const { 'aria-labelledby': ariaLabeledBy } = getFieldInputProps();

        const handleKeyDown = (event: KeyboardEvent) => {
          event.stopPropagation();

          /* istanbul ignore else */
          if (!_isExpanded && (event.key === KEYS.SPACE || event.key === KEYS.ENTER)) {
            event.preventDefault();
            openListbox();
          } else if (
            _isExpanded &&
            !matchValue &&
            (event.key === KEYS.SPACE || event.key === KEYS.ENTER)
          ) {
            event.preventDefault();

            if (_activeIndex !== -1) {
              setDownshiftSelection(values[_activeIndex]);
            }

            if (!isMultiselectable) {
              closeListbox();
            }
          } else if (/^(?:\S| ){1}$/u.test(event.key)) {
            // Handle option matching described under
            // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/#kbd_label
            const _matchValue = `${matchValue}${event.key}`;

            setMatchValue(_matchValue);

            let offset = 0;

            if (_isExpanded) {
              if (_activeIndex !== -1) {
                offset = _matchValue.length === 1 ? _activeIndex + 1 : _activeIndex;
              }
            } else {
              openListbox();

              const offsetValue = Array.isArray(_selectionValue)
                ? _selectionValue[
                    _selectionValue.length - 1 // multiselectable most recent
                  ]
                : _selectionValue;

              if (offsetValue !== null) {
                offset = values.findIndex(current => current === offsetValue);
              }
            }

            for (let index = 0; index < values.length; index++) {
              const valueIndex = (index + offset) % values.length;
              const value = values[valueIndex];

              if (toLabel(labels, value).toLowerCase().startsWith(_matchValue.toLowerCase())) {
                setActiveIndex(valueIndex);
                break;
              }
            }
          }
        };

        return {
          ...triggerProps,
          'aria-activedescendant': ariaActiveDescendant,
          'aria-haspopup': 'listbox',
          'aria-labelledby': ariaLabeledBy,
          'aria-disabled': disabled || undefined,
          disabled: undefined,
          role: 'combobox',
          onBlur: composeEventHandlers(onBlur, handleBlur),
          onKeyDown: composeEventHandlers(onKeyDown, onDownshiftKeyDown, handleKeyDown),
          tabIndex: disabled ? -1 : 0
        };
      }

      return triggerProps;
    },
    [
      getDownshiftTriggerProps,
      getDownshiftInputProps,
      getFieldInputProps,
      triggerRef,
      disabled,
      _selectionValue,
      _isExpanded,
      _activeIndex,
      closeListbox,
      openListbox,
      setActiveIndex,
      setDownshiftSelection,
      matchValue,
      values,
      labels,
      triggerContainsInput,
      isAutocomplete,
      isEditable,
      isMultiselectable,
      inputRef
    ]
  );

  const getLabelProps = useCallback<IUseComboboxReturnValue['getLabelProps']>(
    ({ onClick, ...other } = {}) => {
      const { htmlFor, ...labelProps } = getFieldLabelProps(other);
      const handleClick = () => !isEditable && triggerRef.current?.focus();

      return {
        ...labelProps,
        onClick: composeEventHandlers(onClick, handleClick),
        htmlFor: isEditable ? htmlFor : undefined
      };
    },
    [getFieldLabelProps, isEditable, triggerRef]
  );

  const getInputProps = useCallback<IUseComboboxReturnValue['getInputProps']>(
    ({ role = isEditable ? 'combobox' : null, onClick, onFocus, ...other } = {}) => {
      const inputProps = {
        'data-garden-container-id': 'containers.combobox.input',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: inputRef,
        role: role === null ? undefined : role,
        onClick,
        onFocus
      };

      if (isEditable) {
        const handleClick = (event: MouseEvent) =>
          event.target instanceof Element &&
          triggerRef.current?.contains(event.target) &&
          event.stopPropagation();

        return getDownshiftInputProps<any>({
          ...inputProps,
          disabled,
          role,
          'aria-autocomplete': isAutocomplete ? 'list' : undefined,
          onClick: composeEventHandlers(onClick, handleClick),
          ...getFieldInputProps(),
          ...other
        } as IDownshiftInputProps);
      }

      const downshiftInputProps = getDownshiftInputProps({
        ...inputProps,
        disabled: true,
        'aria-autocomplete': undefined,
        'aria-activedescendant': undefined,
        'aria-controls': undefined,
        'aria-expanded': undefined,
        'aria-hidden': true,
        'aria-labelledby': undefined
      });

      const handleFocus = () => {
        if (!isEditable) {
          // Prevent Downshift from grabbing non-editable combobox focus.
          triggerRef.current?.focus();
        }
      };

      // Select-only combobox input
      return {
        ...downshiftInputProps,
        disabled,
        readOnly: true,
        tabIndex: -1,
        onFocus: composeEventHandlers(onFocus, handleFocus),
        ...other
      };
    },
    [
      getDownshiftInputProps,
      getFieldInputProps,
      inputRef,
      triggerRef,
      disabled,
      isAutocomplete,
      isEditable
    ]
  );

  const getTagProps = useCallback<IUseComboboxReturnValue['getTagProps']>(
    ({ option, onClick, onKeyDown, ...other }) => {
      // Prevent tag click from affecting expansion.
      const handleClick = (event: MouseEvent) =>
        event.target instanceof Element &&
        triggerRef.current?.contains(event.target) &&
        event.stopPropagation();

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === KEYS.BACKSPACE || event.key === KEYS.DELETE) {
          setDownshiftSelection(option.value);
        } else {
          const triggerContainsTag =
            event.target instanceof Element && triggerRef.current?.contains(event.target);

          if (triggerContainsTag && !isEditable) {
            event.stopPropagation();
          }

          if (
            triggerContainsTag &&
            (event.key === KEYS.DOWN ||
              event.key === KEYS.UP ||
              event.key === KEYS.ESCAPE ||
              (!isEditable && (event.key === KEYS.ENTER || event.key === KEYS.SPACE)))
          ) {
            const inputProps = getDownshiftInputProps();

            if (isEditable) {
              inputRef.current?.focus();
            } else {
              event.preventDefault();
              triggerRef.current?.focus();
            }

            inputProps.onKeyDown && inputProps.onKeyDown(event);
          }
        }
      };

      return {
        'data-garden-container-id': 'containers.combobox.tag',
        'data-garden-container-version': PACKAGE_VERSION,
        onClick: composeEventHandlers(onClick, handleClick),
        onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
        ...other
      };
    },
    [triggerRef, setDownshiftSelection, getDownshiftInputProps, isEditable, inputRef]
  );

  const getListboxProps = useCallback<IUseComboboxReturnValue['getListboxProps']>(
    ({ role = 'listbox', ...other }) =>
      getDownshiftListboxProps<any>({
        'data-garden-container-id': 'containers.combobox.listbox',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: listboxRef,
        role,
        'aria-multiselectable': isMultiselectable ? true : undefined,
        ...other
      } as IDownshiftListboxProps),
    [getDownshiftListboxProps, listboxRef, isMultiselectable]
  );

  const getOptGroupProps = useCallback<IUseComboboxReturnValue['getOptGroupProps']>(
    ({ role = 'group', ...other }) => ({
      'data-garden-container-id': 'containers.combobox.optgroup',
      'data-garden-container-version': PACKAGE_VERSION,
      role: role === null ? undefined : role,
      ...other
    }),
    []
  );

  const getOptionProps = useCallback<IUseComboboxReturnValue['getOptionProps']>(
    ({ role = 'option', option, onMouseDown, ...other } = {}) => {
      const optionProps = {
        'data-garden-container-id': 'containers.combobox.option',
        'data-garden-container-version': PACKAGE_VERSION,
        role,
        onMouseDown,
        ...other
      };

      let ariaSelected = false;

      if (option?.value !== undefined) {
        ariaSelected = Array.isArray(_selectionValue)
          ? _selectionValue?.includes(option?.value)
          : _selectionValue === option?.value;
      }

      if (option === undefined || option.disabled) {
        // Prevent downshift listbox mouse leave event.
        const handleMouseDown = (event: MouseEvent) => event.preventDefault();

        return {
          'aria-disabled': true,
          'aria-selected': ariaSelected,
          id: option
            ? getOptionId(disabledValues.indexOf(option.value), option.disabled)
            : undefined,
          ...optionProps,
          onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown)
        };
      }

      return getDownshiftOptionProps<any>({
        item: option.value,
        index: values.indexOf(option.value),
        'aria-disabled': undefined,
        'aria-selected': ariaSelected,
        ...optionProps
      } as IDownshiftOptionProps<OptionValue>);
    },
    [getDownshiftOptionProps, disabledValues, values, _selectionValue, getOptionId]
  );

  /** Actions */

  const removeSelection = useCallback<IUseComboboxReturnValue['removeSelection']>(
    value => {
      if (value === undefined) {
        // Clear selection
        setDownshiftSelection(null);
      } else {
        const removeValue = typeof value === 'object' && 'value' in value ? value.value : value;

        if (Array.isArray(_selectionValue) && _selectionValue.includes(removeValue)) {
          setDownshiftSelection(removeValue);
        } else if (_selectionValue === removeValue) {
          setDownshiftSelection(null);
        } else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
          // eslint-disable-next-line no-console
          console.warn(
            `Warning: useCombobox \`selection\` does not contain '${removeValue}' for removal.`
          );
        }
      }
    },
    [_selectionValue, setDownshiftSelection]
  );

  const selection = useMemo(() => {
    if (Array.isArray(_selectionValue)) {
      return _selectionValue.map(value => ({
        value,
        label: labels[value],
        disabled: disabledValues.includes(value)
      }));
    } else if (_selectionValue) {
      return {
        value: _selectionValue,
        label: toLabel(labels, _selectionValue),
        disabled: disabledValues.includes(_selectionValue)
      };
    }

    return null;
  }, [_selectionValue, disabledValues, labels]);

  return useMemo<IUseComboboxReturnValue>(
    () => ({
      /* prop getters */
      getLabelProps,
      getHintProps,
      getTriggerProps,
      getInputProps,
      getTagProps,
      getListboxProps,
      getOptGroupProps,
      getOptionProps,
      getMessageProps,
      /* state */
      selection,
      isExpanded: _isExpanded,
      activeValue: values[_activeIndex],
      inputValue: _inputValue,
      /* actions */
      removeSelection
    }),
    [
      values,
      selection,
      _isExpanded,
      _activeIndex,
      _inputValue,
      getLabelProps,
      getHintProps,
      getTriggerProps,
      getInputProps,
      getTagProps,
      getListboxProps,
      getOptGroupProps,
      getOptionProps,
      getMessageProps,
      removeSelection
    ]
  );
};
