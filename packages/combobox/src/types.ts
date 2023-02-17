/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseFieldReturnValue } from '@zendeskgarden/container-field';
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
  /** Indicates the combobox has a hint */
  hasHint?: boolean;
  /** Indicates the combobox has a message */
  hasMessage?: boolean;
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
  /** Sets the selection value (or `isMultiselectable` values) in a controlled combobox */
  selectionValue?: OptionValue | OptionValue[] | null;
  /** Determines listbox expansion in a controlled combobox */
  isExpanded?: boolean;
  /** Determines default listbox expansion in an uncontrolled combobox */
  defaultExpanded?: boolean;
  /** Determines listbox expansion on combobox initialization */
  initialExpanded?: boolean;
  /** Sets the currently active option index in a controlled combobox */
  activeIndex?: number;
  /** Sets the default active option index in an uncontrolled combobox */
  defaultActiveIndex?: number;
  /** Sets the active option index on combobox initialization */
  initialActiveIndex?: number;
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
  selection:
    | { value?: OptionValue | null; label?: string; disabled?: boolean }
    | { value: OptionValue; label?: string; disabled?: boolean }[];
  inputValue?: string;
  getLabelProps: IUseFieldReturnValue['getLabelProps'];
  getHintProps: IUseFieldReturnValue['getHintProps'];
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
  getMessageProps: IUseFieldReturnValue['getMessageProps'];
}

export interface IComboboxContainerProps<T = Element, L = Element> extends IUseComboboxProps<T, L> {
  /**
   * Provides combobox render prop functions and values
   *
   * @param {function} [options.getLabelProps] Label props getter
   * @param {function} [options.getHintProps] Hint props getter
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getInputProps] Input props getter
   * @param {function} [options.getListboxProps] Listbox props getter
   * @param {function} [options.getOptionProps] Option props getter
   * @param {function} [options.getMessageProps] Message props getter
   * @param {boolean} options.isExpanded Current listbox expansion
   * @param {OptionValue} [options.activeValue] Current active option value
   * @param {object|object[]} options.selection Current selection
   * @param {string} [options.inputValue] Current input value
   */
  render?: (options: {
    /* prop getters */
    getLabelProps: IUseComboboxReturnValue['getLabelProps'];
    getHintProps: IUseComboboxReturnValue['getHintProps'];
    getTriggerProps: IUseComboboxReturnValue['getTriggerProps'];
    getInputProps: IUseComboboxReturnValue['getInputProps'];
    getListboxProps: IUseComboboxReturnValue['getListboxProps'];
    getOptionProps: IUseComboboxReturnValue['getOptionProps'];
    getMessageProps: IUseComboboxReturnValue['getMessageProps'];
    /* state */
    isExpanded: IUseComboboxReturnValue['isExpanded'];
    activeValue?: IUseComboboxReturnValue['activeValue'];
    selection: IUseComboboxReturnValue['selection'];
    inputValue?: IUseComboboxReturnValue['inputValue'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseComboboxReturnValue) => ReactNode;
}
