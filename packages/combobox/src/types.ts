/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';

export type OptionValue = any;

export interface IUseComboboxProps<T = Element, L = Element> {
  /** Prefixes IDs for the combobox */
  idPrefix?: string;
  /** Provides ref access to the underlying trigger element */
  triggerRef: RefObject<T>;
  /** Provides ref access to the underlying input element */
  inputRef: RefObject<HTMLInputElement>;
  /** Provides ref access to the underlying listbox element */
  listboxRef: RefObject<L>;
  /** Indicates that the combobox provides autocompletion  */
  isAutocomplete?: boolean;
  /** Determines whether multiple option values can be selected */
  isMultiselectable?: boolean;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /**
   * Provides an ordered list of options
   *
   * @param {OptionValue} option.value Unique option value
   * @param {string} option.label Optional human-readable text (defaults to `option.value`)
   * @param {boolean} option.selected Sets initial selection for the option
   * @param {boolean} option.disabled Indicates that the option is not interactive
   */
  options: {
    value: OptionValue;
    label?: string;
    selected?: boolean;
    disabled?: boolean;
  }[];
  /** Sets the input value in a controlled combobox */
  inputValue?: string;
  /**
   * Handles input value changes
   *
   * @param {string} inputValue The updated input value
   */
  onInputChange?: (inputValue: string) => void;
  /** Sets the selection value (or `isMultiselectable` values) in a controlled combobox */
  selectionValue?: OptionValue | OptionValue[] | null;
  /**
   * Handles selection value changes
   *
   * @param {OptionValue|OptionValue[]} selectionValue The updated selection value(s)
   */
  onSelectionChange?: (selectionValue: OptionValue | OptionValue[] | null) => void;
  /** Determines listbox expansion in a controlled combobox */
  isExpanded?: boolean;
  /** Determines default listbox expansion in an uncontrolled combobox */
  defaultExpanded?: boolean;
  /** Determines listbox expansion on combobox initialization */
  initialExpanded?: boolean;
  /**
   * Handles listbox expansion changes
   *
   * @param {boolean} isExpanded The updated listbox expansion state
   */
  onExpansionChange?: (isExpanded: boolean) => void;
  /** Sets the currently active option index in a controlled combobox */
  activeIndex?: number;
  /** Sets the default active option index in an uncontrolled combobox */
  defaultActiveIndex?: number;
  /** Sets the active option index on combobox initialization */
  initialActiveIndex?: number;
  /**
   * Handles active option index changes
   *
   * @param {number} activeIndex The updated active option index
   */
  onActiveIndexChange?: (activeIndex: number) => void;
  /**
   * Handles combobox state changes
   *
   * @param {string} changes.type The event type that triggered the change
   * @param {boolean} [changes.isExpanded] The updated listbox expansion
   * @param {OptionValue|OptionValue[]} [changes.selectionValue] The updated selection value(s)
   * @param {string} [changes.inputValue] The updated input value
   * @param {number} [changes.activeIndex] The updated active option index
   */
  onChange?: (changes: {
    type: string;
    isExpanded?: boolean;
    selectionValue?: OptionValue | OptionValue[] | null;
    inputValue?: string;
    activeIndex?: number;
  }) => void;
  /** Sets the environment where the combobox is rendered */
  environment?: Document;
}

export interface IUseComboboxReturnValue {
  isExpanded: boolean;
  activeValue?: OptionValue;
  selectionValue?: OptionValue | OptionValue[] | null;
  inputValue?: string;
  getTriggerProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getInputProps: (
    props?: Omit<HTMLProps<HTMLInputElement>, 'role'> & {
      role?: 'combobox' | null;
    }
  ) => HTMLProps<HTMLInputElement>;
  getListboxProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role' | 'aria-label'> & {
      role?: 'listbox' | null;
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
  getOptionProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'option' | null;
      option?: {
        value: OptionValue;
        label?: string;
        selected?: boolean;
        disabled?: boolean;
      };
    }
  ) => HTMLProps<T>;
  setExpansion: (isExpanded: boolean) => void;
  setSelectionValue: (selectionValue: OptionValue | OptionValue[] | null) => void;
  setActiveIndex: (activeIndex: number) => void;
  setInputValue: (inputValue: string) => void;
}

export interface IComboboxContainerProps<T = Element, L = Element> extends IUseComboboxProps<T, L> {
  /**
   * Provides combobox render prop functions, values, and actions
   *
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getInputProps] Input props getter
   * @param {function} [options.getListboxProps] Listbox props getter
   * @param {function} [options.getOptionProps] Option props getter
   * @param {boolean} options.isExpanded Current listbox expansion
   * @param {OptionValue} [options.activeValue] Current active option value
   * @param {OptionValue|OptionValue[]} [options.selectionValue] Current selection value(s)
   * @param {string} [options.inputValue] Current input value
   * @param {function} [options.setExpansion] Listbox expansion setter
   * @param {function} [options.setSelectionValue] Selection value(s) setter
   * @param {function} [options.setActiveIndex] Active option index setter
   * @param {function} [options.setInputValue] Input value setter
   */
  render?: (options: {
    /* prop getters */
    getTriggerProps: IUseComboboxReturnValue['getTriggerProps'];
    getInputProps: IUseComboboxReturnValue['getInputProps'];
    getListboxProps: IUseComboboxReturnValue['getListboxProps'];
    getOptionProps: IUseComboboxReturnValue['getOptionProps'];
    /* state */
    isExpanded: IUseComboboxReturnValue['isExpanded'];
    activeValue?: IUseComboboxReturnValue['activeValue'];
    selectionValue?: IUseComboboxReturnValue['selectionValue'];
    inputValue?: IUseComboboxReturnValue['inputValue'];
    /* state setters */
    setExpansion: IUseComboboxReturnValue['setExpansion'];
    setSelectionValue: IUseComboboxReturnValue['setSelectionValue'];
    setActiveIndex: IUseComboboxReturnValue['setActiveIndex'];
    setInputValue: IUseComboboxReturnValue['setInputValue'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseComboboxReturnValue) => ReactNode;
}
