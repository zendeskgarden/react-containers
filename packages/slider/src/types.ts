/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode, RefObject } from 'react';

export interface IUseSliderProps<T = Element, M = HTMLElement> {
  /** Provides ref access to the underlying track element */
  trackRef: RefObject<T>;
  /** Provides ref access to the underlying minimum thumb element */
  minThumbRef: RefObject<M>;
  /** Provides ref access to the underlying maximum thumb element */
  maxThumbRef: RefObject<M>;
  /** Determines the starting minimum value for an uncontrolled slider */
  defaultMinValue?: number;
  /** Determines the starting maximum value for an uncontrolled slider */
  defaultMaxValue?: number;
  /** Determines current minimum value of a controlled slider */
  minValue?: number;
  /** Determines current maximum value of a controlled slider */
  maxValue?: number;
  /**
   * Handles slider value changes
   *
   * @param {number} [value.minValue] The updated minimum value
   * @param {number} [value.maxValue] The updated maximum value
   */
  onChange?: (values: { minValue?: number; maxValue?: number }) => void;
  /** Sets the minimum permitted value */
  min?: number;
  /** Sets the maximum permitted value */
  max?: number;
  /** Defines the stepping interval */
  step?: number;
  /** Defines the jumping interval for keyboard page up/down navigation. Defaults to `step`. */
  jump?: number;
  /** Indicates that the slider is not interactive */
  disabled?: boolean;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Sets the environment where the slider is rendered */
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
   * Provides slider render prop functions and values
   *
   * @param {function} [options.getTrackProps] Track props getter
   * @param {function} [options.getMinThumbProps] Minimum thumb props getter
   * @param {function} [options.getMaxThumbProps] Maximum thumb props getter
   * @param {object} [options.trackRect] Current size and position of the track
   * @param {number} [options.minValue] Current minimum value
   * @param {number} [options.maxValue] Current maximum value
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
