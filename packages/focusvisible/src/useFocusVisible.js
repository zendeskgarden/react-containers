/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * A React "hookification" of the [WICG/focus-visible](https://github.com/WICG/focus-visible)
 * `:focus-visible` polyfill.
 */

import { useRef, useCallback, useEffect } from 'react';

const INPUT_TYPES_WHITE_LIST = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};

export function useFocusVisible({
  scope,
  relativeDocument = document,
  className = 'garden-focus-visible',
  dataAttribute = 'data-garden-focus-visible'
} = {}) {
  // console.log(scope.current)
  if (!scope) {
    throw new Error('Error: the useFocusVisible() hook requires a "scope" property');
  }

  const hadKeyboardEvent = useRef(false);
  const hadFocusVisibleRecently = useRef(false);
  const hadFocusVisibleRecentlyTimeout = useRef(null);

  /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document, body, and non-interactive SVG.
   */
  const isValidFocusTarget = useCallback(
    el => {
      if (
        el &&
        el !== scope.current &&
        el.nodeName !== 'HTML' &&
        el.nodeName !== 'BODY' &&
        'classList' in el &&
        'contains' in el.classList
      ) {
        return true;
      }

      return false;
    },
    [scope]
  );

  /**
   * Computes whether the given element should automatically trigger the
   * `garden-focus-visible` class being added, i.e. whether it should always match
   * `:focus-visible` when focused.
   */
  const focusTriggersKeyboardModality = useCallback(el => {
    const type = el.type;
    const tagName = el.tagName;

    if (tagName === 'INPUT' && INPUT_TYPES_WHITE_LIST[type] && !el.readOnly) {
      return true;
    }

    if (tagName === 'TEXTAREA' && !el.readOnly) {
      return true;
    }

    /** Unable to test in JSDom environment */
    /* istanbul ignore if */
    if (el.isContentEditable) {
      return true;
    }

    return false;
  }, []);

  /**
   * Whether the given element is currently :focus-visible
   */
  const isFocused = useCallback(
    el => {
      if (el && (el.classList.contains(className) || el.hasAttribute(dataAttribute))) {
        return true;
      }

      return false;
    },
    [className, dataAttribute]
  );

  /**
   * Add the `:focus-visible` class to the given element if it was not added by
   * the consumer.
   */
  const addFocusVisibleClass = useCallback(
    el => {
      if (isFocused(el)) {
        return;
      }

      el.classList.add(className);
      el.setAttribute(dataAttribute, true);
    },
    [className, dataAttribute, isFocused]
  );

  /**
   * Remove the `:focus-visible` class from the given element.
   */
  const removeFocusVisibleClass = useCallback(
    el => {
      el.classList.remove(className);
      el.removeAttribute(dataAttribute);
    },
    [className, dataAttribute]
  );

  /**
   * If the most recent user interaction was via the keyboard;
   * and the key press did not include a meta, alt/option, or control key;
   * then the modality is keyboard. Otherwise, the modality is not keyboard.
   * Apply `:focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardEvent`.
   */
  const onKeyDown = useCallback(
    e => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(relativeDocument.activeElement)) {
        addFocusVisibleClass(relativeDocument.activeElement);
      }

      hadKeyboardEvent.current = true;
    },
    [isValidFocusTarget, relativeDocument.activeElement, addFocusVisibleClass]
  );

  /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   */
  const onPointerDown = useCallback(() => {
    hadKeyboardEvent.current = false;
  }, []);

  /**
   * On `focus`, add the `:focus-visible` styling to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */
  const onFocus = useCallback(
    e => {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent.current || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    },
    [addFocusVisibleClass, focusTriggersKeyboardModality, isValidFocusTarget]
  );

  /**
   * On `blur`, remove the `:focus-visible` styling from the target.
   */
  const onBlur = useCallback(
    e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (isFocused(e.target)) {
        /**
         * To detect a tab/window switch, we look for a blur event
         * followed rapidly by a visibility change. If we don't see
         * a visibility change within 100ms, it's probably a regular focus change.
         */
        hadFocusVisibleRecently.current = true;

        clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        hadFocusVisibleRecentlyTimeout.current = setTimeout(() => {
          hadFocusVisibleRecently.current = false;
          clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        }, 100);

        removeFocusVisibleClass(e.target);
      }
    },
    [isFocused, isValidFocusTarget, removeFocusVisibleClass]
  );

  /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   *
   * This accounts for situations where focus enters the page from the URL bar.
   */
  const onInitialPointerMove = useCallback(
    e => {
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent.current = false;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      removeInitialPointerMoveListeners();
    },
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    [removeInitialPointerMoveListeners]
  );

  /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */
  const addInitialPointerMoveListeners = useCallback(() => {
    relativeDocument.addEventListener('mousemove', onInitialPointerMove);
    relativeDocument.addEventListener('mousedown', onInitialPointerMove);
    relativeDocument.addEventListener('mouseup', onInitialPointerMove);
    relativeDocument.addEventListener('pointermove', onInitialPointerMove);
    relativeDocument.addEventListener('pointerdown', onInitialPointerMove);
    relativeDocument.addEventListener('pointerup', onInitialPointerMove);
    relativeDocument.addEventListener('touchmove', onInitialPointerMove);
    relativeDocument.addEventListener('touchstart', onInitialPointerMove);
    relativeDocument.addEventListener('touchend', onInitialPointerMove);
  }, [onInitialPointerMove, relativeDocument]);

  const removeInitialPointerMoveListeners = useCallback(() => {
    relativeDocument.removeEventListener('mousemove', onInitialPointerMove);
    relativeDocument.removeEventListener('mousedown', onInitialPointerMove);
    relativeDocument.removeEventListener('mouseup', onInitialPointerMove);
    relativeDocument.removeEventListener('pointermove', onInitialPointerMove);
    relativeDocument.removeEventListener('pointerdown', onInitialPointerMove);
    relativeDocument.removeEventListener('pointerup', onInitialPointerMove);
    relativeDocument.removeEventListener('touchmove', onInitialPointerMove);
    relativeDocument.removeEventListener('touchstart', onInitialPointerMove);
    relativeDocument.removeEventListener('touchend', onInitialPointerMove);
  }, [onInitialPointerMove, relativeDocument]);

  /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had :focus-visible.
   */
  /* istanbul ignore next */
  const onVisibilityChange = useCallback(() => {
    /* Unable to mock visibilityState in JSDom environment */
    if (relativeDocument.visibilityState === 'hidden') {
      if (hadFocusVisibleRecently.current) {
        hadKeyboardEvent.current = true;
      }
    }
  }, [relativeDocument]);

  useEffect(() => {
    const currentScope = scope.current;

    if (!relativeDocument || !currentScope) {
      return;
    }

    /**
     * For some kinds of state, we are interested in changes at the
     * global scope only. For example, global pointer input,
     * global key presses and global visibility change should
     * affect the state at every scope:
     */
    relativeDocument.addEventListener('keydown', onKeyDown, true);
    relativeDocument.addEventListener('mousedown', onPointerDown, true);
    relativeDocument.addEventListener('pointerdown', onPointerDown, true);
    relativeDocument.addEventListener('touchstart', onPointerDown, true);
    relativeDocument.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    /**
     * For focus and blur, we specifically care about state changes in the
     * local scope. This is because focus / blur events that originate
     * from within a shadow root are not re-dispatched from the host
     * element if it was already the active element in its own scope:
     */
    currentScope && currentScope.addEventListener('focus', onFocus, true);
    currentScope && currentScope.addEventListener('blur', onBlur, true);

    // eslint-disable-next-line consistent-return
    return () => {
      relativeDocument.removeEventListener('keydown', onKeyDown);
      relativeDocument.removeEventListener('mousedown', onPointerDown);
      relativeDocument.removeEventListener('pointerdown', onPointerDown);
      relativeDocument.removeEventListener('touchstart', onPointerDown);
      relativeDocument.removeEventListener('visibilityChange', onVisibilityChange);

      removeInitialPointerMoveListeners();

      currentScope && currentScope.removeEventListener('focus', onFocus);
      currentScope && currentScope.removeEventListener('blur', onBlur);

      clearTimeout(hadFocusVisibleRecentlyTimeout.current);
    };
  }, [
    addInitialPointerMoveListeners,
    onBlur,
    onFocus,
    onKeyDown,
    onPointerDown,
    onVisibilityChange,
    relativeDocument,
    removeInitialPointerMoveListeners,
    scope
  ]);
}
