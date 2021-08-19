/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { TreeviewContainer } from './';
import { IUseTreeviewReturnValue } from './useTreeview';

describe('TreeviewContainer', () => {
  const TestTreeview = () => (
    <TreeviewContainer>
      {({ getTreeProps }: IUseTreeviewReturnValue) => (
        <div {...getTreeProps({ 'data-test-id': 'div' })} />
      )}
    </TreeviewContainer>
  );

  describe('getTreeviewProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestTreeview />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'tree');
    });
  });
});
