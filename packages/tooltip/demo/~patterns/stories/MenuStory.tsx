/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import { useTooltip } from '@zendeskgarden/container-tooltip';
import { MenuItem, useMenu } from '@zendeskgarden/container-menu';

export const MenuStory: StoryFn = () => {
  const items: MenuItem[] = [];
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const {
    getMenuProps,
    getTriggerProps: getMenuTriggerProps,
    isExpanded
  } = useMenu({ items, triggerRef, menuRef });
  const { getTooltipProps, getTriggerProps, isVisible } = useTooltip({ triggerRef });

  return (
    <div className="relative">
      <button className="px-2 py-1" {...getTriggerProps()} {...getMenuTriggerProps()} type="button">
        Menu trigger
      </button>
      <span
        className={classNames(
          'bg-grey-800',
          'inline-block',
          'ml-1',
          'px-2',
          'py-0.5',
          'rounded-sm',
          'text-sm',
          'text-white',
          isVisible ? 'visible' : 'invisible'
        )}
        {...getTooltipProps()}
      >
        Tooltip
      </span>
      <ul
        className={classNames('border border-grey-400 border-solid w-32 absolute', {
          invisible: !isExpanded
        })}
        {...getMenuProps()}
      >
        <span className={classNames('inline-block', 'p-3', 'text-grey-600')}>Empty menu</span>
      </ul>
    </div>
  );
};
