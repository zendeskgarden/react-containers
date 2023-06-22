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
  const values = ['Item 1', 'Item 2', 'Item 3'];
  const scope = useRef(null);
  const { getContainerProps, getItemProps, selectedItem } = useSelection({ values });

  useFocusVisible({ scope });

  return (
    <ul className="flex" {...getContainerProps()} ref={scope}>
      {values.map(value => {
        return (
          <li
            key={value}
            className={classNames(
              'border-0',
              'border-blue-600',
              'border-solid',
              'mx-3',
              'px-2',
              'pt-1',
              { 'border-b-3': value === selectedItem }
            )}
            {...getItemProps({ value })}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
};
