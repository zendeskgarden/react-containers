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

import { useRef, useEffect } from 'react';

const INPUT_TYPES_WHITE_LIST: Record<string, boolean> = {
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

export interface IUseFocusVisibleProps {
  /** A ref pointing to the scope which contains focus visible elements */
  scope: React.RefObject<HTMLElement | null>;
  /** A relative document */
  relativeDocument?: any;
  /** A class name applied to the element with `:focus-visible` behavior */
  className?: string;
  /** A data attribute applied to the element with `:focus-visible` behavior */
  dataAttribute?: string;
}

export function useFocusVisible(
  {
    scope,
    relativeDocument,
    className = 'garden-focus-visible',
    dataAttribute = 'data-garden-focus-visible'
  }: IUseFocusVisibleProps = {} as any
): void {
  if (!scope) {
    throw new Error('Error: the useFocusVisible() hook requires a "scope" property');
  }

  const hadKeyboardEvent = useRef(false);
  const hadFocusVisibleRecently = useRef(false);
  const hadFocusVisibleRecentlyTimeout = useRef<number | undefined>();

  useEffect(() => {
    let environment = relativeDocument;

    if (!environment) {
      environment = document;
    }

    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     */
    const isValidFocusTarget = (el: Element | null) => {
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
    };

    /**
     * Computes whether the given element should automatically trigger the
     * `garden-focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     */
    const focusTriggersKeyboardModality = (el: HTMLElement) => {
      const type = (el as HTMLInputElement).type;
      const tagName = el.tagName;

      if (
        tagName === 'INPUT' &&
        INPUT_TYPES_WHITE_LIST[type] &&
        !(el as HTMLInputElement).readOnly
      ) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !(el as HTMLTextAreaElement).readOnly) {
        return true;
      }

      /** Unable to test in JSDom environment */
      /* istanbul ignore if */
      if (el.isContentEditable) {
        return true;
      }

      return false;
    };

    /**
     * Whether the given element is currently :focus-visible
     */
    const isFocused = (el: Element | null) => {
      if (el && (el.classList.contains(className) || el.hasAttribute(dataAttribute))) {
        return true;
      }

      return false;
    };

    /**
     * Add the `:focus-visible` class to the given element if it was not added by
     * the consumer.
     */
    const addFocusVisibleClass = (el: Element | null) => {
      if (isFocused(el)) {
        return;
      }

      el && el.classList.add(className);
      el && el.setAttribute(dataAttribute, 'true');
    };

    /**
     * Remove the `:focus-visible` class from the given element.
     */
    const removeFocusVisibleClass = (el: Element) => {
      el.classList.remove(className);
      el.removeAttribute(dataAttribute);
    };

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `:focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     */
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(environment.activeElement)) {
        addFocusVisibleClass(environment.activeElement);
      }

      hadKeyboardEvent.current = true;
    };

    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     */
    const onPointerDown = () => {
      hadKeyboardEvent.current = false;
    };

    /**
     * On `focus`, add the `:focus-visible` styling to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */
    const onFocus = (e: FocusEvent) => {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target as HTMLElement)) {
        return;
      }

      if (hadKeyboardEvent.current || focusTriggersKeyboardModality(e.target as HTMLElement)) {
        addFocusVisibleClass(e.target as HTMLElement);
      }
    };

    /**
     * On `blur`, remove the `:focus-visible` styling from the target.
     */
    const onBlur = (e: FocusEvent) => {
      if (!isValidFocusTarget(e.target as HTMLElement)) {
        return;
      }

      if (isFocused(e.target as HTMLElement)) {
        /**
         * To detect a tab/window switch, we look for a blur event
         * followed rapidly by a visibility change. If we don't see
         * a visibility change within 100ms, it's probably a regular focus change.
         */
        hadFocusVisibleRecently.current = true;

        clearTimeout(hadFocusVisibleRecentlyTimeout.current);

        const timeoutId = setTimeout(() => {
          hadFocusVisibleRecently.current = false;
          clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        }, 100);

        hadFocusVisibleRecentlyTimeout.current = Number(timeoutId);

        removeFocusVisibleClass(e.target as HTMLElement);
      }
    };

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     *
     * This accounts for situations where focus enters the page from the URL bar.
     */
    const onInitialPointerMove = (e: MouseEvent | TouchEvent) => {
      const nodeName = (e.target as HTMLDocument).nodeName;

      if (nodeName && nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent.current = false;
      // eslint-disable-next-line no-use-before-define
      removeInitialPointerMoveListeners();
    };

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    const addInitialPointerMoveListeners = () => {
      environment.addEventListener('mousemove', onInitialPointerMove);
      environment.addEventListener('mousedown', onInitialPointerMove);
      environment.addEventListener('mouseup', onInitialPointerMove);
      environment.addEventListener('pointermove', onInitialPointerMove);
      environment.addEventListener('pointerdown', onInitialPointerMove);
      environment.addEventListener('pointerup', onInitialPointerMove);
      environment.addEventListener('touchmove', onInitialPointerMove);
      environment.addEventListener('touchstart', onInitialPointerMove);
      environment.addEventListener('touchend', onInitialPointerMove);
    };

    const removeInitialPointerMoveListeners = () => {
      environment.removeEventListener('mousemove', onInitialPointerMove);
      environment.removeEventListener('mousedown', onInitialPointerMove);
      environment.removeEventListener('mouseup', onInitialPointerMove);
      environment.removeEventListener('pointermove', onInitialPointerMove);
      environment.removeEventListener('pointerdown', onInitialPointerMove);
      environment.removeEventListener('pointerup', onInitialPointerMove);
      environment.removeEventListener('touchmove', onInitialPointerMove);
      environment.removeEventListener('touchstart', onInitialPointerMove);
      environment.removeEventListener('touchend', onInitialPointerMove);
    };

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had :focus-visible.
     */
    /* istanbul ignore next */
    const onVisibilityChange = () => {
      /* Unable to mock visibilityState in JSDom environment */
      if (environment.visibilityState === 'hidden') {
        if (hadFocusVisibleRecently.current) {
          hadKeyboardEvent.current = true;
        }
      }
    };

    const currentScope = scope.current;

    if (!environment || !currentScope) {
      return;
    }

    /**
     * For some kinds of state, we are interested in changes at the
     * global scope only. For example, global pointer input,
     * global key presses and global visibility change should
     * affect the state at every scope:
     */
    environment.addEventListener('keydown', onKeyDown, true);
    environment.addEventListener('mousedown', onPointerDown, true);
    environment.addEventListener('pointerdown', onPointerDown, true);
    environment.addEventListener('touchstart', onPointerDown, true);
    environment.addEventListener('visibilitychange', onVisibilityChange, true);

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
      environment.removeEventListener('keydown', onKeyDown);
      environment.removeEventListener('mousedown', onPointerDown);
      environment.removeEventListener('pointerdown', onPointerDown);
      environment.removeEventListener('touchstart', onPointerDown);
      environment.removeEventListener('visibilityChange', onVisibilityChange);

      removeInitialPointerMoveListeners();

      currentScope && currentScope.removeEventListener('focus', onFocus);
      currentScope && currentScope.removeEventListener('blur', onBlur);

      clearTimeout(hadFocusVisibleRecentlyTimeout.current);
    };
  }, [relativeDocument, scope, className, dataAttribute]);
}
