/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { FOCUSABLE_SELECTOR, getTree, isParentNode } from './utils';

const expandAllSiblingItems = (parentItem: Element): void => {
  let treeItem = parentItem.querySelector(':scope > [role="treeitem"]:first-of-type');

  // TODO: change that logic to return the array of element to expand
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < parentItem.children.length; i++) {
    if (treeItem && isParentNode(treeItem) && !isParentNode(treeItem)) {
      const focusableElement = treeItem.querySelector(FOCUSABLE_SELECTOR);

      focusableElement && (focusableElement as HTMLElement).click();
    }
    if (treeItem?.nextElementSibling) {
      treeItem = treeItem?.nextElementSibling;
    } else {
      break;
    }
  }
};

/**
 * Expands all siblings that are at the same level as the current node.
 * @param target
 */
export const handleAsterisk = (target: EventTarget): void => {
  const treeElement = getTree(target);

  if (treeElement === null) {
    return;
  }
  if (treeElement.contains(document.activeElement)) {
    const currentTreeElement = (document.activeElement as HTMLElement).closest('[role="treeitem"]');

    if (currentTreeElement === null) {
      return;
    }
    expandAllSiblingItems(treeElement);
  }
};
