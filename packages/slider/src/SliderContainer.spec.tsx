/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IUseSliderProps, IUseSliderReturnValue } from './types';
import { SliderContainer } from './SliderContainer';

type StandardKeyDownMatrix = [
  string,
  string,
  IUseSliderProps['defaultMinValue'],
  IUseSliderReturnValue['minValue']
];

type GranularKeyDownMatrix = [...StandardKeyDownMatrix, number];

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

  describe('Track', () => {
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
  });

  describe('Min Thumb', () => {
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

    describe('Keyboard interactions', () => {
      describe('ltr layout, default', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowUp', 0, 1],
            ['increment', 'ArrowRight', 0, 1],
            ['decrement', 'ArrowDown', 1, 0],
            ['decrement', 'ArrowLeft', 1, 0]
          ])('should %s min thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider />);
            const element = getByTestId('min_thumb');
            const otherElement = getByTestId('max_thumb');

            fireEvent.keyDown(element, { key });

            expect(element).toHaveAttribute('aria-valuenow', String(end));
            expect(otherElement).toHaveAttribute('aria-valuemin', String(end));
          });

          describe('step', () => {
            it.each<GranularKeyDownMatrix>([
              ['increment', 'ArrowUp', 10, 0, 10],
              ['increment', 'ArrowRight', 10, 0, 10],
              ['decrement', 'ArrowDown', 10, 10, 0],
              ['decrement', 'ArrowLeft', 10, 10, 0]
            ])(
              'should %s min thumb with a custom step using %s key',
              (action, key, step, start, end) => {
                const { getByTestId } = render(<TestSlider step={step} defaultMinValue={start} />);
                const element = getByTestId('min_thumb');
                const otherElement = getByTestId('max_thumb');

                fireEvent.keyDown(element, { key });

                expect(element).toHaveAttribute('aria-valuenow', String(end));
                expect(otherElement).toHaveAttribute('aria-valuemin', String(end));
              }
            );
          });

          describe('jump', () => {
            it.each<GranularKeyDownMatrix>([
              ['increment', 'PageUp', 10, 0, 10],
              ['decrement', 'PageDown', 10, 10, 0]
            ])(
              'should %s min thumb with a custom jump using %s key',
              (action, key, jump, start, end) => {
                const { getByTestId } = render(<TestSlider jump={jump} defaultMinValue={start} />);
                const element = getByTestId('min_thumb');
                const otherElement = getByTestId('max_thumb');

                fireEvent.keyDown(element, { key });

                expect(element).toHaveAttribute('aria-valuenow', String(end));
                expect(otherElement).toHaveAttribute('aria-valuemin', String(end));
              }
            );
          });
        });

        describe('value stays within bounds', () => {
          it.each<StandardKeyDownMatrix>([
            ['decrement', 'ArrowDown', 0, 0],
            ['decrement', 'ArrowLeft', 15, 15],
            ['decrement', 'PageDown', 50, 50]
          ])('should not %s min thumb below range min using %s key', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider defaultMinValue={start} min={end} />);
            const element = getByTestId('min_thumb');

            fireEvent.keyDown(element, { key });

            expect(element).toHaveAttribute('aria-valuenow', String(end));
          });
        });

        it('should reset min thumb to range min using Home key', () => {
          const { getByTestId } = render(<TestSlider defaultMinValue={75} />);
          const element = getByTestId('min_thumb');

          fireEvent.keyDown(element, { key: 'Home' });

          expect(element).toHaveAttribute('aria-valuenow', '0');
        });
      });

      describe('rtl layout', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowLeft', 0, 1],
            ['decrement', 'ArrowRight', 1, 0]
          ])('should %s min thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider rtl />);
            const element = getByTestId('min_thumb');
            const otherElement = getByTestId('max_thumb');

            fireEvent.keyDown(element, { key });

            expect(element).toHaveAttribute('aria-valuenow', String(end));
            expect(otherElement).toHaveAttribute('aria-valuemin', String(end));
          });
        });

        describe('value stays within bounds', () => {
          it('should not decrement min thumb below range min using ArrowRight key', () => {
            const { getByTestId } = render(<TestSlider rtl />);
            const element = getByTestId('min_thumb');
            const otherElement = getByTestId('max_thumb');

            fireEvent.keyDown(element, { key: 'ArrowRight' });

            expect(element).toHaveAttribute('aria-valuenow', '0');
            expect(otherElement).toHaveAttribute('aria-valuemin', '0');
          });
        });
      });
    });
  });

  describe('Max Thumb', () => {
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

    describe('Keyboard interactions', () => {
      describe('ltr layout, default', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowUp', 99, 100],
            ['increment', 'ArrowRight', 99, 100],
            ['decrement', 'ArrowDown', 100, 99],
            ['decrement', 'ArrowLeft', 100, 99]
          ])('should %s max thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider />);
            const element = getByTestId('max_thumb');
            const otherElement = getByTestId('min_thumb');

            fireEvent.keyDown(element, { key });

            expect(element).toHaveAttribute('aria-valuenow', String(end));
            expect(otherElement).toHaveAttribute('aria-valuemax', String(end));
          });

          describe('step', () => {
            it.each<GranularKeyDownMatrix>([
              ['increment', 'ArrowUp', 10, 90, 100],
              ['increment', 'ArrowRight', 10, 90, 100],
              ['decrement', 'ArrowDown', 10, 100, 90],
              ['decrement', 'ArrowLeft', 10, 100, 90]
            ])(
              'should %s max thumb with a custom step using %s key',
              (action, key, step, start, end) => {
                const { getByTestId } = render(<TestSlider step={step} defaultMaxValue={start} />);
                const element = getByTestId('max_thumb');
                const otherElement = getByTestId('min_thumb');

                fireEvent.keyDown(element, { key });

                expect(element).toHaveAttribute('aria-valuenow', String(end));
                expect(otherElement).toHaveAttribute('aria-valuemax', String(end));
              }
            );
          });

          describe('jump', () => {
            it.each<GranularKeyDownMatrix>([
              ['increment', 'PageUp', 10, 90, 100],
              ['decrement', 'PageDown', 10, 100, 90]
            ])(
              'should %s max thumb with a custom jump using %s key',
              (action, key, jump, start, end) => {
                const { getByTestId } = render(<TestSlider jump={jump} defaultMaxValue={start} />);
                const element = getByTestId('max_thumb');
                const otherElement = getByTestId('min_thumb');

                fireEvent.keyDown(element, { key });

                expect(element).toHaveAttribute('aria-valuenow', String(end));
                expect(otherElement).toHaveAttribute('aria-valuemax', String(end));
              }
            );
          });
        });

        describe('value stays within bounds', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowUp', 100, 100],
            ['increment', 'ArrowRight', 85, 85],
            ['increment', 'PageUp', 50, 50]
          ])('should not %s max thumb above range max using %s key', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider defaultMaxValue={start} max={end} />);
            const element = getByTestId('max_thumb');
            const otherElement = getByTestId('min_thumb');

            fireEvent.keyDown(element, { key });

            expect(element).toHaveAttribute('aria-valuenow', String(end));
            expect(otherElement).toHaveAttribute('aria-valuemax', String(end));
          });
        });

        it('should reset max thumb to range max using End key', () => {
          const { getByTestId } = render(<TestSlider defaultMaxValue={75} />);
          const element = getByTestId('max_thumb');
          const otherElement = getByTestId('min_thumb');

          fireEvent.keyDown(element, { key: 'End' });

          expect(element).toHaveAttribute('aria-valuenow', '100');
          expect(otherElement).toHaveAttribute('aria-valuemax', '100');
        });
      });

      describe('rtl layout', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowLeft', 99, 100],
            ['decrement', 'ArrowRight', 100, 99]
          ])('should %s max thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider rtl />);
            const element = getByTestId('max_thumb');
            const otherElement = getByTestId('min_thumb');

            fireEvent.keyDown(element, { key });

            expect(element).toHaveAttribute('aria-valuenow', String(end));
            expect(otherElement).toHaveAttribute('aria-valuemax', String(end));
          });
        });

        describe('value stays within bounds', () => {
          it('should not increment max thumb above range max using ArrowLeft key', () => {
            const { getByTestId } = render(<TestSlider rtl />);
            const element = getByTestId('max_thumb');
            const otherElement = getByTestId('min_thumb');

            fireEvent.keyDown(element, { key: 'ArrowLeft' });

            expect(element).toHaveAttribute('aria-valuenow', '100');
            expect(otherElement).toHaveAttribute('aria-valuemax', '100');
          });
        });
      });
    });
  });
});
