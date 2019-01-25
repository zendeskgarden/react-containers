/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';

import {
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
    const items = ['One', 'Two', 'Three'];

    return (
      <SelectionContainer
        direction={select(
          'Direction',
          { vertical: DIRECTION.VERTICAL, horizontal: DIRECTION.HORIZONTAL },
          DIRECTION.VERTICAL
        )}
        selectedIndex={number('selectedIndex')}
        focusedIndex={number('focusedIndex')}
        defaultFocusedIndex={number('defaultFocusedIndex')}
        onStateChange={newState => console.log(newState)}
      >
        {({ getContainerProps, getItemProps, focusedIndex, selectedIndex }) => (
          <ul {...getContainerProps()}>
            {items.map((item, idx) => {
              const selected = selectedIndex === idx;
              const focused = focusedIndex === idx;

              return (
                <li
                  {...getItemProps({
                    selected,
                    focused,
                    key: item
                  })}
                >
                  {item}
                  {selected ? ' - Selected' : null}
                  {focused ? ' - Focused' : null}
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
    const Selection = ({ focusedIndex, selectedIndex, direction, defaultFocusedIndex }) => {
      const {
        getContainerProps,
        getItemProps,
        focusedIndex: focusedIdx,
        selectedIndex: selectedIdx
      } = useSelection({
        selectedIndex,
        focusedIndex,
        direction,
        defaultFocusedIndex
      });

      return (
        <ul {...getContainerProps()}>
          {items.map((item, idx) => {
            const selected = selectedIdx === idx;
            const focused = focusedIdx === idx;

            return (
              <li
                {...getItemProps({
                  key: item
                })}
              >
                {item}
                {selected ? ' - Selected' : null}
                {focused ? ' - Focused' : null}
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
          { vertical: DIRECTION.VERTICAL, horizontal: DIRECTION.HORIZONTAL },
          DIRECTION.VERTICAL
        )}
        selectedIndex={number('selectedIndex')}
        focusedIndex={number('focusedIndex')}
        defaultFocusedIndex={number('defaultFocusedIndex')}
      />
    );
  });
