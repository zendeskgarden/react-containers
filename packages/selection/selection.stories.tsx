/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { withKnobs, select, boolean, number } from '@storybook/addon-knobs';

import { SelectionContainer, useSelection } from './src';

export const Container = () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <SelectionContainer direction="vertical" defaultFocusedIndex={number('defaultFocusedIndex', 0)}>
      {({ selectedItem, focusedItem, getContainerProps, getItemProps }) => (
        <ul {...getContainerProps()}>
          {items.map(item => {
            const ref = React.createRef();
            const isSelected = item === selectedItem;
            const isFocused = item === focusedItem;

            return (
              <li
                {...getItemProps({
                  key: item,
                  item,
                  focusRef: ref
                })}
              >
                {item}
                {isSelected && <span> - Selected</span>}
                {isFocused && <span> - Focused</span>}
              </li>
            );
          })}
        </ul>
      )}
    </SelectionContainer>
  );
};

export const Hook = () => {
  const items = ['One', 'Two', 'Three'];
  const isRtl = boolean('Enable RTL', false);

  const Selection = ({ direction }: { direction?: 'both' | 'horizontal' | 'vertical' }) => {
    const { focusedItem, selectedItem, getContainerProps, getItemProps } = useSelection<string>({
      direction,
      defaultSelectedIndex: number('defaultSelectedIndex', 0),
      rtl: isRtl
    });

    return (
      <ul {...getContainerProps({ style: { display: 'flex' } })}>
        {items.map(item => {
          const itemRef = React.createRef<HTMLLIElement>();
          const isSelected = selectedItem === item;
          const isFocused = focusedItem === item;

          return (
            <li
              {...getItemProps({
                key: item,
                item,
                focusRef: itemRef,
                style: {
                  listStyle: 'none',
                  margin: 16,
                  padding: 8,
                  textAlign: 'center'
                }
              })}
            >
              {item}
              {isSelected && <div>[Selected]</div>}
              {isFocused && <div>(Focused)</div>}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Selection
      direction={select(
        'Direction',
        {
          vertical: 'vertical',
          horizontal: 'horizontal',
          both: 'both'
        },
        'horizontal'
      )}
    />
  );
};

Container.story = {
  name: 'SelectionContainer'
};

Hook.story = {
  name: 'useSelection',
  parameters: {
    docs: {
      storyDescription: `The \`useSelection\` hook manages an items focus state including keyboard controls,
      aria attributes and RTL support. It uses the 
      [roving tab index strategy](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).`
    }
  }
};

export default {
  title: 'Selection Container',
  decorators: [withKnobs],
  component: SelectionContainer,
  parameters: {
    componentSubtitle: `A container component which wraps the useSelection hook.`
  }
};
