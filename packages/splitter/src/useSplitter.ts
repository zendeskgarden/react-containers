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

export enum SplitterPosition {
  LEADS = 'leads',
  TRAILS = 'trails'
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

export interface ISplitterGetterReturnProps extends HTMLProps<any> {
  'data-garden-container-id': string;
  'data-garden-container-version': string;
}

export interface IUseSplitterProps extends Omit<HTMLProps<any>, 'onChange'> {
  /** An aria-label for the separator */
  ariaLabel?: string;
  /** A browser window object to attach events to */
  windowObject?: Window | IWindowLike;
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
  /** An enum that specifies whether the separator leads or trails the primary pane */
  position: SplitterPosition;
  /** A boolean that changes splitter from left-to-right to right-to-left mode */
  rtl?: boolean;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T>(options?: T & HTMLProps<any>) => any;
  getPrimaryPaneProps: <T>(options?: T & HTMLProps<any>) => any;
  valueNow: number;
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
  // if placement trails use the pointerPosition relative to the left of the viewport
  if (viewportWidthOrHeight === 0) {
    return pointerPosition - bodyPadding - Math.floor(separatorHeightOrWidth / 2);
  }

  // if position leads we need to invert the pointerPosition so its relative to right of the viewport
  return (
    viewportWidthOrHeight - pointerPosition - bodyPadding - Math.floor(separatorHeightOrWidth / 2)
  );
};

export const verticalArrowKeys = {
  rtl: {
    [SplitterPosition.TRAILS]: {
      INCREASE: 'ArrowLeft',
      DECREASE: 'ArrowRight'
    },
    [SplitterPosition.LEADS]: {
      INCREASE: 'ArrowRight',
      DECREASE: 'ArrowLeft'
    }
  },
  ltr: {
    [SplitterPosition.LEADS]: {
      INCREASE: 'ArrowLeft',
      DECREASE: 'ArrowRight'
    },
    [SplitterPosition.TRAILS]: {
      INCREASE: 'ArrowRight',
      DECREASE: 'ArrowLeft'
    }
  }
};

const xor = (a: boolean | undefined, b: boolean | undefined) => {
  if (a && b) {
    return false;
  }

  return a || b;
};

export function useSplitter({
  ariaLabel,
  windowObject = window,
  type,
  min,
  max,
  orientation,
  keyboardStep = 50,
  defaultValueNow = min,
  valueNow,
  onChange = () => undefined,
  position,
  rtl,
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
    const clientWidth = windowObject.document.body.clientWidth;
    const clientHeight = windowObject.document.body.clientHeight;

    // capture distance from left side of viewport to the separator position offset by horizontal scroll
    offsetRef.current.left = rect.left - separatorPosition + windowObject.scrollX;
    // capture distance from right side of viewport to the separator position offset by horizontal scroll
    offsetRef.current.right = clientWidth - rect.right - separatorPosition - windowObject.scrollX;
    // capture distance from top side of viewport to the separator position offset by vertical scroll
    offsetRef.current.top = rect.top - separatorPosition + windowObject.scrollY;
    // capture distance from bottom side of viewport to the separator position offset by vertical scroll
    offsetRef.current.bottom =
      clientHeight - rect.bottom - separatorPosition - windowObject.scrollY;
  }, [offsetRef, separatorRef, separatorPosition, windowObject]);

  const onSplitterMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const elem = separatorRef.current;
      const clientWidth = xor(rtl, position === SplitterPosition.LEADS)
        ? windowObject.document.body.clientWidth
        : undefined;
      const clientHeight =
        position === SplitterPosition.LEADS ? windowObject.document.body.clientHeight : undefined;

