/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import { IUseMenuProps, IMenuItemBase, useMenu } from '@zendeskgarden/container-menu';
import { BASE_ITEMS, NESTED_ITEMS } from './data';

type UseMenuProps = IUseMenuProps<HTMLButtonElement, HTMLUListElement>;

export const NestedStory: StoryFn<{ rtl: boolean }> = ({ rtl }) => {
  const [args, setArgs] = useState<Pick<UseMenuProps, 'items' | 'focusedValue' | 'isExpanded'>>({
    items: BASE_ITEMS,
    focusedValue: undefined,
    isExpanded: false
  });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const onChange = useCallback(({ type, isExpanded, focusedValue }) => {
    const isNext = type.indexOf('next') > -1;
    const isPrev = type.indexOf('previous') > -1;

    if (isNext || isPrev) {
      setArgs({
        items: isNext ? NESTED_ITEMS : BASE_ITEMS,
        focusedValue: isNext ? 'Strawberry' : 'Berry',
        isExpanded: true
      });

      return;
    }

    setArgs(state => ({
      ...state,
      ...(isExpanded === false ? { items: BASE_ITEMS } : {}),
      ...(isExpanded === undefined ? {} : { isExpanded }),
      ...(focusedValue === undefined ? {} : { focusedValue })
    }));
  }, []);

  const { isExpanded, getTriggerProps, getMenuProps, getItemProps, getSeparatorProps } = useMenu({
    ...args,
    triggerRef,
    menuRef,
    onChange,
    rtl
  } as UseMenuProps);

  return (
    <div className="relative" dir={rtl ? 'rtl' : 'ltr'}>
      <button {...getTriggerProps()}>{isExpanded ? 'Close' : 'Open'} menu</button>

      <ul
        className={classNames('border border-grey-400 border-solid w-32 absolute', {
          invisible: !isExpanded
        })}
        {...getMenuProps()}
      >
        {args.items.map(item => {
          if ('separator' in item) {
            return (
              <li
                key={item.value}
                className="border-t-0 border-l-0 border-r-0 border-b border-grey-400 border-dotted"
                {...getSeparatorProps()}
              />
            );
          }

          const { value, isNext, isPrevious } = item as IMenuItemBase;

          return (
            <li
              {...getItemProps({
                item: item as IMenuItemBase,
                isPrevious,
                isNext
              })}
              className="flex hover:bg-grey-200 cursor-default"
              key={value}
            >
              <span className="inline-flex justify-center items-center w-4">
                {isPrevious && '<'}
              </span>
              {value}
              <span className="ms-auto inline-flex justify-center items-center w-4">
                {isNext && '>'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
