/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect, useRef } from 'react';
import { composeEventHandlers } from '@zendeskgarden/container-selection';

import { usePopper } from './usePopper';
import { convertGardenToPopperPlacement } from './utils/gardenPlacements';

export function useTooltip({
  placement,
  triggerRef,
  popperRef,
  delayMilliseconds = 500,
  eventsEnabled = true,
  isVisible = false,
  popperModifiers,
  rtl
} = {}) {
  const [visibility, setVisibility] = useState(false);

  const { style, outOfBoundaries, scheduleUpdate } = usePopper({
    placement: convertGardenToPopperPlacement(placement, rtl),
    eventsEnabled,
    referenceRef: triggerRef,
    popperRef,
    modifiers: popperModifiers
  });

  const styles = useRef({ visibility: isVisible ? 'visible' : 'hidden' });

  let openTooltipTimeout;
  let closeTooltipTimeout;

  const openTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(closeTooltipTimeout);

    openTooltipTimeout = setTimeout(() => {
      if (popperRef.current) {
        styles.current.visibility = 'visible';
        setVisibility(true);
      }
    }, delayMs);
  };

  const closeTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(openTooltipTimeout);

    closeTooltipTimeout = setTimeout(() => {
      if (popperRef.current) {
        styles.current.visibility = 'hidden';
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
    style: { ...styles.current, ...style },
    placement,
    isVisible: visibility,
    outOfBoundaries,
    scheduleUpdate,
    getTooltipProps,
    getTriggerProps
  };
}
