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
  const TestSlider = () => (
    <SliderContainer>
      {({
        getSliderRootProps,
        getSliderTrackProps,
        getSliderThumbProps
      }: IUseSliderReturnValue) => (
        <div {...getSliderRootProps()}>
          <div {...getSliderTrackProps()}>
            <div
              data-test-id="thumb"
              {...getSliderThumbProps({ index: 0, 'aria-label': 'test' })}
            />
          </div>
        </div>
      )}
    </SliderContainer>
  );

  describe('getSliderThumbProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestSlider />);
      const element = getByTestId('thumb');

      expect(element).toHaveAttribute('role', 'slider');
    });
  });
});
