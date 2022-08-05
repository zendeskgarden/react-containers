/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { IUseSliderProps, IUseSliderReturnValue } from './types';

export const useSlider = ({
  title,
  value = 50,
  min = 0,
  max = 100,
  orientation = 'horizontal',
  required = false
}: IUseSliderProps): IUseSliderReturnValue => {
  // const [valueNow, setValueNow] = useState(value);
  const [valueNow] = useState(value);

  const getSliderProps: IUseSliderReturnValue['getSliderProps'] = ({ ...props }) => ({
    title,
    'data-garden-container-id': 'containers.slider',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props,
    role: 'slider',
    'aria-valuenow': valueNow,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-orientation': orientation,
    'aria-required': required
  });

  return {
    getSliderProps
  };
};
