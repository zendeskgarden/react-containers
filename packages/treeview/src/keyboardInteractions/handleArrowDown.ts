/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { DocumentPosition } from '@zendeskgarden/container-utilities';
import { getParentTree, isParentNode } from './utils';

/**
 * Moves focus to the next node that is focusable without opening or closing a node.
 * If focus is on the last node of the tree, does nothing.
 *
 * @param target
 */
export const handleArrowDown = (target: HTMLElement): void => {
  const treeElement = getParentTree(target);

  if (treeElement === null) {
    return;
  }

  const isTargetOpened = isParentNode(target) && target.getAttribute('aria-expanded') === 'true';

  const eligibleNodes = treeElement.querySelectorAll(
    '[role="tree"] > [role="treeitem"], [role="treeitem"][aria-expanded="true"] [role="treeitem"]'
  );

  for (const node of eligibleNodes) {
    if (node.isSameNode(target) || !(node instanceof HTMLElement)) {
      continue;
    }
    const positionHierarchy = target.compareDocumentPosition(node);

    if (isTargetOpened && positionHierarchy & DocumentPosition.CONTAINED_BY) {
      node.focus();

      return;
    }
    if (positionHierarchy === DocumentPosition.FOLLOWING) {
      node.focus();

      return;
    }
  }
};
