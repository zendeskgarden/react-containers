/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { FieldContainer } from './';

describe('FieldContainer', () => {
  const CONTAINER_ID = 'test';

  const BasicExample = () => (
    <FieldContainer idPrefix={CONTAINER_ID}>
      {({ getLabelProps, getInputProps, getHintProps, getMessageProps }) => (
        <div>
          <label data-test-id="label" {...getLabelProps()}>
            Label
          </label>
          <div data-test-id="hint" {...getHintProps()}>
            Hint
          </div>
          <input data-test-id="input" {...getInputProps()} />
          <div data-test-id="message" {...getMessageProps()}>
            Message
          </div>
        </div>
      )}
    </FieldContainer>
  );

  describe('getLabelProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);
      const label = getByTestId('label');

      expect(label).toHaveAttribute('id', `${CONTAINER_ID}--label`);
      expect(label).toHaveAttribute('for', `${CONTAINER_ID}--input`);
    });
  });

  describe('getInputProps', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(<BasicExample />);
      const input = getByTestId('input');

      expect(input).toHaveAttribute('id', `${CONTAINER_ID}--input`);
      expect(input).toHaveAttribute('aria-labelledby', `${CONTAINER_ID}--label`);
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it.each([
      ['options', true, true],
      ['hasHint', true, false],
      ['hasMessage', false, true]
    ])(`includes aria-describedby if %s is provided`, (_, hasHint, hasMessage) => {
      const { getByTestId } = render(
        <FieldContainer idPrefix={CONTAINER_ID} hasHint={hasHint} hasMessage={hasMessage}>
          {({ getInputProps }) => (
            <div>
              <input data-test-id="input" {...getInputProps()} />
            </div>
          )}
        </FieldContainer>
      );

      expect(getByTestId('input')).toHaveAttribute(
        'aria-describedby',
        [hasHint ? `${CONTAINER_ID}--hint` : '', hasMessage ? `${CONTAINER_ID}--message` : '']
          .join(' ')
          .trim()
      );
    });

    it('overrides `aria-describedby` if provided', () => {
      const { getByTestId } = render(
        <FieldContainer>
          {({ getInputProps }) => (
            <input data-test-id="input" {...getInputProps({ 'aria-describedby': 'test' })} />
          )}
        </FieldContainer>
      );

      expect(getByTestId('input')).toHaveAttribute('aria-describedby', 'test');
    });
  });

  describe('getHintProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('hint')).toHaveAttribute('id', `${CONTAINER_ID}--hint`);
    });
  });

  describe('getMessageProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('message')).toHaveAttribute('id', `${CONTAINER_ID}--message`);
    });
  });
});
