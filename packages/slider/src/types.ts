/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';

export interface IUseSliderProps<T = Element, M = HTMLElement> {
  trackRef: RefObject<T>;
  minThumbRef: RefObject<M>;
  maxThumbRef: RefObject<M>;
  /** Sets the Slider’s initial minimum value */
  defaultMinValue?: number;
  /** Sets the Slider’s initial maximum value */
  defaultMaxValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: { minValue?: number; maxValue?: number }) => void;
  /** Sets the Slider range’s overall minimum value */
  min?: number;
  /** Sets the Slider range’s overall maximum value */
  max?: number;
  step?: number;
  jump?: number;
  disabled?: boolean;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Sets the environment where the Slider is rendered */
  environment?: Document;
}

export interface IUseSliderReturnValue {
  getTrackProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getMinThumbProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
  getMaxThumbProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
  trackRect: DOMRect;
  minValue: number;
  maxValue: number;
}

export interface ISliderContainerProps<T = Element, M = HTMLElement> extends IUseSliderProps<T, M> {
  /**
   * Provides Slider render prop functions
   *
   * @param {function} [options.getTrackProps] Slider Track props getter
   */
  render?: (options: {
    getTrackProps: IUseSliderReturnValue['getTrackProps'];
    getMinThumbProps: IUseSliderReturnValue['getMinThumbProps'];
    getMaxThumbProps: IUseSliderReturnValue['getMaxThumbProps'];
    trackRect: IUseSliderReturnValue['trackRect'];
    minValue: IUseSliderReturnValue['minValue'];
    maxValue: IUseSliderProps['maxValue'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseSliderReturnValue) => ReactNode;
}
