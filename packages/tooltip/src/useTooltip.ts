/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { KEYS, composeEventHandlers, useId } from '@zendeskgarden/container-utilities';
import { IUseTooltipProps, IUseTooltipReturnValue } from './types';

export const useTooltip = <T extends HTMLElement = HTMLElement>({
  delayMilliseconds = 500,
  id,
  isVisible,
  triggerRef
}: IUseTooltipProps<T>): IUseTooltipReturnValue => {
  const _id = useId(id);
  const [visibility, setVisibility] = useState(isVisible);
  const [isTriggerPopupExpanded, setIsTriggerPopupExpanded] = useState(false);
  const isMounted = useRef(false);
  const openTooltipTimeoutId = useRef<number>();
  const closeTooltipTimeoutId = useRef<number>();

  const openTooltip = useCallback(
    (delayMs = delayMilliseconds) => {
      clearTimeout(closeTooltipTimeoutId.current);

      const timerId = setTimeout(() => {
        if (isMounted.current) {
          setVisibility(true);
        }
      }, delayMs);

      openTooltipTimeoutId.current = Number(timerId);
    },
    [delayMilliseconds]
  );

  const closeTooltip = useCallback(
    (delayMs = delayMilliseconds) => {
      clearTimeout(openTooltipTimeoutId.current);

      const timerId = setTimeout(() => {
        if (isMounted.current) {
          setVisibility(false);
        }
      }, delayMs);

      closeTooltipTimeoutId.current = Number(timerId);
    },
    [delayMilliseconds]
  );

  /*
   * Effects
   */

  useEffect(() => {
    // Sometimes the timeout will call setVisibility even after un-mount and cleanup.
    // Reproducible when running tests and happens when fast switching in Storybook.
    // May be related https://github.com/facebook/react/pull/15650
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Clean up stray timeouts if tooltip un-mounts
    return () => {
      clearTimeout(openTooltipTimeoutId.current);
      clearTimeout(closeTooltipTimeoutId.current);
    };
  }, [closeTooltipTimeoutId, openTooltipTimeoutId]);

  useEffect(() => {
    // Prevent tooltip from competing with a trigger popup (i.e. menu, dialog, etc.)
    const triggerElement = triggerRef?.current;

    const updateTriggerPopupExpandedState = () => {
      if (triggerElement) {
        setIsTriggerPopupExpanded(
          triggerElement.getAttribute('aria-haspopup') === 'true' &&
            triggerElement.getAttribute('aria-expanded') === 'true'
        );
      }
    };

    const mutationObserver = new MutationObserver(updateTriggerPopupExpandedState);

    if (triggerElement) {
      mutationObserver.observe(triggerElement, {
        attributes: true,
        attributeFilter: ['aria-expanded']
      });
    }

    updateTriggerPopupExpandedState(); // initial render

    return () => mutationObserver.disconnect();
  }, [triggerRef]);

  /*
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseTooltipReturnValue['getTriggerProps']>(
    ({ tabIndex = 0, onMouseEnter, onMouseLeave, onFocus, onBlur, onKeyDown, ...other } = {}) => ({
      tabIndex,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      onFocus: composeEventHandlers(onFocus, () => openTooltip()),
      // Close menu immediately when blurred
      onBlur: composeEventHandlers(onBlur, () => closeTooltip(0)),
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
        if (event.key === KEYS.ESCAPE && visibility) {
          closeTooltip(0);
        }
      }),
      'aria-describedby': _id,
      'data-garden-container-id': 'containers.tooltip',
      'data-garden-container-version': PACKAGE_VERSION,
      ref: triggerRef as any,
      ...other
    }),
    [_id, closeTooltip, openTooltip, triggerRef, visibility]
  );

  const getTooltipProps = useCallback<IUseTooltipReturnValue['getTooltipProps']>(
    ({ role = 'tooltip', onMouseEnter, onMouseLeave, ...other } = {}) => ({
      role,
      onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
      onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
      'aria-hidden': !visibility || isTriggerPopupExpanded,
      id: _id,
      ...other
    }),
    [_id, closeTooltip, openTooltip, visibility, isTriggerPopupExpanded]
  );

  return useMemo<IUseTooltipReturnValue>(
    () => ({
      isVisible: visibility && !isTriggerPopupExpanded,
      getTooltipProps,
      getTriggerProps,
      openTooltip,
      closeTooltip
    }),
    [
      closeTooltip,
      getTooltipProps,
      getTriggerProps,
      openTooltip,
      visibility,
      isTriggerPopupExpanded
    ]
  );
};
