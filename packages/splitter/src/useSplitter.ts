/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import React, { HTMLProps, MouseEvent, useCallback, useRef, useState } from 'react';

export enum SplitterOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum SplitterType {
  FIXED = 'fixed',
  VARIABLE = 'variable'
}
export interface IUseSplitterProps extends Omit<HTMLProps<any>, 'onChange' | 'controls'> {
  /** An aria-label for the separator */
  ariaLabel?: string;
  /** An id of the element the separator controls */
  controls: string;
  /** A document environment to attach events to */
  environment?:
    | Document
    | {
        addEventListener: (...args: any) => any;
        removeEventListener: (...args: any) => any;
      };
  /** A default value for starting uncontrolled separator location */
  defaultValueNow?: number;
  /** Determines whether a separator behaves in fixed or variable mode */
  type: SplitterType;
  /** A minimum number for separator location */
  min: number;
  /** A maximum number for separator location */
  max: number;
  /** Determines whether the separator is vertical or horizontal orientation */
  orientation: SplitterOrientation;
  /** A number for incrementing the splitter position for keyboard mode */
  keyboardStep?: number;
  /** Determines current position of a controlled separator */
  valueNow?: number;
  /** A callback that receives updated valueNow when a separator moves */
  onChange?: (valueNow: number) => void;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T>(options?: T & HTMLProps<any>) => any;
}

export interface IUseSplitterStateProps<T> {
  /* A default value for uncontrolled mode starting value */
  defaultValue: T;
  /* A current value for controlled state mode */
  value?: T;
  /* A callback that recieves updated value when controlled state changes */
  onChange?: (value: T) => void;
}

export const useSplitterState = <T>({
  defaultValue,
  value,
  onChange
}: IUseSplitterStateProps<T>): [T, (value: T) => void] => {
  const isControlled = value !== undefined && value !== null && typeof onChange === 'function';
  const defaultStateValue = isControlled ? value : defaultValue;
  const [state, setState] = useState<T>(defaultStateValue);

  const makeCachedSetter = useCallback(
    (setterMethod: (value: T) => void) => (nextValue: T) => {
      setterMethod(nextValue);
    },
    []
  );

  return [
    isControlled ? value : state,
    isControlled ? makeCachedSetter(onChange) : makeCachedSetter(setState)
  ];
};

// Pointer coordinates do not account padding, margins, or height/width of separator
// This function takes mouse or touch value minus padding or margin position minus the width or height of the separator divided by 2
// This aligns the pointer and the separator correctly
export const calculateOffset = (
  pointerPosition: number,
  paddingOrMarginPosition = 0,
  offsetDimension = 0
) => pointerPosition - paddingOrMarginPosition - Math.ceil(offsetDimension / 2);

