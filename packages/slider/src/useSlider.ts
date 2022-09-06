/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
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
import debounce from 'lodash.debounce';

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
  const trackElement = useRef<HTMLDivElement>(null);

  const isInteractive = disabled === false && readOnly === false;

  const [isSlidingThumb, setIsSlidingThumb] = useState<boolean>(false);
  const [slidingThumbInfo, setSlidingThumbInfo] = useState<any | null>(null);

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

  // https://stackoverflow.com/questions/55360736/how-do-i-window-removeeventlistener-using-react-useeffect
  useEffect(
    () => {
      console.log('isSlidingThumb', isSlidingThumb);

      if (isSlidingThumb === false) {
        return;
      }
    
      const doTheThing = (event: MouseEvent) => {
        console.log("doTheThing, whole event", event);
        // console.log("doTheThing, event target", event.target);
        // console.log("doTheThing, event clientX", event.clientX);
        // const targetDimensions = (event.target as HTMLElement)!.getBoundingClientRect();
        // const sliderDimensions = (trackElement.current as HTMLElement)!.getBoundingClientRect();
        // console.log("doTheThing, targetDimensions", targetDimensions);
        // console.log("doTheThing, sliderDimensions", sliderDimensions);

        // This if statement works when the jump between numbers is on the larger side (e.g., 0-10)
        // Need to figure out a better way for smaller steps (e.g., 0-100)
        // if (event.target === trackElement.current) {
          // console.log('doTheThing, slidingThumbInfo', slidingThumbInfo);

          const sliderDimensions = (trackElement.current as HTMLElement)!.getBoundingClientRect();

          const thing1 = event.clientX - sliderDimensions.left;
          // console.log('doTheThing, thing1', thing1);

          const thing2 = thing1 - slidingThumbInfo.startingPosition;
          // console.log('doTheThing, thing2', thing2);
          
          const slideFraction = sliderDimensions.width / thing2;
          // console.log('doTheThing, slideFraction', slideFraction);

          const closestValue = Math.round(max / slideFraction);
          // console.log('doTheThing, closest value', closestValue);

          const thumbValue = getThumbCurrentValueNumber(state, { index: slidingThumbInfo.index });
          // console.log('doTheThing, current thumb value', thumbValue);

          const bar = thumbValue + closestValue;
          // console.log('doTheThing, proposed new value', bar);

          dispatch(
            setCustomValue({
              index: slidingThumbInfo.index,
              value: bar,
              min,
              max
            })
          );
        // }
      }

      trackElement.current!.addEventListener("mousemove", doTheThing);
      return () => {
        trackElement.current!.removeEventListener("mousemove", doTheThing);
      };
    },
    [trackElement, isSlidingThumb, slidingThumbInfo]
  );

  const handleThumbMouseDown = useCallback(
    event => {
      if (isInteractive) {
        event.stopPropagation();
        setIsSlidingThumb(true);
        
        const sliderDimensions = (trackElement.current as HTMLElement)!.getBoundingClientRect();
        setSlidingThumbInfo({
          index: parseInt((event.target as HTMLElement).dataset.index as string, 10),
          startingPosition: event.clientX - sliderDimensions.left
        });
      }
    },
    [isInteractive, setIsSlidingThumb, setSlidingThumbInfo]
  );

  const handleSlideEnd = useCallback(
    event => {
      if (isInteractive) {
        event.stopPropagation();
        setIsSlidingThumb(false);
        setSlidingThumbInfo(null);
      }
    },
    [isInteractive, setIsSlidingThumb, setSlidingThumbInfo]
  );

  const handleThumbClick = useCallback(
    event => {
      if (isInteractive) {
        event.stopPropagation();
      }
    },
    [isInteractive]
  );

  const test = useCallback(
    event => {
      if (isInteractive) {
        event.preventDefault();
        console.log("THUMB MOUSE MOVE", event);
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

  const getSliderRootProps: IUseSliderReturnValue['getSliderRootProps'] = useCallback(
    ({ ...props } = {}) => ({
      'data-garden-container-id': 'containers.slider',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    }),
    []
  );

  const getSliderTrackProps: IUseSliderReturnValue['getSliderTrackProps'] = useCallback(
    ({ onClick, ...props } = {}) => ({
      ...props,
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      // onClick: composeEventHandlers(handleTrackClick, onClick),
      onMouseLeave: handleSlideEnd,
      ref: trackElement
    }),
    [handleTrackClick, handleSlideEnd]
  );

  const getSliderThumbProps: IUseSliderReturnValue['getSliderThumbProps'] = useCallback(
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
      // onMouseMove: test,
      onMouseDown: handleThumbMouseDown,
      onMouseUp: handleSlideEnd,
      onBlur: handleSlideEnd,
      onKeyDown: composeEventHandlers(handleThumbKeyDown, onKeyDown),
      onClick: composeEventHandlers(handleThumbClick, onClick),
    }),
    [required, disabled, readOnly, orientation, state, test, handleSlideEnd, handleThumbMouseDown, handleThumbKeyDown, handleThumbClick]
  );

  return useMemo(
    () => ({
      value: state,
      getSliderRootProps,
      getSliderTrackProps,
      getSliderThumbProps
    }),
    [state, getSliderRootProps, getSliderTrackProps, getSliderThumbProps]
  );
}
