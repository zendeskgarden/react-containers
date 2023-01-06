/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';

export type OptionValue = string;

export interface IUseComboboxProps<T = Element, L = Element> {
  triggerRef: RefObject<T>;
  inputRef: RefObject<HTMLInputElement>;
  listboxRef: RefObject<L>;
  isMultiselectable?: boolean;
  /** Provides an ordered list of option values */
  values: OptionValue[];
  transformValue?: (value: OptionValue | null) => string;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  selectionValue?: OptionValue | OptionValue[] | null;
  defaultSelectionValue?: OptionValue | OptionValue[] | null;
  onSelectionChange?: (selectionValue: OptionValue | OptionValue[] | null) => void;
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onExpansionChange?: (isExpanded: boolean) => void;
  activeIndex?: number;
  onActiveIndexChange?: (activeIndex: number) => void;
  onChange?: (changes: {
    type: string;
    isExpanded?: boolean;
    selectionValue?: OptionValue | OptionValue[] | null;
    inputValue?: string;
    activeIndex?: number;
  }) => void;
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
      value?: OptionValue;
    }
  ) => HTMLProps<T>;
  setExpansion: (isExpanded: boolean) => void;
  setSelectionValue: (selectionValue: OptionValue | OptionValue[] | null) => void;
  setActiveIndex: (activeIndex: number) => void;
  setInputValue: (inputValue: string) => void;
}

export interface IComboboxContainerProps<T = Element, L = Element> extends IUseComboboxProps<T, L> {
  /**
   * Provides combobox render prop functions
   *
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getInputProps] Input props getter
   * @param {function} [options.getListboxProps] Listbox props getter
   * @param {function} [options.getOptionProps] Option props getter
   * @param {string} [options.activeValue] Identifies the currently active option value
   */
  render?: (options: {
    getTriggerProps: IUseComboboxReturnValue['getTriggerProps'];
    getInputProps: IUseComboboxReturnValue['getInputProps'];
    getListboxProps: IUseComboboxReturnValue['getListboxProps'];
    getOptionProps: IUseComboboxReturnValue['getOptionProps'];
    activeValue?: IUseComboboxReturnValue['activeValue'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseComboboxReturnValue) => ReactNode;
}
