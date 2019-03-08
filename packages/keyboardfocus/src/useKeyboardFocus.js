/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';

import { composeEventHandlers } from '@zendeskgarden/container-selection';

export function useKeyboardFocus() {
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  let keyboardFocusable = true;

  const onPointerDown = () => {
    keyboardFocusable = false;
  };

  const onFocus = () => {
    if (keyboardFocusable) {
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
      ...props
    };
  };

  return {
    getFocusProps,
    keyboardFocused
  };
}
