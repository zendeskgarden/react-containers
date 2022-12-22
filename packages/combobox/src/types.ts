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
  selectedValue?: OptionValue | OptionValue[];
  inputValue?: string;
  transformValue?: (value: OptionValue | null) => string;
  onSelectionChange?: (changes: {
    type: string;
    selectedValue: OptionValue | OptionValue[];
  }) => void;
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onExpansionChange?: (changes: { type: string; isExpanded: boolean; inputValue: string }) => void;
  activeIndex?: number;
  onActiveIndexChange?: (changes: { type: string; activeIndex: number }) => void;
}

export interface IUseComboboxReturnValue {
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
  isExpanded: boolean;
  activeValue?: OptionValue;
  selectedValue?: OptionValue | OptionValue[];
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
