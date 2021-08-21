/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { FOCUSABLE_SELECTOR } from './utils';

/**
 * Moves focus to the first node in the tree without opening or closing a node.
 *
 * @param target
 */
export const handleHome = (target: EventTarget): void => {
  const treeElement = (target as HTMLElement).closest('[role="tree"]');

  if (treeElement === null) {
    return;
  }

  const firstTreeItem = treeElement.querySelector(':scope > [role="treeitem"]:first-of-type');

  if (firstTreeItem === null) {
    return;
  }

  const firstFocusableElement = firstTreeItem.querySelector(FOCUSABLE_SELECTOR);

  firstFocusableElement && (firstFocusableElement as HTMLElement).focus();
};
