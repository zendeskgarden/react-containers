/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { SplitterContainer } from './';
import { IUseSplitterReturnValue } from './useSplitter';

describe('SplitterContainer', () => {
  const TestSplitter = () => (
    <SplitterContainer>
      {({ getSeparatorProps }: IUseSplitterReturnValue) => (
        <div {...getSeparatorProps({ 'data-test-id': 'div' })} />
      )}
    </SplitterContainer>
  );

  describe('getSplitterProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestSplitter />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'region');
    });
  });
});
