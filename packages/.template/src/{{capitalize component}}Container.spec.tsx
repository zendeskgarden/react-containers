/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { {{capitalize component}}Container } from './';
import { IUse{{capitalize component}}ReturnValue } from './types';

describe('{{capitalize component}}Container', () => {
  const Test{{capitalize component}} = () => (
    <{{capitalize component}}Container>
      {({ get{{capitalize component}}Props }: IUse{{capitalize component}}ReturnValue) => (
        <div data-test-id="div" {...get{{capitalize component}}Props({ 'aria-label': 'test' })} />
      )}
    </{{capitalize component}}Container>
  );

  describe('get{{capitalize component}}Props', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<Test{{capitalize component}} />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'region');
    });
  });
});
