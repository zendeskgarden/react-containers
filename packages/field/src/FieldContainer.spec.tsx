/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { FieldContainer } from './FieldContainer';

describe('FieldContainer', () => {
  const CONTAINER_ID = 'test';

  const BasicExample = () => (
    <FieldContainer id={CONTAINER_ID}>
      {({ getLabelProps, getInputProps, getHintProps }) => (
        <div>
          <label {...getLabelProps({ 'data-test-id': 'label' })}>Label</label>
          <div {...getHintProps({ 'data-test-id': 'hint' })}>Hint</div>
          <input {...getInputProps({ 'data-test-id': 'input' })} />
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

    it('includes aria-describedby if option is provided', () => {
      const { getByTestId } = render(
        <FieldContainer id={CONTAINER_ID}>
          {({ getInputProps }) => (
            <div>
              <input {...getInputProps({ 'data-test-id': 'input' }, { isDescribed: true })} />
            </div>
          )}
        </FieldContainer>
      );

      expect(getByTestId('input')).toHaveAttribute('aria-describedby', `${CONTAINER_ID}--hint`);
    });
  });

  describe('getHintProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('hint')).toHaveAttribute('id', `${CONTAINER_ID}--hint`);
    });
  });
});
