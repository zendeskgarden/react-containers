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
  selectedValue,
  transformValue = value => value || '',
  onExpansionChange
}: IUseComboboxProps): IUseComboboxReturnValue => {
  /*
   * Validation
   */

  if (selectedValue !== undefined) {
    if (isMultiselectable && !Array.isArray(selectedValue)) {
      throw new Error(
        'Error: expected multiselectable useCombobox `selectedValue` to be an array.'
      );
    } else if (!isMultiselectable && Array.isArray(selectedValue)) {
      throw new Error('Error: expected useCombobox `selectedValue` to be a string.');
    }
  }

  const [triggerContainsInput, setTriggerContainsInput] = useState<boolean>();
  const [openChangeType, setOpenChangeType] = useState<string>();
  const [selectedValueState, setSelectedValueState] =
    useState<IUseComboboxProps['selectedValue']>(selectedValue);

  const handleDownshiftOpenChange: IUseDownshiftProps<OptionValue>['onIsOpenChange'] = ({
    type,
    isOpen,
    highlightedIndex,
    inputValue,
    selectedItem
  }) => {
    triggerContainsInput && setOpenChangeType(type);

    if (onExpansionChange) {
      return onExpansionChange({
        isExpanded: isOpen || false,
        type,
        activeIndex: highlightedIndex,
        inputValue,
        selectedOption: selectedItem
      });
    }

    return undefined;
  };

  const handleDownshiftStateChange: IUseDownshiftProps<OptionValue>['onStateChange'] = changes => {
    // console.log(changes);
  };

  const stateReducer: IUseDownshiftProps<OptionValue>['stateReducer'] = (
    state,
    { changes, ...action }
  ) => {
    if (isMultiselectable && state.selectedItem !== changes.selectedItem) {
      if (selectedValueState) {
        if (selectedValueState.includes(changes.selectedItem!)) {
          setSelectedValueState(
            (selectedValueState as OptionValue[]).filter(value => value !== changes.selectedItem)
          );
        } else {
          setSelectedValueState([...selectedValueState, changes.selectedItem!]);
        }
      } else {
        setSelectedValueState([changes.selectedItem!]);
      }

      delete changes.selectedItem;
      changes.inputValue = '';
    } else if (!isMultiselectable && changes.selectedItem) {
      setSelectedValueState(changes.selectedItem);
    }

    return changes;
  };

  const {
    isOpen: isExpanded,
    highlightedIndex: activeIndex,
    getToggleButtonProps: getDownshiftTriggerProps,
    getInputProps: getDownshiftInputProps,
    getMenuProps: getDownshiftListboxProps,
    getItemProps: getDownshiftOptionProps,
    closeMenu
  } = useDownshift<OptionValue>({
    items: values,
    itemToString: transformValue,
    onIsOpenChange: handleDownshiftOpenChange,
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

      return getDownshiftOptionProps({
        item: value,
        index: values.indexOf(value),
        ...optionProps
      } as IDownshiftOptionProps<OptionValue>);
    },
    [getDownshiftOptionProps, values]
  );

  return useMemo<IUseComboboxReturnValue>(
    () => ({
      isExpanded,
      activeValue: values[activeIndex],
      selectedValue: selectedValueState,
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps
    }),
    [
      values,
      selectedValueState,
      isExpanded,
      activeIndex,
      getTriggerProps,
      getInputProps,
      getListboxProps,
      getOptionProps
    ]
  );
};
