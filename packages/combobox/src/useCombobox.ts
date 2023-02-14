/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { composeEventHandlers, useId } from '@zendeskgarden/container-utilities';
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
  const [openChangeType, setOpenChangeType] = useState<string>();
  const previousStateRef = useRef<IPreviousState>();
  const labels: Record<OptionValue, string> = useMemo(() => ({}), []);
  const selectedValues: OptionValue[] = useMemo(() => [], []);
  const disabledValues: OptionValue[] = useMemo(() => [], []);
  const values = useMemo(() => {
    const retVal: OptionValue[] = [];

    options.forEach(option => {
      if (option.disabled && !disabledValues.includes(option.value)) {
        disabledValues.push(option.value);
      } else {
        retVal.push(option.value);
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
          // Prevent selection on blur.
          return { ...state, isOpen: false };

        case useDownshift.stateChangeTypes.InputFocus:
          // Prevent expansion on focus.
          return { ...state, isOpen: false };

        case useDownshift.stateChangeTypes.InputKeyDownEnter:
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
    setHighlightedIndex: setActiveIndex
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
            if (openChangeType === useDownshift.stateChangeTypes.InputBlur) {
              setOpenChangeType(useDownshift.stateChangeTypes.ToggleButtonClick);
              closeListbox();
            } else {
              getDownshiftTriggerProps().onClick(event);
            }
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
      openChangeType,
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
        ...other
      } as IDownshiftInputProps);
    },
    [getDownshiftInputProps, inputRef, triggerContainsInput, disabled, isAutocomplete]
  );

  const getListboxProps = useCallback<IUseComboboxReturnValue['getListboxProps']>(
    ({ role = 'listbox', 'aria-labelledby': ariaLabeledBy = null, ...other }) =>
      getDownshiftListboxProps({
        'data-garden-container-id': 'containers.combobox.listbox',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: listboxRef,
        role,
        'aria-labelledby': ariaLabeledBy,
        ...other
      } as IDownshiftListboxProps),
    [getDownshiftListboxProps, listboxRef]
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
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      /* state */
      selection,
      isExpanded: _isExpanded,
      activeValue: values[_activeIndex],
      inputValue: _inputValue
    }),
    [
      values,
      selection,
      _isExpanded,
      _activeIndex,
      _inputValue,
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps
    ]
  );
};
