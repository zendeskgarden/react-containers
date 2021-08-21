/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { focusNextTreeItem, getParentCollapsible, getTree, isEndNode, isParentNode } from './utils';

const handleParentNode = (currentTreeElement: Element): void => {
  if (isParentNode(currentTreeElement)) {
    const firstChildElement = currentTreeElement.querySelector('[role="treeitem"]');

    firstChildElement && (firstChildElement as HTMLElement).focus();
  } else {
    focusNextTreeItem(currentTreeElement);
  }
};

const handleEndNode = (currentTreeElement: Element): void => {
  let nextSibling = currentTreeElement.nextElementSibling;

  while (nextSibling && !isEndNode(nextSibling)) {
    nextSibling = nextSibling.nextElementSibling;
  }

  if (nextSibling === null) {
    const parentElement = getParentCollapsible(currentTreeElement);

    parentElement && focusNextTreeItem(parentElement);

    return;
  }
  (nextSibling as HTMLElement).focus();
};

/**
 * Moves focus to the next node that is focusable without opening or closing a node.
 * If focus is on the last node of the tree, does nothing.
 *
 * @param target
 */
export const handleArrowDown = (target: EventTarget): void => {
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
