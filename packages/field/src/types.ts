/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUseFieldPropGetters {
  getHintProps: <T>(options?: T) => T & HTMLProps<any>;
  getMessageProps: <T>(options?: T) => T & HTMLProps<any>;
  getLabelProps: <T>(options?: T) => T & HTMLProps<any>;
  getInputProps: <T>(
    options?: T,
    isDescribedOptions?: { isDescribed?: boolean; containsMessage?: boolean }
  ) => T & HTMLProps<any>;
}

export interface IFieldContainerProps {
  /** A render prop function which receives field prop getters */
  render?: (options: IUseFieldPropGetters) => ReactNode;
  /** A children render prop function which receives field prop getters */
  children?: (options: IUseFieldPropGetters) => ReactNode;
  /** An identifer for the field input elements */
  id?: string;
}
