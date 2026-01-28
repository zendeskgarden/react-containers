/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSlider } from './useSlider';
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
