/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { composeEventHandlers, KEYS, useId } from '@zendeskgarden/container-utilities';
import { IUseSplitterProps, IUseSplitterReturnValue } from './types';

export const KEYBOARD_STEP = 48;

// takes pointer distance from edge of viewport to the pointer
// minus the offset of pointer position to the separator in the DOM layout
// minus the separator width or height divided by 2 to place cursor in middle of separator
const normalizePointerToSeparator = (
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

const xor = (a: boolean | undefined, b: boolean | undefined) => {
  if (a && b) {
    return false;
  }

  return a || b;
};

export const useSplitter = <T extends HTMLElement = HTMLElement>({
  idPrefix,
  environment,
  isFixed,
  min,
  max,
  orientation = 'vertical',
  keyboardStep = KEYBOARD_STEP,
  defaultValueNow = min,
  valueNow,
  onChange = () => undefined,
  separatorRef,
  isLeading,
  rtl
}: IUseSplitterProps<T>): IUseSplitterReturnValue => {
  const prefix = useId(idPrefix);
  const primaryPaneId = `${prefix}--primary-pane`;
  const isControlled = valueNow !== undefined && valueNow !== null;
  const [state, setState] = useState(defaultValueNow);
  const offsetRef = useRef<{ left: number; right: number; top: number; bottom: number }>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
  const separatorPosition = isControlled ? valueNow : state;
  const doc = environment || document;

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
    [max, min, setSeparatorPosition]
  );

  const move = useCallback(
    (pageX: number, pageY: number) => {
      const elem = separatorRef.current;
      const clientWidth = xor(rtl, isLeading) ? doc.body.clientWidth : undefined;
      const clientHeight = isLeading ? doc.body.clientHeight : undefined;

      if (orientation === 'horizontal') {
        const offset = isLeading ? offsetRef.current.bottom : offsetRef.current.top;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // event.pageY is in pixel values
          normalizePointerToSeparator(offset, pageY, elem?.offsetHeight, clientHeight)
        );
      } else {
        const offset = xor(rtl, isLeading) ? offsetRef.current.right : offsetRef.current.left;

        // normalizePointerToSeparator aligns pointer true pixel coordinates and to the separator accounting for relative DOM positioning
        setRangedSeparatorPosition(
          // event.pageX is in pixel values
          normalizePointerToSeparator(offset, pageX, elem?.offsetWidth, clientWidth)
        );
      }
    },
    [doc, isLeading, orientation, rtl, separatorRef, setRangedSeparatorPosition]
  );

  const getSeparatorProps = useCallback<IUseSplitterReturnValue['getSeparatorProps']>(
    ({ role = 'separator', onMouseDown, onTouchStart, onKeyDown, onClick, ...other }) => {
      const onMouseMove = (event: MouseEvent) => {
        move(event.pageX, event.pageY);
      };

      const onTouchMove = (event: TouchEvent) => {
        const { pageY, pageX } = event.targetTouches[0];

        move(pageX, pageY);
      };

      const onMouseUp = () => {
        // must remove global events on transaction finish
        doc.removeEventListener('mouseup', onMouseUp);
        doc.removeEventListener('mousemove', onMouseMove);
      };

      const onTouchEnd = () => {
        // must remove global events on transaction finish
        doc.removeEventListener('touchend', onTouchEnd);
        doc.removeEventListener('touchmove', onTouchMove);
      };

      // derive the distances between viewport to the outer edges of the separator position, offset by scroll
      // see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
      const updateOffsets = () => {
        const rect = separatorRef.current!.getBoundingClientRect();
        const clientWidth = doc.body.clientWidth;
        const clientHeight = doc.body.clientHeight;
        const win = doc.documentElement || document.body.parentNode || document.body;

        // capture distance from left side of viewport to the separator position offset by horizontal scroll
        offsetRef.current.left = rect.left - separatorPosition + win.scrollLeft;
        // capture distance from right side of viewport to the separator position offset by horizontal scroll
        offsetRef.current.right = clientWidth - rect.right - separatorPosition - win.scrollLeft;
        // capture distance from top side of viewport to the separator position offset by vertical scroll
        offsetRef.current.top = rect.top - separatorPosition + win.scrollTop;
        // capture distance from bottom side of viewport to the separator position offset by vertical scroll
        offsetRef.current.bottom = clientHeight - rect.bottom - separatorPosition - win.scrollTop;
      };

      const handleMouseDown = () => {
        if (!isFixed) {
          updateOffsets();

          // Must register global events to track mouse move outside the container
          doc.addEventListener('mouseup', onMouseUp);
          doc.addEventListener('mousemove', onMouseMove);
        }
      };

      const handleTouchStart = () => {
        if (!isFixed) {
          updateOffsets();

          // Must register global events to track touch move outside the container
          doc.addEventListener('touchend', onTouchEnd);
          doc.addEventListener('touchmove', onTouchMove);
        }
      };

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === KEYS.ENTER) {
          if (separatorPosition === min) {
            setSeparatorPosition(max);
          } else {
            setSeparatorPosition(min);
          }
        } else if (!isFixed) {
          if (event.key === KEYS.RIGHT && orientation === 'vertical') {
            let position;

            if (rtl) {
              position = separatorPosition + (isLeading ? keyboardStep : -keyboardStep);
            } else {
              position = separatorPosition + (isLeading ? -keyboardStep : keyboardStep);
            }

            setRangedSeparatorPosition(position);
          } else if (event.key === KEYS.LEFT && orientation === 'vertical') {
            let position;

            if (rtl) {
              position = separatorPosition + (isLeading ? -keyboardStep : keyboardStep);
            } else {
              position = separatorPosition + (isLeading ? keyboardStep : -keyboardStep);
            }

            setRangedSeparatorPosition(position);
          } else if (event.key === KEYS.UP && orientation === 'horizontal') {
            setRangedSeparatorPosition(
              separatorPosition + (isLeading ? keyboardStep : -keyboardStep)
            );
          } else if (event.key === KEYS.DOWN && orientation === 'horizontal') {
            setRangedSeparatorPosition(
              separatorPosition + (isLeading ? -keyboardStep : keyboardStep)
            );
          }
        }
      };

      const handleClick = () => {
        if (isFixed) {
          if (separatorPosition > min) {
            setSeparatorPosition(min);
          }
          if (separatorPosition < max) {
            setSeparatorPosition(max);
          }
        }
      };

      return {
        role: role === null ? undefined : role,
        onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
        onTouchStart: composeEventHandlers(onTouchStart, handleTouchStart),
        onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
        onClick: composeEventHandlers(onClick, handleClick),
        'aria-controls': primaryPaneId,
        'aria-valuenow': separatorPosition,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-orientation': orientation,
        'data-garden-container-id': 'containers.splitter.separator',
        'data-garden-container-version': PACKAGE_VERSION,
        tabIndex: 0,
        ...other
      };
    },
    [
      doc,
      isFixed,
      isLeading,
      keyboardStep,
      max,
      min,
      move,
      orientation,
      primaryPaneId,
      rtl,
      separatorPosition,
      separatorRef,
      setRangedSeparatorPosition,
      setSeparatorPosition
    ]
  );

  const getPrimaryPaneProps = useCallback<IUseSplitterReturnValue['getPrimaryPaneProps']>(
    (other = {}) => ({
      'data-garden-container-id': 'containers.splitter.primaryPane',
      'data-garden-container-version': PACKAGE_VERSION,
      id: primaryPaneId,
      ...other
    }),
    [primaryPaneId]
  );

  return useMemo<IUseSplitterReturnValue>(
    () => ({
      getSeparatorProps,
      getPrimaryPaneProps,
      valueNow: separatorPosition
    }),
    [getSeparatorProps, getPrimaryPaneProps, separatorPosition]
  );
};
