/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';

import { KeyboardFocusContainer } from './';

jest.useFakeTimers();

describe('KeyboardFocusContainer', () => {
  const user = userEvent.setup({ delay: null });

  const BasicExample = () => (
    <KeyboardFocusContainer>
      {({ getFocusProps, keyboardFocused }) => (
        <div {...getFocusProps({ 'data-focused': keyboardFocused })}>trigger</div>
      )}
    </KeyboardFocusContainer>
  );

  describe('getFocusProps', () => {
    describe('onFocus', () => {
      it('should not apply focused prop if focused by mouse', async () => {
        const { container, getByText } = render(<BasicExample />);

        await user.click(container);
        jest.runOnlyPendingTimers();
        expect(getByText('trigger')).toHaveAttribute('data-focused', 'false');
      });

      it('should apply focused prop if focused by keyboard', async () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.tab();
        expect(trigger).toHaveAttribute('data-focused', 'true');
      });

      it('should apply focused prop if focused by keyboard after mouse event', async () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.click(trigger);
        jest.runOnlyPendingTimers();

        expect(trigger).toHaveAttribute('data-focused', 'false');

        await user.tab({ shift: true });
        await user.tab();
        expect(trigger).toHaveAttribute('data-focused', 'true');
      });
    });

    describe('onTouchStart', () => {
      it('should not apply focused prop if touchstart is triggered', () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        fireEvent.touchStart(trigger);
        jest.runOnlyPendingTimers();

        expect(trigger).toHaveAttribute('data-focused', 'false');
      });
    });

    describe('onBlur', () => {
      it('should remove focused prop if blurred', async () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.tab();
        expect(trigger).toHaveAttribute('data-focused', 'true');
        await user.tab();
        expect(trigger).toHaveAttribute('data-focused', 'false');
      });
    });
  });
});
