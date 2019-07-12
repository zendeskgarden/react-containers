/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useRef, useEffect } from 'react';

import { composeEventHandlers } from '@zendeskgarden/container-utilities';

const HOOK_ID = 'keyboardfocus';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function useKeyboardFocus() {
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const focusableTimeoutRef = useRef(undefined);
  const isKeyboardFocusableRef = useRef(true);

  useEffect(() => {
    return () => {
      clearTimeout(focusableTimeoutRef.current);
    };
  }, []);

  const onPointerDown = () => {
    isKeyboardFocusableRef.current = false;

    /**
     * This is necessary to recognize focus events caused by keyboard vs mouseDown.
     * Due to event ordering this is always called before onFocus.
     */
    focusableTimeoutRef.current = setTimeout(() => {
      isKeyboardFocusableRef.current = true;
    }, 0);
  };

  const onFocus = () => {
    if (isKeyboardFocusableRef.current) {
      setKeyboardFocused(true);
    }
  };

  const onBlur = () => {
    setKeyboardFocused(false);
  };

  const getFocusProps = ({ tabIndex = 0, ...props } = {}) => {
    return {
      tabIndex,
      onBlur: composeEventHandlers(props.onBlur, onBlur),
      onFocus: composeEventHandlers(props.onFocus, onFocus),
      onMouseDown: composeEventHandlers(props.onMouseDown, onPointerDown),
      onPointerDown: composeEventHandlers(props.onPointerDown, onPointerDown),
      onTouchStart: composeEventHandlers(props.onTouchStart, onPointerDown),
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
      ...props
    };
  };

  return {
    getFocusProps,
    keyboardFocused
  };
}
