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
function getDocument(win?: Window, doc?: Document | ShadowRoot): Document {
  if (doc) {
    return doc instanceof Document ? doc : (doc.ownerDocument ?? document);
  }
  return win ? win.document : window.document;
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
  const announcementTimeoutId = useRef<number>();
  const blurTimeoutId = useRef<number>();
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

      // Reset announcement state immediately for toggletips
      if (isToggletip) {
        setIsAnnouncementReady(false);
      }
    },
    [delayMilliseconds, isToggletip]
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
      clearTimeout(announcementTimeoutId.current);
      announcementTimeoutId.current = Number(
        setTimeout(() => {
          if (isMounted.current) {
            setIsAnnouncementReady(true);
          }
        }, 100)
      );
    } else {
      openTooltip(0);
      setIsAnnouncementReady(true);
    }
  }, [visibility, openTooltip]);

  const handleToggletipBlur = useCallback(() => {
    // Use setTimeout to check where focus actually ended up, similar to useMenu approach.
    // This works regardless of event.relatedTarget being null or not.
    clearTimeout(blurTimeoutId.current);
    blurTimeoutId.current = Number(
      setTimeout(() => {
        if (!isMounted.current) return;

        const _document = getDocument(windowProp, documentProp);
        const activeElement = _document.activeElement;

        // Check if focus is still within trigger or tooltip
        const isTriggerOrTooltipFocused =
          tooltipRef.current?.contains(activeElement as Node) ||
          triggerRef.current?.contains(activeElement as Node);

        // If focus left the trigger and tooltip entirely, close
        if (!isTriggerOrTooltipFocused) {
          closeTooltip(0);
        }
      }, 0)
    );
  }, [closeTooltip, windowProp, documentProp, triggerRef, tooltipRef]);

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
      clearTimeout(announcementTimeoutId.current);
      clearTimeout(blurTimeoutId.current);
    };
  }, []);

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

    // Use mousedown instead of click to avoid timing issues with the opening click.
    // mousedown fires before React state updates, so by the time this effect runs
    // and attaches the listener, the opening mousedown has already passed.
    const handleOutsideMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);

      // Close if clicking anywhere except the trigger itself
      // Per Inclusive Components: clicking the tooltip content should close it
      // (but keyboard focus into tooltip content should keep it open - handled by blur)
      if (!clickedTrigger) {
        closeTooltip(0);
      }
    };

    _document.addEventListener('mousedown', handleOutsideMouseDown);

    return () => {
      _document.removeEventListener('mousedown', handleOutsideMouseDown);
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

  // Warn developers if interactive elements are added to toggletips
  useEffect(() => {
    if (isToggletip && tooltipRef.current && visibility) {
      const interactiveElements = tooltipRef.current.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (interactiveElements.length > 0) {
        // eslint-disable-next-line no-console
        console.warn(
          'Garden Warning: Toggletips should not contain interactive elements. ' +
            'Use Modal for complex forms or Tooltip Dialog for lightweight interactive overlays. ' +
            'See https://garden.zendesk.com/components/tooltip-dialog'
        );
      }
    }
  }, [isToggletip, visibility]);

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
        ...other
      };

      if (isToggletip) {
        // Toggletip: click to toggle, Escape handled by document listener
        return {
          ...baseProps,
          onKeyDown,
          'aria-expanded': visibility ? 'true' : 'false',
          'aria-controls': _id,
          onClick: composeEventHandlers(onClick, handleToggletipTriggerClick),
          onBlur: composeEventHandlers(onBlur, handleToggletipBlur)
        };
      }

      // Regular tooltip: Escape handled here (trigger must have focus)
      return {
        ...baseProps,
        onKeyDown: composeEventHandlers(onKeyDown, (event: React.KeyboardEvent) => {
          if (event.key === KEYS.ESCAPE) {
            handleEscapeKey();
          }
        }),
        onBlur: composeEventHandlers(onBlur, () => closeTooltip(0)),
        onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
        onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip()),
        onFocus: composeEventHandlers(onFocus, event => {
          // Prevent tooltip on implicit focus (i.e. `restoreFocus` in modals)
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
      visibility,
      handleToggletipTriggerClick,
      handleToggletipBlur,
      handleEscapeKey,
      closeTooltip,
      openTooltip,
      triggerRef
    ]
  );

  const getTooltipProps = useCallback<IUseTooltipReturnValue['getTooltipProps']>(
    ({
      role = isToggletip ? 'status' : 'tooltip',
      onMouseEnter,
      onMouseLeave,
      onBlur,
      ...other
    } = {}) => {
      const baseProps = {
        role,
        id: _id,
        ...other
      };

      if (isToggletip) {
        return {
          ...baseProps,
          ref: tooltipRef as any,
          onBlur: composeEventHandlers(onBlur, handleToggletipBlur)
        };
      }

      return {
        ...baseProps,
        'aria-hidden': !visibility,
        onMouseEnter: composeEventHandlers(onMouseEnter, () => openTooltip()),
        onMouseLeave: composeEventHandlers(onMouseLeave, () => closeTooltip())
      };
    },
    [_id, isToggletip, tooltipRef, handleToggletipBlur, closeTooltip, openTooltip, visibility]
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
