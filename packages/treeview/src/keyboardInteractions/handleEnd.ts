/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { FOCUSABLE_SELECTOR } from './utils';

/**
 * Moves focus to the last node that can be focused without expanding any nodes that are closed.
 *
 * @param target
 */
export const handleEnd = (target: EventTarget): void => {
  const treeElement = (target as HTMLElement).closest('[role="tree"]');

  if (treeElement === null) {
    return;
  }

  const lastTreeItem = treeElement.querySelector(':scope > [role="treeitem"]:last-of-type');

  if (lastTreeItem === null) {
    return;
  }

  const lastFocusableElement = lastTreeItem.querySelector(FOCUSABLE_SELECTOR);

  lastFocusableElement && (lastFocusableElement as HTMLElement).focus();
};
