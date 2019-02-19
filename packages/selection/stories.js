/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useContext } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, number } from '@storybook/addon-knobs';

import { LocaleProvider, LocaleContext, SelectionContainer, useSelection } from './src';

import { DIRECTIONS } from './src/utils/DIRECTIONS';

storiesOf('Selection Containers', module)
  .addDecorator(withKnobs)
  .add('LocaleProvider', () => {
    const LocaleExample = () => {
      const currentLocale = useContext(LocaleContext);

      return <div>{JSON.stringify(currentLocale)}</div>;
    };

    return (
      <LocaleProvider rtl={boolean('Enable RTL Locale', false)}>
        <LocaleExample />
      </LocaleProvider>
    );
  })
  .add('SelectionContainer', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];

    return (
      <SelectionContainer
        direction="vertical"
        defaultFocusedIndex={number('defaultFocusedIndex', 0)}
      >
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
                    ref,
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
  })
  .add('useSelection', () => {
    const items = ['One', 'Two', 'Three'];
    const isRtl = boolean('Enable RTL', false);

    // eslint-disable-next-line react/prop-types
    const Selection = ({ direction, defaultFocusedIndex }) => {
      const [controlledSelectedItem, setControlledSelectedItem] = useState(items[0]);

      const { focusedItem, selectedItem, getContainerProps, getItemProps } = useSelection({
        direction,
        selectedItem: controlledSelectedItem,
        onSelect: setControlledSelectedItem,
        defaultFocusedIndex
      });

      return (
        <ul {...getContainerProps()} style={{ display: 'flex', direction: isRtl ? 'rtl' : 'ltr' }}>
          {items.map(item => {
            const itemRef = React.createRef();
            const isSelected = selectedItem === item;
            const isFocused = focusedItem === item;

            return (
              <li
                {...getItemProps({
                  key: item,
                  item,
                  ref: itemRef,
                  focusRef: itemRef
                })}
                style={{
                  listStyle: 'none',
                  margin: 16,
                  padding: 8,
                  textAlign: 'center'
                }}
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
      <LocaleProvider rtl={isRtl}>
        <Selection
          direction={select(
            'Direction',
            {
              vertical: DIRECTIONS.VERTICAL,
              horizontal: DIRECTIONS.HORIZONTAL,
              both: DIRECTIONS.BOTH
            },
            DIRECTIONS.HORIZONTAL
          )}
        />
      </LocaleProvider>
    );
  });
