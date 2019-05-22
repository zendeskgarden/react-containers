/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from 'react-testing-library';

import { ExampleContainer } from './ExampleContainer';

describe('ExampleContainer', () => {
  const BasicExample = () => (
    <ExampleContainer>
      {({ getCoolProps }) => <div {...getCoolProps({ 'data-test-id': 'div' })} />}
    </ExampleContainer>
  );

  describe('getCoolProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('div')).toHaveAttribute('role', 'region');
    });
  });
});
