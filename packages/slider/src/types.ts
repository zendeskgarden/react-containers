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
  value: SliderThumbValue;
  step: number;
  min: number;
  max: number;
}

export type StepUpAction = Pick<ISliderReducerAction, 'index' | 'step' | 'max'>;
export type StepDownAction = Pick<ISliderReducerAction, 'index' | 'step' | 'min'>;
export type ResetRangeMinAction = Pick<ISliderReducerAction, 'min'>;
export type ResetRangeMaxAction = Pick<ISliderReducerAction, 'max'>;
export type SetThumbValueAction = Pick<ISliderReducerAction, 'index' | 'value' | 'min' | 'max'>;

export interface IUseSliderProps {
  /** Sets the Slider’s initial value */
  defaultValue?: SliderState;
  /** Sets the Slider range’s overall minimum value */
  min?: AriaAttributes['aria-valuemin'];
  /** Sets the Slider range’s overall maximum value */
  max?: AriaAttributes['aria-valuemax'];
  /** */
  step?: number;
  /** Sets whether or not the Slider is a required field */
  required?: AriaAttributes['aria-required'];
  /** Sets whether or not the Slider is disabled */
  disabled?: AriaAttributes['aria-disabled'];
  /** Sets the text & layout direction */
  rtl?: boolean;
  /** Sets the environment where the Slider is rendered */
  environment?: Document;
  /** */
  // onStepUp?: () => {}
  /** */
  // onStepDown?: () => {}
  /** */
  // onChange?: () => void;
}

export interface IUseSliderReturnValue {
  value: SliderState;
  getSliderRootProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getSliderTrackProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getSliderThumbProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label'> & {
      index?: number;
      'aria-label': NonNullable<AriaAttributes['aria-label']>;
    }
  ) => HTMLProps<T>;
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
