/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { AriaAttributes, HTMLProps, ReactNode } from 'react';

export type SliderThumbValue = number;

export type SliderState = SliderThumbValue[];

export interface ISliderReducerAction {
  readonly type: string;
  index: number;
  value: number;
  step: number;
  min: number;
  max: number;
}

export type StepUpAction = Pick<ISliderReducerAction, 'index' | 'step' | 'max'>;
export type StepDownAction = Pick<ISliderReducerAction, 'index' | 'step' | 'min'>;
export type ResetRangeMinAction = Pick<ISliderReducerAction, 'min'>;
export type ResetRangeMaxAction = Pick<ISliderReducerAction, 'max'>;
export type SetThumbValueAction = Pick<ISliderReducerAction, 'index' | 'value' | 'min' | 'max'>;

type RequiredSliderThumbProps = Required<
  Pick<AriaAttributes, 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'>
>;

type OptionalSliderThumbProps = Partial<
  Pick<
    AriaAttributes,
    'aria-required' | 'aria-disabled' | 'aria-readonly' | 'aria-orientation' | 'aria-valuetext'
  >
>;

export interface ISliderThumbProps extends RequiredSliderThumbProps, OptionalSliderThumbProps {
  'aria-label': NonNullable<AriaAttributes['aria-label']>;
  readonly role: 'slider';
  tabIndex: 0 | -1;
}

export interface IUseSliderProps {
  /** */
  defaultValue?: SliderState;
  /** */
  min?: ISliderThumbProps['aria-valuemin'];
  /** */
  max?: ISliderThumbProps['aria-valuemax'];
  /** */
  step?: number;
  /** */
  required?: ISliderThumbProps['aria-required'];
  /** */
  disabled?: ISliderThumbProps['aria-disabled'];
  /** */
  readOnly?: ISliderThumbProps['aria-readonly'];
  /** */
  // onStepUp?: () => {}
  /** */
  // onStepDown?: () => {}
  /** */
  // onChange?: () => void;
  /** */
  rtl?: boolean;
  /** Sets the environment where the slider is rendered */
  environment?: Document;
}

export interface IUseSliderReturnValue {
  value: SliderState;
  getSliderRootProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getSliderTrackProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getSliderThumbProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label'> & {
      index?: number;
      'aria-label': ISliderThumbProps['aria-label'];
    }
  ) => ISliderThumbProps;
}

export interface ISliderContainerProps extends IUseSliderProps {
  /**
   * Provides slider render prop functions
   *
   * @param {number[]} [options.value] Slider values
   * @param {function} [options.getSliderRootProps] Slider root props getter
   * @param {function} [options.getSliderTrackProps] Slider track props getter
   * @param {function} [options.getSliderThumbProps] Slider thumb props getter
   */
  render?: (options: {
    value: IUseSliderReturnValue['value'];
    getSliderRootProps: IUseSliderReturnValue['getSliderRootProps'];
    getSliderTrackProps: IUseSliderReturnValue['getSliderTrackProps'];
    getSliderThumbProps: IUseSliderReturnValue['getSliderThumbProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSliderReturnValue) => ReactNode;
}
