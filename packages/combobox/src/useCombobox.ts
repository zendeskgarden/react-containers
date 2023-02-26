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
import { IUseComboboxProps, IUseComboboxReturnValue, OptionValue } from './types';
import { toType } from './utils';

export const useCombobox = ({
  idPrefix,
  triggerRef,
  inputRef,
  listboxRef,
  isAutocomplete,
  isMultiselectable,
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
  const previousStateRef = useRef<IPreviousState>();
  const labels: Record<OptionValue, string> = useMemo(() => ({}), []);
  const selectedValues: OptionValue[] = useMemo(() => [], []);
  const disabledValues: OptionValue[] = useMemo(() => [], []);
  const values = useMemo(() => {
    const retVal: OptionValue[] = [];

    options.forEach(option => {
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
    });

    return retVal;
  }, [options, disabledValues, selectedValues, labels]);
  const initialSelectionValue = isMultiselectable ? selectedValues : selectedValues[0];
  const initialInputValue = isMultiselectable ? '' : labels[initialSelectionValue];

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
          // Prevent selection on blur; retain expansion on multiselectable value focus.
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
        if (state.selectedItem && changes.selectedItem) {
          if (state.selectedItem.includes(changes.selectedItem)) {
            changes.selectedItem = (state.selectedItem as OptionValue[]).filter(
              value => value !== changes.selectedItem
            );
          } else {
            changes.selectedItem = [...state.selectedItem, changes.selectedItem];
          }
        } else if (changes.selectedItem) {
          changes.selectedItem = [changes.selectedItem];
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
    setHighlightedIndex: setActiveIndex,
    selectItem: toggleDownshiftSelection
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
    defaultHighlightedIndex: defaultActiveIndex,
    initialHighlightedIndex: initialActiveIndex,
    onStateChange: handleDownshiftStateChange,
    stateReducer,
    environment: doc.defaultView || window
  });

  const {
    getLabelProps,
    getHintProps,
    getInputProps: getFieldInputProps,
    getMessageProps
  } = useField({ idPrefix, hasHint, hasMessage });

  /*
   * Effects
   */

  useEffect(
    // Downshift does not expect a dropdown like Garden's combobox where the
    // wrapping div functions like an open/close button. Finesse state so that
    // default close-on-blur functionality is not undone by the toggle of the
    // trigger.
    () => setTriggerContainsInput(triggerRef.current?.contains(inputRef.current)),
    [triggerRef, inputRef]
  );

  useEffect(() => {
    if (previousStateRef.current?.type === useDownshift.stateChangeTypes.FunctionSelectItem) {
      // Keep input focused on selection removal.
      inputRef.current?.focus();
    }
  });

  useLayoutEffect(() => {
    // Trigger autocomplete selection override. Use layout effect to prevent
    // `defaultActiveIndex` flash.
    if (isAutocomplete && _isExpanded && _selectionValue) {
      const value = Array.isArray(_selectionValue)
        ? _selectionValue[
            _selectionValue.length - 1 // multiselectable most recent
          ]
        : _selectionValue;
      const index = values.findIndex(current => current === value);

      if (index !== -1) {
        setActiveIndex(index);
      } else if (defaultActiveIndex !== undefined) {
        setActiveIndex(defaultActiveIndex);
      }
    }
  }, [
    isAutocomplete,
    _isExpanded,
    _selectionValue,
    _inputValue,
    values,
    defaultActiveIndex,
    setActiveIndex
  ]);

  /*
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseComboboxReturnValue['getTriggerProps']>(
    ({ onBlur, onClick, ...other } = {}) => {
      const triggerProps = getDownshiftTriggerProps({
        'data-garden-container-id': 'containers.combobox',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: triggerRef,
        disabled,
        ...other
      } as IDownshiftTriggerProps);

      if (triggerContainsInput) {
        const handleBlur = (event: React.FocusEvent) => {
          if (event.relatedTarget === null || !event.currentTarget?.contains(event.relatedTarget)) {
            closeListbox();
          }
        };

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
          onBlur: composeEventHandlers(onBlur, handleBlur),
          onClick: composeEventHandlers(onClick, handleClick),
          /* Knock out ARIA for non-autocomplete Garden layout trigger */
          'aria-controls': isAutocomplete ? triggerProps['aria-controls'] : undefined,
          'aria-expanded': isAutocomplete ? triggerProps['aria-expanded'] : undefined,
          /* Handle disabled for Garden layout */
          'aria-disabled': disabled || undefined,
          disabled: undefined
        };
      }

      return triggerProps;
    },
    [
      getDownshiftTriggerProps,
      triggerRef,
      disabled,
      closeListbox,
      triggerContainsInput,
      isAutocomplete,
      inputRef
    ]
  );

  const getInputProps = useCallback<IUseComboboxReturnValue['getInputProps']>(
    ({ role = 'combobox', 'aria-labelledby': ariaLabeledBy = null, onClick, ...other } = {}) => {
      const handleClick = (event: MouseEvent) => triggerContainsInput && event.stopPropagation();

      return getDownshiftInputProps({
        'data-garden-container-id': 'containers.combobox.input',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: inputRef,
        disabled,
        role,
        'aria-labelledby': ariaLabeledBy,
        'aria-autocomplete': isAutocomplete ? 'list' : undefined,
        onClick: composeEventHandlers(onClick, handleClick),
        ...getFieldInputProps(),
        ...other
      } as IDownshiftInputProps);
    },
    [
      getDownshiftInputProps,
      getFieldInputProps,
      inputRef,
      triggerContainsInput,
      disabled,
      isAutocomplete
    ]
  );

  const getTagProps = useCallback<IUseComboboxReturnValue['getTagProps']>(
    ({ option, onClick, onKeyDown, ...other } = { option: { value: null } }) => {
      const handleClick = (event: MouseEvent) => {
        if (triggerContainsInput) {
          // Prevent tag click from affecting expansion.
          event.stopPropagation();
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === KEYS.BACKSPACE || event.key === KEYS.DELETE) {
          toggleDownshiftSelection(option.value);
        } else if (event.key === KEYS.DOWN || event.key === KEYS.UP || event.key === KEYS.ESCAPE) {
          const inputProps = getDownshiftInputProps();

          inputRef.current?.focus();
          inputProps.onKeyDown(event);
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
    [triggerContainsInput, toggleDownshiftSelection, getDownshiftInputProps, inputRef]
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

  const getOptionProps = useCallback<IUseComboboxReturnValue['getOptionProps']>(
    ({ role = 'option', option, ...other } = {}) => {
      const optionProps = {
        'data-garden-container-id': 'containers.combobox.option',
        'data-garden-container-version': PACKAGE_VERSION,
        role,
        'aria-disabled': option?.disabled,
        ...other
      };

      if (option === undefined || option.disabled) {
        return optionProps;
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
        toggleDownshiftSelection(null);
      } else {
        const removeValue = typeof value === 'object' ? value.value : value;

        if (
          (Array.isArray(_selectionValue) && _selectionValue.includes(removeValue)) ||
          _selectionValue === removeValue
        ) {
          toggleDownshiftSelection(removeValue);
        } else if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(
            `Warning: useCombobox \`selection\` does not contain '${removeValue}' for removal.`
          );
        }
      }
    },
    [_selectionValue, toggleDownshiftSelection]
  );

  const selection = useMemo(
    () =>
      Array.isArray(_selectionValue)
        ? _selectionValue.map(value => ({
            value,
            label: labels[value],
            disabled: disabledValues.includes(value)
          }))
        : {
            value: _selectionValue,
            label: labels[_selectionValue],
            disabled: disabledValues.includes(_selectionValue)
          },
    [_selectionValue, disabledValues, labels]
  );

  return useMemo<IUseComboboxReturnValue>(
    () => ({
      /* prop getters */
      getLabelProps,
      getHintProps,
      getTriggerProps,
      getInputProps,
      getTagProps,
      getListboxProps,
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
      getOptionProps,
      getMessageProps,
      removeSelection
    ]
  );
};
