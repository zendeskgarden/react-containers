/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { FocusVisibleContainer, useFocusVisible } from './';

jest.useFakeTimers();

describe('FocusVisibleContainer', () => {
  const Example = () => {
    return (
      <FocusVisibleContainer>
        {({ ref }) => (
          <div ref={ref} data-test-id="wrapper">
            <button data-test-id="button" tabIndex={0}></button>
            <input data-test-id="input" />
            <textarea data-test-id="textarea"></textarea>
          </div>
        )}
      </FocusVisibleContainer>
    );
  };

  it('throws error if scope is not provided', () => {
    /* eslint-disable no-console */
    const originalError = console.error;

    console.error = jest.fn();

    expect(() => {
      const ErrorExample = () => {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        // Ignoring to test JS runtime usage - should throw error
        // when consumers do not pass a scope value into `useFocusVisible`.
        useFocusVisible();
        /* eslint-enable @typescript-eslint/ban-ts-comment */

        return <div>test</div>;
      };

      render(<ErrorExample />);
    }).toThrow('Error: the useFocusVisible() hook requires a "scope" property');

    console.error = originalError;
    /* eslint-enable no-console */
  });

  it('leaves element intact if blured when not showing focus treatment', () => {
    const { getByTestId } = render(<Example />);
    const button = getByTestId('button');

    fireEvent.blur(button);

    expect(button).not.toHaveAttribute('data-garden-focus-visible');
  });

  it('does not apply focus treatment if keyed with navigation keys', () => {
    const { getByTestId } = render(<Example />);
    const button = getByTestId('button');

    [{ metaKey: true }, { altKey: true }, { ctrlKey: true }].forEach(eventOptions => {
      fireEvent.keyDown(button, eventOptions);
      fireEvent.focus(button);

      expect(button).not.toHaveAttribute('data-garden-focus-visible');
    });

    fireEvent.keyDown(button);
    fireEvent.focus(button);

    expect(button).toHaveAttribute('data-garden-focus-visible');
  });

  it('does not apply focus treatment if pointer is used', () => {
    const { getByTestId } = render(<Example />);
    const button = getByTestId('button');

    fireEvent.mouseDown(button);
    fireEvent.focus(button);

    expect(button).not.toHaveAttribute('data-garden-focus-visible');
  });

  describe('Pointer Interaction', () => {
    it('does not allow focus treatment of provided scope', () => {
      const { getByTestId } = render(<Example />);
      const wrapper = getByTestId('wrapper');

      fireEvent.keyDown(wrapper);
      fireEvent.focus(wrapper);

      expect(wrapper).not.toHaveAttribute('data-garden-focus-visible');
    });

    it('applies focus treatment if keyed while focused', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      // Manually call focus() to allow activeElement to be updated
      button.focus();
      fireEvent.keyDown(button);

      expect(button).toHaveAttribute('data-garden-focus-visible');
    });

    it('retains current focus treatment if html is initial pointer movement', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      fireEvent.keyDown(button);
      fireEvent.mouseMove(document.documentElement);
      fireEvent.focus(button);

      expect(button).toHaveAttribute('data-garden-focus-visible');
    });

    it('retains current focus treatment if body is blured', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      fireEvent.keyDown(button);
      fireEvent.focus(button);
      fireEvent.blur(getByTestId('wrapper'));

      expect(button).toHaveAttribute('data-garden-focus-visible');
    });

    it('retains focus treatment if focused multiple times', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      fireEvent.keyDown(button);
      fireEvent.focus(button);
      fireEvent.focus(button);

      expect(button).toHaveAttribute('data-garden-focus-visible');
    });

    it('removes focus treatment if blured', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      fireEvent.keyDown(button);
      fireEvent.focus(button);
      fireEvent.blur(button);
      jest.runOnlyPendingTimers();

      expect(button).not.toHaveAttribute('data-garden-focus-visible');
    });
  });

  describe('Elements with keyboard modality', () => {
    const KeyboardModalityExample = (props: React.HTMLProps<HTMLDivElement>) => (
      <FocusVisibleContainer>
        {({ ref }) => <div ref={ref} data-test-id="wrapper" {...props} />}
      </FocusVisibleContainer>
    );

    it('applies focus-visible to input with valid type', () => {
      const { getByTestId } = render(
        <KeyboardModalityExample>
          <input data-test-id="input" type="search" />
        </KeyboardModalityExample>
      );

      const input = getByTestId('input');

      fireEvent.focus(input);

      expect(input).toHaveAttribute('data-garden-focus-visible');
    });

    it('applies focus-visible to textarea', () => {
      const { getByTestId } = render(
        <KeyboardModalityExample>
          <textarea data-test-id="textarea"></textarea>
        </KeyboardModalityExample>
      );

      const textarea = getByTestId('textarea');

      fireEvent.focus(textarea);

      expect(textarea).toHaveAttribute('data-garden-focus-visible');
    });

    it('does not apply focus-visible to textrea with readOnly enabled', () => {
      const { getByTestId } = render(
        <KeyboardModalityExample>
          <textarea data-test-id="textarea" readOnly></textarea>
        </KeyboardModalityExample>
      );

      const textarea = getByTestId('textarea');

      fireEvent.focus(textarea);

      expect(textarea).not.toHaveAttribute('data-garden-focus-visible');
    });

    it('does not apply focus-visible otherwise', () => {
      const { getByTestId } = render(
        <KeyboardModalityExample>
          <div data-test-id="content" tabIndex={-1}></div>
        </KeyboardModalityExample>
      );

      const content = getByTestId('content');

      fireEvent.focus(content);

      expect(content).not.toHaveAttribute('data-garden-focus-visible');
    });
  });
});
