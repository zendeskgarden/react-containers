/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  FOCUSABLE_SELECTOR,
  focusPrevTreeItem,
  getParentCollapsible,
  getTree,
  isEndNode,
  isParentNode
} from './utils';

const handleParentNode = (currentTreeElement: Element): void => {
  const previousSibling = currentTreeElement.previousElementSibling;

  if (previousSibling === null) {
    return;
  }

  if (isParentNode(previousSibling)) {
    const lastTreeItem = previousSibling.querySelector('[role="treeitem"]:last-of-type');

    lastTreeItem && (lastTreeItem as HTMLElement).focus();
  } else {
    focusPrevTreeItem(currentTreeElement);
  }
};

const handleEndNode = (currentTreeElement: Element): void => {
  let previousSibling = currentTreeElement.previousElementSibling;

  while (previousSibling && !isEndNode(previousSibling)) {
    previousSibling = previousSibling.previousElementSibling;
  }
  if (previousSibling === null) {
    const parentElement = getParentCollapsible(currentTreeElement);

    if (parentElement === null) {
      return;
    }
    const focusableParentElement = parentElement.querySelector(FOCUSABLE_SELECTOR);

    focusableParentElement && (focusableParentElement as HTMLElement).focus();

    return;
  }
  (previousSibling as HTMLElement).focus();
};

/**
 * Moves focus to the previous node that is focusable without opening or closing a node.
 * If focus is on the first node, does nothing.
 *
 * @param target
 */
export const handleArrowUp = (target: EventTarget): void => {
  const treeElement = getTree(target);

  if (treeElement === null) {
    return;
  }

  if (treeElement.contains(document.activeElement)) {
    const currentTreeElement = (document.activeElement as HTMLElement).closest('[role="treeitem"]');

    if (currentTreeElement === null) {
      return;
    }
    if (isParentNode(currentTreeElement)) {
      handleParentNode(currentTreeElement);
    } else {
      handleEndNode(currentTreeElement);
    }
  }
};
