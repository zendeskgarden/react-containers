/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect, useRef } from 'react';
import { useUIDSeed } from 'react-uid';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-utilities';

export interface IUseTooltipProps {
  /** Milliseconds of delay before open/close of tooltip is initiated  */
  delayMilliseconds?: number;
  id?: string;
  /** Control visibility state of the tooltip */
  isVisible?: boolean;
}

export interface IUseTooltipReturnValue {
  isVisible?: boolean;
  getTooltipProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getTriggerProps: <T>(options?: T) => T & React.HTMLProps<any>;
  openTooltip: (delayMs?: number) => void;
  closeTooltip: (delayMs?: number) => void;
}

export const useTooltip = ({
  delayMilliseconds = 500,
  id,
  isVisible
}: IUseTooltipProps = {}): IUseTooltipReturnValue => {
  const [visibility, setVisibility] = useState(isVisible);
  const seed = useUIDSeed();
  const [_id] = useState(id || seed(`tooltip_${PACKAGE_VERSION}`));
  const isMounted = useRef(false);

  const openTooltipTimeoutId = useRef<number>();
  const closeTooltipTimeoutId = useRef<number>();

  const openTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(closeTooltipTimeoutId.current);

    const timerId = setTimeout(() => {
      if (isMounted.current) {
        setVisibility(true);
      }
    }, delayMs);

    openTooltipTimeoutId.current = Number(timerId);
  };

  const closeTooltip = (delayMs = delayMilliseconds) => {
    clearTimeout(openTooltipTimeoutId.current);

    const timerId = setTimeout(() => {
      if (isMounted.current) {
        setVisibility(false);
      }
    }, delayMs);

    closeTooltipTimeoutId.current = Number(timerId);
  };

  // Sometimes the timeout will call setVisibility even after un-mount and cleanup.
  // Reproducible when running tests and happens when fast switching in Storybook.
  // May be related https://github.com/facebook/react/pull/15650
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Clean up stray timeouts if tooltip un-mounts
  useEffect(() => {
    return () => {
      clearTimeout(openTooltipTimeoutId.current);
      clearTimeout(closeTooltipTimeoutId.current);
    };
  }, [closeTooltipTimeoutId, openTooltipTimeoutId]);

  const getTriggerProps = (
    { tabIndex = 0, onMouseEnter, onMouseLeave, onFocus, onBlur, onKeyDown, ...other } = {} as any
  ) => {
    return {
      tabIndex,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      onFocus: composeEventHandlers(onFocus, () => openTooltip()),
      // Close menu immediately when blurred
      onBlur: composeEventHandlers(onBlur, () => closeTooltip(0)),
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
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

  const getTooltipProps = (
    { role = 'tooltip', onMouseEnter, onMouseLeave, ...other } = {} as any
  ) => {
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
};
