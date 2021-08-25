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

  const eligibleNodes = treeElement.querySelectorAll(
    '[role="tree"] > [role="treeitem"]:last-of-type, [role="treeitem"][aria-expanded="true"] [role="treeitem"]:last-of-type'
  );

  for (
    let i = eligibleNodes.length - 1, node = eligibleNodes.item(i);
    i >= 0;
    node = eligibleNodes.item(i--)
  ) {
    if (!(node instanceof HTMLElement)) {
      continue;
    }

    const parentOfNode = getParentNode(node);

    if (parentOfNode && parentOfNode.isSameNode(node)) {
      node.focus();

      return;
    }

    if (
      parentOfNode &&
      !parentOfNode.isSameNode(node) &&
      parentOfNode.getAttribute('aria-expanded') === 'false'
    ) {
      continue;
    }

    if (target.isSameNode(node)) {
      return;
    }

    node.focus();

    return;
  }
};