      if (orientation === SplitterOrientation.HORIZONTAL) {
        const offset =
          position === SplitterPosition.LEADS ? offsetRef.current.bottom : offsetRef.current.top;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // event.pageY is in pixel values
          normalizePointerToSeparator(offset, event.pageY, elem?.offsetHeight, clientHeight)
        );
      } else {
        const offset = xor(rtl, position === SplitterPosition.LEADS)
          ? offsetRef.current.right
          : offsetRef.current.left;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // event.pageX is in pixel values
          normalizePointerToSeparator(offset, event.pageX, elem?.offsetWidth, clientWidth)
        );
      }
    },
    [orientation, setRangedSeparatorPosition, position, windowObject, rtl]
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
      const clientWidth = xor(rtl, position === SplitterPosition.LEADS)
        ? windowObject.document.body.clientWidth
        : undefined;
      const clientHeight =
        position === SplitterPosition.LEADS ? windowObject.document.body.clientHeight : undefined;

      if (orientation === SplitterOrientation.HORIZONTAL) {
        const offset =
          position === SplitterPosition.LEADS ? offsetRef.current.bottom : offsetRef.current.top;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // pageY is in pixel values
          normalizePointerToSeparator(offset, pageY, elem?.offsetHeight, clientHeight)
        );
      } else {
        const offset = xor(rtl, position === SplitterPosition.LEADS)
          ? offsetRef.current.right
          : offsetRef.current.left;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // pageX is in pixel values
          normalizePointerToSeparator(offset, pageX, elem?.offsetWidth, clientWidth)
        );
      }
    },
    [orientation, setRangedSeparatorPosition, position, windowObject, rtl]
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
        windowObject.document.removeEventListener('mouseup', onMouseLeaveOrUp);
        windowObject.document.body.removeEventListener('mouseleave', onMouseLeaveOrUp);
        windowObject.document.removeEventListener('mousemove', onMouseMove);
      }),
    [windowObject, props.onMouseUp, props.onMouseLeave, onMouseMove]
  );

  const onTouchEnd = useMemo(
    () =>
      composeEventHandlers(props.onTouchEnd, () => {
        // must remove global events on transaction finish
        windowObject.document.removeEventListener('touchend', onTouchEnd);
        windowObject.document.removeEventListener('touchmove', onTouchMove);
      }),
    [windowObject, props.onTouchEnd, onTouchMove]
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
      windowObject.document.addEventListener('mouseup', onMouseLeaveOrUp);
      windowObject.document.body.addEventListener('mouseleave', onMouseLeaveOrUp);
      windowObject.document.addEventListener('mousemove', onMouseMove);
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
      windowObject.document.addEventListener('touchend', onTouchEnd);
      windowObject.document.addEventListener('touchmove', onTouchMove);
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
    const rtlKey = rtl ? 'rtl' : 'ltr';

    if (orientation === SplitterOrientation.VERTICAL) {
      switch (event.key) {
        case verticalArrowKeys[rtlKey][position].DECREASE:
          type === SplitterType.VARIABLE &&
            setRangedSeparatorPosition(separatorPosition - keyboardStep);
          break;
        case verticalArrowKeys[rtlKey][position].INCREASE:
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

  const getSeparatorProps = useCallback(
    ({ ...other } = {}): ISplitterGetterReturnProps => ({
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
    }),
    [
      separatorRef,
      onMouseDown,
      onKeyDown,
      onTouchStart,
      ariaLabel,
      primaryPaneId,
      separatorPosition,
      min,
      max,
      orientation
    ]
  );

  const getPrimaryPaneProps = useCallback(
    ({ ...other } = {}): ISplitterGetterReturnProps => ({
      'data-garden-container-id': 'containers.splitter.primaryPane',
      'data-garden-container-version': PACKAGE_VERSION,
      id: primaryPaneId,
      ...other
    }),
    [primaryPaneId]
  );

  return useMemo(
    () => ({
      getSeparatorProps,
      getPrimaryPaneProps,
      valueNow: separatorPosition
    }),
    [separatorPosition, getSeparatorProps, getPrimaryPaneProps]
  );
}
