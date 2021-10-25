/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SplitterContainer } from './';
import {
  IUseSplitterReturnValue,
  SplitterOrientation,
  SplitterType,
  calculateOffset
} from './useSplitter';

const paneStyle: React.CSSProperties = {
  flexGrow: 0,
  flexShrink: 0,
  overflow: 'auto'
};

const flexContainerStyle: React.CSSProperties = {
  minHeight: '200px',
  display: 'flex'
};

const separatorStyle: React.CSSProperties = {
  display: 'block',
  backgroundColor: 'black',
  height: 'auto',
  cursor: 'col-resize',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: '5px'
};

interface IExtendedMouseEvent extends MouseEventInit {
  offsetX?: number;
  offsetY?: number;
  pageX?: number;
  pageY?: number;
  x?: number;
  y?: number;
}

// JSDom doesn't support the newer MouseEvent properties such as pageX or pageY
// Therefore we add ExtendedMouseEvent that extends the base MouseEvent
class ExtendedMouseEvent extends MouseEvent implements MouseEventInit {
  constructor(type: string, values: IExtendedMouseEvent) {
    const { pageX, pageY, offsetX, offsetY, x, y, ...mouseValues } = values;

    super(type, mouseValues);

    Object.assign(this, {
      offsetX: offsetX || 0,
      offsetY: offsetY || 0,
      pageX: pageX || 0,
      pageY: pageY || 0,
      x: x || 0,
      y: y || 0
    });
  }
}

