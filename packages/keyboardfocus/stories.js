/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { KeyboardFocusContainer, useKeyboardFocus } from './src';

storiesOf('KeyboardFocus Container', module)
  .addDecorator(withKnobs)
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
  ));
