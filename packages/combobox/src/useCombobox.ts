/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { composeEventHandlers, useId } from '@zendeskgarden/container-utilities';
import {
  useCombobox as useDownshift,
  UseComboboxGetInputPropsOptions as IDownshiftInputProps,
  UseComboboxGetItemPropsOptions as IDownshiftOptionProps,
  UseComboboxGetMenuPropsOptions as IDownshiftListboxProps,
  UseComboboxGetToggleButtonPropsOptions as IDownshiftTriggerProps,
  UseComboboxProps as IUseDownshiftProps
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
  values,
  transformValue = value => value || '',
  inputValue,
  defaultInputValue,
  initialInputValue,
  onInputChange = () => undefined,
  selectionValue,
  defaultSelectionValue,
  initialSelectionValue,
  onSelectionChange = () => undefined,
  isExpanded,
  defaultExpanded,
  initialExpanded,
  onExpansionChange = () => undefined,
  activeIndex,
  defaultActiveIndex,
  initialActiveIndex,
  onActiveIndexChange = () => undefined,
  onChange = () => undefined,
  environment
}: IUseComboboxProps): IUseComboboxReturnValue => {
  const doc = environment || document;

  /*
   * Validation
   */

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
   * State
   */

  const prefix = `${useId(idPrefix)}-`;
  const [triggerContainsInput, setTriggerContainsInput] = useState<boolean>();
  const [openChangeType, setOpenChangeType] = useState<string>();

  /*
   * Handlers
   */

  const handleDownshiftOpenChange: IUseDownshiftProps<
    OptionValue | OptionValue[]
  >['onIsOpenChange'] = ({ type, isOpen }) => {
    triggerContainsInput && setOpenChangeType(type);

    return onExpansionChange(isOpen || false);
  };

  const handleDownshiftHighlightedIndexChange: IUseDownshiftProps<
    OptionValue | OptionValue[]
  >['onHighlightedIndexChange'] = ({ highlightedIndex }) => onActiveIndexChange(highlightedIndex!);

  const handleDownshiftInputValueChange: IUseDownshiftProps<
    OptionValue | OptionValue[]
  >['onInputValueChange'] = ({ inputValue: _inputValue }) => onInputChange(_inputValue || '');

  const handleDownshiftSelectedItemChange: IUseDownshiftProps<
    OptionValue | OptionValue[]
  >['onSelectedItemChange'] = ({ selectedItem }) => onSelectionChange(selectedItem || null);

  const handleDownshiftStateChange: IUseDownshiftProps<
    OptionValue | OptionValue[]
  >['onStateChange'] = ({
    type,
    isOpen,
    selectedItem,
    inputValue: _inputValue,
    highlightedIndex
  }) => {
    onChange({
      type: toType(type),
      isExpanded: isOpen,
      selectionValue: selectedItem,
      inputValue: _inputValue,
      activeIndex: highlightedIndex
    });
  };

  const stateReducer: IUseDownshiftProps<any /* vs. state/changes `selectedItem` type flipping */>['stateReducer'] =
    (state, { type, changes }) => {
      switch (type) {
        // TODO [fix] Downshift re-renders a controlled component such that natural <tab> key focus is lost.
        case useDownshift.stateChangeTypes.ControlledPropUpdatedSelectedItem:
          // Prevent Downshift from overriding the `inputValue`.
          return state;

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

        // TODO [feat] add isInputClearedOnEscape prop.
        case useDownshift.stateChangeTypes.InputKeyDownEscape:
          // Prevent clear on escape.
          return { ...state, isOpen: false };
      }

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

      return changes;
    };

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
    selectItem: setSelectionValue,
    setHighlightedIndex: setActiveIndex,
    setInputValue
  } = useDownshift<OptionValue | OptionValue[]>({
    id: prefix,
    toggleButtonId: `${prefix}-trigger`,
    menuId: `${prefix}-listbox`,
    getItemId: index => `${prefix}-option-${index}`,
    items: values,
    inputValue,
    defaultInputValue,
    initialInputValue,
    itemToString: transformValue as any /* HACK around Downshift's generic type overuse */,
    selectedItem: selectionValue,
    defaultSelectedItem: defaultSelectionValue,
    initialSelectedItem: initialSelectionValue,
    isOpen: isExpanded,
    defaultIsOpen: defaultExpanded,
    initialIsOpen: initialExpanded,
    highlightedIndex: activeIndex,
    defaultHighlightedIndex: defaultActiveIndex,
    initialHighlightedIndex: initialActiveIndex,
    onSelectedItemChange: handleDownshiftSelectedItemChange,
    onIsOpenChange: handleDownshiftOpenChange,
    onHighlightedIndexChange: handleDownshiftHighlightedIndexChange,
    onInputValueChange: handleDownshiftInputValueChange,
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

  /*
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseComboboxReturnValue['getTriggerProps']>(
    ({ onBlur, onClick, ...other } = {}) => {
      const triggerProps = getDownshiftTriggerProps({
        'data-garden-container-id': 'containers.combobox',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: triggerRef,
        ...other
      } as IDownshiftTriggerProps);

      if (triggerContainsInput) {
        const handleBlur = (event: React.FocusEvent) => {
          if (event.relatedTarget === null || !event.currentTarget?.contains(event.relatedTarget)) {
            closeListbox();
          }
        };

        const handleClick = (event: MouseEvent) => {
          if (isAutocomplete) {
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
          onClick: composeEventHandlers(onClick, handleClick)
        };
      }

      return triggerProps;
    },
    [getDownshiftTriggerProps, triggerRef, openChangeType, closeListbox, triggerContainsInput]
  );

  const getInputProps = useCallback<IUseComboboxReturnValue['getInputProps']>(
    ({ role = 'combobox', 'aria-labelledby': ariaLabeledBy = null, onClick, ...other } = {}) => {
      const handleClick = (event: MouseEvent) => triggerContainsInput && event.stopPropagation();

      return getDownshiftInputProps({
        'data-garden-container-id': 'containers.combobox.input',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: inputRef,
        role,
        'aria-labelledby': ariaLabeledBy,
        'aria-autocomplete': isAutocomplete ? 'list' : undefined,
        onClick: composeEventHandlers(onClick, handleClick),
        ...other
      } as IDownshiftInputProps);
    },
    [getDownshiftInputProps, inputRef, triggerContainsInput, isAutocomplete]
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
    ({ role = 'option', value, ...other } = {}) => {
      const optionProps = {
        'data-garden-container-id': 'containers.combobox.option',
        'data-garden-container-version': PACKAGE_VERSION,
        role,
        ...other
      };

      if (other['aria-disabled'] || value === undefined || value === null) {
        return optionProps;
      }

      const ariaSelected = Array.isArray(_selectionValue)
        ? _selectionValue?.includes(value)
        : _selectionValue === value;

      return getDownshiftOptionProps({
        item: value,
        index: values.indexOf(value),
        'aria-selected': ariaSelected,
        ...optionProps
      } as IDownshiftOptionProps<OptionValue>);
    },
    [getDownshiftOptionProps, values, _selectionValue]
  );

  const setExpansion = useCallback(
    (isOpen: boolean) => (isOpen ? openListbox() : closeListbox()),
    [openListbox, closeListbox]
  );

  return useMemo<IUseComboboxReturnValue>(
    () => ({
      /* prop getters */
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      /* state */
      isExpanded: _isExpanded,
      activeValue: values[_activeIndex],
      selectionValue: _selectionValue,
      inputValue: _inputValue,
      /* state setters */
      setExpansion,
      setSelectionValue,
      setActiveIndex,
      setInputValue
    }),
    [
      values,
      _selectionValue,
      _isExpanded,
      _activeIndex,
      _inputValue,
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      setExpansion,
      setSelectionValue,
      setActiveIndex,
      setInputValue
    ]
  );
};
