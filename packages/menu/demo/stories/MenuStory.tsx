/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import {
  IMenuContainerProps,
  IUseMenuProps,
  IUseMenuReturnValue,
  IMenuItemBase,
  MenuItem,
  MenuContainer,
  useMenu
} from '@zendeskgarden/container-menu';

type MenuContainerProps = IMenuContainerProps<HTMLButtonElement, HTMLUListElement>;
type UseMenuProps = IUseMenuProps<HTMLButtonElement, HTMLUListElement>;
type MenuReturnValue = IUseMenuReturnValue;

interface IUseMenuComponentProps extends MenuReturnValue {
  items: UseMenuProps['items'];
}

type MenuItemProps = {
  item: IMenuItemBase;
  getItemProps: IUseMenuComponentProps['getItemProps'];
  isSelected?: boolean;
};

const Item = ({ item, getItemProps, isSelected }: MenuItemProps) => (
  <li
    className={classNames({
      'hover:bg-grey-200': !item.disabled,
      'text-grey-400': item.disabled,
      'cursor-pointer': !item.disabled,
      'cursor-default': item.disabled
    })}
    {...getItemProps({ item })}
  >
    <span className="inline-flex justify-center items-center w-4">
      {item?.type === 'radio' && isSelected && '•'}
      {item?.type === 'checkbox' && isSelected && '✓'}
    </span>
    {item.label || item.value}
  </li>
);

const Component = ({
  items,
  selection,
  isExpanded,
  getTriggerProps,
  getMenuProps,
  getItemProps,
  getItemGroupProps,
  getSeparatorProps
}: MenuReturnValue & UseMenuProps) => {
  const selectedValues = selection.map(item => item.value);

  return (
    <div className="relative">
      <button {...getTriggerProps()}>{isExpanded ? 'Close' : 'Open'} menu</button>

      <ul
        className={classNames('border border-grey-400 border-solid w-32 absolute', {
          invisible: !isExpanded
        })}
        {...getMenuProps()}
      >
        {items.map((item: MenuItem) => {
          if ('items' in item) {
            return (
              <li key={item.label} role="none">
                <ul {...getItemGroupProps({ 'aria-label': item.label })}>
                  <li
                    className="border-t-0 border-l-0 border-r-0 border-b border-grey-400 border-dotted"
                    {...getSeparatorProps({ role: 'none' })}
                  />
                  {item.items.map(groupItem => (
                    <Item
                      key={groupItem.value}
                      item={{ ...groupItem, name: item.label }}
                      getItemProps={getItemProps}
                      isSelected={selectedValues.includes(groupItem.value)}
                    />
                  ))}
                </ul>
              </li>
            );
          }

          if ('separator' in item) {
            return (
              <li
                key={item.value}
                className="border-t-0 border-l-0 border-r-0 border-b border-grey-400 border-dotted"
                {...getSeparatorProps()}
              />
            );
          }

          return <Item key={item.value} item={item} getItemProps={getItemProps} />;
        })}
      </ul>
    </div>
  );
};

Component.displayName = 'Component';

const Container = (props: MenuContainerProps) => (
  <MenuContainer {...props}>
    {containerProps => <Component {...props} {...containerProps} />}
  </MenuContainer>
);

const Hook = (props: UseMenuProps) => {
  const hookProps = useMenu(props);

  return <Component {...props} {...hookProps} />;
};

interface IArgs extends MenuContainerProps {
  as: 'hook' | 'container';
}

export const MenuStory: StoryFn<IArgs> = ({ as, ...props }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  switch (as) {
    case 'container':
      return <Container {...props} triggerRef={triggerRef} menuRef={menuRef} />;

    case 'hook':
    default:
      return <Hook {...props} triggerRef={triggerRef} menuRef={menuRef} />;
  }
};
