/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import { useFocusVisible } from '@zendeskgarden/container-focusvisible';
import { useSelection } from '@zendeskgarden/container-selection';

export const SelectionStory: Story = () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const scope = useRef(null);
  const { getContainerProps, getItemProps, selectedItem } = useSelection({
    items,
    defaultSelectedItem: items[0]
  });

  useFocusVisible({ scope });

  return (
    <ul className="flex" {...getContainerProps()} ref={scope}>
      {items.map(item => {
        return (
          <li
            key={item}
            className={classNames(
              'border-0',
              'border-blue-600',
              'border-solid',
              'mx-3',
              'px-2',
              'pt-1',
              { 'border-b-3': item === selectedItem }
            )}
            {...getItemProps({ item })}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};
