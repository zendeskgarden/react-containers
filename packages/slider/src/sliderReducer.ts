/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { SliderReducerState, SliderReducerThumbValue, ISliderReducerAction } from './types';

// constants

const DEFAULT_INDEX = 0;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

// action types

const STEP_UP = 'stepUp';
const STEP_DOWN = 'stepDown';
const RESET_RANGE_MIN = 'resetRangeMin';
const RESET_RANGE_MAX = 'resetRangeMax';
const SET_CUSTOM_VALUE = 'setCustomValue';
const SET_RANGE = 'setRange';

// initialization

export const initializeSliderReducerState = (
  initialState: SliderReducerThumbValue[] = [0]
): SliderReducerState => {
  return initialState;
};

// getters

export const getThumbCurrentValue = (
  state: SliderReducerState,
  { index = DEFAULT_INDEX }
): number => state[index];

export const getThumbCurrentValueNumber = (
  state: SliderReducerState,
  { index = DEFAULT_INDEX }
): number => getThumbCurrentValue(state, { index });

export const getThumbMinValueNumber = (
  state: SliderReducerState,
  { index = DEFAULT_INDEX, min = DEFAULT_MIN }
) => {
  // By default, min value is overall range min
  let thumbMinValue = min;

  // If index is anything other than 0, then the min is the value of the thumb right before it
  if (index > 0) {
    thumbMinValue = getThumbCurrentValueNumber(state, { index: index - 1 });
  }

  return thumbMinValue;
};

export const getThumbMaxValueNumber = (
  state: SliderReducerState,
  { index = DEFAULT_INDEX, max = DEFAULT_MAX }
) => {
  // By default, max value is overall range max
  let thumbMaxValue = max;

  // If index is anything other than last available index, then the max is the value of the thumb right after it
  if (index < state.length - 1) {
    thumbMaxValue = getThumbCurrentValueNumber(state, { index: index + 1 });
  }

  return thumbMaxValue;
};

// getters - internal to reducer

const shouldStepUp = (state: SliderReducerState, { index, max }: { index: number; max: number }) =>
  getThumbCurrentValueNumber(state, { index }) < getThumbMaxValueNumber(state, { index, max });

const shouldStepDown = (
  state: SliderReducerState,
  { index, min }: { index: number; min: number }
) => getThumbCurrentValueNumber(state, { index }) > getThumbMinValueNumber(state, { index, min });

// setters - internal to reducer

const setRangeValue = (
  state: SliderReducerState,
  { index, value }: { index: number; value: SliderReducerThumbValue }
): SliderReducerState => [...state.slice(0, index), value, ...state.slice(index + 1)];

// reducer

export const sliderReducer = (
  state: SliderReducerState,
  action: ISliderReducerAction
): SliderReducerState => {
  const { type, index, value, step, min, max, range } = action;

  switch (type) {
    case STEP_UP:
      return shouldStepUp(state, { index, max })
        ? setRangeValue(state, {
            index,
            value: state[index] + step
          })
        : state;
    case STEP_DOWN:
      return shouldStepDown(state, { index, min })
        ? setRangeValue(state, {
            index,
            value: state[index] - step
          })
        : state;
    case RESET_RANGE_MIN:
      return setRangeValue(state, {
        index,
        value: getThumbMinValueNumber(state, { index: 0, min })
      });
    case RESET_RANGE_MAX:
      return setRangeValue(state, {
        index,
        value: getThumbMaxValueNumber(state, { index: state.length - 1, max })
      });
    case SET_CUSTOM_VALUE:
      return setRangeValue(state, {
        index,
        value
      });
    case SET_RANGE:
      return range;
    default:
      return state;
  }
};

// actions

export const increment = ({ index, step, max }: Partial<ISliderReducerAction>) => ({
  type: STEP_UP,
  index,
  step,
  max
});

export const decrement = ({ index, step, min }: Partial<ISliderReducerAction>) => ({
  type: STEP_DOWN,
  index,
  step,
  min
});

export const resetRangeMin = ({ min }: Partial<ISliderReducerAction>) => ({
  type: RESET_RANGE_MIN,
  min
});

export const resetRangeMax = ({ max }: Partial<ISliderReducerAction>) => ({
  type: RESET_RANGE_MAX,
  max
});

export const setCustomValue = ({ index, value, min, max }: Partial<ISliderReducerAction>) => ({
  type: SET_CUSTOM_VALUE,
  index,
  value,
  min,
  max
});

export const setRange = ({ range }: Partial<ISliderReducerAction>) => ({
  type: SET_RANGE,
  range
});
