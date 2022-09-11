/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { SliderContainer } from './SliderContainer';
import { IUseSliderReturnValue } from './types';

describe('SliderContainer', () => {
  const TestSliderThumb = () => (
    <SliderContainer>
      {({ getSliderThumbProps }: IUseSliderReturnValue) => (
        <div data-test-id="div" {...getSliderThumbProps({ index: 0, 'aria-label': 'test' })} />
      )}
    </SliderContainer>
  );

  describe('getSliderThumbProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestSliderThumb />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'slider');
    });
  });
});
