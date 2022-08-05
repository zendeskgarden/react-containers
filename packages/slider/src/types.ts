/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { AriaAttributes, HTMLProps, ReactNode } from 'react';

export interface IUseSliderProps {
  /** */
  title?: string;
  /** */
  value?: AriaAttributes['aria-valuenow'];
  /** */
  min?: AriaAttributes['aria-valuemin'];
  /** */
  max?: AriaAttributes['aria-valuemax'];
  /** */
  orientation?: AriaAttributes['aria-orientation'];
  /** */
  required?: AriaAttributes['aria-required'];
}

export interface IUseSliderReturnValue {
  getSliderProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role' | 'aria-label'> & {
      role?: 'slider';
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
}

export interface ISliderContainerProps extends IUseSliderProps {
  /**
   * Provides slider render prop functions
   *
   * @param {function} [options.getSliderProps] Slider props getter
   */
  render?: (options: { getSliderProps: IUseSliderReturnValue['getSliderProps'] }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSliderReturnValue) => ReactNode;
}
