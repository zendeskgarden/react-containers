/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useCombobox as useDownshift,
  UseComboboxGetInputPropsOptions as IDownshiftInputProps,
  UseComboboxGetItemPropsOptions as IDownshiftOptionProps,
  UseComboboxGetMenuPropsOptions as IDownshiftListboxProps,
  UseComboboxGetToggleButtonPropsOptions as IDownshiftTriggerProps,
  UseComboboxProps as IUseDownshiftProps
} from 'downshift';
import { IUseComboboxProps, IUseComboboxReturnValue, OptionValue } from './types';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';

export const useCombobox = ({
  triggerRef,
  inputRef,
  listboxRef,
  isMultiselectable,
  values,
  transformValue = value => value || '',
  inputValue,
  onInputChange = () => undefined,
  selectionValue,
  defaultSelectionValue,
  onSelectionChange = () => undefined,
  isExpanded,
  defaultExpanded,
  onExpansionChange = () => undefined,
  activeIndex,
  onActiveIndexChange = () => undefined
}: IUseComboboxProps): IUseComboboxReturnValue => {
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

  const [triggerContainsInput, setTriggerContainsInput] = useState<boolean>();
  const [openChangeType, setOpenChangeType] = useState<string>();
  const [selectionState, setSelectionState] = useState(defaultSelectionValue);
  const isControlled = selectionValue !== undefined;
  const _selectionValue = isControlled ? selectionValue : selectionState;
  const setSelectionValue = isControlled ? onSelectionChange : setSelectionState;

  /*
   * Handlers
   */

  const handleDownshiftOpenChange: IUseDownshiftProps<OptionValue>['onIsOpenChange'] = ({
    type,
    isOpen
  }) => {
    triggerContainsInput && setOpenChangeType(type);

    return onExpansionChange(isOpen || false);
  };

  const handleDownshiftHighlightedIndexChange: IUseDownshiftProps<OptionValue>['onHighlightedIndexChange'] =
    ({ highlightedIndex }) => onActiveIndexChange(highlightedIndex!);

  const handleDownshiftInputValueChange: IUseDownshiftProps<OptionValue>['onInputValueChange'] = ({
    inputValue: _inputValue
  }) => onInputChange(_inputValue || '');

  const handleDownshiftStateChange: IUseDownshiftProps<OptionValue>['onStateChange'] = changes => {
    console.log(changes);
  };

  const stateReducer: IUseDownshiftProps<OptionValue>['stateReducer'] = (
    state,
    { type, changes }
  ) => {
    if (
      isMultiselectable &&
      (type === useDownshift.stateChangeTypes.ItemClick ||
        type === useDownshift.stateChangeTypes.InputKeyDownEnter)
    ) {
      // A multiselectable combobox remains expanded on selection.
      changes.isOpen = state.isOpen;
      changes.highlightedIndex = state.highlightedIndex;
      changes.inputValue = '';
    }

    if (state.selectedItem !== changes.selectedItem) {
      let newSelectionValue;

      if (isMultiselectable) {
        if (_selectionValue) {
          if (_selectionValue.includes(changes.selectedItem!)) {
            newSelectionValue = (_selectionValue as OptionValue[]).filter(
              value => value !== changes.selectedItem
            );
          } else {
            newSelectionValue = [..._selectionValue, changes.selectedItem!];
          }
        } else {
          newSelectionValue = [changes.selectedItem!];
        }
      } else {
        newSelectionValue = changes.selectedItem || null;
      }

      setSelectionValue(newSelectionValue);
      (changes.selectedItem as IUseComboboxProps['selectionValue']) = newSelectionValue;
    }

    return changes;
  };

  const {
    isOpen: _isExpanded,
    highlightedIndex: _activeIndex,
    getToggleButtonProps: getDownshiftTriggerProps,
    getInputProps: getDownshiftInputProps,
    getMenuProps: getDownshiftListboxProps,
    getItemProps: getDownshiftOptionProps,
    closeMenu
  } = useDownshift<OptionValue>({
    items: values,
    inputValue,
    itemToString: transformValue,
    isOpen: isExpanded,
    defaultIsOpen: defaultExpanded,
    highlightedIndex: activeIndex,
    onIsOpenChange: handleDownshiftOpenChange,
    onHighlightedIndexChange: handleDownshiftHighlightedIndexChange,
    onInputValueChange: handleDownshiftInputValueChange,
    onStateChange: handleDownshiftStateChange,
    stateReducer
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
        const handleBlur = (event: FocusEvent) => {
          if (
            event.relatedTarget === null ||
            !(event.currentTarget as Node)?.contains(event.relatedTarget as Node)
          ) {
            closeMenu();
          }
        };

        const handleClick = (event: MouseEvent) => {
          if (openChangeType === useDownshift.stateChangeTypes.InputBlur) {
            setOpenChangeType(useDownshift.stateChangeTypes.ToggleButtonClick);
            closeMenu();
          } else {
            getDownshiftTriggerProps().onClick(event);
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
    [getDownshiftTriggerProps, triggerRef, openChangeType, closeMenu, triggerContainsInput]
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
        onClick: composeEventHandlers(onClick, handleClick),
        ...other
      } as IDownshiftInputProps);
    },
    [getDownshiftInputProps, inputRef, triggerContainsInput]
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

  return useMemo<IUseComboboxReturnValue>(
    () => ({
      isExpanded: _isExpanded,
      activeValue: values[_activeIndex],
      selectionValue: _selectionValue,
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps
    }),
    [
      values,
      _selectionValue,
      _isExpanded,
      _activeIndex,
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps
    ]
  );
};
