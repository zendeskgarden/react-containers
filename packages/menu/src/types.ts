/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { ButtonHTMLAttributes, HTMLProps, ReactNode, RefObject } from 'react';

export interface ISelectedItem {
  value: string;
  label?: string;
  name?: string;
  type?: 'radio' | 'checkbox';
}

export interface IMenuItemBase extends ISelectedItem {
  disabled?: boolean;
  isNext?: boolean;
  isPrevious?: boolean;
}

export interface IMenuItemSeparator {
  value: string;
  separator: boolean;
}

export interface IMenuItemGroup {
  label: string;
  items: (IMenuItemBase | IMenuItemSeparator)[];
}

export type MenuItem = IMenuItemBase | IMenuItemSeparator | IMenuItemGroup;

export interface IUseMenuProps<T = HTMLButtonElement, M = HTMLElement> {
  /**
   * Provides an ordered list of menu items
   *
   * @param {string} item.value Unique item value
   * @param {string} item.label Human-readable item display value
   * @param {string} item.name A shared name corresponding to an item radio group.
   * @param {boolean} item.disabled Indicates the item is not interactive
   * @param {boolean} item.separator Indicates the item is a placeholder for a separator.
   * @param {IMenuItemBase[]} item.items Groups a list of items
   */
  items: MenuItem[];
  /** Provides ref access to the underlying trigger element */
  triggerRef: RefObject<T>;
  /** Provides ref access to the underlying menu element */
  menuRef: RefObject<M>;
  /** Determines right-to-left layout */
  rtl?: boolean;
  /** Prefixes IDs for the menu */
  idPrefix?: string;
  /** Sets the expansion in a controlled menu */
  isExpanded?: boolean;
  /** Determines menu expansion on menu initialization */
  defaultExpanded?: boolean;
  /** Sets the focused value in a controlled menu */
  focusedValue?: string | null;
  /** Determines focused value on menu initialization */
  defaultFocusedValue?: string;
  /** Sets the selected values in a controlled menu */
  selectedItems?: ISelectedItem[];
  /**
   * Handles menu state changes
   *
   * @param {string} changes.type The event type that triggered the change
   * @param {boolean} [changes.isExpanded] The updated menu expansion
   * @param {ISelectedItem[]} [changes.selectedItems] The updated selection values
   * @param {string | null} [changes.focusedValue] The updated focused value
   */
  onChange?: (changes: {
    type: string;
    isExpanded?: boolean;
    selectedItems?: ISelectedItem[];
    focusedValue?: string | null;
  }) => void;
  /** Sets the environment where the menu is rendered */
  environment?: Window;
}

export interface IUseMenuReturnValue {
  isExpanded: boolean;
  selection: ISelectedItem[];
  focusedValue?: string | null;
  getTriggerProps: (
    props?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role' | 'type'> & {
      role?: 'button' | null;
      type?: 'button' | null;
    }
  ) => ButtonHTMLAttributes<HTMLButtonElement>;
  getMenuProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: 'menu' | null;
    }
  ) => HTMLProps<T>;
  getItemGroupProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role' | 'aria-label'> & {
      role?: 'group' | null;
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
  getItemProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role'> & {
      item: IMenuItemBase;
      isNext?: boolean;
      isPrevious?: boolean;
      role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox' | null;
    }
  ) => HTMLProps<T>;
  getSeparatorProps: <T extends Element>(
    props?: HTMLProps<T> & {
      role?: 'separator' | 'none' | null;
    }
  ) => HTMLProps<T>;
}

export interface IMenuContainerProps<T = HTMLElement, M = HTMLElement> extends IUseMenuProps<T, M> {
  /**
   * Provides menu render prop functions
   *
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getMenuProps] Menu props getter
   * @param {function} [options.getItemProps] Menu item props getter
   * @param {function} [options.getSeparatorProps] Separator item props getter
   * @param {boolean} [options.isExpanded] Current menu expansion
   * @param {ISelectedItem[]} [options.selection] Current selection
   * @param {string | null} [options.focusedValue] Current focused value
   */
  render?: (options: {
    /* prop getters */
    getTriggerProps: IUseMenuReturnValue['getTriggerProps'];
    getMenuProps: IUseMenuReturnValue['getMenuProps'];
    getItemProps: IUseMenuReturnValue['getItemProps'];
    getSeparatorProps: IUseMenuReturnValue['getSeparatorProps'];
    /* state */
    isExpanded: IUseMenuReturnValue['isExpanded'];
    selection: IUseMenuReturnValue['selection'];
    focusedValue?: IUseMenuReturnValue['focusedValue'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseMenuReturnValue) => ReactNode;
}
