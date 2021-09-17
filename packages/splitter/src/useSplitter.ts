/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import React, { HTMLProps, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

export enum SplitterOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum SplitterType {
  FIXED = 'fixed',
  VARIABLE = 'variable'
}
export interface IUseSplitterProps extends Omit<HTMLProps<any>, 'onChange' | 'controls'> {
  /** A label for the separator */
  label?: string;
  /** An id identifying the element labeling the separator */
  labelledBy?: string;
  /** An id of the element the separator controls */
  controls: string;
  /** A document environment to attach events to */
  environment?: Pick<Document, 'addEventListener' | 'removeEventListener'>;
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
  /** Determines current position of a controlled separator */
  valueNow?: number;
  /** A callback that receives updated valueNow when a controlled separator moves */
  onChange?: (valueNow: number) => void;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T>(options?: T & HTMLProps<any>) => any;
}

export interface IUsePrecachedStateProps<T> {
  /* A default value for uncontrolled mode starting value */
  defaultValue: T;
  /* A current value for controlled state mode */
  value?: T;
  /* A callback that recieves updated value when controlled state changes */
  onChange?: (value: T) => void;
}

// Problem: Generic DOM events fire independently from React state lifecycle.
// Sometimes this will cause React state changes driven by global events to lag behind the current DOM value
// usePrecachedState will provide "safe" state handling using a pre-cached Ref when listening to global DOM events to keep up with latest changes.
// Eventually React State will catch up and the virtual DOM will be consistent with the DOM when using this state hook.
// TODO Promote to Container Utilities?
export const usePrecachedState = <T>({
  defaultValue,
  value,
  onChange
}: IUsePrecachedStateProps<T>): [T, (value: T) => void, React.RefObject<T>] => {
  const isControlled = value !== undefined && value !== null && typeof onChange === 'function';
  const defaultStateValue = isControlled ? value : defaultValue;
  const [state, setState] = useState<T>(defaultStateValue);
  const preCacheRef = useRef<T>(defaultStateValue);

  const makeCachedSetter = useCallback(
    (setterMethod: (value: T) => void) => (nextValue: T) => {
      setterMethod(nextValue);
      // use a ref to cache the immediate value transitions as React state lags slightly behind the global events
      preCacheRef.current = nextValue;
    },
    [preCacheRef]
  );

  return [
    isControlled ? value : state,
    isControlled ? makeCachedSetter(onChange) : makeCachedSetter(setState),
    preCacheRef
  ];
};

export function useSplitter({
  label,
  labelledBy,
  controls,
  environment = document,
  type,
  min,
  max,
  orientation,
  defaultValueNow = min,
  valueNow,
  onChange,
  ...props
}: IUseSplitterProps): IUseSplitterReturnValue {
  const isControlled = valueNow !== undefined && valueNow !== null;
  const separatorRef = useRef<HTMLElement>(null);
  const startPosRef = useRef<number>(isControlled ? valueNow : defaultValueNow);
  const [dimension, setDimensionWithCache, dimensionPreCacheRef] = usePrecachedState<number>({
    defaultValue: defaultValueNow,
    value: valueNow,
    onChange
  });

  useEffect(() => {
    let direction: 'left' | 'top' = 'left';

    if (orientation === SplitterOrientation.HORIZONTAL) {
      direction = 'top';
    }
    // getBoundingClientRect is in pixel values not unitless
    startPosRef.current = Number(separatorRef?.current?.getBoundingClientRect?.()[direction]);
  }, [startPosRef, separatorRef, dimension, orientation]);

  const addDelta = useCallback(
    (delta: number) => {
      // this function runs outside the React update loop inside a global mouse event
      const nextDimension = dimensionPreCacheRef.current! + delta;

      if (nextDimension >= max) {
        setDimensionWithCache(max);
      } else if (nextDimension <= min) {
        setDimensionWithCache(min);
      } else {
        setDimensionWithCache(nextDimension);
      }
    },
    [dimensionPreCacheRef, setDimensionWithCache, min, max]
  );

  const onSplitterMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (orientation === SplitterOrientation.HORIZONTAL) {
        // event.clientY or X is in pixel values not unitless
        addDelta(event.clientY - startPosRef.current);
      } else {
        // event.clientY or X is in pixel values not unitless
        addDelta(event.clientX - startPosRef.current);
      }
    },
    [addDelta, orientation]
  );

  const onMouseMove = composeEventHandlers(props.onMouseMove, onSplitterMouseMove);

  const onSplitterTouchMove = useCallback(
    (event: TouchEvent) => {
      const { pageY, pageX } = event.targetTouches[0];

      if (orientation === SplitterOrientation.HORIZONTAL) {
        // event.clientY or X is in pixel values not unitless
        addDelta(pageY - startPosRef.current);
      } else {
        // event.clientY or X is in pixel values not unitless
        addDelta(pageX - startPosRef.current);
      }
    },
    [addDelta, orientation]
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
        setDimensionWithCache(min);
      }
      if (dimension < max) {
        setDimensionWithCache(max);
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
        setDimensionWithCache(min);
      }
      if (dimension < max) {
        setDimensionWithCache(max);
      }
    } else {
      // Must register global events to track mouse move outside the container
      environment.addEventListener('touchend', onTouchEnd);
      environment.addEventListener('touchmove', onTouchMove);
    }
  });

  const toggleMinMax = useCallback(() => {
    if (dimensionPreCacheRef.current === min) {
      setDimensionWithCache(max);
    } else {
      setDimensionWithCache(min);
    }
  }, [dimensionPreCacheRef, setDimensionWithCache, min, max]);

  const onKeyDown = composeEventHandlers(props.onKeyDown, (event: React.KeyboardEvent) => {
    if (orientation === SplitterOrientation.VERTICAL) {
      switch (event.key) {
        case 'ArrowLeft':
          type === SplitterType.VARIABLE && addDelta(-50);
          break;
        case 'ArrowRight':
          type === SplitterType.VARIABLE && addDelta(50);
          break;
        case 'Enter':
          toggleMinMax();
          break;
      }
    } else {
      switch (event.key) {
        case 'ArrowUp':
          type === SplitterType.VARIABLE && addDelta(-50);
          break;
        case 'ArrowDown':
          type === SplitterType.VARIABLE && addDelta(50);
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
    'aria-label': label,
    'aria-labelledby': labelledBy,
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
