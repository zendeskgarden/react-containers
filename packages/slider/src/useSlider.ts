/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { composeEventHandlers, KEYS } from '@zendeskgarden/container-utilities';
import { IUseSliderProps, IUseSliderReturnValue } from './types';

export const SLIDER_MIN = 0;
export const SLIDER_MAX = 100;
export const SLIDER_STEP = 1;

export function useSlider<T extends Element = Element, M extends HTMLElement = HTMLElement>({
  trackRef,
  minThumbRef,
  maxThumbRef,
  min = SLIDER_MIN,
  max = SLIDER_MAX,
  defaultMinValue,
  defaultMaxValue,
  minValue,
  maxValue,
  onChange = () => undefined,
  step = SLIDER_STEP,
  jump = step,
  disabled,
  rtl,
  environment
}: IUseSliderProps<T, M>): IUseSliderReturnValue {
  const doc = environment || document;
  const [trackRect, setTrackRect] = useState<DOMRect>({ width: 0 } as DOMRect);

  const init = (initMinValue = min, initMaxValue = max) => {
    const retVal = {
      minValue: initMinValue < min ? min : initMinValue,
      maxValue: initMaxValue > max ? max : initMaxValue
    };

    if (retVal.maxValue < min) {
      retVal.maxValue = min;
    }

    if (retVal.minValue > retVal.maxValue) {
      retVal.minValue = retVal.maxValue;
    }

    return retVal;
  };

  const [state, setState] = useState(init(defaultMinValue, defaultMaxValue));
  const isControlled =
    (minValue !== undefined && minValue !== null) || (maxValue !== undefined && maxValue !== null);
  const position = isControlled ? init(minValue, maxValue) : state;
  const setPosition = isControlled ? onChange : setState;

  /*
   * Effects
   */

  useEffect(() => {
    const handleResize = debounce(() => {
      if (trackRef.current) {
        setTrackRect(trackRef.current.getBoundingClientRect());
      }
    }, 100);

    handleResize();

    const win = doc.defaultView || window;

    win.addEventListener('resize', handleResize);

    return () => {
      win.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [doc, trackRef]);

  /*
   * Utilities
   */

  const getTrackPosition = useCallback(
    (event: MouseEvent | Touch) => {
      let retVal = undefined;

      if (trackRect) {
        const offset = rtl ? trackRect.left + trackRect.width : trackRect.left;
        const mouseX = (event.pageX - offset) * (rtl ? -1 : 1);
        const x = (((max - min) * mouseX) / trackRect.width) as unknown as string;
        const value = min + parseInt(x, 10);

        // Reduce return value to align with step size.
        retVal = Math.floor(value / step) * step;
      }

      return retVal;
    },
    [max, min, trackRect, rtl, step]
  );

  const setThumbPosition = useCallback(
    (thumb: 'min' | 'max') => (value: number) => {
      if (!disabled) {
        let newMinValue = position.minValue;
        let newMaxValue = position.maxValue;

        if (thumb === 'min') {
          if (value < min) {
            newMinValue = min;
          } else if (value > position.maxValue) {
            newMinValue = position.maxValue;
          } else {
            newMinValue = value;
          }
        } else if (thumb === 'max') {
          if (value > max) {
            newMaxValue = max;
          } else if (value < position.minValue) {
            newMaxValue = position.minValue;
          } else {
            newMaxValue = value;
          }
        }

        if (!isNaN(newMinValue) && !isNaN(newMaxValue)) {
          setPosition({ minValue: newMinValue, maxValue: newMaxValue });
        }
      }
    },
    [disabled, max, min, position.maxValue, position.minValue, setPosition]
  );

  /*
   * Prop getters
   */

  const getTrackProps = useCallback<IUseSliderReturnValue['getTrackProps']>(
    ({ onMouseDown, ...other } = {}) => {
      const handleMouseDown = (event: MouseEvent) => {
        if (!disabled && event.button === 0) {
          const value = getTrackPosition(event);

          if (value !== undefined) {
            const minOffset = Math.abs(position.minValue - value);
            const maxOffset = Math.abs(position.maxValue - value);

            if (minOffset <= maxOffset) {
              minThumbRef.current && minThumbRef.current.focus();
              setThumbPosition('min')(value);
            } else {
              maxThumbRef.current && maxThumbRef.current.focus();
              setThumbPosition('max')(value);
            }
          }
        }
      };

      return {
        'data-garden-container-id': 'containers.slider.track',
        'data-garden-container-version': PACKAGE_VERSION,
        'aria-disabled': disabled,
        onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
        ...other
      };
    },
    [
      disabled,
      getTrackPosition,
      maxThumbRef,
      minThumbRef,
      position.maxValue,
      position.minValue,
      setThumbPosition
    ]
  );

  const getThumbProps = useCallback(
    (
        thumb: 'min' | 'max'
      ): IUseSliderReturnValue['getMinThumbProps'] | IUseSliderReturnValue['getMaxThumbProps'] =>
      ({ onKeyDown, onMouseDown, onTouchStart, ...other }) => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (!disabled) {
            let value;

            switch (event.key) {
              case KEYS.RIGHT:
                value =
                  (thumb === 'min' ? position.minValue : position.maxValue) + (rtl ? -step : step);
                break;

              case KEYS.UP:
                value = (thumb === 'min' ? position.minValue : position.maxValue) + step;
                break;

              case KEYS.LEFT:
                value =
                  (thumb === 'min' ? position.minValue : position.maxValue) - (rtl ? -step : step);
                break;

              case KEYS.DOWN:
                value = (thumb === 'min' ? position.minValue : position.maxValue) - step;
                break;

              case KEYS.PAGE_UP:
                value = (thumb === 'min' ? position.minValue : position.maxValue) + jump;
                break;

              case KEYS.PAGE_DOWN:
                value = (thumb === 'min' ? position.minValue : position.maxValue) - jump;
                break;

              case KEYS.HOME:
                value = min;
                break;

              case KEYS.END:
                value = max;
                break;
            }

            if (value !== undefined) {
              event.preventDefault(); // prevent screenreader navigation
              event.stopPropagation();
              setThumbPosition(thumb)(value);
            }
          }
        };

        const handleMouseMove = (event: MouseEvent) => {
          const value = getTrackPosition(event);

          if (value !== undefined) {
            setThumbPosition(thumb)(value);
          }
        };

        const handleTouchMove = (event: TouchEvent) => {
          const value = getTrackPosition(event.targetTouches[0]);

          if (value !== undefined) {
            setThumbPosition(thumb)(value);
          }
        };

        const handleMouseUp = () => {
          doc.removeEventListener('mousemove', handleMouseMove);
          doc.removeEventListener('mouseup', handleMouseUp);
        };

        const handleTouchEnd = () => {
          doc.removeEventListener('touchend', handleTouchEnd);
          doc.removeEventListener('touchmove', handleTouchMove);
        };

        const handleMouseDown = (event: MouseEvent) => {
          if (!disabled && event.button === 0) {
            event.stopPropagation();
            doc.addEventListener('mousemove', handleMouseMove);
            doc.addEventListener('mouseup', handleMouseUp);
            event.target && (event.target as HTMLElement).focus();
          }
        };

        const handleTouchStart = (event: TouchEvent) => {
          if (!disabled) {
            event.stopPropagation();
            doc.addEventListener('touchmove', handleTouchMove);
            doc.addEventListener('touchend', handleTouchEnd);
            event.target && (event.target as HTMLElement).focus();
          }
        };

        return {
          'data-garden-container-id': 'containers.slider.thumb',
          'data-garden-container-version': PACKAGE_VERSION,
          role: 'slider',
          tabIndex: disabled ? -1 : 0,
          'aria-valuemin': thumb === 'min' ? min : position.minValue,
          'aria-valuemax': thumb === 'min' ? position.maxValue : max,
          'aria-valuenow': thumb === 'min' ? position.minValue : position.maxValue,
          onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
          onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
          onTouchStart: composeEventHandlers(onTouchStart, handleTouchStart),
          ...other
        };
      },
    [
      doc,
      disabled,
      getTrackPosition,
      jump,
      max,
      min,
      position.maxValue,
      position.minValue,
      rtl,
      step,
      setThumbPosition
    ]
  );

  return useMemo<IUseSliderReturnValue>(
    () => ({
      getTrackProps,
      getMinThumbProps: getThumbProps('min'),
      getMaxThumbProps: getThumbProps('max'),
      trackRect,
      minValue: position.minValue,
      maxValue: position.maxValue
    }),
    [getTrackProps, getThumbProps, position.minValue, position.maxValue, trackRect]
  );
}
