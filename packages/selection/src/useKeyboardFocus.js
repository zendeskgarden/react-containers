/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';

import composeEventHandlers from './utils/composeEventHandlers';

export default function useKeyboardFocus() {
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  let keyboardFocusable = true;

  const onMouseDown = () => {
    keyboardFocusable = false;

    /**
     * This is necessary to recognize focus events caused by keyboard vs mouseDown.
     * Due to React event ordering this is always called before onFocus.
     */
    setTimeout(() => {
      keyboardFocusable = true;
    }, 0);
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
      onMouseDown: composeEventHandlers(props.onMouseDown, onMouseDown),
      ...props
    };
  };

  return {
    getFocusProps,
    keyboardFocused
  };
}
