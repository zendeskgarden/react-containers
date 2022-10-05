/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, createEvent } from '@testing-library/react';
import { IUseSliderProps, IUseSliderReturnValue } from './types';
import { SliderContainer } from './SliderContainer';

jest.mock('lodash.debounce', () => ({ default: (fn: any) => fn, __esModule: true }));

type StandardKeyDownMatrix = [
  string,
  string,
  IUseSliderProps['defaultMinValue'],
  IUseSliderReturnValue['minValue']
];

type GranularKeyDownMatrix = [...StandardKeyDownMatrix, number];

describe('SliderContainer', () => {
  let originalGetBoundingClientRect: any;

  beforeEach(() => {
    originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        height: 10,
        top: 0,
        left: 20,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {
          return undefined;
        }
      };
    });
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

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

  describe('Slider', () => {
    it('removes document event listeners on unmount', () => {
      const originalRemoveEventListener = window.removeEventListener;

      window.removeEventListener = jest.fn();

      const { unmount } = render(<TestSlider />);

      unmount();

      expect(window.removeEventListener).toHaveBeenCalled();

      window.removeEventListener = originalRemoveEventListener;
    });
  });

  describe('Track', () => {
    describe('Prop Getter (getTrackProps)', () => {
      it('applies correct data attributes', () => {
        const { getByTestId } = render(<TestSlider />);
        const track = getByTestId('track');

        expect(track).toHaveAttribute('data-garden-container-id', 'containers.slider.track');
        expect(track).toHaveAttribute('data-garden-container-version');
      });

      it('applies correct accessibility values, when disabled', () => {
        const { getByTestId } = render(<TestSlider disabled />);
        const track = getByTestId('track');

        expect(track).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('Slider selection', () => {
    it('updates min value if slider is clicked near min thumb', () => {
      const onChangeSpy = jest.fn();
      const { getByTestId } = render(
        <TestSlider minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
      );

      const track = getByTestId('track');
      const mouseEvent = createEvent.mouseDown(track);

      (mouseEvent as any).pageX = 45;
      fireEvent(track, mouseEvent);

      expect(onChangeSpy).toHaveBeenCalledWith({ minValue: 25, maxValue: 75 });
    });

    it('updates max value if slider is clicked near max thumb', () => {
      const onChangeSpy = jest.fn();
      const { getByTestId } = render(
        <TestSlider minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
      );

      const track = getByTestId('track');
      const mouseEvent = createEvent.mouseDown(track);

      (mouseEvent as any).pageX = 100;
      fireEvent(track, mouseEvent);

      expect(onChangeSpy).toHaveBeenCalledWith({ minValue: 15, maxValue: 80 });
    });
  });

  describe('Min Thumb', () => {
    describe('Prop Getter (getMinThumbProps)', () => {
      it('applies correct accessibility values', () => {
        const { getByTestId } = render(<TestSlider />);
        const thumb = getByTestId('min_thumb');

        expect(thumb).toHaveAttribute('data-garden-container-id', 'containers.slider.thumb');
        expect(thumb).toHaveAttribute('data-garden-container-version');
        expect(thumb).toHaveAttribute('role', 'slider');
        expect(thumb).toHaveAttribute('tabIndex', '0');
        expect(thumb).toHaveAttribute('aria-valuemin', '0');
        expect(thumb).toHaveAttribute('aria-valuemax', '100');
        expect(thumb).toHaveAttribute('aria-valuenow', '0');
      });

      it('removes thumb from tab order when disabled', () => {
        const { getByTestId } = render(<TestSlider disabled />);
        const thumb = getByTestId('min_thumb');

        expect(thumb).toHaveAttribute('tabIndex', '-1');
      });

      describe('uncontrolled', () => {
        it('renders with default (starting) value', () => {
          const { getByTestId } = render(<TestSlider defaultMinValue={25} />);
          const thumb = getByTestId('min_thumb');

          expect(thumb).toHaveAttribute('aria-valuenow', '25');
        });
      });

      describe('controlled', () => {
        it('accepts a custom value', () => {
          const { getByTestId } = render(<TestSlider minValue={25} />);
          const thumb = getByTestId('min_thumb');

          expect(thumb).toHaveAttribute('aria-valuenow', '25');
        });
      });
    });

    describe('Keyboard Functionality', () => {
      describe('Key Handlers (LTR)', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowUp', 0, 1],
            ['increment', 'ArrowRight', 0, 1],
            ['decrement', 'ArrowDown', 1, 0],
            ['decrement', 'ArrowLeft', 1, 0]
          ])('should %s min thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider />);
            const thumb = getByTestId('min_thumb');
            const otherThumb = getByTestId('max_thumb');

            fireEvent.keyDown(thumb, { key });

            expect(thumb).toHaveAttribute('aria-valuenow', String(end));
            expect(otherThumb).toHaveAttribute('aria-valuemin', String(end));
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
                const thumb = getByTestId('min_thumb');
                const otherThumb = getByTestId('max_thumb');

                fireEvent.keyDown(thumb, { key });

                expect(thumb).toHaveAttribute('aria-valuenow', String(end));
                expect(otherThumb).toHaveAttribute('aria-valuemin', String(end));
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
                const thumb = getByTestId('min_thumb');
                const otherThumb = getByTestId('max_thumb');

                fireEvent.keyDown(thumb, { key });

                expect(thumb).toHaveAttribute('aria-valuenow', String(end));
                expect(otherThumb).toHaveAttribute('aria-valuemin', String(end));
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
            const thumb = getByTestId('min_thumb');

            fireEvent.keyDown(thumb, { key });

            expect(thumb).toHaveAttribute('aria-valuenow', String(end));
          });
        });

        it('should reset min thumb to range min using Home key', () => {
          const { getByTestId } = render(<TestSlider defaultMinValue={75} />);
          const thumb = getByTestId('min_thumb');

          fireEvent.keyDown(thumb, { key: 'Home' });

          expect(thumb).toHaveAttribute('aria-valuenow', '0');
        });
      });

      describe('Key Handlers (RTL)', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowLeft', 0, 1],
            ['decrement', 'ArrowRight', 1, 0]
          ])('should %s min thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider rtl />);
            const thumb = getByTestId('min_thumb');
            const otherThumb = getByTestId('max_thumb');

            fireEvent.keyDown(thumb, { key });

            expect(thumb).toHaveAttribute('aria-valuenow', String(end));
            expect(otherThumb).toHaveAttribute('aria-valuemin', String(end));
          });
        });

        describe('value stays within bounds', () => {
          it('should not decrement min thumb below range min using ArrowRight key', () => {
            const { getByTestId } = render(<TestSlider rtl />);
            const thumb = getByTestId('min_thumb');
            const otherThumb = getByTestId('max_thumb');

            fireEvent.keyDown(thumb, { key: 'ArrowRight' });

            expect(thumb).toHaveAttribute('aria-valuenow', '0');
            expect(otherThumb).toHaveAttribute('aria-valuemin', '0');
          });
        });
      });
    });

    describe('Drag Functionality', () => {
      let onChangeSpy: jest.Mock;

      beforeEach(() => {
        onChangeSpy = jest.fn();
      });

      describe('document mousemove event', () => {
        it('updates minValue on drag', () => {
          const { container, getByTestId } = render(
            <TestSlider minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
          );
          const thumb = getByTestId('min_thumb');

          fireEvent.mouseDown(thumb);

          const mouseEvent = new MouseEvent('mousemove', {
            target: container.firstChild
          } as any);

          (mouseEvent as any).pageX = 30;

          fireEvent(container.ownerDocument!, mouseEvent);

          expect(onChangeSpy).toHaveBeenCalledWith({ minValue: 10, maxValue: 75 });
        });

        it('updates minValue on drag in RTL mode', () => {
          const { container, getByTestId } = render(
            <TestSlider rtl minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
          );
          const thumb = getByTestId('min_thumb');

          fireEvent.mouseDown(thumb);

          const mouseEvent = new MouseEvent('mousemove');

          (mouseEvent as any).pageX = 30;

          fireEvent(container.ownerDocument!, mouseEvent);

          expect(onChangeSpy).toHaveBeenCalledWith({ minValue: 75, maxValue: 75 });
        });

        it('does not update minValue when disabled', () => {
          const { container, getByTestId } = render(
            <TestSlider disabled minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
          );
          const thumb = getByTestId('min_thumb');

          userEvent.click(thumb);

          const mouseEvent = new MouseEvent('mousemove');

          (mouseEvent as any).pageX = 30;

          fireEvent(container.ownerDocument!, mouseEvent);

          expect(onChangeSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('Max Thumb', () => {
    describe('Prop Geter (getMaxThumbProps)', () => {
      it('applies correct accessibility values', () => {
        const { getByTestId } = render(<TestSlider />);
        const thumb = getByTestId('max_thumb');

        expect(thumb).toHaveAttribute('data-garden-container-id', 'containers.slider.thumb');
        expect(thumb).toHaveAttribute('data-garden-container-version');
        expect(thumb).toHaveAttribute('role', 'slider');
        expect(thumb).toHaveAttribute('tabIndex', '0');
        expect(thumb).toHaveAttribute('aria-valuemin', '0');
        expect(thumb).toHaveAttribute('aria-valuemax', '100');
        expect(thumb).toHaveAttribute('aria-valuenow', '100');
      });

      it('removes thumb from tab order when disabled', () => {
        const { getByTestId } = render(<TestSlider disabled />);
        const thumb = getByTestId('max_thumb');

        expect(thumb).toHaveAttribute('tabIndex', '-1');
      });

      describe('uncontrolled', () => {
        it('renders with default (starting) value', () => {
          const { getByTestId } = render(<TestSlider defaultMaxValue={50} />);
          const thumb = getByTestId('max_thumb');

          expect(thumb).toHaveAttribute('aria-valuenow', '50');
        });
      });

      describe('controlled', () => {
        it('accepts a passed in value', () => {
          const { getByTestId } = render(<TestSlider maxValue={50} />);
          const thumb = getByTestId('max_thumb');

          expect(thumb).toHaveAttribute('aria-valuenow', '50');
        });
      });
    });

    describe('Keyboard Functionality', () => {
      describe('Key Handlers (LTR)', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowUp', 99, 100],
            ['increment', 'ArrowRight', 99, 100],
            ['decrement', 'ArrowDown', 100, 99],
            ['decrement', 'ArrowLeft', 100, 99]
          ])('should %s max thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider />);
            const thumb = getByTestId('max_thumb');
            const otherThumb = getByTestId('min_thumb');

            fireEvent.keyDown(thumb, { key });

            expect(thumb).toHaveAttribute('aria-valuenow', String(end));
            expect(otherThumb).toHaveAttribute('aria-valuemax', String(end));
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
                const thumb = getByTestId('max_thumb');
                const otherThumb = getByTestId('min_thumb');

                fireEvent.keyDown(thumb, { key });

                expect(thumb).toHaveAttribute('aria-valuenow', String(end));
                expect(otherThumb).toHaveAttribute('aria-valuemax', String(end));
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
                const thumb = getByTestId('max_thumb');
                const otherThumb = getByTestId('min_thumb');

                fireEvent.keyDown(thumb, { key });

                expect(thumb).toHaveAttribute('aria-valuenow', String(end));
                expect(otherThumb).toHaveAttribute('aria-valuemax', String(end));
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
            const thumb = getByTestId('max_thumb');
            const otherThumb = getByTestId('min_thumb');

            fireEvent.keyDown(thumb, { key });

            expect(thumb).toHaveAttribute('aria-valuenow', String(end));
            expect(otherThumb).toHaveAttribute('aria-valuemax', String(end));
          });
        });

        it('should reset max thumb to range max using End key', () => {
          const { getByTestId } = render(<TestSlider defaultMaxValue={75} />);
          const thumb = getByTestId('max_thumb');
          const otherThumb = getByTestId('min_thumb');

          fireEvent.keyDown(thumb, { key: 'End' });

          expect(thumb).toHaveAttribute('aria-valuenow', '100');
          expect(otherThumb).toHaveAttribute('aria-valuemax', '100');
        });
      });

      describe('Key Handlers (RTL)', () => {
        describe('basic behavior', () => {
          it.each<StandardKeyDownMatrix>([
            ['increment', 'ArrowLeft', 99, 100],
            ['decrement', 'ArrowRight', 100, 99]
          ])('should %s max thumb using %s key by 1', (action, key, start, end) => {
            const { getByTestId } = render(<TestSlider rtl />);
            const thumb = getByTestId('max_thumb');
            const otherThumb = getByTestId('min_thumb');

            fireEvent.keyDown(thumb, { key });

            expect(thumb).toHaveAttribute('aria-valuenow', String(end));
            expect(otherThumb).toHaveAttribute('aria-valuemax', String(end));
          });
        });

        describe('value stays within bounds', () => {
          it('should not increment max thumb above range max using ArrowLeft key', () => {
            const { getByTestId } = render(<TestSlider rtl />);
            const thumb = getByTestId('max_thumb');
            const otherThumb = getByTestId('min_thumb');

            fireEvent.keyDown(thumb, { key: 'ArrowLeft' });

            expect(thumb).toHaveAttribute('aria-valuenow', '100');
            expect(otherThumb).toHaveAttribute('aria-valuemax', '100');
          });
        });
      });
    });

    describe('Drag Functionality', () => {
      let onChangeSpy: jest.Mock;

      beforeEach(() => {
        onChangeSpy = jest.fn();
      });

      describe('document mousemove event', () => {
        it('updates maxValue on drag', () => {
          const { container, getByTestId } = render(
            <TestSlider minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
          );
          const thumb = getByTestId('max_thumb');

          fireEvent.mouseDown(thumb);

          const mouseEvent = new MouseEvent('mousemove', {
            target: container.firstChild
          } as any);

          (mouseEvent as any).pageX = 30;

          fireEvent(container.ownerDocument!, mouseEvent);

          expect(onChangeSpy).toHaveBeenCalledWith({ minValue: 15, maxValue: 15 });
        });

        it('updates maxValue on drag in RTL mode', () => {
          const { container, getByTestId } = render(
            <TestSlider rtl minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
          );
          const thumb = getByTestId('max_thumb');

          fireEvent.mouseDown(thumb);

          const mouseEvent = new MouseEvent('mousemove');

          (mouseEvent as any).pageX = 30;

          fireEvent(container.ownerDocument!, mouseEvent);

          expect(onChangeSpy).toHaveBeenCalledWith({ minValue: 15, maxValue: 90 });
        });

        it('does not update maxValue when disabled', () => {
          const { container, getByTestId } = render(
            <TestSlider disabled minValue={15} maxValue={75} step={5} onChange={onChangeSpy} />
          );
          const thumb = getByTestId('max_thumb');

          userEvent.click(thumb);

          const mouseEvent = new MouseEvent('mousemove');

          (mouseEvent as any).pageX = 30;

          fireEvent(container.ownerDocument!, mouseEvent);

          expect(onChangeSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
