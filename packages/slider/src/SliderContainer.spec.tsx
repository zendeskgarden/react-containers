/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { IUseSliderReturnValue } from './types';
import { SliderContainer } from './SliderContainer';

describe('SliderContainer', () => {
  const TestSlider = () => {
    const trackRef = createRef<HTMLDivElement>();
    const minThumbRef = createRef<HTMLDivElement>();
    const maxThumbRef = createRef<HTMLDivElement>();

    return (
      <SliderContainer trackRef={trackRef} minThumbRef={minThumbRef} maxThumbRef={maxThumbRef}>
        {({ getTrackProps, getMinThumbProps, getMaxThumbProps }: IUseSliderReturnValue) => (
          <div {...getTrackProps()}>
            <div data-test-id="min_thumb" {...getMinThumbProps({ 'aria-label': 'min' })} />
            <div data-test-id="max_thumb" {...getMaxThumbProps({ 'aria-label': 'max' })} />
          </div>
        )}
      </SliderContainer>
    );
  };

  describe('getThumbProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<TestSlider />);
      const element = getByTestId('min_thumb');

      expect(element).toHaveAttribute('role', 'slider');
    });
  });
});
