/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { AriaAttributes, HTMLProps, ReactNode } from 'react';

type TRequiredSliderThumbProps = Required<Pick<AriaAttributes, 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'>>;

type TOptionalSliderThumbProps = Partial<Pick<AriaAttributes, 'aria-required' | 'aria-disabled' | 'aria-readonly' | 'aria-orientation' | 'aria-valuetext'>>;

export interface ISliderThumbProps extends TRequiredSliderThumbProps, TOptionalSliderThumbProps {
  'aria-label': NonNullable<AriaAttributes['aria-label']>;
  readonly role: 'slider';
  tabIndex: 0;
}

type TNumberWithTextLabel = {
  number: number;
  text?: ISliderThumbProps['aria-valuetext'];
}

export type TSliderValues = number[] | TNumberWithTextLabel[];

export interface IUseSliderProps {
  /** */
  label?: ISliderThumbProps['aria-label'];
  /** */
  value?: TSliderValues;
  /** */
  defaultValue?: TSliderValues;
  /** */
  min: ISliderThumbProps['aria-valuemin'];
  /** */
  max: ISliderThumbProps['aria-valuemax'];
  /** */
  step?: number;
  /** */
  required?: ISliderThumbProps['aria-required'];
  /** */
  disabled?: ISliderThumbProps['aria-disabled'];
  /** */
  readOnly?: ISliderThumbProps['aria-readonly'];
  /** */
  orientation?: ISliderThumbProps['aria-orientation'];
  /** */
  // onStepUp?: () => {}
  /** */
  // onStepDown?: () => {}
  /** */
  // onChange?: () => void;
}

export interface IUseSliderReturnValue {
  getRootProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getTrackProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getThumbProps: <T extends HTMLDivElement>(
    index: number,
    props?: HTMLProps<T>,
  ) => ISliderThumbProps;
}

export interface ISliderContainerProps extends IUseSliderProps {
  /**
   * Provides slider render prop functions
   *
   * @param {function} [options.getRootProps] Slider root props getter
   * @param {function} [options.getTrackProps] Slider track props getter
   * @param {function} [options.getThumbProps] Slider thumb props getter
   */
  render?: (options: { 
    getRootProps: IUseSliderReturnValue['getRootProps'];
    getTrackProps: IUseSliderReturnValue['getTrackProps'];
    getThumbProps: IUseSliderReturnValue['getThumbProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSliderReturnValue) => ReactNode;
}
