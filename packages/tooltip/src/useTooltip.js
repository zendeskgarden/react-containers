/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect } from 'react';
import { composeEventHandlers } from '@zendeskgarden/container-selection';

export function useTooltip({ tooltipRef, delayMilliseconds = 500 } = {}) {
  const [visibility, setVisibility] = useState(false);

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
    ...other
  } = {}) => {
    return {
      tabIndex,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      onFocus: composeEventHandlers(onFocus, () => openTooltip()),
      // Close menu immediately when blurred
      onBlur: composeEventHandlers(onBlur, () => closeTooltip(0)),
      ...other
    };
  };

  const getTooltipProps = ({ role = 'tooltip', onMouseEnter, onMouseLeave, ...other } = {}) => {
    return {
      role,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      'aria-hidden': !visibility,
      ...other
    };
  };

  return {
    isVisible: visibility,
    getTooltipProps,
    getTriggerProps
  };
}
