/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { SLIDER_MAX, SLIDER_MIN, SLIDER_STEP, useSlider } from './useSlider';
import { ISliderContainerProps } from './types';

export const SliderContainer: React.FC<ISliderContainerProps> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useSlider(options))}</>;

SliderContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  trackRef: PropTypes.any.isRequired,
  minThumbRef: PropTypes.any.isRequired,
  maxThumbRef: PropTypes.any.isRequired,
  environment: PropTypes.any,
  defaultMinValue: PropTypes.number,
  defaultMaxValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  jump: PropTypes.number,
  disabled: PropTypes.bool,
  rtl: PropTypes.bool
};

/* Slider defaults informed by <input type="range">.
   See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#specifying_the_minimum_and_maximum */
SliderContainer.defaultProps = {
  min: SLIDER_MIN,
  max: SLIDER_MAX,
  step: SLIDER_STEP
};
