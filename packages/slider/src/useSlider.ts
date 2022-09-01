/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useReducer, useMemo, useCallback } from 'react';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';

import { IUseSliderProps, IUseSliderReturnValue } from './types';
import {
  sliderReducer,
  initializeSliderReducerState,
  getThumbCurrentValueNumber,
  getThumbMaxValueNumber,
  getThumbMinValueNumber,
  setCustomValue,
  increment,
  decrement,
  resetRangeMin,
  resetRangeMax
} from './sliderReducer';

const POSSIBLE_SLIDER_KEYS = [KEYS.LEFT, KEYS.RIGHT, KEYS.UP, KEYS.DOWN, KEYS.HOME, KEYS.END];

const SLIDER_KEYS = {
  STEP_UP: [KEYS.UP, KEYS.RIGHT],
  STEP_DOWN: [KEYS.DOWN, KEYS.LEFT],
  RESET_RANGE_MIN: KEYS.HOME,
  RESET_RANGE_MAX: KEYS.END
};

export function useSlider({
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  required,
  disabled,
  readOnly,
  orientation = 'horizontal'
}: IUseSliderProps): IUseSliderReturnValue {
  const isInteractive = disabled === false && readOnly === false;

  const [state, dispatch] = useReducer(
    sliderReducer,
    initializeSliderReducerState(value || defaultValue || [min, max])
  );

  const handleTrackClick = useCallback(
    (event: MouseEvent) => {
      if (isInteractive) {
        const sliderDimensions = (event.target as HTMLElement)!.getBoundingClientRect();

        // Mouse position
        // https://htmldom.dev/calculate-the-mouse-position-relative-to-an-element/
        const x = event.clientX - sliderDimensions.left;

        const clickFraction = sliderDimensions.width / x;
        const closestValue = Math.round(max / clickFraction);

        // https://thewebdev.info/2021/04/18/how-to-get-the-closest-number-to-a-number-out-of-a-javascript-array/
        const closestThumbValue = state.reduce((previousValue: number, currentValue: number) => {
          return Math.abs(currentValue - closestValue) < Math.abs(previousValue - closestValue)
            ? currentValue
            : previousValue;
        });

        const closestThumbIndex = state.findIndex(
          (element: number) => element === closestThumbValue
        );

        dispatch(
          setCustomValue({
            index: closestThumbIndex,
            value: closestValue,
            min,
            max
          })
        );
      }
    },
    [isInteractive, state, min, max]
  );

  const handleThumbClick = useCallback(
    event => {
      if (isInteractive) {
        event.stopPropagation();
      }
    },
    [isInteractive]
  );

  const handleThumbKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (isInteractive && POSSIBLE_SLIDER_KEYS.includes(event.key)) {
        const currentIndex = parseInt((event.target as HTMLElement).dataset.index as string, 10);

        if (SLIDER_KEYS.STEP_UP.includes(event.key)) {
          dispatch(increment({ index: currentIndex, step, max }));
        }

        if (SLIDER_KEYS.STEP_DOWN.includes(event.key)) {
          dispatch(decrement({ index: currentIndex, step, min }));
        }

        if (event.key === SLIDER_KEYS.RESET_RANGE_MIN) {
          dispatch(resetRangeMin({ min }));
        }

        if (event.key === SLIDER_KEYS.RESET_RANGE_MAX) {
          dispatch(resetRangeMax({ max }));
        }
      }
    },
    [isInteractive, min, max, step]
  );

  const getRootProps: IUseSliderReturnValue['getRootProps'] = useCallback(
    ({ ...props } = {}) => ({
      'data-garden-container-id': 'containers.slider',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    }),
    []
  );

  const getTrackProps: IUseSliderReturnValue['getTrackProps'] = useCallback(
    ({ onClick, ...props } = {}) => ({
      onClick: composeEventHandlers(handleTrackClick, onClick),
      ...props
    }),
    [handleTrackClick]
  );

  const getThumbProps: IUseSliderReturnValue['getThumbProps'] = useCallback(
    ({ 'aria-label': ariaLabel, index, onKeyDown, onClick, ...props }) => ({
      ...props,
      'aria-label': ariaLabel,
      'aria-valuenow': getThumbCurrentValueNumber(state, { index }),
      'aria-valuemin': getThumbMinValueNumber(state, { index }),
      'aria-valuemax': getThumbMaxValueNumber(state, { index }),
      'aria-required': required,
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      'aria-orientation': orientation,
      // 'aria-valuetext': getThumbCurrentValueText(state, { index}),
      'data-index': index,
      role: 'slider',
      tabIndex: 0,
      onKeyDown: composeEventHandlers(handleThumbKeyDown, onKeyDown),
      onClick: composeEventHandlers(handleThumbClick, onClick)
    }),
    [required, disabled, readOnly, orientation, state, handleThumbKeyDown, handleThumbClick]
  );

  return useMemo(
    () => ({
      value: state,
      getRootProps,
      getTrackProps,
      getThumbProps
    }),
    [state, getRootProps, getTrackProps, getThumbProps]
  );
}
