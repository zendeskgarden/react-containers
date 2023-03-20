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
import { toType } from './utils';

export const useCombobox = ({
  idPrefix,
  triggerRef,
  inputRef,
  listboxRef,
  isAutocomplete = true,
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
}: IUseComboboxProps): IUseComboboxReturnValue => {
  const doc = environment || document;

  /*
   * State
   */

  interface IPreviousState extends IDownshiftState<OptionValue> {
    type: IDownshiftStateChangeType;
    altKey?: boolean;
  }

  const prefix = `${useId(idPrefix)}-`;
  const [triggerContainsInput, setTriggerContainsInput] = useState<boolean>();
  const [matchValue, setMatchValue] = useState('');
  const matchTimeoutRef = useRef<number>();
  const previousStateRef = useRef<IPreviousState>();
  const labels: Record<OptionValue, string> = useMemo(() => ({}), []);
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

      labels[option.value] = option.label || option.value;
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
  const initialInputValue = isMultiselectable ? '' : labels[initialSelectionValue];
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
      throw new Error('Error: expected useCombobox `selectionValue` to be a string.');
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

        case useDownshift.stateChangeTypes.InputFocus:
          // Prevent expansion on focus.
          return { ...state, isOpen: false };

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
          if (isMultiselectable) {
            // A multiselectable combobox remains expanded on selection.
            changes.isOpen = state.isOpen;
            changes.highlightedIndex = state.highlightedIndex;
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

  const transformValue = (value: OptionValue | null) => (value ? labels[value] : '');

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
    closeMenu: closeListbox,
    openMenu: openListbox,
    setHighlightedIndex: setActiveIndex,
    selectItem: setDownshiftSelection
  } = useDownshift<OptionValue | OptionValue[]>({
    id: prefix,
    toggleButtonId: `${prefix}-trigger`,
    menuId: `${prefix}-listbox`,
    getItemId: index => `${prefix}-option-${index}`,
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
    environment: doc.defaultView || window
  });

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
      // Trigger autocomplete selection override. Use layout effect to prevent
      // `defaultActiveIndex` flash.
      if (isAutocomplete && _isExpanded && _selectionValue && !matchValue) {
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
    }
  });

  /*
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseComboboxReturnValue['getTriggerProps']>(
    ({ onBlur, onClick, onKeyDown, ...other } = {}) => {
      const handleBlur = (event: React.FocusEvent) => {
        if (event.relatedTarget === null || !event.currentTarget?.contains(event.relatedTarget)) {
          closeListbox();
        }
      };

      const triggerProps = getDownshiftTriggerProps({
        'data-garden-container-id': 'containers.combobox',
        'data-garden-container-version': PACKAGE_VERSION,
        onBlur: composeEventHandlers(onBlur, handleBlur),
        onClick,
        onKeyDown,
        ref: triggerRef,
        disabled,
        ...other
      } as IDownshiftTriggerProps);

      if (isEditable && triggerContainsInput) {
        const handleClick = (event: MouseEvent) => {
          if (disabled) {
            event.preventDefault();
          } else if (isAutocomplete) {
            triggerProps.onClick(event);
          } else {
            inputRef.current?.focus();
          }
        };

        return {
          ...triggerProps,
          onClick: composeEventHandlers(onClick, handleClick),
          /* Knock out ARIA for non-autocomplete Garden layout trigger */
          'aria-controls': isAutocomplete ? triggerProps['aria-controls'] : undefined,
          'aria-expanded': isAutocomplete ? triggerProps['aria-expanded'] : undefined,
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

          if (!_isExpanded && (event.key === KEYS.SPACE || event.key === KEYS.ENTER)) {
            openListbox();
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

              if (labels[value].toLowerCase().startsWith(_matchValue.toLowerCase())) {
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
      matchValue,
      values,
      labels,
      triggerContainsInput,
      isAutocomplete,
      isEditable,
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
    ({
      role = isEditable ? 'combobox' : null,
      'aria-labelledby': ariaLabeledBy = null,
      onClick,
      onFocus,
      ...other
    } = {}) => {
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

        return getDownshiftInputProps({
          ...inputProps,
          disabled,
          role,
          'aria-labelledby': ariaLabeledBy,
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
    ({ option, onClick, onFocus, onKeyDown, ...other }) => {
      // Prevent tag click from affecting expansion.
      const handleClick = (event: MouseEvent) =>
        event.target instanceof Element &&
        triggerRef.current?.contains(event.target) &&
        event.stopPropagation();

      const handleFocus = () => {
        if (_isExpanded) {
          setActiveIndex(values.findIndex(value => value === option.value));
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === KEYS.BACKSPACE || event.key === KEYS.DELETE) {
          setDownshiftSelection(option.value);
        } else {
          const triggerContainsTag =
            event.target instanceof Element && triggerRef.current?.contains(event.target);

          if (
            triggerContainsTag &&
            (event.key === KEYS.DOWN || event.key === KEYS.UP || event.key === KEYS.ESCAPE)
          ) {
            const inputProps = getDownshiftInputProps();

            if (isEditable) {
              inputRef.current?.focus();
            } else {
              triggerRef.current?.focus();
            }

            inputProps.onKeyDown(event);
          } else if (triggerContainsTag && !isEditable) {
            event.stopPropagation();
          }
        }
      };

      return {
        'data-garden-container-id': 'containers.combobox.tag',
        'data-garden-container-version': PACKAGE_VERSION,
        onClick: composeEventHandlers(onClick, handleClick),
        onFocus: composeEventHandlers(onFocus, handleFocus),
        onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
        ...other
      };
    },
    [
      triggerRef,
      setDownshiftSelection,
      getDownshiftInputProps,
      isEditable,
      _isExpanded,
      values,
      setActiveIndex,
      inputRef
    ]
  );

  const getListboxProps = useCallback<IUseComboboxReturnValue['getListboxProps']>(
    ({ role = 'listbox', 'aria-labelledby': ariaLabeledBy = null, ...other }) =>
      getDownshiftListboxProps({
        'data-garden-container-id': 'containers.combobox.listbox',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: listboxRef,
        role,
        'aria-labelledby': ariaLabeledBy,
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
        'aria-disabled': option?.disabled,
        ...other
      };

      if (option === undefined || option.disabled) {
        // Prevent downshift listbox mouse leave event.
        const handleMouseDown = (event: MouseEvent) => event.preventDefault();

        return {
          ...optionProps,
          onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown)
        };
      }

      const ariaSelected = Array.isArray(_selectionValue)
        ? _selectionValue?.includes(option.value)
        : _selectionValue === option.value;

      return getDownshiftOptionProps({
        item: option.value,
        index: values.indexOf(option.value),
        'aria-selected': ariaSelected,
        ...optionProps
      } as IDownshiftOptionProps<OptionValue>);
    },
    [getDownshiftOptionProps, values, _selectionValue]
  );

  /** Actions */

  const removeSelection = useCallback<IUseComboboxReturnValue['removeSelection']>(
    value => {
      if (value === undefined) {
        // Clear selection
        setDownshiftSelection(null);
      } else {
        const removeValue = typeof value === 'object' ? value.value : value;

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
        label: labels[_selectionValue],
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
