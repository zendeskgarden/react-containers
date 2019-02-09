/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useContext } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import {
  LocaleProvider,
  LocaleContext,
  KeyboardFocusContainer,
  FieldContainer,
  SelectionContainer,
  useKeyboardFocus,
  useField,
  useSelection
} from './src';

import DIRECTION from './src/utils/DIRECTIONS';

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
  .add('KeyboardFocusContainer', () => (
    <KeyboardFocusContainer>
      {({ keyboardFocused, getFocusProps }) => (
        <div
          {...getFocusProps({
            style: {
              color: keyboardFocused ? 'red' : 'inherit'
            }
          })}
        >
          {keyboardFocused ? 'Keyboard focused!' : 'Not keyboard focused'}
        </div>
      )}
    </KeyboardFocusContainer>
  ))
  .add('useKeyboardFocus', () => {
    const KeyboardFocus = () => {
      const { getFocusProps, keyboardFocused } = useKeyboardFocus();

      return (
        <div
          {...getFocusProps({
            style: {
              color: keyboardFocused ? 'red' : 'inherit'
            }
          })}
        >
          {keyboardFocused ? 'Keyboard focused!' : 'Not keyboard focused'}
        </div>
      );
    };

    return <KeyboardFocus />;
  })
  .add('FieldContainer', () => (
    <FieldContainer id={text('id')}>
      {({ getLabelProps, getInputProps, getHintProps }) => (
        <>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label {...getLabelProps()}>Accessible Native Input</label>
          </div>
          <div {...getHintProps()}>Optional Hint</div>
          <input {...getInputProps()} />
        </>
      )}
    </FieldContainer>
  ))
  .add('useField', () => {
    const Field = ({ id }) => {
      const { getLabelProps, getInputProps, getHintProps } = useField(id);

      return (
        <>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label {...getLabelProps()}>Accessible Native Input</label>
          </div>
          <div {...getHintProps()}>Optional Hint</div>
          <input {...getInputProps()} />
        </>
      );
    };

    return <Field id={text('id')} />;
  })
  .add('SelectionContainer', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];

    return (
      <SelectionContainer direction="vertical">
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
    const Selection = ({ direction }) => {
      const [controlledSelectedItem, setControlledSelectedItem] = useState(items[0]);

      const { focusedItem, selectedItem, getContainerProps, getItemProps } = useSelection({
        direction,
        selectedItem: controlledSelectedItem,
        onSelect: setControlledSelectedItem
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
            { vertical: DIRECTION.VERTICAL, horizontal: DIRECTION.HORIZONTAL },
            DIRECTION.HORIZONTAL
          )}
        />
      </LocaleProvider>
    );
  });
