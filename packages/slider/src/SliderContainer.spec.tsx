/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { SliderContainer } from './';
import { IUseSliderReturnValue } from './types';

describe('SliderContainer', () => {
  const TestSlider = () => (
    <SliderContainer>
      {({ getSliderProps }: IUseSliderReturnValue) => (
        <div data-test-id="div" {...getSliderProps({ 'aria-label': 'test' })} />
      )}
    </SliderContainer>
  );

  describe('getSliderProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestSlider />);
      const element = getByTestId('div');

      expect(element).toHaveAttribute('role', 'region');
    });
  });
});
