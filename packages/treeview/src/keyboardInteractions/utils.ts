/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export const FOCUSABLE_SELECTOR =
  'button,[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const isParentNode = (treeItem: Element): boolean =>
  treeItem.getAttribute('role') === 'treeitem' && treeItem.getAttribute('aria-expanded') === 'true';

export const getTree = (target: EventTarget): Element | null =>
  (target as HTMLElement).closest('[role="tree"]');

export const getParentCollapsible = (target: EventTarget): Element | null =>
  (target as HTMLElement).closest('[aria-expanded]');

export const isEndNode = (target: EventTarget): boolean =>
  target instanceof HTMLElement &&
  target.getAttribute('role') === 'treeitem' &&
  target.querySelectorAll(':scope > [role="group"]').length === 0;

export const focusNextTreeItem = (treeElement: Element): void => {
  const nextSibling = treeElement.nextElementSibling;

  if (nextSibling !== null) {
    const focusableElement = nextSibling.querySelector(FOCUSABLE_SELECTOR);

    focusableElement && (focusableElement as HTMLElement).focus();
  }
};

export const focusPrevTreeItem = (treeElement: Element): void => {
  const previousSibling = treeElement.previousElementSibling;

  if (previousSibling !== null) {
    const focusableElement = previousSibling.querySelector(FOCUSABLE_SELECTOR);

    focusableElement && (focusableElement as HTMLElement).focus();
  }
};
