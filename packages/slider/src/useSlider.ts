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
  defaultMinValue = DEFAULT_MIN,
  defaultMaxValue = DEFAULT_MAX,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  rtl = false,
  disabled = false,
  environment
}: IUseSliderProps): IUseSliderReturnValue {
  const doc = environment || document;
  const trackElement = useRef(null);
  const [trackElementDimensions, setTrackElementDimensions] = useState<DOMRect | null>(null);
  const isInteractive = disabled === false;
  const [slidingThumbIndex, setSlidingThumbIndex] = useState<number | null>(null);
  const [state, dispatch] = useReducer(
    sliderReducer,
    initializeSliderReducerState([defaultMinValue, defaultMaxValue])
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

  /** @function handleTrackClick
   * @desc Determine a new Slider value, based on where someone has clicked on the track
   * @todo Consider accommodating vertical orientation
   */
  const handleTrackClick: MouseEventHandler = useCallback(
    event => {
      if (trackElementDimensions && isInteractive) {
        const mouseDistanceFromLeftEdge = event.clientX - trackElementDimensions!.left;
        const mouseTargetPosition = trackElementDimensions!.width / mouseDistanceFromLeftEdge;
        let closestRangeValue = Math.round(max / mouseTargetPosition);

        if (rtl === true) {
          closestRangeValue = max - closestRangeValue;
        }

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
    [trackElementDimensions, isInteractive, rtl, state, min, max]
  );

  /** @function handleSlideMove
   * @desc Determine a new Slider value, based on where someone has moved their mouse on the page
   * @todo Consider accommodating vertical orientation
   */
  const handleSlideMove = useCallback(
    event => {
      if (trackElement.current && slidingThumbIndex !== null) {
        const trackOffsetLeft = trackElementDimensions!.left;
        const trackOffsetRight = trackOffsetLeft + trackElementDimensions!.width;
        const trackWidth = trackElementDimensions!.width;

        let diffX = event.pageX - (rtl ? trackOffsetRight : trackOffsetLeft);

        if (rtl) {
          diffX *= -1;
        }

        const newValue =
          min! + parseInt((((max! - min!) * diffX) / trackWidth) as unknown as string, 10);

        // Reduce updated value to align with step size
        const closestRangeValue = Math.floor(newValue / step!) * step!;

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
    [trackElement, slidingThumbIndex, trackElementDimensions, rtl, min, max, step]
  );

  /** @function removeSlideMove
   * @desc Clean up mouse events that have been added to the page for sliding
   */
  const removeSlideMove = useCallback(() => {
    if (doc) {
      doc.removeEventListener('mousemove', handleSlideMove);
      doc.removeEventListener('mouseup', removeSlideMove);
    }

    setSlidingThumbIndex(null);
  }, [doc, handleSlideMove, setSlidingThumbIndex]);

  /**
   *
   */
  useEffect(() => {
    if (isInteractive && slidingThumbIndex !== null && doc) {
      doc.addEventListener('mousemove', handleSlideMove);
      doc.addEventListener('mouseup', removeSlideMove);
    }

    return () => {
      if (isInteractive && slidingThumbIndex !== null && doc) {
        doc.removeEventListener('mousemove', handleSlideMove);
        doc.removeEventListener('mouseup', removeSlideMove);
      }
    };
  }, [isInteractive, slidingThumbIndex, doc, handleSlideMove, removeSlideMove]);

  /** @function handleSlideStart
   * @desc Identify which thumb is being used for sliding
   * @todo Consider accommodating vertical orientation
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

  /** @function handleSlideEnd
   * @desc Clear information about which thumb is being used for sliding
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

  /** @function handleThumbClick
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
   * @todo Consider accommodating vertical orientation
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

  /** @function handleThumbKeyDown
   * @desc Respond to keyboard interactions in an accessible way, as dictated by the ARIA Authoring Practices Guide (APG)
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

  /** @function getSliderRootProps
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

  /** @function getSliderTrackProps
   * @desc Get all of the HTML attributes for the element serving as the Slider track
   * @todo Consider accommodating touch events for sliding
   */
  const getSliderTrackProps = useCallback<IUseSliderReturnValue['getSliderTrackProps']>(
    ({ onClick, ...props } = {}) => ({
      ...props,
      'aria-disabled': disabled,
      dir: rtl ? 'rtl' : 'ltr',
      onClick: composeEventHandlers(handleTrackClick, onClick),
      ref: trackElement
    }),
    [disabled, rtl, handleTrackClick]
  );

  /** @function getSliderThumbProps
   * @desc Get all of the attributes for an element serving as a Slider thumb
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slider/|APG Slider pattern}
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/|APG Slider (Multi-Thumb) pattern}
   * @todo Accommodate aria-valuetext
   * @todo Consider accommodating vertical orientation
   * @todo Consider accommodating touch events for sliding
   */
  const getSliderThumbProps = useCallback<IUseSliderReturnValue['getSliderThumbProps']>(
    ({ 'aria-label': ariaLabel, index, onKeyDown, onMouseDown, onMouseUp, onClick, ...props }) => ({
      ...props,
      'aria-label': ariaLabel,
      'aria-valuenow': getThumbCurrentValueNumber(state, { index }),
      'aria-valuemin': getThumbMinValueNumber(state, { index }),
      'aria-valuemax': getThumbMaxValueNumber(state, { index }),
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
