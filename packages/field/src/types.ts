/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUseFieldProps {
  /** Prefixes IDs for field elements */
  idPrefix?: string;
  /** Indicates the field has a hint */
  hasHint?: boolean;
  /** Indicates the field has a message */
  hasMessage?: boolean;
}

export interface IUseFieldReturnValue {
  getLabelProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getHintProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getInputProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getMessageProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'alert' | null;
    }
  ) => HTMLProps<T>;
}

export interface IFieldContainerProps extends IUseFieldProps {
  /**
   * Provides field render prop functions
   *
   * @param {function} [options.getLabelProps] Backdrop props getter
   * @param {function} [options.getHintProps] Modal dialog props getter
   * @param {function} [options.getInputProps] Modal close button props getter
   * @param {function} [options.getMessageProps] Modal title props getter
   */
  render?: (options: {
    getLabelProps: IUseFieldReturnValue['getLabelProps'];
    getHintProps: IUseFieldReturnValue['getHintProps'];
    getInputProps: IUseFieldReturnValue['getInputProps'];
    getMessageProps: IUseFieldReturnValue['getMessageProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseFieldReturnValue) => ReactNode;
}
