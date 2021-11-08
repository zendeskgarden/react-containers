/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { getParentNode, HandlerFunction } from './utils';

/**
 * [Handled in caller] When focus is on an open node, closes the node.
 * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
 * When focus is on a root node that is also either an end node or a closed node, does nothing.
 *
 * @param target
 */
export const handleArrowLeft: HandlerFunction = (target: HTMLElement): void => {
  const parentNode = getParentNode(target);

  if (parentNode === null || parentNode.isSameNode(target)) {
    return;
  }

  parentNode.focus();
};
