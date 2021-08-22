/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { getParentNode, getParentTree } from './utils';

/**
 * Moves focus to the last node that can be focused without expanding any nodes that are closed.
 *
 * @param target
 */
export const handleEnd = (target: HTMLElement): void => {
  const treeElement = getParentTree(target);

  if (treeElement === null) {
    return;
  }
  // TODO fix
  const allTreeItems = treeElement.querySelectorAll('[role="treeitem"]');

  for (
    let i = allTreeItems.length - 1, node = allTreeItems.item(i);
    i >= 0;
    i--, node = allTreeItems.item(i)
  ) {
    if (!(node instanceof HTMLElement)) {
      continue;
    }
    if (target.isSameNode(node)) {
      continue;
    }

    const parentOfNode = getParentNode(node);

    if (parentOfNode && parentOfNode.getAttribute('aria-expanded') === 'false') {
      continue;
    }

    node.focus();
  }
};
