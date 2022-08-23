/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { KeyboardEventHandler, useReducer } from 'react';
import { IUseSliderProps, IUseSliderReturnValue, TSliderValues } from './types';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';

const POSSIBLE_SLIDER_KEYS = [
  KEYS.LEFT, 
  KEYS.RIGHT, 
  KEYS.UP, 
  KEYS.DOWN, 
  KEYS.HOME, 
  KEYS.END
];

const SLIDER_KEYS = {
  INCREASE: [
    KEYS.UP,
    KEYS.RIGHT
  ],
  DECREASE: [
    KEYS.DOWN,
    KEYS.LEFT
  ],
  SET_MIN: KEYS.HOME,
  SET_MAX: KEYS.END
};

export const useSlider = ({
  label,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  required,
  disabled,
  readOnly,
  orientation = 'horizontal',
}: IUseSliderProps): IUseSliderReturnValue => {
  const isInteractive = disabled === false && readOnly === false;
  const isControlled = defaultValue !== null || defaultValue !== undefined;
  const test = isControlled ? defaultValue : [0, 25];

  const init = (initialRangeValue: any) => {
    return {rangeValue: initialRangeValue};
  }

  const reducer = (state: any, action: any) => {
    console.log("reducer state", state);
    switch (action.type) {
      case 'stepUp':
        return {rangeValue: [state.rangeValue + step]};
      case 'stepDown':
        return {rangeValue: [state.rangeValue - step]};
      case 'setRangeMin':
        return {rangeValue: [min]};
      case 'setRangeMax':
        return {rangeValue: [max]};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, test, init);

  const getThumbValueNumber = (index = 0) => {
    if (typeof state.rangeValue[index] === 'object') {
      return state.rangeValue[index].number;
    }
    return state.rangeValue[index];
  };

  const getThumbValueText = (index = 0) => {
    if (typeof state.rangeValue[index] === 'object') {
      return state.rangeValue[index].text;
    }
    return undefined;
  };

  // Set the min and max of each thumb based on the value, min, and max of the other thumbs

  // const setValueMin = () => setSliderValue(sliderMin);

  // const setValueMax = () => setSliderValue(sliderMax);

  // const increaseValue = () => {
  //   let nextIncrease = sliderValue + step;
  //   if (nextIncrease > sliderMax) {
  //     setValueMax();
  //   }
  //   setSliderValue(nextIncrease);
  // }

  // const decreaseValue = () => {
  //   let nextDecrease = sliderValue - step;
  //   if (nextDecrease < sliderMin) {
  //     setValueMin();
  //   }
  //   setSliderValue(nextDecrease);
  // }

  const handleKeyDown: KeyboardEventHandler = (event) => {
    console.log(event);

    if (isInteractive && POSSIBLE_SLIDER_KEYS.includes(event.key)) {
      event.preventDefault();
      
      // if (SLIDER_KEYS.INCREASE.includes(event.key) && sliderValue < rangeMax) {
      if (SLIDER_KEYS.INCREASE.includes(event.key)) {
        // increaseValue();
        dispatch({type: 'stepUp', index: 0})
      }

      // if (SLIDER_KEYS.DECREASE.includes(event.key) && sliderValue > rangeMin) {
      if (SLIDER_KEYS.DECREASE.includes(event.key)) {
        // decreaseValue();
        dispatch({type: 'stepDown', index: 0})
      }

      if (event.key === SLIDER_KEYS.SET_MIN) {
        // setValueMin();
        dispatch({type: 'setRangeMin', index: 0})
      }

      if (event.key === SLIDER_KEYS.SET_MAX) {
        // setValueMax();
        dispatch({type: 'setRangeMax', index: 0})
      }
    }
  }

  const getRootProps: IUseSliderReturnValue['getRootProps'] = ({ ...props }) => ({
    'data-garden-container-id': 'containers.slider',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  const getTrackProps: IUseSliderReturnValue['getTrackProps'] = ({ ...props }) => ({
    ...props
  });

  const getThumbProps: IUseSliderReturnValue['getThumbProps'] = (index, props) => ({
    ...props,
    'aria-label': label,
    'aria-valuenow': getThumbValueNumber(index),
    // 'aria-valuemin': parseInt(sliderMin as string, 10),
    // 'aria-valuemax': parseInt(sliderMax as string, 10),
    'aria-required': required,
    'aria-disabled': disabled,
    'aria-readonly': readOnly,
    'aria-orientation': orientation,
    'aria-valuetext': getThumbValueText(index),
    'data-index': index,
    role: 'slider',
    tabIndex: 0,
    onKeyDown: handleKeyDown
  });

  return {
    getRootProps,
    getTrackProps,
    getThumbProps
  };
};
