/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react';
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
  required = false,
  disabled = false
}: IUseSliderProps): IUseSliderReturnValue {
  const trackElement = useRef(null);
  const [trackElementDimensions, setTrackElementDimensions] = useState<DOMRect | null>(null);
  const isInteractive = disabled === false;
  const [slidingThumbIndex, setSlidingThumbIndex] = useState<number | null>(null);
  const [state, dispatch] = useReducer(
    sliderReducer,
    initializeSliderReducerState(defaultValue || [min, max])
  );

  /**
   * @desc Set up a ResizeObserver to capture the track element's dimensions, even when those dimensions, even when those dimensions change
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

  /** @function
   * @name getValueClosestToMouse
   * @desc
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

  /** @function
   * @name handleTrackClick
   * @desc
   * @todo Accommodate vertical orientation
   */
  const handleTrackClick: MouseEventHandler = useCallback(
    event => {
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

  /** @function
   * @name handleSlideMove
   * @todo Accommodate vertical orientation
   * @todo move to document mouse move (using environment) instead of track
   * @todo Use thumb with ref for reference to document event, use 'thumbElement.closest('track [example]')'
   *   to find the track of a given thumb.
   * @todo Consider moving "getValueClosestToMouse" out of function component
   */
  const handleSlideMove: MouseEventHandler = useMemo(
    () => event => {
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

  /** @function
   * @name handleSlideStart
   * @todo Accommodate vertical orientation
   */
  const handleSlideStart: MouseEventHandler = useCallback(
    event => {
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

  /** @function
   * @name handleSlideEnd
   * @desc
   */
  const handleSlideEnd: MouseEventHandler = useCallback(
    event => {
      if (trackElement.current && isInteractive) {
        event.stopPropagation();
        setSlidingThumbIndex(null);
      }
    },
    [trackElement, isInteractive, setSlidingThumbIndex]
  );

  /** @function
   * @name handleThumbClick
   * @desc Stop thumb event propagation, in order to avoid jittery behavior
   */
  const handleThumbClick: MouseEventHandler = useCallback(
    event => {
      if (isInteractive) {
        event.stopPropagation();
      }
    },
    [isInteractive]
  );

  /**
   * @desc Update keyboard interactions map to reflect current layout direction (LTR or RTL)
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

  /** @function
   * @name handleThumbKeyDown
   * @desc
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slider/#keyboard-interaction-16|Keyboard Interaction, APG Slider pattern}
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/#keyboard-interaction-17|Keyboard Interaction, APG Slider (Multi-Thumb) pattern}
   */
  const handleThumbKeyDown: KeyboardEventHandler = useCallback(
    event => {
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

  /** @function
   * @name getSliderRootProps
   * @desc Get all of the HTML attributes for the element containing the Slider
   */
  const getSliderRootProps = useCallback<IUseSliderReturnValue['getSliderRootProps']>(
    (props = {}) => ({
      'data-garden-container-id': 'containers.slider',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props,
      dir: rtl ? 'rtl' : 'ltr'
    }),
    [rtl]
  );

  /** @function
   * @name getSliderTrackProps
   * @desc Get all of the HTML attributes for the element serving as the Slider track
   * @todo Accommodate touch events for sliding
   */
  const getSliderTrackProps = useCallback<IUseSliderReturnValue['getSliderTrackProps']>(
    ({ onClick, ...props } = {}) => ({
      ...props,
      'aria-disabled': disabled,
      dir: rtl ? 'rtl' : 'ltr',
      onClick: composeEventHandlers(handleTrackClick, onClick),
      onMouseMove: handleSlideMove,
      ref: trackElement
    }),
    [disabled, rtl, handleTrackClick, handleSlideMove]
  );

  /** @function
   * @name getSliderThumbProps
   * @desc Get all of the attributes for an element serving as a Slider thumb
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slider/|APG Slider pattern}
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/|APG Slider (Multi-Thumb) pattern}
   * @todo Accommodate aria-valuetext
   * @todo Accommodate vertical orientation
   * @todo Accommodate touch events for sliding
   */
  const getSliderThumbProps = useCallback<IUseSliderReturnValue['getSliderThumbProps']>(
    ({ 'aria-label': ariaLabel, index, onKeyDown, onMouseDown, onMouseUp, onClick, ...props }) => ({
      ...props,
      'aria-label': ariaLabel,
      'aria-valuenow': getThumbCurrentValueNumber(state, { index }),
      'aria-valuemin': getThumbMinValueNumber(state, { index }),
      'aria-valuemax': getThumbMaxValueNumber(state, { index }),
      'aria-required': required,
      'aria-disabled': disabled,
      'aria-orientation': 'horizontal',
      'data-index': index,
      role: 'slider',
      tabIndex: isInteractive ? 0 : -1,
      dir: rtl ? 'rtl' : 'ltr',
      onMouseDown: composeEventHandlers(handleSlideStart, onMouseDown),
      onMouseUp: composeEventHandlers(handleSlideEnd, onMouseUp),
      onKeyDown: composeEventHandlers(handleThumbKeyDown, onKeyDown),
      onClick: composeEventHandlers(handleThumbClick, onClick)
    }),
    [
      state,
      required,
      disabled,
      isInteractive,
      rtl,
      handleSlideStart,
      handleSlideEnd,
      handleThumbKeyDown,
      handleThumbClick
    ]
  );

  return useMemo<IUseSliderReturnValue>(
    () => ({
      value: state,
      getSliderRootProps,
      getSliderTrackProps,
      getSliderThumbProps
    }),
    [state, getSliderRootProps, getSliderTrackProps, getSliderThumbProps]
  );
}
