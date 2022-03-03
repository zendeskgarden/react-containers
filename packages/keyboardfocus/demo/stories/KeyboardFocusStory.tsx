/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import {
  IKeyboardFocusProps,
  IUseKeyboardFocusReturnValue,
  KeyboardFocusContainer,
  useKeyboardFocus
} from '@zendeskgarden/container-keyboardfocus';

const Component = ({ getFocusProps, keyboardFocused }: IUseKeyboardFocusReturnValue) => (
  <div className="border border-solid p-2" {...getFocusProps()}>
    {keyboardFocused ? 'Keyboard focused' : 'Not keyboard focused'}
  </div>
);

const Container = () => (
  <KeyboardFocusContainer>
    {containerProps => <Component {...containerProps} />}
  </KeyboardFocusContainer>
);

const Hook = () => {
  const hookProps = useKeyboardFocus();

  return <Component {...hookProps} />;
};

interface IArgs extends IKeyboardFocusProps {
  as: 'hook' | 'container';
}

export const KeyboardFocusStory: Story<IArgs> = ({ as }) => {
  switch (as) {
    case 'container':
      return <Container />;

    case 'hook':
    default:
      return <Hook />;
  }
};
