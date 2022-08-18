/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { AriaAttributes, HTMLProps, ReactNode } from 'react';

//
type OptionalSliderProps = Partial<Pick<AriaAttributes, 'aria-orientation' | 'aria-valuetext' >>;

// Attributes that are required, when using an <input type="range">
// type must be set to "range" --> readonly type: "range"
type RequiredNativeSliderProps = Required<Pick<HTMLProps<HTMLInputElement>, 'value' | 'min' | 'max'>>;
// Attributes that are optional, when using an <input type="range">
type OptionalNativeSliderProps = Partial<Pick<HTMLProps<HTMLInputElement>, 'required' | 'disabled' | 'readOnly' | 'step'>>;
// 
interface NativeSlider extends RequiredNativeSliderProps, OptionalNativeSliderProps, OptionalSliderProps {
  readonly type: 'range';
}

// Attributes that are required, when using a <div role="slider">
// role must be set to "slider" --> readonly role: "slider"
type RequiredAriaSliderProps = Required<Pick<AriaAttributes, 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'>>;
type OptionalAriaSliderProps = Partial<Pick<AriaAttributes, 'aria-required' | 'aria-disabled' | 'aria-readonly' >>;
// 
interface AriaSlider extends RequiredAriaSliderProps, OptionalAriaSliderProps, OptionalSliderProps {
  'aria-label': NonNullable<AriaAttributes['aria-label']>;
  readonly role: 'slider';
  tabIndex: 0 | -1;
}

export interface IUseSliderProps extends Partial<Pick<NativeSlider, 'type'>>, Partial<Pick<AriaSlider, 'aria-label'>> {
  /** */
  value: NativeSlider['value'] | AriaSlider['aria-valuenow'];
  /** */
  min: NativeSlider['min'] | AriaSlider['aria-valuemin'];
  /** */
  max: NativeSlider['max'] | AriaSlider['aria-valuemax'];
  /** */
  step?: NativeSlider['step'];
  /** */
  required?: NativeSlider['required'] | AriaSlider['aria-required'];
  /** */
  disabled?: NativeSlider['disabled'] | AriaSlider['aria-disabled'];
  /** */
  readOnly?: NativeSlider['readOnly'] | AriaSlider['aria-readonly'];
  /** */
  orientation?: OptionalSliderProps['aria-orientation'];
  /** */
  valueHumanReadable?: OptionalSliderProps['aria-valuetext'];
  /** */
  // dimensions?: string // default 44px
}

// export interface IUseSliderReturnValue {
//   getSliderProps: <T extends HTMLInputElement | HTMLDivElement>(
//     props?: NativeSlider | AriaSlider
//   ) => HTMLProps<T>;
// }

export interface IUseSliderReturnValue {
  getSliderProps: <T extends HTMLInputElement | HTMLDivElement>(
    props?: HTMLProps<T>
  ) => NativeSlider | AriaSlider;
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
