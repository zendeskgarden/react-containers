/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ComboboxContainer } from './';
import { IUseComboboxReturnValue } from './types';

describe('ComboboxContainer', () => {
  const TestCombobox = () => (
    <ComboboxContainer>
      {({ getComboboxProps }: IUseComboboxReturnValue) => (
        <div data-test-id="div" {...getComboboxProps({ 'aria-label': 'test' })} />
      )}
    </ComboboxContainer>
  );

  describe('getComboboxProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestCombobox />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'region');
    });
  });
});
