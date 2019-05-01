/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect } from 'react';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-selection';
import { generateId } from '@zendeskgarden/container-field';

export function useTooltip({ tooltipRef, delayMilliseconds = 500, id, isVisible } = {}) {
  const [visibility, setVisibility] = useState(isVisible);
  const [_id] = useState(id || generateId('garden-tooltip-container'));

  let openTooltipTimeout;
  let closeTooltipTimeout;

  const openTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(closeTooltipTimeout);

    openTooltipTimeout = setTimeout(() => {
      if (tooltipRef.current) {
        setVisibility(true);
      }
    }, delayMs);
  };

  const closeTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(openTooltipTimeout);

    closeTooltipTimeout = setTimeout(() => {
      if (tooltipRef.current) {
        setVisibility(false);
      }
    }, delayMs);
  };

  // Clean up stray timeouts if tooltip unmounts
  useEffect(
    () => {
      return () => {
        clearTimeout(openTooltipTimeout);
        clearTimeout(closeTooltipTimeout);
      };
    },
    [closeTooltipTimeout, openTooltipTimeout]
  );

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
