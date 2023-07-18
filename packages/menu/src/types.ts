/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { ButtonHTMLAttributes, HTMLProps, ReactNode, RefObject } from 'react';

export type ItemValue = string | number;

export interface ISelectedItem {
  value: ItemValue;
  label?: string;
  name?: string;
  type?: 'radio' | 'checkbox';
}

export interface IMenuItemBase extends ISelectedItem {
  disabled?: boolean;
}

export type MenuItemSeparator = {
  value: ItemValue;
  separator: boolean;
};

export type MenuItemGroup = {
  label: string;
  items: (IMenuItemBase | MenuItemSeparator)[];
};

export type MenuItem = IMenuItemBase | MenuItemSeparator | MenuItemGroup;

export type MenuChangeHandler = {
  type: string;
  isExpanded?: boolean;
  selectedItems?: ISelectedItem[];
  focusedValue?: ItemValue;
};

export interface IUseMenuProps<T = HTMLElement, L = HTMLElement> {
  /**
   * Provides an ordered list of menu items
   *
   * @param {ItemValue} item.value Unique item value
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
  menuRef: RefObject<L>;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /** Prefixes IDs for the menu */
  idPrefix?: string;
  /** Sets the expansion in a controlled menu */
  isExpanded?: boolean;
  /** Determines default expansion in an uncontrolled menu */
  defaultExpanded?: ItemValue;
  /** Determines menu expansion on menu initialization */
  initialExpanded?: boolean;
  /** Sets the focused value in a controlled menu */
  focusedValue?: ItemValue;
  /** Determines default focused value in an uncontrolled menu */
  defaultFocusedValue?: ItemValue;
  /** Determines focused value expansion on menu initialization */
  initialFocusedValue?: ItemValue;
  /** Sets the selected values in a controlled menu */
  selectedItems?: ISelectedItem[];
  /**
   * Handles menu state changes
   *
   * @param {string} changes.type The event type that triggered the change
   * @param {boolean} [changes.isExpanded] The updated menu expansion
   * @param {ISelectedItem[]} [changes.selectedItems] The updated selection values
   * @param {ItemValue} [changes.focusedValue] The updated focused value
   */
  onChange?: (changes: MenuChangeHandler) => void;
  /** Sets the environment where the menu is rendered */
  environment?: Window;
}

export interface IUseMenuReturnValue<T, L> {
  isExpanded: boolean;
  selection: ISelectedItem[];
  focusedValue?: ItemValue;
  getTriggerProps: (
    props?: Omit<HTMLProps<T>, 'role' | 'type'> & {
      role?: 'button' | null;
      type?: 'button';
    }
  ) => Omit<HTMLProps<T>, 'type'> & {
    type?: ButtonHTMLAttributes<T>['type'];
  };
  getMenuProps: (
    props?: Omit<HTMLProps<L>, 'role'> & {
      role?: 'menu' | null;
    }
  ) => HTMLProps<L>;
  getItemGroupProps: <K extends Element>(
    props: Omit<HTMLProps<K>, 'role' | 'aria-label'> & {
      role?: 'group' | null;
      'aria-label': NonNullable<HTMLProps<K>['aria-label']>;
    }
  ) => HTMLProps<K>;
  getItemProps: <K extends Element>(
    props: Omit<HTMLProps<K>, 'role'> &
      IMenuItemBase & {
        role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox' | null;
      }
  ) => HTMLProps<K>;
  getSeparatorProps: <K extends Element>(
    props?: HTMLProps<K> & {
      role?: 'separator' | 'none' | null;
    }
  ) => HTMLProps<K>;
}

export interface IMenuContainerProps<T = HTMLElement, L = HTMLElement> extends IUseMenuProps<T, L> {
  /**
   * Provides menu render prop functions
   *
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {function} [options.getMenuProps] Menu props getter
   * @param {function} [options.getItemProps] Menu item props getter
   * @param {function} [options.getSeparatorProps] Separator item props getter
   * @param {boolean} [options.isExpanded] Current menu expansion
   * @param {ISelectedItem[]} [options.selection] Current selection
   * @param {ItemValue} [options.focusedValue] Current focused value
   */
  render?: (options: {
    /* prop getters */
    getTriggerProps: IUseMenuReturnValue<T, L>['getTriggerProps'];
    getMenuProps: IUseMenuReturnValue<T, L>['getMenuProps'];
    getItemProps: IUseMenuReturnValue<T, L>['getItemProps'];
    getSeparatorProps: IUseMenuReturnValue<T, L>['getSeparatorProps'];
    /* state */
    isExpanded: IUseMenuReturnValue<T, L>['isExpanded'];
    selection: IUseMenuReturnValue<T, L>['selection'];
    focusedValue?: IUseMenuReturnValue<T, L>['focusedValue'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseMenuReturnValue<T, L>) => ReactNode;
}
