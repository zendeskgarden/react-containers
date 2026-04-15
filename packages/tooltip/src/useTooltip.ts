/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { KEYS, composeEventHandlers, useId } from '@zendeskgarden/container-utilities';
import { IUseTooltipProps, IUseTooltipReturnValue } from './types';

/**
 * Returns the document object from the window or document prop.
 * For SSR compatibility, use within useEffect hooks.
 */
function getDocument(win?: Window, doc?: Document | ShadowRoot) {
  let _document;
  if (doc) {
    _document = doc;
  } else {
    _document = win ? win.document : window.document;
  }
  return _document as Document;
}

export const useTooltip = <T extends HTMLElement = HTMLElement>({
  delayMilliseconds = 500,
  id,
  isLabel,
  isVisible,
  isToggletip,
  triggerRef,
  window: windowProp,
  document: documentProp
}: IUseTooltipProps<T>): IUseTooltipReturnValue => {
  const _id = useId(id);
  const [visibility, setVisibility] = useState(isVisible);
  const isMounted = useRef(false);
  const openTooltipTimeoutId = useRef<number>();
  const closeTooltipTimeoutId = useRef<number>();
  const isTriggerPopupExpanded = useRef(false);
  const tooltipRef = useRef<HTMLElement>(null);
  const [isAnnouncementReady, setIsAnnouncementReady] = useState(false);

  /**
   * 1. Prevent scheduling a tooltip open if a popup is already expanded.
   *    This avoids creating unnecessary timeouts when we know the tooltip shouldn't show.
   * 2. Popup state may have changed during the delay period, so we need to check again
   *    because the popup could have expanded after the timeout was set.
   *
   * Notes: This implementation suppresses tooltips immediately after collapsing,
   * when focus returns to the trigger. It relies on the fact that the trigger’s onFocus event
   * (which calls openTooltip) fires before the MutationObserver detects changes to aria-expanded.
   */
  const openTooltip = useCallback(
    (delayMs = delayMilliseconds) => {
      if (isTriggerPopupExpanded.current) return; // [1]

      clearTimeout(closeTooltipTimeoutId.current);

      const timerId = setTimeout(() => {
        if (
          isMounted.current &&
          !isTriggerPopupExpanded.current // [2]
        ) {
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

  const handleEscapeKey = useCallback(() => {
    if (!visibility) return;

    const _document = getDocument(windowProp, documentProp);
    const activeElement = _document.activeElement;
    const focusInTooltip = tooltipRef.current?.contains(activeElement as Node);

    closeTooltip(0);

    // Only restore focus if current focus is inside tooltip content
    // (which will be hidden), otherwise preserve user's current focus
    if (focusInTooltip) {
      triggerRef.current?.focus();
    }
  }, [visibility, closeTooltip, windowProp, documentProp, triggerRef]);

  const handleToggletipTriggerClick = useCallback(() => {
    if (visibility) {
      // Re-announcement pattern: clear live region content, wait 100ms, then repopulate
      // Visual tooltip stays open, only announcement content changes
      setIsAnnouncementReady(false);
      setTimeout(() => {
        if (isMounted.current) {
          setIsAnnouncementReady(true);
        }
      }, 100);
    } else {
      openTooltip(0);
      setIsAnnouncementReady(true);
    }
  }, [visibility, openTooltip]);

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
    const triggerElement =
      triggerRef?.current?.getAttribute('aria-haspopup') === 'true' ? triggerRef.current : null;

    const handleTriggerPopupChange = () => {
      const isExpanded = triggerElement?.getAttribute('aria-expanded') === 'true';

      if (triggerElement && isExpanded) {
        setVisibility(false); // suppress existing tooltip
      }

      isTriggerPopupExpanded.current = isExpanded;
    };

    const mutationObserver = new MutationObserver(handleTriggerPopupChange);

    if (triggerElement) {
      mutationObserver.observe(triggerElement, {
        attributes: true,
        attributeFilter: ['aria-expanded']
      });
    }

    handleTriggerPopupChange(); // initial render

    return () => mutationObserver.disconnect();
  }, [triggerRef]);

  useEffect(() => {
    if (!isToggletip || !visibility) return undefined;

    const _document = getDocument(windowProp, documentProp);

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedTooltip = tooltipRef.current?.contains(target);

      if (!clickedTrigger && !clickedTooltip) {
        closeTooltip(0);
      }
    };

    // Defer adding the listener until after the current event loop completes
    // This ensures the opening click (or any click that triggers visibility change)
    // finishes propagating before we start listening for outside clicks
    const timeoutId = setTimeout(() => {
      _document.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      _document.removeEventListener('click', handleOutsideClick);
    };
  }, [isToggletip, visibility, triggerRef, closeTooltip, windowProp, documentProp]);

  useEffect(() => {
    if (!isToggletip || !visibility) return undefined;

    const _document = getDocument(windowProp, documentProp);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEYS.ESCAPE) {
        handleEscapeKey();
      }
    };

    _document.addEventListener('keydown', handleKeyDown);

    return () => {
      _document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isToggletip, visibility, handleEscapeKey, windowProp, documentProp]);

  /*
   * Prop getters
   */

  const getTriggerProps = useCallback<IUseTooltipReturnValue['getTriggerProps']>(
    ({
      tabIndex = 0,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      ...other
    } = {}) => {
      const baseProps = {
        tabIndex,
        'data-garden-container-id': 'containers.tooltip',
        'data-garden-container-version': PACKAGE_VERSION,
        ref: triggerRef as any,
        onKeyDown: composeEventHandlers(onKeyDown, (event: React.KeyboardEvent) => {
          if (event.key === KEYS.ESCAPE) {
            handleEscapeKey();
          }
        }),
        ...other
      };

      if (isToggletip) {
        // Toggletip: click to toggle, no hover/focus, no ARIA description
        return {
          ...baseProps,
          onClick: composeEventHandlers(onClick, handleToggletipTriggerClick),
          onBlur: composeEventHandlers(onBlur, event => {
            // For toggletips: only close on blur if focus moved to an element
            // outside the tooltip. If relatedTarget is null (clicked non-focusable element)
            // or inside tooltip, let the outside click handler decide.
            const focusMovedToTooltip = tooltipRef.current?.contains(event.relatedTarget as Node);
            if (event.relatedTarget && !focusMovedToTooltip) {
              closeTooltip(0);
            }
          })
        };
      }

      // Standard tooltip: preserve all existing behavior
      return {
        ...baseProps,
        onBlur: composeEventHandlers(onBlur, () => closeTooltip(0)),
        onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
        onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
        onFocus: composeEventHandlers(onFocus, event => {
          if (event.currentTarget.matches(':focus-visible')) {
            openTooltip();
          }
        }),
        [isLabel ? 'aria-labelledby' : 'aria-describedby']: _id
      };
    },
    [
      _id,
      isLabel,
      isToggletip,
      handleToggletipTriggerClick,
      handleEscapeKey,
      closeTooltip,
      openTooltip,
      triggerRef
    ]
  );

  const getTooltipProps = useCallback<IUseTooltipReturnValue['getTooltipProps']>(
    ({ role = isToggletip ? 'status' : 'tooltip', onMouseEnter, onMouseLeave, ...other } = {}) => {
      const baseProps = {
        role,
        'aria-hidden': !visibility,
        id: _id,
        ...other
      };

      if (isToggletip) {
        // Toggletip: needs ref for outside click detection, no mouse handlers
        return {
          ...baseProps,
          ref: tooltipRef as any
        };
      }

      // Standard tooltip: mouse handlers for hover behavior
      return {
        ...baseProps,
        onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
        onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip())
      };
    },
    [_id, isToggletip, tooltipRef, closeTooltip, openTooltip, visibility]
  );

  return useMemo<IUseTooltipReturnValue>(
    () => ({
      isVisible: visibility,
      isAnnouncementReady: isToggletip ? isAnnouncementReady : undefined,
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
      isToggletip,
      isAnnouncementReady
    ]
  );
};
