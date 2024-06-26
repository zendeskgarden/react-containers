/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { AnchorHTMLAttributes, LiHTMLAttributes, useRef } from 'react';
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
  focusedValue: IUseMenuComponentProps['focusedValue'];
  isSelected?: boolean;
};

const Item = ({ item, getItemProps, focusedValue, isSelected }: MenuItemProps) => {
  const itemProps = getItemProps({ item });

  const itemChildren = (
    <>
      <span className="inline-flex justify-center items-center w-4">
        {item?.type === 'radio' && isSelected && '•'}
        {item?.type === 'checkbox' && isSelected && '✓'}
      </span>
      {item.label || item.value}
    </>
  );

  return (
    <li
      className={classNames('flex', {
        'bg-blue-100': !item.disabled && focusedValue === item.value,
        'text-grey-400': item.disabled,
        'cursor-pointer': !item.disabled,
        'cursor-default': item.disabled
      })}
      role={itemProps.href ? 'none' : undefined}
      {...(!itemProps.href && (itemProps as LiHTMLAttributes<HTMLLIElement>))}
    >
      {itemProps.href ? (
        <a
          {...(itemProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
          className="w-full box-border"
        >
          {itemChildren}
          {item.isExternal && (
            <>
              <span aria-hidden="true">⤴</span>
              <span className="sr-only">(opens in new window)</span>
            </>
          )}
        </a>
      ) : (
        itemChildren
      )}
    </li>
  );
};

const Component = ({
  items,
  selection,
  focusedValue,
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
      <button {...getTriggerProps()}>Produce</button>

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
                <b aria-hidden="true" className="block mt-1 ms-1">
                  {item.label}
                </b>
                <hr aria-hidden="true" className="my-1 border-grey-200" {...getSeparatorProps()} />
                <ul {...getItemGroupProps({ 'aria-label': item.label })}>
                  {item.items.map(groupItem => (
                    <Item
                      key={groupItem.value}
                      item={{ ...groupItem }}
                      getItemProps={getItemProps}
                      focusedValue={focusedValue}
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
                className="my-1 border-0 border-b border-solid border-grey-200"
                {...getSeparatorProps()}
              />
            );
          }

          return (
            <Item
              key={item.value}
              item={item}
              focusedValue={focusedValue}
              getItemProps={getItemProps}
            />
          );
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
