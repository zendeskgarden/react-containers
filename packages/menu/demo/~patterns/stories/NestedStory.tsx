/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import { IUseMenuProps, useMenu } from '@zendeskgarden/container-menu';

type UseMenuProps = IUseMenuProps<HTMLButtonElement, HTMLUListElement>;

export const NestedStory: StoryFn<UseMenuProps> = ({ rtl, onChange, items }) => {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const {
    focusedValue,
    isExpanded,
    getTriggerProps,
    getMenuProps,
    getItemProps,
    getSeparatorProps
  } = useMenu({
    items,
    triggerRef,
    menuRef,
    onChange,
    rtl
  });

  return (
    <div className="relative" dir={rtl ? 'rtl' : 'ltr'}>
      <button {...getTriggerProps()}>Fruits</button>

      <ul
        className={classNames('border border-grey-400 border-solid w-32 absolute', {
          invisible: !isExpanded
        })}
        {...getMenuProps()}
      >
        {items.map(item => {
          if ('separator' in item) {
            return (
              <li
                key={item.value}
                className="my-1 border-0 border-b border-solid border-grey-200"
                {...getSeparatorProps()}
              />
            );
          }

          if ('value' in item) {
            const { value, isNext, isPrevious } = item;

            return (
              <li
                {...getItemProps({ item })}
                className={classNames('flex cursor-default', {
                  'bg-blue-100': focusedValue === value
                })}
                key={value}
              >
                <span className="inline-flex justify-center items-center w-4">
                  {isPrevious && <span aria-hidden="true">&lt;</span>}
                </span>
                {value}
                <span className="ms-auto inline-flex justify-center items-center w-4">
                  {isNext && <span aria-hidden="true">&gt;</span>}
                </span>

                {isPrevious && <span className="sr-only">Back to main menu</span>}
                {isNext && <span className="sr-only">Go to submenu</span>}
              </li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};
