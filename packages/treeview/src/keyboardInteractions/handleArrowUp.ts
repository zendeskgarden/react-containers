/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { getParentNode, getParentTree } from './utils';
import { DocumentPosition } from '@zendeskgarden/container-utilities';

/**
 * Moves focus to the previous node that is focusable without opening or closing a node.
 * If focus is on the first node, does nothing.
 *
 * @param target
 */
export const handleArrowUp = (target: HTMLElement): void => {
  const treeElement = getParentTree(target);

  if (treeElement === null) {
    return;
  }

  const eligibleNodes = treeElement.querySelectorAll(
    '[role="tree"] > [role="treeitem"], [role="treeitem"][aria-expanded="true"] [role="treeitem"]'
  );

  for (
    let i = eligibleNodes.length - 1, node = eligibleNodes.item(i);
    i >= 0;
    node = eligibleNodes.item(--i)
  ) {
    if (!(node instanceof HTMLElement)) {
      continue;
    }
    if (target.isSameNode(node)) {
      continue;
    }
    const positionHierarchy = target.compareDocumentPosition(node);

    if (positionHierarchy & DocumentPosition.FOLLOWING) {
      continue;
    }

    const parentOfNode = getParentNode(node);

    if (parentOfNode && target.isSameNode(parentOfNode)) {
      continue;
    }

    if (parentOfNode && parentOfNode.getAttribute('aria-expanded') === 'false') {
      continue;
    }

    node.focus();
    break;
  }
};
