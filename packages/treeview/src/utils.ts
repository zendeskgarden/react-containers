/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export type HandlerFunction = (target: HTMLElement) => void;

export const isParentNode = (treeItem: Element): boolean =>
  treeItem.getAttribute('role') === 'treeitem' && treeItem.hasAttribute('aria-expanded');

export const getParentTree = (target: HTMLElement): HTMLElement | null =>
  target.closest('[role="tree"]');

export const getParentNode = (target: HTMLElement): HTMLElement | null => {
  const parent = target.closest('[role="treeitem"][aria-expanded]') as HTMLElement;

  if (parent === null || !target.isSameNode(parent)) {
    return parent;
  }

  return getParentNode(target.parentNode as HTMLElement);
};

export const isEndNode = (target: HTMLElement): boolean =>
  target instanceof HTMLElement &&
  target.getAttribute('role') === 'treeitem' &&
  !target.hasAttribute('aria-expanded');
