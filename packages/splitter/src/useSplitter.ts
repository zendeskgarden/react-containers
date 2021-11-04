/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import React, { HTMLProps, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';

export enum SplitterOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum SplitterType {
  FIXED = 'fixed',
  VARIABLE = 'variable'
}

interface IEventTargetLike {
  addEventListener: (...args: any) => any;
  removeEventListener: (...args: any) => any;
}

interface IBodyLike extends IEventTargetLike {
  clientWidth: number;
}

interface IDocumentLike extends IEventTargetLike {
  body: IBodyLike;
}
export interface IUseSplitterProps extends Omit<HTMLProps<any>, 'onChange'> {
  /** An aria-label for the separator */
  ariaLabel?: string;
  /** An id of the element the separator controls */
  primaryPaneId: string;
  /** A document environment to attach events to */
  environment?: Document | IDocumentLike;
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
  /** A boolean that changes splitter from left-to-right to right-to-left mode */
  rtl?: boolean;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T>(options?: T & HTMLProps<any>) => any;
}

// Pointer coordinates do not account padding, margins, or height/width of separator
// This function takes mouse or touch value minus padding or margin position minus the width or height of the separator divided by 2
// This aligns the pointer and the separator correctly
// When passed a viewportWidth, subtract pointer position and offsets to invert the calculation for RTL mode.
export const calculateOffset = (
  pointerPosition: number,
  paddingOrMarginPosition = 0,
  offsetDimension = 0,
  viewportWidth = 0
) => {
  if (viewportWidth === 0) {
    return pointerPosition - paddingOrMarginPosition - Math.ceil(offsetDimension / 2);
  }

  return viewportWidth - pointerPosition - paddingOrMarginPosition - offsetDimension;
};

export const verticalArrowKeys = {
  rtl: {
    INCREASE: 'ArrowLeft',
    DECREASE: 'ArrowRight'
  },
  ltr: {
    INCREASE: 'ArrowRight',
    DECREASE: 'ArrowLeft'
  }
};

export function useSplitter({
  ariaLabel,
  primaryPaneId,
  environment = document,
  type,
  min,
  max,
  orientation,
  keyboardStep = 50,
  defaultValueNow = min,
  valueNow,
  onChange = () => undefined,
  rtl = false,
  ...props
}: IUseSplitterProps): IUseSplitterReturnValue {
  const isControlled = valueNow !== undefined && valueNow !== null;
  const [state, setState] = useState(defaultValueNow);
  const separatorRef = useRef<HTMLElement>(null);
  const dimension = isControlled ? valueNow : state;
  const setDimension = isControlled ? onChange : setState;

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
      const clientWidth = rtl ? environment.body.clientWidth : undefined;

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
          calculateOffset(
            event.pageX,
            elem?.parentElement?.offsetLeft,
            elem?.offsetWidth,
            clientWidth
          )
        );
      }
    },
    [orientation, setBoundedDimension, rtl, environment]
  );

  // Any events that are registered globally to the DOM need to conserve their reference for removal to prevent listener leaks
  const onMouseMove = useMemo(
    () => composeEventHandlers(props.onMouseMove, onSplitterMouseMove),
    [props.onMouseMove, onSplitterMouseMove]
  );

  const onSplitterTouchMove = useCallback(
    (event: TouchEvent) => {
      const { pageY, pageX } = event.targetTouches[0];
      const elem = separatorRef.current;
      const clientWidth = rtl ? environment.body.clientWidth : undefined;

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
          calculateOffset(pageX, elem?.parentElement?.offsetLeft, elem?.offsetWidth, clientWidth)
        );
      }
    },
    [orientation, setBoundedDimension, rtl, environment]
  );

  const onTouchMove = useMemo(
    () => composeEventHandlers(props.onTouchMove, onSplitterTouchMove),
    [props.onTouchMove, onSplitterTouchMove]
  );

  const onMouseLeaveOrUp = useMemo(
    () =>
      composeEventHandlers(props.onMouseUp, props.onMouseLeave, (event: MouseEvent) => {
        event.preventDefault();
        // must remove global events on transaction finish
        environment.removeEventListener('mouseup', onMouseLeaveOrUp);
        environment.body.removeEventListener('mouseleave', onMouseLeaveOrUp);
        environment.removeEventListener('mousemove', onMouseMove);
      }),
    [environment, props.onMouseUp, props.onMouseLeave, onMouseMove]
  );

  const onTouchEnd = useMemo(
    () =>
      composeEventHandlers(props.onTouchEnd, () => {
        // must remove global events on transaction finish
        environment.removeEventListener('touchend', onTouchEnd);
        environment.removeEventListener('touchmove', onTouchMove);
      }),
    [environment, props.onTouchEnd, onTouchMove]
  );

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
      environment.addEventListener('mouseup', onMouseLeaveOrUp);
      environment.body.addEventListener('mouseleave', onMouseLeaveOrUp);
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
      const mode = rtl ? 'rtl' : 'ltr';

      switch (event.key) {
        case verticalArrowKeys[mode].DECREASE:
          type === SplitterType.VARIABLE && setBoundedDimension(dimension - keyboardStep);
          break;
        case verticalArrowKeys[mode].INCREASE:
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
    'aria-controls': primaryPaneId,
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
