/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { HTMLProps } from 'react';

export interface IUseAccordionProps<Value> {
  /** Prefixes IDs for the accordion trigger and panels  */
  idPrefix?: string;
  /** Provides an ordered list of unique section values */
  sections: Value[];
  /** Sets the expanded sections in a controlled accordion */
  expandedSections?: Value[];
  /** Sets the default expanded sections in a uncontrolled accordion */
  defaultExpandedSections?: Value[];
  /** Handles accordion expansion changes */
  onChange?: (expanded: Value) => void;
  /** Determines if multiple panels can be expanded at the same time in an uncontrolled accordion */
  expandable?: boolean;
  /** Determines if panels can be collapsed in an uncontrolled accordion */
  collapsible?: boolean;
}

export interface IUseAccordionReturnValue<Value> {
  expandedSections: Value[];
  disabledSections: Value[];
  getHeaderProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role' | 'aria-level'> & {
      role?: 'heading' | null;
      'aria-level': NonNullable<HTMLProps<T>['aria-level']>;
    }
  ) => HTMLProps<T>;
  getTriggerProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      role?: 'button' | null;
      value: Value;
    }
  ) => HTMLProps<T>;
  getPanelProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      role?: 'region' | null;
      value: Value;
    }
  ) => HTMLProps<T>;
}
export interface IAccordionContainerProps<Value> extends IUseAccordionProps<Value> {
  /**
   * Provides accordion render prop functions and state
   *
   * @param {function} [options.getHeaderProps] Header props getter
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getPanelProps] Panel props getter
   * @param {*[]} options.expandedSections Current expanded sections
   * @param {*[]} options.disabledSections Current disabled sections
   */
  render?: (options: {
    /* prop getters */
    getHeaderProps: IUseAccordionReturnValue<Value>['getHeaderProps'];
    getTriggerProps: IUseAccordionReturnValue<Value>['getTriggerProps'];
    getPanelProps: IUseAccordionReturnValue<Value>['getPanelProps'];
    /* state */
    expandedSections: IUseAccordionReturnValue<Value>['expandedSections'];
    disabledSections: IUseAccordionReturnValue<Value>['disabledSections'];
  }) => React.ReactNode;
  /** @ignore */
  children?: (options: IUseAccordionReturnValue<Value>) => React.ReactNode;
}
