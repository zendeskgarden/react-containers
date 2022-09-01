/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { AriaAttributes, HTMLProps, ReactNode } from 'react';

type TRequiredSliderThumbProps = Required<
  Pick<AriaAttributes, 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'>
>;

type TOptionalSliderThumbProps = Partial<
  Pick<
    AriaAttributes,
    'aria-required' | 'aria-disabled' | 'aria-readonly' | 'aria-orientation' | 'aria-valuetext'
  >
>;

export type SliderReducerThumbValue = number;

export type SliderReducerState = SliderReducerThumbValue[];

export interface ISliderReducerAction {
  type: string;
  index: number;
  value: number;
  step: number;
  min: number;
  max: number;
  range: SliderReducerState;
}

export interface ISliderThumbProps extends TRequiredSliderThumbProps, TOptionalSliderThumbProps {
  'aria-label': NonNullable<AriaAttributes['aria-label']>;
  readonly role: 'slider';
  tabIndex: 0;
}

type TNumberWithTextLabel = {
  number: number;
  text?: ISliderThumbProps['aria-valuetext'];
};

export type TSliderValues = number | number[] | TNumberWithTextLabel | TNumberWithTextLabel[];

export interface IUseSliderProps {
  /** */
  // TODO: Add single numbers back in
  // TODO: Add TNumberWithTextLabel back in
  defaultValue?: number[];
  /** */
  value?: number[];
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
  orientation?: ISliderThumbProps['aria-orientation'];
  /** */
  // onStepUp?: () => {}
  /** */
  // onStepDown?: () => {}
  /** */
  // onChange?: () => void;
  /** */
  rtl?: boolean;
  /** */
  // reducer?: any;
  // https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks
}

export interface IUseSliderReturnValue {
  value: number[];
  getRootProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getTrackProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getThumbProps: <T extends HTMLDivElement>(
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
   * @param {function} [options.getRootProps] Slider root props getter
   * @param {function} [options.getTrackProps] Slider track props getter
   * @param {function} [options.getThumbProps] Slider thumb props getter
   */
  render?: (options: {
    values: number[];
    getRootProps: IUseSliderReturnValue['getRootProps'];
    getTrackProps: IUseSliderReturnValue['getTrackProps'];
    getThumbProps: IUseSliderReturnValue['getThumbProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSliderReturnValue) => ReactNode;
}
