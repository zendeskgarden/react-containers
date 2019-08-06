/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Inspired by the [WICG/focus-visible](https://github.com/WICG/focus-visible)
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
  if (!scope) {
    throw new Error('Error: the useFocusVisible() hook requires a "scope" property');
  }

  const hadKeyboardEvent = useRef(false);
  const hadFocusVisibleRecently = useRef(false);
  const hadFocusVisibleRecentlyTimeout = useRef(null);

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

  const isFocused = useCallback(
    el => {
      if (el && (el.classList.contains(className) || el.hasAttribute(dataAttribute))) {
        return true;
      }

      return false;
    },
    [className, dataAttribute]
  );

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

  const removeFocusVisibleClass = useCallback(
    el => {
      el.classList.remove(className);
      el.removeAttribute(dataAttribute);
    },
    [className, dataAttribute]
  );

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

  const onPointerDown = useCallback(() => {
    hadKeyboardEvent.current = false;
  }, []);

  const onFocus = useCallback(
    e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent.current || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    },
    [addFocusVisibleClass, focusTriggersKeyboardModality, isValidFocusTarget]
  );

  const onBlur = useCallback(
    e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (isFocused(e.target)) {
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

  const onInitialPointerMove = useCallback(
    e => {
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent.current = false;
      // eslint-disable-next-line no-use-before-define
      removeInitialPointerMoveListeners();
    },
    // eslint-disable-next-line no-use-before-define
    [removeInitialPointerMoveListeners]
  );

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

  /* Unable to mock visibilityState in JSDom environment */
  /* istanbul ignore next */
  const onVisibilityChange = useCallback(() => {
    if (relativeDocument.visibilityState === 'hidden') {
      if (hadFocusVisibleRecently.current) {
        hadKeyboardEvent.current = true;
      }
    }
  }, [relativeDocument]);

  useEffect(() => {
    const currentScope = scope && scope.current;

    relativeDocument.addEventListener('keydown', onKeyDown, true);
    relativeDocument.addEventListener('mousedown', onPointerDown, true);
    relativeDocument.addEventListener('pointerdown', onPointerDown, true);
    relativeDocument.addEventListener('touchstart', onPointerDown, true);
    relativeDocument.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    currentScope && currentScope.addEventListener('focus', onFocus, true);
    currentScope && currentScope.addEventListener('blur', onBlur, true);

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
