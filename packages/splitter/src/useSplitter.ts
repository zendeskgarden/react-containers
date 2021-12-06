/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { composeEventHandlers, useId } from '@zendeskgarden/container-utilities';
import React, { HTMLProps, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';

export enum SplitterOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum SplitterPlacement {
  START = 'start',
  END = 'end'
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
  clientHeight: number;
}

interface IDocumentLike extends IEventTargetLike {
  body: IBodyLike;
}

export interface IWindowLike {
  document: IDocumentLike;
  scrollX: number;
  scrollY: number;
}

export interface IUseSplitterProps extends Omit<HTMLProps<any>, 'onChange'> {
  /** An aria-label for the separator */
  ariaLabel?: string;
  /** A window environment to attach events to */
  environment?: Window | IWindowLike;
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
  placement: SplitterPlacement;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T>(options?: T & HTMLProps<any>) => any;
  getPrimaryPaneProps: <T>(options?: T & HTMLProps<any>) => any;
}

// takes pointer distance from edge of viewport to the pointer
// minus the offset of pointer position to the separator in the DOM layout
// minus the separator width or height divided by 2 to place cursor in middle of separator
export const normalizePointerToSeparator = (
  bodyPadding: number,
  pointerPosition: number,
  separatorHeightOrWidth = 0,
  viewportWidthOrHeight = 0
) => {
  // if placement end use the pointerPosition relative to the left of the viewport
  if (viewportWidthOrHeight === 0) {
    return pointerPosition - bodyPadding - Math.floor(separatorHeightOrWidth / 2);
  }

  // if placement start we need to invert the pointerPosition so its relative to right of the viewport
  return (
    viewportWidthOrHeight - pointerPosition - bodyPadding - Math.floor(separatorHeightOrWidth / 2)
  );
};

export const verticalArrowKeys = {
  [SplitterPlacement.START]: {
    INCREASE: 'ArrowLeft',
    DECREASE: 'ArrowRight'
  },
  [SplitterPlacement.END]: {
    INCREASE: 'ArrowRight',
    DECREASE: 'ArrowLeft'
  }
};

export function useSplitter({
  ariaLabel,
  environment = window,
  type,
  min,
  max,
  orientation,
  keyboardStep = 50,
  defaultValueNow = min,
  valueNow,
  onChange = () => undefined,
  placement,
  ...props
}: IUseSplitterProps): IUseSplitterReturnValue {
  const primaryPaneId = useId();
  const isControlled = valueNow !== undefined && valueNow !== null;
  const [state, setState] = useState(defaultValueNow);
  const offsetRef = useRef<{ left: number; right: number; top: number; bottom: number }>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
  const separatorRef = useRef<HTMLElement>(null);
  const separatorPosition = isControlled ? valueNow : state;
  const setSeparatorPosition = isControlled ? onChange : setState;

  const setRangedSeparatorPosition = useCallback(
    (nextDimension: number) => {
      if (nextDimension >= max) {
        setSeparatorPosition(max);
      } else if (nextDimension <= min) {
        setSeparatorPosition(min);
      } else {
        setSeparatorPosition(nextDimension);
      }
    },
    [setSeparatorPosition, min, max]
  );

  // derive the distances between viewport to the outer edges of the separator position, offset by scroll
  // see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  const updateOffsets = useCallback(() => {
    const rect = separatorRef.current!.getBoundingClientRect();
    const clientWidth = environment.document.body.clientWidth;
    const clientHeight = environment.document.body.clientHeight;

    // capture distance from left side of viewport to the separator position offset by horizontal scroll
    offsetRef.current.left = rect.left - separatorPosition + environment.scrollX;
    // capture distance from right side of viewport to the separator position offset by horizontal scroll
    offsetRef.current.right = clientWidth - rect.right - separatorPosition - environment.scrollX;
    // capture distance from top side of viewport to the separator position offset by vertical scroll
    offsetRef.current.top = rect.top - separatorPosition + environment.scrollY;
    // capture distance from bottom side of viewport to the separator position offset by vertical scroll
    offsetRef.current.bottom = clientHeight - rect.bottom - separatorPosition - environment.scrollY;
  }, [offsetRef, separatorRef, separatorPosition, environment]);

  const onSplitterMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const elem = separatorRef.current;
      const clientWidth =
        placement === SplitterPlacement.START ? environment.document.body.clientWidth : undefined;
      const clientHeight =
        placement === SplitterPlacement.START ? environment.document.body.clientHeight : undefined;

      if (orientation === SplitterOrientation.HORIZONTAL) {
        const offset =
          placement === SplitterPlacement.START ? offsetRef.current.bottom : offsetRef.current.top;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // event.pageY is in pixel values
          normalizePointerToSeparator(offset, event.pageY, elem?.offsetHeight, clientHeight)
        );
      } else {
        const offset =
          placement === SplitterPlacement.START ? offsetRef.current.right : offsetRef.current.left;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // event.pageX is in pixel values
          normalizePointerToSeparator(offset, event.pageX, elem?.offsetWidth, clientWidth)
        );
      }
    },
    [orientation, setRangedSeparatorPosition, placement, environment]
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
      const clientWidth =
        placement === SplitterPlacement.START ? environment.document.body.clientWidth : undefined;
      const clientHeight =
        placement === SplitterPlacement.START ? environment.document.body.clientHeight : undefined;

      if (orientation === SplitterOrientation.HORIZONTAL) {
        const offset =
          placement === SplitterPlacement.START ? offsetRef.current.bottom : offsetRef.current.top;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // pageY is in pixel values
          normalizePointerToSeparator(offset, pageY, elem?.offsetHeight, clientHeight)
        );
      } else {
        const offset =
          placement === SplitterPlacement.START ? offsetRef.current.right : offsetRef.current.left;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // pageX is in pixel values
          normalizePointerToSeparator(offset, pageX, elem?.offsetWidth, clientWidth)
        );
      }
    },
    [orientation, setRangedSeparatorPosition, placement, environment]
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
        environment.document.removeEventListener('mouseup', onMouseLeaveOrUp);
        environment.document.body.removeEventListener('mouseleave', onMouseLeaveOrUp);
        environment.document.removeEventListener('mousemove', onMouseMove);
      }),
    [environment, props.onMouseUp, props.onMouseLeave, onMouseMove]
  );

  const onTouchEnd = useMemo(
    () =>
      composeEventHandlers(props.onTouchEnd, () => {
        // must remove global events on transaction finish
        environment.document.removeEventListener('touchend', onTouchEnd);
        environment.document.removeEventListener('touchmove', onTouchMove);
      }),
    [environment, props.onTouchEnd, onTouchMove]
  );

  const onMouseDown = composeEventHandlers(props.onMouseDown, (event: React.MouseEvent) => {
    event.preventDefault();
    if (type === SplitterType.FIXED) {
      if (separatorPosition > min) {
        setSeparatorPosition(min);
      }
      if (separatorPosition < max) {
        setSeparatorPosition(max);
      }
    } else {
      updateOffsets();

      // Must register global events to track mouse move outside the container
      environment.document.addEventListener('mouseup', onMouseLeaveOrUp);
      environment.document.body.addEventListener('mouseleave', onMouseLeaveOrUp);
      environment.document.addEventListener('mousemove', onMouseMove);
    }
  });

  const onTouchStart = composeEventHandlers(props.onTouchStart, () => {
    if (type === SplitterType.FIXED) {
      if (separatorPosition > min) {
        setSeparatorPosition(min);
      }
      if (separatorPosition < max) {
        setSeparatorPosition(max);
      }
    } else {
      updateOffsets();

      // Must register global events to track mouse move outside the container
      environment.document.addEventListener('touchend', onTouchEnd);
      environment.document.addEventListener('touchmove', onTouchMove);
    }
  });

  const toggleMinMax = useCallback(() => {
    if (separatorPosition === min) {
      setSeparatorPosition(max);
    } else {
      setSeparatorPosition(min);
    }
  }, [separatorPosition, setSeparatorPosition, min, max]);

  const onKeyDown = composeEventHandlers(props.onKeyDown, (event: React.KeyboardEvent) => {
    if (orientation === SplitterOrientation.VERTICAL) {
      switch (event.key) {
        case verticalArrowKeys[placement].DECREASE:
          type === SplitterType.VARIABLE &&
            setRangedSeparatorPosition(separatorPosition - keyboardStep);
          break;
        case verticalArrowKeys[placement].INCREASE:
          type === SplitterType.VARIABLE &&
            setRangedSeparatorPosition(separatorPosition + keyboardStep);
          break;
        case 'Enter':
          toggleMinMax();
          break;
      }
    } else {
      switch (event.key) {
        case 'ArrowUp':
          type === SplitterType.VARIABLE &&
            setRangedSeparatorPosition(separatorPosition - keyboardStep);
          break;
        case 'ArrowDown':
          type === SplitterType.VARIABLE &&
            setRangedSeparatorPosition(separatorPosition + keyboardStep);
          break;
        case 'Enter': {
          toggleMinMax();
          break;
        }
      }
    }
  });

  const getSeparatorProps = ({ ...other } = {}) => ({
    'data-garden-container-id': 'containers.splitter.separator',
    'data-garden-container-version': PACKAGE_VERSION,
    role: 'separator',
    ref: separatorRef,
    onMouseDown,
    onKeyDown,
    onTouchStart,
    'aria-label': ariaLabel,
    'aria-controls': primaryPaneId,
    'aria-valuenow': separatorPosition,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-orientation': orientation,
    tabIndex: 0,
    ...other
  });

  const getPrimaryPaneProps = ({ ...other } = {}) => ({
    'data-garden-container-id': 'containers.splitter.primaryPane',
    'data-garden-container-version': PACKAGE_VERSION,
    id: primaryPaneId,
    valueNow: separatorPosition,
    ...other
  });

  return {
    getSeparatorProps,
    getPrimaryPaneProps
  };
}
