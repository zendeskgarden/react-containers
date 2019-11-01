/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect, useRef } from 'react';
import { composeEventHandlers, generateId, KEY_CODES } from '@zendeskgarden/container-utilities';

export function useTooltip({ delayMilliseconds = 500, id, isVisible } = {}) {
  const [visibility, setVisibility] = useState(isVisible);
  const [_id] = useState(id || generateId('garden-tooltip-container'));
  const isMounted = useRef(false);

  let openTooltipTimeout;
  let closeTooltipTimeout;

  const openTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(closeTooltipTimeout);

    openTooltipTimeout = setTimeout(() => {
      if (isMounted.current) {
        setVisibility(true);
      }
    }, delayMs);
  };

  const closeTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(openTooltipTimeout);

    closeTooltipTimeout = setTimeout(() => {
      if (isMounted.current) {
        setVisibility(false);
      }
    }, delayMs);
  };

  // Sometimes the timeout will call setVisibility even after unmount and cleanup
  // reproducable when running tests, happens when fast switching in storybook.
  // May be related https://github.com/facebook/react/pull/15650
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Clean up stray timeouts if tooltip unmounts
  useEffect(() => {
    return () => {
      clearTimeout(openTooltipTimeout);
      clearTimeout(closeTooltipTimeout);
    };
  }, [closeTooltipTimeout, openTooltipTimeout]);

  const getTriggerProps = ({
    tabIndex = 0,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onKeyDown,
    ...other
  } = {}) => {
    return {
      tabIndex,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      onFocus: composeEventHandlers(onFocus, () => openTooltip()),
      // Close menu immediately when blurred
      onBlur: composeEventHandlers(onBlur, () => closeTooltip(0)),
      onKeyDown: composeEventHandlers(onKeyDown, event => {
        if (event.keyCode === KEY_CODES.ESCAPE && visibility) {
          closeTooltip(0);
        }
      }),
      'aria-describedby': _id,
      'data-garden-container-id': 'containers.tooltip',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getTooltipProps = ({ role = 'tooltip', onMouseEnter, onMouseLeave, ...other } = {}) => {
    return {
      role,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      'aria-hidden': !visibility,
      id: _id,
      ...other
    };
  };

  return {
    isVisible: visibility,
    getTooltipProps,
    getTriggerProps,
    openTooltip,
    closeTooltip
  };
}
