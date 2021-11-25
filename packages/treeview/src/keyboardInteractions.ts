/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { getParentNode, getParentTree, HandlerFunction, isEndNode, isParentNode } from './utils';
import { DocumentPosition } from '@zendeskgarden/container-utilities';

/**
 * Moves focus to the next node that is focusable without opening or closing a node.
 * If focus is on the last node of the tree, does nothing.
 *
 * @param target
 */
export const handleArrowDown: HandlerFunction = (target: HTMLElement): void => {
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

/**
 * Moves focus to the previous node that is focusable without opening or closing a node.
 * If focus is on the first node, does nothing.
 *
 * @param target
 */
export const handleArrowUp: HandlerFunction = (target: HTMLElement): void => {
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
    if (target.isSameNode(node) || !(node instanceof HTMLElement)) {
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

/**
 * Moves focus to the last node that can be focused without expanding any nodes that are closed.
 *
 * @param target
 */
export const handleEnd: HandlerFunction = (target: HTMLElement): void => {
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
