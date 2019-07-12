/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect } from 'react';
import { composeEventHandlers, generateId, KEY_CODES } from '@zendeskgarden/container-utilities';

const HOOK_ID = 'tooltip';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

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
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
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
