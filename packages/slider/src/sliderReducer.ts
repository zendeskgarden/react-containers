/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  SliderState,
  SliderThumbValue,
  StepUpAction,
  StepDownAction,
  ResetRangeMinAction,
  ResetRangeMaxAction,
  SetThumbValueAction
} from './types';

// constants

const DEFAULT_INDEX = 0;

export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 100;
export const DEFAULT_STEP = 1;

// action types

const STEP_UP = 'stepUp';
const STEP_DOWN = 'stepDown';
const RESET_RANGE_MIN = 'resetRangeMin';
const RESET_RANGE_MAX = 'resetRangeMax';
const SET_THUMB_VALUE = 'setThumbValue';

// initialization

export const initializeSliderReducerState = (
  initialState: SliderThumbValue[] = [0]
): SliderState => {
  return initialState;
};

// getters

export const getThumbCurrentValue = (state: SliderState, { index = DEFAULT_INDEX }): number =>
  state[index];

export const getThumbCurrentValueNumber = (state: SliderState, { index = DEFAULT_INDEX }): number =>
  getThumbCurrentValue(state, { index });

export const getThumbMinValueNumber = (
  state: SliderState,
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
  state: SliderState,
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

const shouldChangeValue = (
  state: SliderState,
  { index, value, min, max }: { index: number; value: number; min: number; max: number }
) => {
  if (value < getThumbMinValueNumber(state, { index, min })) {
    return false;
  }

  if (value > getThumbMaxValueNumber(state, { index, max })) {
    return false;
  }

  return true;
};

// setters - internal to reducer

const setRangeValue = (
  state: SliderState,
  { index, value }: { index: number; value: SliderThumbValue }
): SliderState => [...state.slice(0, index), value, ...state.slice(index + 1)];

// reduce

/**
 * @todo Refactor so STEP_UP and STEP_DOWN uses isWithinBounds
 */
export const sliderReducer = (state: SliderState, action: Record<string, any>): SliderState => {
  const { type, index, value, step, min, max } = action;

  switch (type) {
    case STEP_UP:
      return shouldChangeValue(state, { index, value: state[index] + step, min, max })
        ? setRangeValue(state, {
            index,
            value: state[index] + step
          })
        : state;
    case STEP_DOWN:
      return shouldChangeValue(state, { index, value: state[index] - step, min, max })
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
    case SET_THUMB_VALUE:
      return shouldChangeValue(state, { index, value, min, max })
        ? setRangeValue(state, {
            index,
            value
          })
        : state;
    default:
      return state;
  }
};

// actions

export const stepUp = ({ index, step, max }: StepUpAction) => ({
  type: STEP_UP,
  index,
  step,
  max
});

export const stepDown = ({ index, step, min }: StepDownAction) => ({
  type: STEP_DOWN,
  index,
  step,
  min
});

export const resetRangeMin = ({ min }: ResetRangeMinAction) => ({
  type: RESET_RANGE_MIN,
  min
});

export const resetRangeMax = ({ max }: ResetRangeMaxAction) => ({
  type: RESET_RANGE_MAX,
  max
});

export const setThumbValue = ({ index, value, min, max }: SetThumbValueAction) => ({
  type: SET_THUMB_VALUE,
  index,
  value,
  min,
  max
});
