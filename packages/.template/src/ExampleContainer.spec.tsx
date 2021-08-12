/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ExampleContainer } from './';
import { IUseExampleReturnValue } from './useExample';

describe('ExampleContainer', () => {
  const BasicExample = () => (
    <ExampleContainer>
      {({ getExampleProps }: IUseExampleReturnValue) => (
        <div {...getExampleProps({ 'data-test-id': 'div' })} />
      )}
    </ExampleContainer>
  );

  describe('getExampleProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'region');
    });
  });
});
