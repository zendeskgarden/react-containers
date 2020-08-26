/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { KeyboardFocusContainer, useKeyboardFocus } from './src';

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

Container.storyName = 'KeyboardFocusContainer';

Hook.storyName = 'useKeyboardFocus';

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useKeyboardFocus\` hook supplies state and props that help you to distinguish
      between mouse and keyboard focus. Garden uses this in react-components to know
      when to add the focus ring.`
    }
  }
};

export default {
  title: 'KeyboardFocus Container',
  decorators: [withKnobs],
  component: KeyboardFocusContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useKeyboardFocus hook.`
  }
};
