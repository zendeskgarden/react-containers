/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HandlerFunction, isEndNode } from './utils';

/**
 * [Done in caller] When focus is on a closed node, opens the node; focus does not move.
 * When focus is on a open node, moves focus to the first child node.
 * When focus is on an end node, does nothing.
 *
 * @param target
 */
export const handleArrowRight: HandlerFunction = (target: HTMLElement): void => {
  if (isEndNode(target)) {
    return;
  }

  const isExpanded = target.getAttribute('aria-expanded') === 'true';

  if (!isExpanded) {
    return;
  }

  const firstNode = target.querySelector('[role="treeitem"]:first-child') as HTMLElement;

  if (firstNode !== null) {
    firstNode.focus();
  }
};
