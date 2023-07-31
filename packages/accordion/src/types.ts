/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { HTMLProps } from 'react';

export interface IUseAccordionProps {
  /** Prefixes IDs for the accordion trigger and panels  */
  idPrefix?: string;
  /** Defines the sections for the accordion */
  sections?: number[];
  /** Sets the expanded sections in a controlled accordion */
  expandedSections?: number[];
  /** Sets the default expanded sections in a uncontrolled accordion */
  defaultExpandedSections?: number[];
  /** Handles accordion expansion changes */
  onChange?: (expanded: number) => any;
  /** Determines if multiple panels can be expanded at the same time in an uncontrolled accordion */
  expandable?: boolean;
  /** Determines if panels can be collapsed in an uncontrolled accordion */
  collapsible?: boolean;
}

export interface IHeaderProps extends HTMLProps<any> {
  ariaLevel?: number | null;
  role?: any;
}

export interface ITriggerProps extends HTMLProps<any> {
  index?: number;
  role?: any;
  tabIndex?: any;
}

export interface IPanelProps extends HTMLProps<any> {
  index?: number;
  role?: any;
}

export interface IUseAccordionPropGetters {
  getHeaderProps: <T>(options?: T & IHeaderProps) => any;
  getTriggerProps: <T>(options?: T & ITriggerProps) => any;
  getPanelProps: <T>(options?: T & IPanelProps) => any;
}

export interface IUseAccordionReturnValue extends IUseAccordionPropGetters {
  expandedSections: number[];
  disabledSections: number[];
}

export interface IAccordionContainerProps extends IUseAccordionProps {
  /**
   * Provides accordion render prop functions and state
   *
   * @param {function} [options.getHeaderProps] Header props getter
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getPanelProps] Panel props getter
   * @param {number[]} options.expandedSections Current expanded sections
   * @param {number[]} options.disabledSections Current disabled sections
   */
  render?: (options: {
    /* prop getters */
    getHeaderProps: <T>(options?: T & IHeaderProps) => any;
    getTriggerProps: <T>(options?: T & ITriggerProps) => any;
    getPanelProps: <T>(options?: T & IPanelProps) => any;
    /* state */
    expandedSections: number[];
    disabledSections: number[];
  }) => React.ReactNode;
  /** @ignore */
  /** A children render prop function which receives accordion state and prop getters */
  children?: (options: IUseAccordionReturnValue) => React.ReactNode;
}
