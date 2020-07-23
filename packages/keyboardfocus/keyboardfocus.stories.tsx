/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { KeyboardFocusContainer, useKeyboardFocus } from './src';

export const Hook = () => {
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

export const Container = () => (
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
);

Hook.story = {
  name: 'useKeyboardFocus'
};

Container.story = {
  name: 'KeyboardFocusContainer'
};

export default {
  title: 'KeyboardFocus Container',
  decorators: [withKnobs]
};
