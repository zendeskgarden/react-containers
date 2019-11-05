/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { KeyboardFocusContainer } from './KeyboardFocusContainer';

jest.useFakeTimers();

describe('KeyboardFocusContainer', () => {
  const BasicExample = () => (
    <KeyboardFocusContainer>
      {({ getFocusProps, keyboardFocused }) => (
        <div {...getFocusProps({ 'data-test-id': 'trigger', 'data-focused': keyboardFocused })}>
          trigger
        </div>
      )}
    </KeyboardFocusContainer>
  );

  describe('getFocusProps', () => {
    describe('onFocus', () => {
      it('should not apply focused prop if focused by mouse', () => {
        const { container, getByTestId } = render(<BasicExample />);

        fireEvent.mouseDown(container);
        jest.runOnlyPendingTimers();
        expect(getByTestId('trigger')).toHaveAttribute('data-focused', 'false');
      });

      it('should apply focused prop if focused by keyboard', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.focus(trigger);
        expect(trigger).toHaveAttribute('data-focused', 'true');
      });

      it('should apply focused prop if focused by keyboard after mouse event', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.mouseDown(trigger);
        jest.runOnlyPendingTimers();

        expect(trigger).toHaveAttribute('data-focused', 'false');

        fireEvent.focus(trigger);
        expect(trigger).toHaveAttribute('data-focused', 'true');
      });
    });

    describe('onMouseDown', () => {
      it('should not apply focused prop if mouseddown', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.mouseDown(trigger);
        jest.runOnlyPendingTimers();

        expect(trigger).toHaveAttribute('data-focused', 'false');
      });
    });

    describe('onPointerDown', () => {
      it('should not apply focused prop if pointerdown is triggered', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent(trigger, new MouseEvent('pointerdown'));
        jest.runOnlyPendingTimers();

        expect(trigger).toHaveAttribute('data-focused', 'false');
      });
    });

    describe('onTouchStart', () => {
      it('should not apply focused prop if touchstart is triggered', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.touchStart(trigger);
        jest.runOnlyPendingTimers();

        expect(trigger).toHaveAttribute('data-focused', 'false');
      });
    });

    describe('onBlur', () => {
      it('should remove focused prop if blurred', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.focus(trigger);
        expect(trigger).toHaveAttribute('data-focused', 'true');
        fireEvent.blur(trigger);
        expect(trigger).toHaveAttribute('data-focused', 'false');
      });
    });
  });
});
