/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';

export interface IUseSplitterProps<T = HTMLElement> {
  /** Prefixes IDs for the splitter */
  idPrefix?: string;
  /** Sets the window environment to attach events to */
  environment?: Document;
  /** Determines whether a splitter behaves in fixed or variable mode */
  isFixed?: boolean;
  /** Indicates whether the splitter leads or trails the primary pane */
  isLeading?: boolean;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Determines the orientation of the splitter */
  orientation?: 'horizontal' | 'vertical';
  /** Specifies the position increment for keyboard interaction */
  keyboardStep?: number;
  /** Specifies the minimum permitted splitter position */
  min: number;
  /** Specifies the maximum permitted splitter position */
  max: number;
  /** Determines the starting position for an uncontrolled splitter */
  defaultValueNow?: number;
  /** Determines current position of a controlled splitter */
  valueNow?: number;
  /**
   * Handles splitter position changes
   *
   * @param valueNow The updated position
   */
  onChange?: (valueNow: number) => void;
  /** Provides ref access to the underlying separator element */
  separatorRef: RefObject<T>;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role' | 'aria-label'> & {
      role?: 'separator' | null;
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
  getPrimaryPaneProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  valueNow: number;
}

export interface ISplitterContainerProps<T = HTMLElement> extends IUseSplitterProps<T> {
  /**
   * Provides splitter render prop functions
   *
   * @param {function} [options.getSeparatorProps] Separator props getter
   * @param {function} [options.getPrimaryPaneProps] Primary pane props getter
   * @param {number} [options.valueNow] Current splitter position value
   */
  render?: (options: {
    getSeparatorProps: IUseSplitterReturnValue['getSeparatorProps'];
    getPrimaryPaneProps: IUseSplitterReturnValue['getPrimaryPaneProps'];
    valueNow: IUseSplitterReturnValue['valueNow'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSplitterReturnValue) => ReactNode;
}
