/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';
import { IUseSliderProps, IUseSliderReturnValue } from './types';
import {
  sliderReducer,
  initializeSliderReducerState,
  getThumbCurrentValueNumber,
  getThumbMaxValueNumber,
  getThumbMinValueNumber,
  setCustomValue,
  stepUp,
  stepDown,
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
  min = 0,
  max = 100,
  step = 1,
  required,
  disabled,
  readOnly
}: IUseSliderProps): IUseSliderReturnValue {
  const trackElement = useRef<HTMLDivElement>(null);
  const isInteractive = disabled === false && readOnly === false;
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [slidingThumbInfo, setSlidingThumbInfo] = useState<any | null>(null);
  const [state, dispatch] = useReducer(
    sliderReducer,
    initializeSliderReducerState(defaultValue || [min, max])
  );

  /**
   * @todo Accommodate RTL
   * @todo Accommodate vertical orientation
   */
  const getValueClosestToMouse = useCallback(
    (coordinate: number, startingPosition = null) => {
      const sliderDimensions = (trackElement.current as HTMLElement)!.getBoundingClientRect();
      let positionFromEdge = coordinate - sliderDimensions.left;
      
      if (startingPosition) {
        positionFromEdge = positionFromEdge - startingPosition;
      }
      
      const targetPosition = sliderDimensions.width / positionFromEdge;
      
      return Math.round(max / targetPosition);
    }, 
    [trackElement, max]
  )

  /**
   * @todo Accommodate RTL
   * @todo Accommodate vertical orientation
   */
  const handleTrackClick = useCallback(
    (event: MouseEvent) => {
      if (isInteractive) {
        const closestRangeValue = getValueClosestToMouse(event.clientX);
        const closestThumbValue = state.reduce((previousValue: number, currentValue: number) => {
          return Math.abs(currentValue - closestRangeValue) < Math.abs(previousValue - closestRangeValue)
            ? currentValue
            : previousValue;
        });
        const closestThumbIndex = state.findIndex(
          (element: number) => element === closestThumbValue
        );
        
        dispatch(
          setCustomValue({
            index: closestThumbIndex,
            value: closestRangeValue,
            min,
            max
          })
        );
      }
    },
    [isInteractive, getValueClosestToMouse, state, min, max]
  );

  /**
   * @todo Accommodate RTL
   * @todo Accommodate vertical orientation
   */
  const handleSlideMove = useCallback(
    (event: MouseEvent) => {
      if (trackElement.current && isSliding) {
        const closestRangeValue = getValueClosestToMouse(event.clientX, slidingThumbInfo.startingPosition);
        const currentThumbValue = getThumbCurrentValueNumber(state, { index: slidingThumbInfo.index });
        const newThumbValue = currentThumbValue + closestRangeValue;
        
        if (newThumbValue !== currentThumbValue) {
          dispatch(
            setCustomValue({
              index: slidingThumbInfo.index,
              value: newThumbValue,
              min,
              max
            })
          );
        }
      }
    },
    [trackElement, isSliding, getValueClosestToMouse, slidingThumbInfo, state, min, max]
  );

  /**
   * @todo Accommodate RTL
   * @todo Accommodate vertical orientation
   */
  const handleSlideStart = useCallback(
    event => {
      if (trackElement.current && isInteractive) {
        event.stopPropagation();
        setIsSliding(true);
        
        const sliderDimensions = (trackElement.current as HTMLElement)!.getBoundingClientRect();
        
        setSlidingThumbInfo({
          index: parseInt((event.target as HTMLElement).dataset.index as string, 10),
          startingPosition: event.clientX - sliderDimensions.left
        });
      }
    },
    [trackElement, isInteractive, setIsSliding]
  );

  const handleSlideEnd = useCallback(
    event => {
      if (trackElement.current && isInteractive) {
        event.stopPropagation();
        setIsSliding(false);
        setSlidingThumbInfo(null);
      }
    },
    [trackElement, isInteractive, setIsSliding, setSlidingThumbInfo]
  );

  const handleThumbClick = useCallback(
    (event: MouseEvent) => {
      if (isInteractive) {
        event.stopPropagation();
      }
    },
    [isInteractive]
  );

  const handleThumbKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (isInteractive && POSSIBLE_SLIDER_KEYS.includes(event.key)) {
        const currentThumbIndex = parseInt((event.target as HTMLElement).dataset.index as string, 10);

        if (SLIDER_KEYS.STEP_UP.includes(event.key)) {
          dispatch(stepUp({ index: currentThumbIndex, step, max }));
        }

        if (SLIDER_KEYS.STEP_DOWN.includes(event.key)) {
          dispatch(stepDown({ index: currentThumbIndex, step, min }));
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
      onClick: composeEventHandlers(handleTrackClick, onClick),
      onMouseMove: handleSlideMove,
      ref: trackElement
    }),
    [disabled, readOnly, handleTrackClick, handleSlideMove]
  );

  /**
   * @todo Accommodate aria-valuetext
   * @todo Accommodate vertical orientation
   */
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
      'aria-orientation': 'horizontal',
      'data-index': index,
      role: 'slider',
      tabIndex: isInteractive ? 0 : -1,
      onMouseDown: handleSlideStart,
      onTouchStart: handleSlideStart,
      onMouseUp: handleSlideEnd,
      onTouchEnd: handleSlideEnd,
      onKeyDown: composeEventHandlers(handleThumbKeyDown, onKeyDown),
      onClick: composeEventHandlers(handleThumbClick, onClick),
    }),
    [state, required, disabled, readOnly, isInteractive, handleSlideStart, handleSlideEnd, handleThumbKeyDown, handleThumbClick]
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