export function useSplitter({
  ariaLabel,
  controls,
  environment = document,
  type,
  min,
  max,
  orientation,
  keyboardStep = 50,
  defaultValueNow = min,
  valueNow,
  onChange,
  ...props
}: IUseSplitterProps): IUseSplitterReturnValue {
  const separatorRef = useRef<HTMLElement>(null);
  const [dimension, setDimension] = useSplitterState<number>({
    defaultValue: defaultValueNow,
    value: valueNow,
    onChange
  });

  const setBoundedDimension = useCallback(
    (nextDimension: number) => {
      if (nextDimension >= max) {
        setDimension(max);
      } else if (nextDimension <= min) {
        setDimension(min);
      } else {
        setDimension(nextDimension);
      }
    },
    [setDimension, min, max]
  );

  const onSplitterMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const elem = separatorRef.current;

      if (orientation === SplitterOrientation.HORIZONTAL) {
        // calculateOffset aligns pointer and separator accounting for margin or padding of the parent element
        setBoundedDimension(
          // event.pageY is in pixel values not unitless
          calculateOffset(event.pageY, elem?.parentElement?.offsetTop, elem?.offsetHeight)
        );
      } else {
        // calculateOffset aligns pointer and separator accounting for margin or padding of the parent element
        setBoundedDimension(
          // event.pageX is in pixel values not unitless
          calculateOffset(event.pageX, elem?.parentElement?.offsetLeft, elem?.offsetWidth)
        );
      }
    },
    [setBoundedDimension, orientation]
  );

  const onMouseMove = composeEventHandlers(props.onMouseMove, onSplitterMouseMove);

  const onSplitterTouchMove = useCallback(
    (event: TouchEvent) => {
      const { pageY, pageX } = event.targetTouches[0];
      const elem = separatorRef.current;

      if (orientation === SplitterOrientation.HORIZONTAL) {
        // calculateOffset aligns pointer and separator accounting for margin or padding of the parent element
        setBoundedDimension(
          // event.pageY is in pixel values not unitless
          calculateOffset(pageY, elem?.parentElement?.offsetTop, elem?.offsetHeight)
        );
      } else {
        // calculateOffset aligns pointer and separator accounting for margin or padding of the parent element
        setBoundedDimension(
          // event.pageX is in pixel values not unitless
          calculateOffset(pageX, elem?.parentElement?.offsetLeft, elem?.offsetWidth)
        );
      }
    },
    [setBoundedDimension, orientation]
  );

  const onTouchMove = composeEventHandlers(props.onTouchMove, onSplitterTouchMove);

  const onMouseUp = composeEventHandlers(props.onMouseUp, (event: MouseEvent) => {
    event.preventDefault();
    // must remove global events on transaction finish
    environment.removeEventListener('mouseup', onMouseUp);
    environment.removeEventListener('mousemove', onMouseMove);
  });

  const onTouchEnd = composeEventHandlers(props.onTouchEnd, () => {
    // must remove global events on transaction finish
    environment.removeEventListener('touchend', onTouchEnd);
    environment.removeEventListener('touchmove', onTouchMove);
  });

  const onMouseDown = composeEventHandlers(props.onMouseDown, (event: React.MouseEvent) => {
    event.preventDefault();
    if (type === SplitterType.FIXED) {
      if (dimension > min) {
        setDimension(min);
      }
      if (dimension < max) {
        setDimension(max);
      }
    } else {
      // Must register global events to track mouse move outside the container
      environment.addEventListener('mouseup', onMouseUp);
      environment.addEventListener('mousemove', onMouseMove);
    }
  });

  const onTouchStart = composeEventHandlers(props.onTouchStart, () => {
    if (type === SplitterType.FIXED) {
      if (dimension > min) {
        setDimension(min);
      }
      if (dimension < max) {
        setDimension(max);
      }
    } else {
      // Must register global events to track mouse move outside the container
      environment.addEventListener('touchend', onTouchEnd);
      environment.addEventListener('touchmove', onTouchMove);
    }
  });

  const toggleMinMax = useCallback(() => {
    if (dimension === min) {
      setDimension(max);
    } else {
      setDimension(min);
    }
  }, [dimension, setDimension, min, max]);

  const onKeyDown = composeEventHandlers(props.onKeyDown, (event: React.KeyboardEvent) => {
    if (orientation === SplitterOrientation.VERTICAL) {
      switch (event.key) {
        case 'ArrowLeft':
          type === SplitterType.VARIABLE && setBoundedDimension(dimension - keyboardStep);
          break;
        case 'ArrowRight':
          type === SplitterType.VARIABLE && setBoundedDimension(dimension + keyboardStep);
          break;
        case 'Enter':
          toggleMinMax();
          break;
      }
    } else {
      switch (event.key) {
        case 'ArrowUp':
          type === SplitterType.VARIABLE && setBoundedDimension(dimension - keyboardStep);
          break;
        case 'ArrowDown':
          type === SplitterType.VARIABLE && setBoundedDimension(dimension + keyboardStep);
          break;
        case 'Enter': {
          toggleMinMax();
          break;
        }
      }
    }
  });

  const getSeparatorProps = ({ ...other } = {}) => ({
    'data-garden-container-id': 'containers.splitter',
    'data-garden-container-version': PACKAGE_VERSION,
    role: 'separator',
    ref: separatorRef,
    onMouseDown,
    onKeyDown,
    onTouchStart,
    'aria-label': ariaLabel,
    'aria-controls': controls,
    'aria-valuenow': dimension,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-orientation': orientation,
    tabIndex: 0,
    ...other
  });

  return {
    getSeparatorProps
  };
}
