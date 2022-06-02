/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { BreadcrumbContainer } from './';

describe('BreadcrumbContainer', () => {
  const BasicExample = () => (
    <BreadcrumbContainer>
      {({ getContainerProps, getCurrentPageProps }) => (
        <div data-test-id="container" {...getContainerProps({ 'aria-label': 'test' })}>
          <a data-test-id="anchor" {...getCurrentPageProps()}>
            Test
          </a>
        </div>
      )}
    </BreadcrumbContainer>
  );

  describe('getContainerProps()', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(<BasicExample />);
      const container = getByTestId('container');

      expect(container).toHaveAttribute('role', 'navigation');
      expect(container).toHaveAttribute('aria-label', 'test');
    });
  });

  describe('getCurrentPageProps()', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('anchor')).toHaveAttribute('aria-current', 'page');
    });
  });
});
