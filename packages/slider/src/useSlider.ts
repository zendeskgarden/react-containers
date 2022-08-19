/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useEffect, useMemo, useState } from 'react';
import { IUseSliderProps, IUseSliderReturnValue } from './types';

export const useSlider = ({
  value,
  min,
  max,
  step,
  required,
  disabled,
  readOnly,
  valueHumanReadable,
  orientation = 'horizontal',
  type,
  'aria-label': ariaLabel,
}: IUseSliderProps): IUseSliderReturnValue => {
  const [sliderValue, setSliderValue] = useState(value);
  
  useEffect(() => { 
    setSliderValue(sliderValue)
  }, [sliderValue]);

  const [sliderMin, setSliderMin] = useState(min);
  
  useEffect(() => { 
    setSliderMin(sliderMin) 
  }, [sliderMin]);

  const [sliderMax, setSliderMax] = useState(max);
  
  useEffect(() => {
    setSliderMax(sliderMax) 
  }, [sliderMax]);

  // The tabIndex attribute only accepts numbers as values, per TypeScript.
  // Therefore, passing it undefined is a no-go —even in the context of conditional React props.
  // To work around this, we return an empty object when no tabIndex is needed.

  const [sliderTabIndex, setSliderTabIndex] = useState({});

  useMemo(() => {
    if (type) {
      setSliderTabIndex({});
    } else if (disabled || readOnly) {
      setSliderTabIndex({tabIndex: -1 });
    } else {
      setSliderTabIndex({tabIndex: 0 });
    } 
  }, [type, disabled, readOnly]);

  const getSliderProps: IUseSliderReturnValue['getSliderProps'] = ({ ...props }) => ({
    'data-garden-container-id': 'containers.slider',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props,
    ariaLabel,
    step,
    type,
    value: type ? sliderValue : undefined,
    min: type ? sliderMin : undefined,
    max: type ? sliderMax : undefined,
    required: type ? required as boolean : undefined,
    disabled: type ? disabled as boolean : undefined,
    readOnly: type ? readOnly as boolean : undefined,
    'aria-valuenow': type ? undefined : parseInt(sliderValue as string, 10),
    'aria-valuemin': type ? undefined : parseInt(sliderMin as string, 10),
    'aria-valuemax': type ? undefined : parseInt(sliderMax as string, 10),
    'aria-required': type ? undefined : required,
    'aria-disabled': type ? undefined : disabled,
    'aria-readonly': type ? undefined : readOnly,
    'aria-orientation': orientation,
    'aria-valuetext': valueHumanReadable,
    role: 'slider',
    ...sliderTabIndex,
  });

  return {
    getSliderProps
  };
};