describe('SplitterContainer', () => {
  const UncontrolledTestSplitter = ({
    type = SplitterType.VARIABLE,
    min = 0,
    max = 100,
    orientation = SplitterOrientation.VERTICAL,
    defaultValueNow = 20
  }: {
    type?: SplitterType;
    min?: number;
    max?: number;
    orientation?: SplitterOrientation;
    defaultValueNow?: number;
  }) => (
    <SplitterContainer
      ariaLabel="flex-pane"
      controls="flex-pane"
      type={type}
      min={min}
      max={max}
      orientation={orientation}
      defaultValueNow={defaultValueNow}
    >
      {({ getSeparatorProps }: IUseSplitterReturnValue) => {
        const separatorProps = getSeparatorProps({
          'data-test-id': 'separator',
          style: separatorStyle,
          tabIndex: 0
        });

        return (
          <div data-test-id="flex-container" style={flexContainerStyle}>
            <div
              style={{ ...paneStyle, flexBasis: `${separatorProps['aria-valuenow']}px` }}
              data-test-id="flex-pane"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
            <hr {...separatorProps} />
          </div>
        );
      }}
    </SplitterContainer>
  );

  const ControlledTestSplitter = ({
    type = SplitterType.VARIABLE,
    min = 0,
    max = 100,
    orientation = SplitterOrientation.VERTICAL,
    valueNow,
    onChange
  }: {
    type?: SplitterType;
    min?: number;
    max?: number;
    orientation?: SplitterOrientation;
    valueNow: number;
    onChange: (value: number) => void;
  }) => (
    <SplitterContainer
      ariaLabel="flex-pane"
      controls="flex-pane"
      type={type}
      min={min}
      max={max}
      orientation={orientation}
      valueNow={valueNow}
      onChange={onChange}
    >
      {({ getSeparatorProps }: IUseSplitterReturnValue) => {
        const separatorProps = getSeparatorProps({
          'data-test-id': 'separator',
          style: separatorStyle
        });

        return (
          <div data-test-id="flex-container" style={flexContainerStyle}>
            <div
              style={{ ...paneStyle, flexBasis: `${separatorProps['aria-valuenow']}px` }}
              id="flex-pane"
              data-test-id="flex-pane"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
            <hr {...separatorProps} />
          </div>
        );
      }}
    </SplitterContainer>
  );

  describe('getSeparatorProps', () => {
    it('returns correct default props', () => {
      let separatorProps;

      render(
        <>
          <SplitterContainer
            ariaLabel="flex-pane"
            controls="flex-pane"
            type={SplitterType.VARIABLE}
            min={0}
            max={100}
            orientation={SplitterOrientation.VERTICAL}
          >
            {({ getSeparatorProps }: IUseSplitterReturnValue) => {
              separatorProps = getSeparatorProps();

              return null;
            }}
          </SplitterContainer>
        </>
      );
      expect(separatorProps).toMatchInlineSnapshot(`
        Object {
          "aria-controls": "flex-pane",
          "aria-label": "flex-pane",
          "aria-orientation": "vertical",
          "aria-valuemax": 100,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "data-garden-container-id": "containers.splitter",
          "data-garden-container-version": "version",
          "onKeyDown": [Function],
          "onMouseDown": [Function],
          "onTouchStart": [Function],
          "ref": Object {
            "current": null,
          },
          "role": "separator",
          "tabIndex": 0,
        }
      `);
    });
    describe('accessibility attributes', () => {
      type AccessibilityAttributes = [string, string | SplitterOrientation];
      it.each<AccessibilityAttributes>([
        ['role', 'separator'],
        ['aria-controls', 'flex-pane'],
        ['aria-label', 'flex-pane'],
        ['aria-valuemin', '0'],
        ['aria-valuemax', '100'],
        ['aria-valuenow', '20'],
        ['tabindex', '0'],
        ['aria-orientation', SplitterOrientation.VERTICAL]
      ])('should applies correct accessibility %s', (attribute, value) => {
        const { getByTestId } = render(<UncontrolledTestSplitter />);
        const element = getByTestId('separator');

        expect(element).toHaveAttribute(attribute, value);
      });
    });
    describe('mouse', () => {
      describe('variable mode', () => {
        type MouseDownMatrix = [SplitterOrientation, 'pageX' | 'pageY', number, number, number];
        it.each<MouseDownMatrix>([
          [SplitterOrientation.VERTICAL, 'pageX', 30, 20, 30],
          [SplitterOrientation.VERTICAL, 'pageX', 101, 20, 100],
          [SplitterOrientation.VERTICAL, 'pageX', -21, 20, 0],
          [SplitterOrientation.HORIZONTAL, 'pageY', 70, 20, 70],
          [SplitterOrientation.HORIZONTAL, 'pageY', 101, 20, 100],
          [SplitterOrientation.HORIZONTAL, 'pageY', -21, 20, 0]
        ])(
          'should move %s splitter with %s mouse set to %i from %i to %i',
          (orientation, mouseAxis, mousePosition, start, end) => {
            const { getByTestId } = render(
              <UncontrolledTestSplitter orientation={orientation} defaultValueNow={start} />
            );
            const element = getByTestId('separator');

            fireEvent.mouseDown(element);
            fireEvent(
              document,
              new ExtendedMouseEvent('mousemove', { [mouseAxis]: mousePosition })
            );
            fireEvent.mouseUp(document);

            expect(element).toHaveAttribute('aria-valuenow', String(end));
          }
        );
      });
      describe('fixed', () => {
        type MouseDownMatrix = [SplitterOrientation, number, number];
        it.each<MouseDownMatrix>([
          [SplitterOrientation.VERTICAL, 20, 100],
          [SplitterOrientation.VERTICAL, 0, 100],
          [SplitterOrientation.VERTICAL, 100, 0],
          [SplitterOrientation.HORIZONTAL, 20, 100],
          [SplitterOrientation.HORIZONTAL, 0, 100],
          [SplitterOrientation.HORIZONTAL, 100, 0]
        ])('should move %s splitter using mouse down from %i to %i', (orientation, start, end) => {
          const { getByTestId } = render(
            <UncontrolledTestSplitter
              type={SplitterType.FIXED}
              orientation={orientation}
              defaultValueNow={start}
            />
          );
          const element = getByTestId('separator');

          fireEvent.mouseDown(element);

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });
    });

    describe('touch', () => {
      describe('variable mode', () => {
        type TouchMatrix = [SplitterOrientation, 'pageX' | 'pageY', number, number, number];
        it.each<TouchMatrix>([
          [SplitterOrientation.VERTICAL, 'pageX', 50, 20, 50],
          [SplitterOrientation.VERTICAL, 'pageX', 101, 20, 100],
          [SplitterOrientation.VERTICAL, 'pageX', -21, 20, 0],
          [SplitterOrientation.HORIZONTAL, 'pageY', 70, 20, 70],
          [SplitterOrientation.HORIZONTAL, 'pageY', 101, 20, 100],
          [SplitterOrientation.HORIZONTAL, 'pageY', -21, 20, 0]
        ])(
          'should move %s splitter using %s touch set to %i from %i to %i',
          (orientation, touchAxis, touchPosition, start, end) => {
            const { getByTestId } = render(
              <UncontrolledTestSplitter orientation={orientation} defaultValueNow={start} />
            );
            const element = getByTestId('separator');

            fireEvent.touchStart(element);
            fireEvent.touchMove(document, {
              targetTouches: [{ [touchAxis]: touchPosition }]
            });
            fireEvent.touchEnd(document);

            expect(element).toHaveAttribute('aria-valuenow', String(end));
          }
        );
      });

      describe('fixed', () => {
        type TouchMatrix = [SplitterOrientation, number, number];
        it.each<TouchMatrix>([
          [SplitterOrientation.VERTICAL, 20, 100],
          [SplitterOrientation.VERTICAL, 0, 100],
          [SplitterOrientation.VERTICAL, 100, 0],
          [SplitterOrientation.HORIZONTAL, 20, 100],
          [SplitterOrientation.HORIZONTAL, 0, 100],
          [SplitterOrientation.HORIZONTAL, 100, 0]
        ])('should move %s splitter using touch from %i to %i', (orientation, start, end) => {
          const { getByTestId } = render(
            <UncontrolledTestSplitter
              type={SplitterType.FIXED}
              orientation={orientation}
              defaultValueNow={start}
            />
          );
          const element = getByTestId('separator');

          fireEvent.touchStart(element);

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });
    });

    describe('keyboard', () => {
      type KeyDownMatrix = [SplitterOrientation, string, number, number];

      describe('variable mode', () => {
        it.each<KeyDownMatrix>([
          [SplitterOrientation.VERTICAL, 'ArrowRight', 20, 70],
          [SplitterOrientation.VERTICAL, 'ArrowLeft', 70, 20],
          [SplitterOrientation.VERTICAL, 'Enter', 20, 0],
          [SplitterOrientation.VERTICAL, 'Enter', 0, 100],
          [SplitterOrientation.HORIZONTAL, 'ArrowUp', 70, 20],
          [SplitterOrientation.HORIZONTAL, 'ArrowDown', 20, 70],
          [SplitterOrientation.HORIZONTAL, 'Enter', 20, 0],
          [SplitterOrientation.HORIZONTAL, 'Enter', 0, 100]
        ])('should move %s splitter using %s from %i to %i', (orientation, key, start, end) => {
          const { getByTestId } = render(
            <UncontrolledTestSplitter orientation={orientation} defaultValueNow={start} />
          );
          const element = getByTestId('separator');

          fireEvent.keyDown(element, { key });

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });

      describe('fixed mode', () => {
        it.each<KeyDownMatrix>([
          [SplitterOrientation.VERTICAL, 'Enter', 20, 0],
          [SplitterOrientation.VERTICAL, 'Enter', 0, 100],
          [SplitterOrientation.HORIZONTAL, 'Enter', 20, 0],
          [SplitterOrientation.HORIZONTAL, 'Enter', 0, 100]
        ])('should move %s splitter using %s from %i to %i', (orientation, key, start, end) => {
          const { getByTestId } = render(
            <UncontrolledTestSplitter
              type={SplitterType.FIXED}
              orientation={orientation}
              defaultValueNow={start}
            />
          );
          const element = getByTestId('separator');

          fireEvent.keyDown(element, { key });

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });
    });
    describe('controlled mode', () => {
      it('should update onChange with mouse input', () => {
        const testValues: { valueNow?: number } = {};
        const { getByTestId } = render(
          <>
            {React.createElement(() => {
              const [valueNow, onChange] = useState(20);

              testValues.valueNow = valueNow;

              return (
                <ControlledTestSplitter
                  orientation={SplitterOrientation.VERTICAL}
                  valueNow={valueNow}
                  onChange={onChange}
                />
              );
            })}
          </>
        );
        const element = getByTestId('separator');

        fireEvent.mouseDown(element);
        fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 60 }));
        fireEvent.mouseUp(document);

        expect(testValues.valueNow).toBe(60);
        expect(element).toHaveAttribute('aria-valuenow', '60');
      });
      it('should update onChange with touch input', () => {
        const testValues: { valueNow?: number } = {};
        const { getByTestId } = render(
          <>
            {React.createElement(() => {
              const [valueNow, onChange] = useState(20);

              testValues.valueNow = valueNow;

              return (
                <ControlledTestSplitter
                  orientation={SplitterOrientation.VERTICAL}
                  valueNow={valueNow}
                  onChange={onChange}
                />
              );
            })}
          </>
        );
        const element = getByTestId('separator');

        fireEvent.touchStart(element);
        fireEvent.touchMove(document, {
          targetTouches: [{ pageX: 40 }]
        });

        fireEvent.touchEnd(document);

        expect(testValues.valueNow).toBe(40);
        expect(element).toHaveAttribute('aria-valuenow', '40');
      });
      it('should update onChange with keyboard input', () => {
        const testValues: { valueNow?: number } = {};
        const { getByTestId } = render(
          <>
            {React.createElement(() => {
              const [valueNow, onChange] = useState(20);

              testValues.valueNow = valueNow;

              return (
                <ControlledTestSplitter
                  orientation={SplitterOrientation.VERTICAL}
                  valueNow={valueNow}
                  onChange={onChange}
                />
              );
            })}
          </>
        );
        const element = getByTestId('separator');

        fireEvent.keyDown(element, { key: 'Enter' });

        expect(testValues.valueNow).toBe(0);
        expect(element).toHaveAttribute('aria-valuenow', '0');
      });
    });
  });
  describe('calculateOffset', () => {
    it('should return a value if paddingOrMarginPosition and or offsetDimension is undefined', () => {
      expect(calculateOffset(40)).toBe(40);
    });
  });
});
