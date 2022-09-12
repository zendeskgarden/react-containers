/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  TSliderState,
  TSliderThumbValue,
  TStepUpAction,
  TStepDownAction,
  TResetRangeMinAction,
  TResetRangeMaxAction,
  TSetThumbValueAction
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
  initialState: TSliderThumbValue[] = [0]
): TSliderState => {
  return initialState;
};

// getters

export const getThumbCurrentValue = (state: TSliderState, { index = DEFAULT_INDEX }): number =>
  state[index];

export const getThumbCurrentValueNumber = (
  state: TSliderState,
  { index = DEFAULT_INDEX }
): number => getThumbCurrentValue(state, { index });

export const getThumbMinValueNumber = (
  state: TSliderState,
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
  state: TSliderState,
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

/**
 * @todo Collapse into isWithinBounds
 */
const shouldStepUp = (state: TSliderState, { index, max }: { index: number; max: number }) =>
  getThumbCurrentValueNumber(state, { index }) < getThumbMaxValueNumber(state, { index, max });

/**
 * @todo Collapse into isWithinBounds
 */
const shouldStepDown = (state: TSliderState, { index, min }: { index: number; min: number }) =>
  getThumbCurrentValueNumber(state, { index }) > getThumbMinValueNumber(state, { index, min });

const shouldChangeValue = (
  state: TSliderState,
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
  state: TSliderState,
  { index, value }: { index: number; value: TSliderThumbValue }
): TSliderState => [...state.slice(0, index), value, ...state.slice(index + 1)];

// reduce

/**
 * @todo Refactor so STEP_UP and STEP_DOWN uses isWithinBounds
 */
export const sliderReducer = (state: TSliderState, action: Record<string, any>): TSliderState => {
  const { type, index, value, step, min, max } = action;

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

export const stepUp = ({ index, step, max }: TStepUpAction) => ({
  type: STEP_UP,
  index,
  step,
  max
});

export const stepDown = ({ index, step, min }: TStepDownAction) => ({
  type: STEP_DOWN,
  index,
  step,
  min
});

export const resetRangeMin = ({ min }: TResetRangeMinAction) => ({
  type: RESET_RANGE_MIN,
  min
});

export const resetRangeMax = ({ max }: TResetRangeMaxAction) => ({
  type: RESET_RANGE_MAX,
  max
});

export const setThumbValue = ({ index, value, min, max }: TSetThumbValueAction) => ({
  type: SET_THUMB_VALUE,
  index,
  value,
  min,
  max
});
