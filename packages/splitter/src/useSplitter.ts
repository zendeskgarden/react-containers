/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps, useCallback, useRef, useState } from 'react';

export interface IUseSplitterProps {
  /** Documents the label prop */
  label?: string;
}

export interface IUseSplitterReturnValue {
  getSeparatorProps: <T>(options?: T & HTMLProps<any>) => any;
  getPaneProps: <T>(options?: T & HTMLProps<any>) => any;
}

function pixelsToNumber(pixels: string): number {
  const [number] = pixels.split('px');

  return Number(number);
}

function numberToPixels(number: number): string {
  return `${number}px`;
}

function calculateNextDimension(
  startPosition: number,
  mouseMovePosition: number,
  dimension: number
): number {
  const delta = mouseMovePosition - startPosition;

  return dimension + delta;
}

enum SplitterStatuses {
  MOVING = 1,
  SETTLED = 0
}

// Reduce React state changes but profiling shows this method is actually slower than embracing React state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useRefSplitterTransaction(
  paneRef: React.RefObject<HTMLElement>,
  defaultDimension: string
) {
  const statusRef = useRef<SplitterStatuses>(SplitterStatuses.SETTLED);
  const startPosRef = useRef(0);
  const dimensionRef = useRef<number>(pixelsToNumber(defaultDimension));
  const timeoutRef = useRef<number>(0);
  const [version, delayedUpdate] = useState<number>(0);
  const getDimension = () => numberToPixels(dimensionRef.current);
  const begin = (position: number) => {
    statusRef.current = SplitterStatuses.MOVING;
    startPosRef.current = position;
  };
  const end = () => {
    statusRef.current = SplitterStatuses.SETTLED;
  };

  const setDimension = (position: number) => {
    const nextDimension = calculateNextDimension(
      startPosRef.current,
      position,
      dimensionRef.current
    );

    if (paneRef?.current) {
      paneRef.current.style.flexBasis = numberToPixels(nextDimension);
    }
    dimensionRef.current = nextDimension;
    startPosRef.current = position;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      delayedUpdate(version + 1);
    }, 200);
  };

  return {
    begin,
    end,
    statusRef,
    getDimension,
    setDimension
  };
}

function useSplitterTransaction(defaultDimension: string) {
  const statusRef = useRef<SplitterStatuses>(SplitterStatuses.SETTLED);
  const startPosRef = useRef(0);
  const [dimension, setNextDimension] = useState<number>(pixelsToNumber(defaultDimension));
  const dimensionRef = useRef<number>(pixelsToNumber(defaultDimension));
  const getDimension = () => numberToPixels(dimension);
  const begin = (position: number) => {
    statusRef.current = SplitterStatuses.MOVING;
    startPosRef.current = position;
  };
  const end = () => {
    statusRef.current = SplitterStatuses.SETTLED;
  };

  const setDimension = (position: number) => {
    // this function runs outside the React update loop inside a global mouse event
    const nextDimension = calculateNextDimension(
      startPosRef.current,
      position,
      dimensionRef.current
    );

    setNextDimension(nextDimension);
    // use a ref to track the immediate value transitions as React state lags slightly behind the global events
    dimensionRef.current = nextDimension;
    startPosRef.current = position;
  };

  return {
    begin,
    end,
    statusRef,
    getDimension,
    setDimension
  };
}

export function useSplitter({ label }: IUseSplitterProps = {}): IUseSplitterReturnValue {
  const [ariaLabel] = useState(label);
  const { begin, end, statusRef, getDimension, setDimension } = useSplitterTransaction('100px');

  const onSplitterMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (statusRef?.current === SplitterStatuses.SETTLED) {
        return;
      }
      setDimension(event.clientX);
    },
    [setDimension, statusRef]
  );

  const onSplitterMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    if (statusRef?.current === SplitterStatuses.SETTLED) {
      return;
    }
    end();
    // must remove global events on transaction finish
    window.removeEventListener('mouseup', onSplitterMouseUp);
    document.removeEventListener('mousemove', onSplitterMouseMove);
  };

  const onMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    if (statusRef?.current === SplitterStatuses.MOVING) {
      return;
    }
    // Must register global events to track mouse move outside the container
    window.addEventListener('mouseup', onSplitterMouseUp);
    document.addEventListener('mousemove', onSplitterMouseMove);
    begin(event.clientX);
  };

  const getSeparatorProps = ({ role = 'region', style, ...props }: HTMLProps<any> = {}) => ({
    role,
    onMouseDown,
    style: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: '5px',
      ...style
    },
    ...props
  });
  const getPaneProps = ({ style = {}, ...props }: HTMLProps<any> = {}) => ({
    'aria-label': ariaLabel,
    style: {
      flexGrow: 0,
      flexShrink: 0,
      overflow: 'auto',
      flexBasis: getDimension(),
      ...style
    },
    ...props
  });

  return {
    getSeparatorProps,
    getPaneProps
  };
}
