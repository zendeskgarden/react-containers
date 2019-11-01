/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useRef, useEffect } from 'react';

import { composeEventHandlers } from '@zendeskgarden/container-utilities';

export interface IUseKeyboardFocusReturnValue {
  getFocusProps: <T>(options?: T) => T & React.HTMLProps<any>;
  keyboardFocused: boolean;
}

export function useKeyboardFocus(): IUseKeyboardFocusReturnValue {
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const focusableTimeoutIdRef = useRef<number>();
  const isKeyboardFocusableRef = useRef(true);

  useEffect(() => {
    return () => {
      clearTimeout(focusableTimeoutIdRef.current);
    };
  }, []);

  const onKeyboardFocusPointerDown = () => {
    isKeyboardFocusableRef.current = false;

    /**
     * This is necessary to recognize focus events caused by keyboard vs mouseDown.
     * Due to event ordering this is always called before onFocus.
     */
    const timeoutId = setTimeout(() => {
      isKeyboardFocusableRef.current = true;
    }, 0);

    focusableTimeoutIdRef.current = Number(timeoutId);
  };

  const onKeyboardFocus = () => {
    if (isKeyboardFocusableRef.current) {
      setKeyboardFocused(true);
    }
  };

  const onKeyboardFocusBlur = () => {
    setKeyboardFocused(false);
  };

  const getFocusProps = (
    {
      tabIndex = 0,
      onBlur,
      onFocus,
      onMouseDown,
      onPointerDown,
      onTouchStart,
      ...props
    } = {} as any
  ) => {
    return {
      tabIndex,
      onBlur: composeEventHandlers(onBlur, onKeyboardFocusBlur),
      onFocus: composeEventHandlers(onFocus, onKeyboardFocus),
      onMouseDown: composeEventHandlers(onMouseDown, onKeyboardFocusPointerDown),
      onPointerDown: composeEventHandlers(onPointerDown, onKeyboardFocusPointerDown),
      onTouchStart: composeEventHandlers(onTouchStart, onKeyboardFocusPointerDown),
      'data-garden-container-id': 'containers.keyboardfocus',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  return {
    getFocusProps,
    keyboardFocused
  };
}
