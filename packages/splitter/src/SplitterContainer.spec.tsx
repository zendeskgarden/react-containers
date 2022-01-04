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
  IWindowLike,
  SplitterOrientation,
  SplitterType,
  SplitterPosition,
  normalizePointerToSeparator
} from './useSplitter';

// make useId consistent for testing purposes
jest.mock('@zendeskgarden/container-utilities', () => ({
  composeEventHandlers: jest.requireActual('@zendeskgarden/container-utilities')
    .composeEventHandlers,
  useId: jest.fn(() => '1')
}));

const paneStyle: React.CSSProperties = {
  flexGrow: 0,
  flexShrink: 0,
  overflow: 'auto'
};

const flexContainerStyle: React.CSSProperties = {
  minHeight: '100px',
  width: '100px',
  display: 'flex',
  margin: 0,
  padding: 0
};

const separatorStyle: React.CSSProperties = {
  display: 'block',
  backgroundColor: 'black',
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
    defaultValueNow = 20,
    position = SplitterPosition.TRAILS,
    environment = window,
    rtl
  }: {
    type?: SplitterType;
    min?: number;
    max?: number;
    orientation?: SplitterOrientation;
    defaultValueNow?: number;
    position?: SplitterPosition;
    environment?: Window | IWindowLike;
    rtl?: boolean;
  }) => (
    <SplitterContainer
      ariaLabel="flex-pane"
      environment={environment}
      type={type}
      min={min}
      max={max}
      orientation={orientation}
      defaultValueNow={defaultValueNow}
      position={position}
      rtl={rtl}
    >
      {({ getSeparatorProps, getPrimaryPaneProps, valueNow }: IUseSplitterReturnValue) => {
        const separatorProps = getSeparatorProps({
          style: separatorStyle,
          tabIndex: 0
        });
        const { style: primaryPaneStyle, ...primaryPaneProps } = getPrimaryPaneProps({
          style: paneStyle
        });

        return (
          <div style={flexContainerStyle}>
            <div {...primaryPaneProps} style={{ ...primaryPaneStyle, flexBasis: `${valueNow}px` }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
            <div {...separatorProps} />
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
    onChange,
    environment = window
  }: {
    type?: SplitterType;
    min?: number;
    max?: number;
    orientation?: SplitterOrientation;
    valueNow: number;
    onChange?: (value: number) => void;
    environment?: Window | IWindowLike;
  }) => (
    <SplitterContainer
      environment={environment}
      ariaLabel="flex-pane"
      type={type}
      min={min}
      max={max}
      orientation={orientation}
      valueNow={valueNow}
      onChange={onChange}
      position={SplitterPosition.TRAILS}
    >
      {({
        getSeparatorProps,
        getPrimaryPaneProps,
        valueNow: paneValueNow
      }: IUseSplitterReturnValue) => {
        const separatorProps = getSeparatorProps({
          style: separatorStyle
        });
        const { style: primaryPaneStyle, ...primaryPaneProps } = getPrimaryPaneProps({
          style: paneStyle
        });

        return (
          <div style={flexContainerStyle}>
            <div
              {...primaryPaneProps}
              style={{ ...primaryPaneStyle, flexBasis: `${paneValueNow}px` }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
            <div {...separatorProps} />
          </div>
        );
      }}
    </SplitterContainer>
  );

  describe('getSeparatorProps', () => {
    it('returns correct default props', () => {
      let separatorProps;
      let primaryPaneProps;

      render(
        <SplitterContainer
          ariaLabel="flex-pane"
          type={SplitterType.VARIABLE}
          min={0}
          max={100}
          orientation={SplitterOrientation.VERTICAL}
          position={SplitterPosition.TRAILS}
        >
          {({ getSeparatorProps, getPrimaryPaneProps }: IUseSplitterReturnValue) => {
            separatorProps = getSeparatorProps();
            primaryPaneProps = getPrimaryPaneProps();

            return null;
          }}
        </SplitterContainer>
      );
      expect(primaryPaneProps).toMatchInlineSnapshot(`
        Object {
          "data-garden-container-id": "containers.splitter.primaryPane",
          "data-garden-container-version": "version",
          "id": "1",
        }
      `);
      expect(separatorProps).toMatchInlineSnapshot(`
        Object {
          "aria-controls": "1",
          "aria-label": "flex-pane",
          "aria-orientation": "vertical",
          "aria-valuemax": 100,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "data-garden-container-id": "containers.splitter.separator",
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
        ['aria-controls', '1'],
        ['aria-label', 'flex-pane'],
        ['aria-valuemin', '0'],
        ['aria-valuemax', '100'],
        ['aria-valuenow', '20'],
        ['tabindex', '0'],
        ['aria-orientation', SplitterOrientation.VERTICAL]
      ])('should applies correct accessibility %s', (attribute, value) => {
        const { getByRole } = render(<UncontrolledTestSplitter />);
        const element = getByRole('separator');

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
            const { getByRole } = render(
              <UncontrolledTestSplitter orientation={orientation} defaultValueNow={start} />
            );
            const element = getByRole('separator');

            // must mock left position for vertical and top position for horizontal for offset calculation
            element.getBoundingClientRect = () => ({
              bottom: 0,
              height: 0,
              left: start,
              right: 0,
              top: start,
              width: 0,
              x: 0,
              y: 0,
              toJSON: () => undefined
            });

            fireEvent.mouseDown(element);
            fireEvent(
              document,
              new ExtendedMouseEvent('mousemove', { [mouseAxis]: mousePosition })
            );
            fireEvent.mouseUp(document);

            expect(element).toHaveAttribute('aria-valuenow', String(end));
          }
        );
        it('should respond to mouse leave and not move if disengaged', () => {
          const { getByRole } = render(
            <UncontrolledTestSplitter
              orientation={SplitterOrientation.VERTICAL}
              defaultValueNow={20}
            />
          );
          const element = getByRole('separator');

          fireEvent.mouseDown(element);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 50 }));
          fireEvent.mouseLeave(document.body);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 70 }));

          expect(element).toHaveAttribute('aria-valuenow', '70');
        });
        it('should respond to mouse up and not move if disengaged', () => {
          const { getByRole } = render(
            <UncontrolledTestSplitter
              orientation={SplitterOrientation.VERTICAL}
              defaultValueNow={20}
            />
          );
          const element = getByRole('separator');

          fireEvent.mouseDown(element);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 50 }));
          fireEvent.mouseUp(document);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 70 }));

          expect(element).toHaveAttribute('aria-valuenow', '70');
        });
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
          const { getByRole } = render(
            <UncontrolledTestSplitter
              type={SplitterType.FIXED}
              orientation={orientation}
              defaultValueNow={start}
            />
          );
          const element = getByRole('separator');

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
            const { getByRole } = render(
              <UncontrolledTestSplitter orientation={orientation} defaultValueNow={start} />
            );
            const element = getByRole('separator');

            // must mock left position for vertical and top position for horizontal for offset calculation
            element.getBoundingClientRect = () => ({
              bottom: 0,
              height: 0,
              left: start,
              right: 0,
              top: start,
              width: 0,
              x: 0,
              y: 0,
              toJSON: () => undefined
            });

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
          const { getByRole } = render(
            <UncontrolledTestSplitter
              type={SplitterType.FIXED}
              orientation={orientation}
              defaultValueNow={start}
            />
          );
          const element = getByRole('separator');

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
          const { getByRole } = render(
            <UncontrolledTestSplitter orientation={orientation} defaultValueNow={start} />
          );
          const element = getByRole('separator');

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
          const { getByRole } = render(
            <UncontrolledTestSplitter
              type={SplitterType.FIXED}
              orientation={orientation}
              defaultValueNow={start}
            />
          );
          const element = getByRole('separator');

          fireEvent.keyDown(element, { key });

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });
    });
    describe('controlled mode', () => {
      it('should update onChange with mouse input', () => {
        const valueNowStart = 20;
        const testValues: { valueNow?: number } = {};
        const { getByRole } = render(
          React.createElement(() => {
            const [valueNow, onChange] = useState(valueNowStart);

            testValues.valueNow = valueNow;

            return (
              <ControlledTestSplitter
                orientation={SplitterOrientation.VERTICAL}
                valueNow={valueNow}
                onChange={onChange}
              />
            );
          })
        );
        const element = getByRole('separator');

        // must mock left position for vertical and top position for horizontal for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: 0,
          height: 0,
          left: valueNowStart,
          right: 0,
          top: valueNowStart,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined
        });

        fireEvent.mouseDown(element);
        fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 60 }));
        fireEvent.mouseUp(document);

        expect(testValues.valueNow).toBe(60);
        expect(element).toHaveAttribute('aria-valuenow', '60');
      });
      it('should update onChange with touch input', () => {
        const valueNowStart = 20;
        const testValues: { valueNow?: number } = {};
        const { getByRole } = render(
          React.createElement(() => {
            const [valueNow, onChange] = useState(valueNowStart);

            testValues.valueNow = valueNow;

            return (
              <ControlledTestSplitter
                orientation={SplitterOrientation.VERTICAL}
                valueNow={valueNow}
                onChange={onChange}
              />
            );
          })
        );
        const element = getByRole('separator');

        // must mock left position for vertical and top position for horizontal for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: 0,
          height: 0,
          left: valueNowStart,
          right: 0,
          top: valueNowStart,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined
        });

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
        const { getByRole } = render(
          React.createElement(() => {
            const [valueNow, onChange] = useState(20);

            testValues.valueNow = valueNow;

            return (
              <ControlledTestSplitter
                orientation={SplitterOrientation.VERTICAL}
                valueNow={valueNow}
                onChange={onChange}
              />
            );
          })
        );
        const element = getByRole('separator');

        fireEvent.keyDown(element, { key: 'Enter' });

        expect(testValues.valueNow).toBe(0);
        expect(element).toHaveAttribute('aria-valuenow', '0');
      });
      describe('when setting valueNow prop and supplying no onChange function', () => {
        it('should not change aria-valuenow with pointer input', () => {
          const valueNowStart = 20;
          const testValues: { valueNow?: number } = {};
          const { getByRole } = render(
            React.createElement(() => {
              const [valueNow] = useState(valueNowStart);

              testValues.valueNow = valueNow;

              return (
                <ControlledTestSplitter
                  orientation={SplitterOrientation.VERTICAL}
                  valueNow={valueNow}
                />
              );
            })
          );
          const element = getByRole('separator');

          // must mock left position for vertical and top position for horizontal for offset calculation
          element.getBoundingClientRect = () => ({
            bottom: 0,
            height: 0,
            left: valueNowStart,
            right: 0,
            top: valueNowStart,
            width: 0,
            x: 0,
            y: 0,
            toJSON: () => undefined
          });

          fireEvent.touchStart(element);
          fireEvent.touchMove(document, {
            targetTouches: [{ pageX: 40 }]
          });

          fireEvent.touchEnd(document);

          expect(testValues.valueNow).toBe(20);
          expect(element).toHaveAttribute('aria-valuenow', '20');
        });
      });
    });
  });
  describe('normalizePointerToSeparator', () => {
    // must write a manual test for the normalize function in order factor the undefined case for separator element ref
    // e.g. separatorRef.current?.offsetHeight
    it('should accept undefined for separatorHeightOrWidth', () => {
      expect(normalizePointerToSeparator(0, 50, undefined, 100)).toBe(50);
    });
  });
  describe('placement start mode', () => {
    // JSDom does not support clientWidth or clientHeight and we must mock it to test the inverted position calculation for placement start mode
    const environmentMock = {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      document: {
        addEventListener: document.addEventListener.bind(document),
        removeEventListener: document.removeEventListener.bind(document),
        body: {
          addEventListener: document.body.addEventListener.bind(document.body),
          removeEventListener: document.body.removeEventListener.bind(document.body),
          clientWidth: 100,
          clientHeight: 100
        }
      }
    };

    describe('mouse navigation', () => {
      it('should move vertical splitter with pointer set to 30 from 30 to 70', () => {
        const defaultValueNow = 30;
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={environmentMock}
            orientation={SplitterOrientation.VERTICAL}
            defaultValueNow={defaultValueNow}
            position={SplitterPosition.LEADS}
          />
        );
        const element = getByRole('separator');

        // must mock right position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: 0,
          height: 0,
          left: 0,
          right: environmentMock.document.body.clientWidth - defaultValueNow,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined
        });
        // FYI the width and height of the separator is effectively zero as JSDom does not support offsetHeight or offsetWidth
        // the offset calculation works just as well without a width or height supplied for the separator

        fireEvent.mouseDown(element);
        fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 30 }));
        fireEvent.mouseUp(document);

        expect(element).toHaveAttribute('aria-valuenow', '70');
      });
      it('should move horizontal splitter with pointer set to 40 from 30 to 60', () => {
        const defaultValueNow = 30;
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={environmentMock}
            orientation={SplitterOrientation.HORIZONTAL}
            defaultValueNow={defaultValueNow}
            position={SplitterPosition.LEADS}
          />
        );
        const element = getByRole('separator');

        // must mock bottom position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: environmentMock.document.body.clientHeight - defaultValueNow,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined
        });
        // FYI the width and height of the separator is effectively zero as JSDom does not support offsetHeight or offsetWidth
        // the offset calculation works just as well without a width or height supplied for the separator

        fireEvent.mouseDown(element);
        fireEvent(document, new ExtendedMouseEvent('mousemove', { pageY: 40 }));
        fireEvent.mouseUp(document);

        expect(element).toHaveAttribute('aria-valuenow', '60');
      });
      describe('rtl', () => {
        it('should move vertical splitter with pointer set to 30 from 70 to 30', () => {
          const defaultValueNow = 30;
          const { getByRole } = render(
            <UncontrolledTestSplitter
              environment={environmentMock}
              orientation={SplitterOrientation.VERTICAL}
              defaultValueNow={defaultValueNow}
              position={SplitterPosition.LEADS}
              rtl
            />
          );
          const element = getByRole('separator');
  
          // must mock right position for offset calculation
          element.getBoundingClientRect = () => ({
            bottom: 0,
            height: 0,
            left:  defaultValueNow,
            right: environmentMock.document.body.clientWidth - defaultValueNow,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON: () => undefined
          });
          // FYI the width and height of the separator is effectively zero as JSDom does not support offsetHeight or offsetWidth
          // the offset calculation works just as well without a width or height supplied for the separator
  
          fireEvent.mouseDown(element);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 30 }));
          fireEvent.mouseUp(document);
  
          expect(element).toHaveAttribute('aria-valuenow', '30');
        });
      })
    });
    describe('touch navigation', () => {
      it('should move vertical splitter with pointer set to 30 from 30 to 70', () => {
        const defaultValueNow = 30;
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={environmentMock}
            orientation={SplitterOrientation.VERTICAL}
            defaultValueNow={defaultValueNow}
            position={SplitterPosition.LEADS}
          />
        );
        const element = getByRole('separator');

        // must mock right position for vertical position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: 0,
          height: 0,
          left: 0,
          right: environmentMock.document.body.clientWidth - defaultValueNow,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined
        });
        // FYI the width and height of the separator is effectively zero as JSDom does not support offsetHeight or offsetWidth
        // the offset calculation works just as well without a width or height supplied for the separator

        fireEvent.touchStart(element);
        fireEvent.touchMove(document, {
          targetTouches: [{ pageX: 30 }]
        });
        fireEvent.touchEnd(document);

        expect(element).toHaveAttribute('aria-valuenow', '70');
      });
      it('should move horizontal splitter with pointer set to 40 from 30 to 60', () => {
        const defaultValueNow = 30;
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={environmentMock}
            orientation={SplitterOrientation.HORIZONTAL}
            defaultValueNow={defaultValueNow}
            position={SplitterPosition.LEADS}
          />
        );
        const element = getByRole('separator');

        // must mock bottom position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: environmentMock.document.body.clientHeight - defaultValueNow,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined
        });
        // FYI the width and height of the separator is effectively zero as JSDom does not support offsetHeight or offsetWidth
        // the offset calculation works just as well without a width or height supplied for the separator

        fireEvent.touchStart(element);
        fireEvent.touchMove(document, {
          targetTouches: [{ pageY: 40 }]
        });
        fireEvent.touchEnd(document);

        expect(element).toHaveAttribute('aria-valuenow', '60');
      });
      describe('rtl', () => {
        it('should move vertical splitter with pointer set to 30 from 70 to 30', () => {
          const defaultValueNow = 30;
          const { getByRole } = render(
            <UncontrolledTestSplitter
              environment={environmentMock}
              orientation={SplitterOrientation.VERTICAL}
              defaultValueNow={defaultValueNow}
              position={SplitterPosition.LEADS}
              rtl
            />
          );
          const element = getByRole('separator');
  
          // must mock right position for vertical position for offset calculation
          element.getBoundingClientRect = () => ({
            bottom: 0,
            height: 0,
            left: defaultValueNow,
            right: environmentMock.document.body.clientWidth - defaultValueNow,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON: () => undefined
          });
          // FYI the width and height of the separator is effectively zero as JSDom does not support offsetHeight or offsetWidth
          // the offset calculation works just as well without a width or height supplied for the separator
  
          fireEvent.touchStart(element);
          fireEvent.touchMove(document, {
            targetTouches: [{ pageX: 30 }]
          });
          fireEvent.touchEnd(document);
  
          expect(element).toHaveAttribute('aria-valuenow', '30');
        });
      })
    });
    describe('keyboard navigation', () => {
      it('should increase vertical splitter when arrow left is pressed from 30 to 80', () => {
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={environmentMock}
            orientation={SplitterOrientation.VERTICAL}
            defaultValueNow={30}
            position={SplitterPosition.LEADS}
          />
        );
        const element = getByRole('separator');

        fireEvent.keyDown(element, { key: 'ArrowLeft' });

        expect(element).toHaveAttribute('aria-valuenow', '80');
      });
      describe('rtl', () => {
        it('should decrease vertical splitter when arrow right is pressed from 30 to 80', () => {
          const { getByRole } = render(
            <UncontrolledTestSplitter
              environment={environmentMock}
              orientation={SplitterOrientation.VERTICAL}
              defaultValueNow={30}
              position={SplitterPosition.LEADS}
              
            />
          );
          const element = getByRole('separator');
  
          fireEvent.keyDown(element, { key: 'ArrowRight' });
  
          expect(element).toHaveAttribute('aria-valuenow', '80');
        });
      });
    });
  });
});
