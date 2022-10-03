/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { IUseSliderProps, IUseSliderReturnValue } from './types';
import { SliderContainer } from './SliderContainer';

describe('SliderContainer', () => {
  const TestSlider = ({ min = 0, max = 100, ...props }: Partial<IUseSliderProps>) => {
    const trackRef = createRef<HTMLDivElement>();
    const minThumbRef = createRef<HTMLDivElement>();
    const maxThumbRef = createRef<HTMLDivElement>();

    return (
      <SliderContainer
        min={min}
        max={max}
        trackRef={trackRef}
        minThumbRef={minThumbRef}
        maxThumbRef={maxThumbRef}
        {...props}
      >
        {({ getTrackProps, getMinThumbProps, getMaxThumbProps }: IUseSliderReturnValue) => (
          <div data-test-id="track" {...getTrackProps()}>
            <div data-test-id="min_thumb" {...getMinThumbProps({ 'aria-label': 'min' })} />
            <div data-test-id="max_thumb" {...getMaxThumbProps({ 'aria-label': 'max' })} />
          </div>
        )}
      </SliderContainer>
    );
  };

  describe('prop getters', () => {
    describe('getTrackProps', () => {
      it('renders with correct default attributes', () => {
        const { getByTestId } = render(<TestSlider />);
        const element = getByTestId('track');

        expect(element).toHaveAttribute('data-garden-container-id', 'containers.slider.track');
        expect(element).toHaveAttribute('data-garden-container-version');
      });

      it('renders with the aria-disabled attribute, when disabled', () => {
        const { getByTestId } = render(<TestSlider disabled />);
        const element = getByTestId('track');

        expect(element).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('getMinThumbProps', () => {
      it('renders with correct default attributes', () => {
        const { getByTestId } = render(<TestSlider />);
        const element = getByTestId('min_thumb');

        expect(element).toHaveAttribute('data-garden-container-id', 'containers.slider.thumb');
        expect(element).toHaveAttribute('data-garden-container-version');
        expect(element).toHaveAttribute('tabindex', '0');
        expect(element).toHaveAttribute('role', 'slider');
        expect(element).toHaveAttribute('aria-valuenow', '0');
        expect(element).toHaveAttribute('aria-valuemin', '0');
        expect(element).toHaveAttribute('aria-valuemax', '100');
      });

      it('renders with a -1 tabindex, when disabled', () => {
        const { getByTestId } = render(<TestSlider disabled />);
        const element = getByTestId('min_thumb');

        expect(element).toHaveAttribute('tabindex', '-1');
      });

      describe('uncontrolled', () => {
        it('renders with default (starting) value', () => {
          const { getByTestId } = render(<TestSlider defaultMinValue={25} />);
          const element = getByTestId('min_thumb');

          expect(element).toHaveAttribute('aria-valuenow', '25');
        });
      });

      describe('controlled', () => {
        it('accepts a passed in value', () => {
          const { getByTestId } = render(<TestSlider minValue={25} />);
          const element = getByTestId('min_thumb');

          expect(element).toHaveAttribute('aria-valuenow', '25');
        });
      });
    });

    describe('getMaxThumbProps', () => {
      it('renders with correct default attributes', () => {
        const { getByTestId } = render(<TestSlider />);
        const element = getByTestId('max_thumb');

        expect(element).toHaveAttribute('data-garden-container-id', 'containers.slider.thumb');
        expect(element).toHaveAttribute('data-garden-container-version');
        expect(element).toHaveAttribute('tabindex', '0');
        expect(element).toHaveAttribute('role', 'slider');
        expect(element).toHaveAttribute('aria-valuenow', '100');
        expect(element).toHaveAttribute('aria-valuemin', '0');
        expect(element).toHaveAttribute('aria-valuemax', '100');
      });

      it('renders with a -1 tabindex, when disabled', () => {
        const { getByTestId } = render(<TestSlider disabled />);
        const element = getByTestId('max_thumb');

        expect(element).toHaveAttribute('tabindex', '-1');
      });

      describe('uncontrolled', () => {
        it('renders with default (starting) value', () => {
          const { getByTestId } = render(<TestSlider defaultMaxValue={50} />);
          const element = getByTestId('max_thumb');

          expect(element).toHaveAttribute('aria-valuenow', '50');
        });
      });

      describe('controlled', () => {
        it('accepts a passed in value', () => {
          const { getByTestId } = render(<TestSlider maxValue={50} />);
          const element = getByTestId('max_thumb');

          expect(element).toHaveAttribute('aria-valuenow', '50');
        });
      });
    });
  });
});
