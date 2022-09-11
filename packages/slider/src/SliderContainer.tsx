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

export const SliderContainer: React.FC<ISliderContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useSlider(options))}</>;
};

SliderContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};
