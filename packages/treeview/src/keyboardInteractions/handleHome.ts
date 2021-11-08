/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { getParentTree, HandlerFunction } from './utils';

/**
 * Moves focus to the first node in the tree without opening or closing a node.
 *
 * @param target
 */
export const handleHome: HandlerFunction = (target: HTMLElement): void => {
  const treeElement = getParentTree(target);

  if (treeElement === null) {
    return;
  }

  const firstNode = treeElement.querySelector('[role="treeitem"]:first-of-type') as HTMLElement;

  if (firstNode === null) {
    return;
  }

  firstNode.focus();
};
