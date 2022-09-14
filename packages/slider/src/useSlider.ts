/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';
import throttle from 'lodash.throttle';

import { IUseSliderProps, IUseSliderReturnValue } from './types';
import {
  sliderReducer,
  initializeSliderReducerState,
  getThumbCurrentValueNumber,
  getThumbMaxValueNumber,
  getThumbMinValueNumber,
  setThumbValue,
  stepUp,
  stepDown,
  resetRangeMin,
  resetRangeMax,
  DEFAULT_MIN,
  DEFAULT_MAX,
  DEFAULT_STEP
} from './sliderReducer';

const POSSIBLE_SLIDER_KEYS = [
  KEYS.LEFT,
  KEYS.RIGHT,
  KEYS.UP,
  KEYS.DOWN,
  KEYS.HOME,
  KEYS.END
] as const;

export function useSlider({
  defaultValue,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  rtl = false,
  required,
  disabled,
  readOnly
}: IUseSliderProps): IUseSliderReturnValue {
  const trackElement = useRef<Element>(null);
  const [trackElementDimensions, setTrackElementDimensions] = useState<DOMRect | null>(null);
  const isInteractive = disabled === false && readOnly === false;
  const [slidingThumbIndex, setSlidingThumbIndex] = useState<number | null>(null);
  const [state, dispatch] = useReducer(
    sliderReducer,
    initializeSliderReducerState(defaultValue || [min, max])
  );

  /**
   * Set up a ResizeObserver to capture the track element's dimensions,
   * even when those dimensions, even when those dimensions change.
   */
  useEffect(() => {
    if (trackElement.current === null) {
      return;
    }

    // we need to check the scope/runtime and make sure it has resize observer
    // we should also evaluate if a library may be a better solution than using a "newish" browser API
    // lastly - should we be handling this in the container hook? Or could we get the info per event?
    if ('ResizeObserver' in window) {
      // Store track element ref in a variable, per eslint's react-hooks/exhaustive-deps warning, which says:
      // “The ref value 'trackElement.current' will likely have changed by the time this effect cleanup function runs.
      // If this ref points to a node rendered by React, copy 'trackElement.current' to a variable inside the effect, and use that variable in the cleanup function.”
      const initialTrackElement = trackElement.current;

      const resizeObserver = new ResizeObserver(
        throttle(
          () => {
            setTrackElementDimensions(
              (initialTrackElement as HTMLElement)!.getBoundingClientRect()
            );
          },
          1000,
          { leading: false }
        )
      );

      resizeObserver.observe(initialTrackElement);

      // eslint-disable-next-line consistent-return
      return () => {
        resizeObserver.unobserve(initialTrackElement);
      };
    }
  }, [trackElement, setTrackElementDimensions]);

  /**
   * @todo Accommodate vertical orientation
   */
  const getValueClosestToMouse = useCallback(
    (coordinate: number) => {
      const mouseDistanceFromLeftEdge = coordinate - trackElementDimensions!.left;
      const mouseTargetPosition = trackElementDimensions!.width / mouseDistanceFromLeftEdge;

      let value = Math.round(max / mouseTargetPosition);

      if (rtl === true) {
        value = max - value;
      }

      return value;
    },
    [trackElementDimensions, rtl, max]
  );

  /**
   * @todo Accommodate vertical orientation
   */
  const handleTrackClick = useCallback(
    (event: MouseEvent) => {
      if (isInteractive) {
        const closestRangeValue = getValueClosestToMouse(event.clientX);
        const closestThumbValue = state.reduce((previousValue: number, currentValue: number) => {
          return Math.abs(currentValue - closestRangeValue) <
            Math.abs(previousValue - closestRangeValue)
            ? currentValue
            : previousValue;
        });
        const closestThumbIndex = state.findIndex(
          (element: number) => element === closestThumbValue
        );

        dispatch(
          setThumbValue({
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
   * @todo Accommodate vertical orientation
   * @todo move to document mouse move (using environment) instead of track
   * @todo use thumb with ref for reference to document event, use 'thumbElement.closest('track [example]')'
   *   to find the track of a given thumb.
   * @todo consider moving "getValueClosestToMouse" out of function component
   */
  const handleSlideMove = useMemo(
    () => (event: MouseEvent) => {
      if (trackElement.current && slidingThumbIndex !== null) {
        const closestRangeValue = getValueClosestToMouse(event.clientX);

        dispatch(
          setThumbValue({
            index: slidingThumbIndex,
            value: closestRangeValue,
            min,
            max
          })
        );
      }
    },
    [trackElement, slidingThumbIndex, getValueClosestToMouse, min, max]
  );

  // Note - We may not need to throttle, or set by increments, using setThumbValue feels more responsive
  // Throttle seemed to make a more jagged experience unless [state] was in the dependency array
  // (which may lead to a leak depending on how throttle is disposed of by the garbage collector, regardless it becomes overhead for the GC)

  // const handleSlideMove = useMemo(
  //   () =>
  //     throttle(
  //       (event: MouseEvent) => {
  //         if (trackElement.current && slidingThumbIndex !== null) {
  //           const closestRangeValue = getValueClosestToMouse(event.clientX);

  //           const currentThumbValue = getThumbCurrentValueNumber(state, {
  //             index: slidingThumbIndex
  //           });

  //           if (closestRangeValue > currentThumbValue) {
  //             dispatch(stepUp({ index: slidingThumbIndex, step, max }));
  //           }

  //           if (closestRangeValue < currentThumbValue) {
  //             dispatch(stepDown({ index: slidingThumbIndex, step, min }));
  //           }
  //         }
  //       },
  //       200,
  //       { trailing: false }
  //     ),
  //   [trackElement, slidingThumbIndex, getValueClosestToMouse, state, step, min, max]
  // );

  /**
   * @todo Accommodate vertical orientation
   */
  const handleSlideStart = useCallback(
    (event: MouseEvent) => {
      if (trackElement.current && isInteractive) {
        event.stopPropagation();
        const currentThumbIndex = parseInt(
          (event.target as HTMLElement).dataset.index as string,
          10
        );

        setSlidingThumbIndex(currentThumbIndex);
      }
    },
    [trackElement, isInteractive, setSlidingThumbIndex]
  );

  const handleSlideEnd = useCallback(
    (event: MouseEvent) => {
      if (trackElement.current && isInteractive) {
        event.stopPropagation();
        setSlidingThumbIndex(null);
      }
    },
    [trackElement, isInteractive, setSlidingThumbIndex]
  );

  const handleThumbClick = useCallback(
    (event: MouseEvent) => {
      if (isInteractive) {
        event.stopPropagation();
      }
    },
    [isInteractive]
  );

  /**
   * Update keyboard interactions map to reflect current layout direction (LTR or RTL)
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slider/#keyboard-interaction-16|ARIA Authoring Practices Guide, Slider pattern, Keyboard interaction}
   * @todo Accommodate vertical orientation
   */
  const keyboardInteractions = useMemo(
    () => ({
      ...(rtl
        ? {
            STEP_UP: [KEYS.UP, KEYS.LEFT],
            STEP_DOWN: [KEYS.DOWN, KEYS.RIGHT]
          }
        : {
            STEP_UP: [KEYS.UP, KEYS.RIGHT],
            STEP_DOWN: [KEYS.DOWN, KEYS.LEFT]
          }),
      RESET_RANGE_MIN: KEYS.HOME,
      RESET_RANGE_MAX: KEYS.END
    }),
    [rtl]
  );

  const handleThumbKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (isInteractive && POSSIBLE_SLIDER_KEYS.includes(event.key)) {
        const currentThumbIndex = parseInt(
          (event.target as HTMLElement).dataset.index as string,
          10
        );

        if (keyboardInteractions.STEP_UP.includes(event.key)) {
          dispatch(stepUp({ index: currentThumbIndex, step, max }));
        }

        if (keyboardInteractions.STEP_DOWN.includes(event.key)) {
          dispatch(stepDown({ index: currentThumbIndex, step, min }));
        }

        if (event.key === keyboardInteractions.RESET_RANGE_MIN) {
          dispatch(resetRangeMin({ min }));
        }

        if (event.key === keyboardInteractions.RESET_RANGE_MAX) {
          dispatch(resetRangeMax({ max }));
        }
      }
    },
    [isInteractive, keyboardInteractions, min, max, step]
  );

  const getSliderRootProps = useCallback(
    ({ ...props } = {}): IUseSliderReturnValue['getSliderRootProps'] => ({
      'data-garden-container-id': 'containers.slider',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props,
      dir: rtl ? 'rtl' : 'ltr'
    }),
    [rtl]
  );

  const getSliderTrackProps = useCallback(
    ({ onClick, ...props } = {}): IUseSliderReturnValue['getSliderTrackProps'] => ({
      ...props,
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      dir: rtl ? 'rtl' : 'ltr',
      onClick: composeEventHandlers(handleTrackClick, onClick),
      onMouseMove: handleSlideMove,
      onTouchMove: handleSlideMove,
      ref: trackElement
    }),
    [disabled, readOnly, rtl, handleTrackClick, handleSlideMove]
  );

  /**
   * @todo Accommodate aria-valuetext
   * @todo Accommodate vertical orientation
   */
  const getSliderThumbProps = useCallback(
    ({
      'aria-label': ariaLabel,
      index,
      onKeyDown,
      onMouseDown,
      onTouchStart,
      onMouseUp,
      onTouchEnd,
      onClick,
      ...props
    }): IUseSliderReturnValue['getSliderThumbProps'] => ({
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
      dir: rtl ? 'rtl' : 'ltr',
      onMouseDown: composeEventHandlers(handleSlideStart, onMouseDown),
      onTouchStart: composeEventHandlers(handleSlideStart, onTouchStart),
      onMouseUp: composeEventHandlers(handleSlideEnd, onMouseUp),
      onTouchEnd: composeEventHandlers(handleSlideEnd, onTouchEnd),
      onKeyDown: composeEventHandlers(handleThumbKeyDown, onKeyDown),
      onClick: composeEventHandlers(handleThumbClick, onClick)
    }),
    [
      state,
      required,
      disabled,
      readOnly,
      isInteractive,
      rtl,
      handleSlideStart,
      handleSlideEnd,
      handleThumbKeyDown,
      handleThumbClick
    ]
  );

  return useMemo(
    () => ({
      value: state,
      getSliderRootProps,
      getSliderTrackProps,
      getSliderThumbProps
    }),
    [state, getSliderRootProps, getSliderTrackProps, getSliderThumbProps]
    // TODO: we will need to remove any type and resolve type conflict...
  ) as any;
}
