/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';

import { FocusVisibleContainer, useFocusVisible } from './';

jest.useFakeTimers();

describe('FocusVisibleContainer', () => {
  const Example = () => {
    return (
      <FocusVisibleContainer>
        {({ ref }) => (
          <div ref={ref} data-test-id="wrapper" tabIndex={-1}>
            <button data-test-id="button" tabIndex={0} />
            <input data-test-id="input" />
            <textarea data-test-id="textarea" />
          </div>
        )}
      </FocusVisibleContainer>
    );
  };

  it('throws error if scope is not provided', () => {
    const originalError = console.error;

    console.error = jest.fn();

    expect(() => {
      const ErrorExample = () => {
        useFocusVisible();

        return <div>test</div>;
      };

      render(<ErrorExample />);
    }).toThrow('Error: the useFocusVisible() hook requires a "scope" property');

    console.error = originalError;
  });

  it('leaves element intact if blured when not showing focus treatment', () => {
    const { getByTestId } = render(<Example />);
    const button = getByTestId('button');

    userEvent.tab();

    expect(button).toHaveAttribute('data-garden-focus-visible');

    userEvent.tab();

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

    userEvent.tab();

    expect(button).toHaveAttribute('data-garden-focus-visible');
  });

  it('does not apply focus treatment if pointer is used', () => {
    const { getByTestId } = render(<Example />);
    const button = getByTestId('button');

    userEvent.click(button);

    expect(button).not.toHaveAttribute('data-garden-focus-visible');
  });

  describe('Pointer Interaction', () => {
    it('does not allow focus treatment of provided scope', () => {
      const { getByTestId } = render(<Example />);
      const wrapper = getByTestId('wrapper');

      userEvent.click(wrapper);

      expect(wrapper).not.toHaveAttribute('data-garden-focus-visible');
    });

    it('applies focus treatment if keyed while focused', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      expect(button).not.toHaveAttribute('data-garden-focus-visible');

      userEvent.tab();

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

      expect(button).not.toHaveAttribute('data-garden-focus-visible');

      userEvent.tab();

      expect(button).toHaveAttribute('data-garden-focus-visible');

      userEvent.tab({ shift: true });

      expect(button).not.toHaveAttribute('data-garden-focus-visible');

      userEvent.tab();

      expect(button).toHaveAttribute('data-garden-focus-visible');
    });

    it('removes focus treatment if blured', () => {
      const { getByTestId } = render(<Example />);
      const button = getByTestId('button');

      expect(button).not.toHaveAttribute('data-garden-focus-visible');

      userEvent.tab();

      expect(button).toHaveAttribute('data-garden-focus-visible');

      userEvent.tab();
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

      expect(input).not.toHaveAttribute('data-garden-focus-visible');

      input.focus();

      expect(input).toHaveAttribute('data-garden-focus-visible');
    });

    it('applies focus-visible to textarea', () => {
      const { getByTestId } = render(
        <KeyboardModalityExample>
          <textarea data-test-id="textarea" />
        </KeyboardModalityExample>
      );

      const textarea = getByTestId('textarea');

      expect(textarea).not.toHaveAttribute('data-garden-focus-visible');

      textarea.focus();

      expect(textarea).toHaveAttribute('data-garden-focus-visible');
    });

    it('does not apply focus-visible when element is not reachable via sequential keyboard navigation', () => {
      const { getByText } = render(
        <KeyboardModalityExample>
          <button tabIndex={-1}>click</button>
        </KeyboardModalityExample>
      );

      userEvent.tab();

      expect(getByText('click')).not.toHaveAttribute('data-garden-focus-visible');
    });
  });
});
