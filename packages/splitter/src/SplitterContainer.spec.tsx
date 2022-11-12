/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IUseSplitterProps, IUseSplitterReturnValue } from './types';
import { SplitterContainer } from './';
import { KEYBOARD_STEP } from './useSplitter';
import userEvent from '@testing-library/user-event';

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
  const user = userEvent.setup();

  const UncontrolledTestSplitter = ({
    min = 0,
    max = 100,
    defaultValueNow = 20,
    ...props
  }: Partial<IUseSplitterProps>) => {
    const separatorRef = createRef<HTMLDivElement>();

    return (
      <SplitterContainer
        min={min}
        max={max}
        defaultValueNow={defaultValueNow}
        separatorRef={separatorRef}
        {...props}
      >
        {({ getSeparatorProps, getPrimaryPaneProps, valueNow }: IUseSplitterReturnValue) => {
          const separatorProps = getSeparatorProps<HTMLDivElement>({
            'aria-label': 'flex-pane',
            style: separatorStyle,
            tabIndex: 0
          });
          const { style: primaryPaneStyle, ...primaryPaneProps } =
            getPrimaryPaneProps<HTMLDivElement>({
              style: paneStyle
            });

          return (
            <div style={flexContainerStyle}>
              <div
                {...primaryPaneProps}
                style={{ ...primaryPaneStyle, flexBasis: `${valueNow}px` }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </div>
              <div {...separatorProps} ref={separatorRef} />
            </div>
          );
        }}
      </SplitterContainer>
    );
  };

  const ControlledTestSplitter = ({ min = 0, max = 100, ...props }: Partial<IUseSplitterProps>) => {
    const separatorRef = createRef<HTMLDivElement>();

    return (
      <SplitterContainer min={min} max={max} separatorRef={separatorRef} {...props}>
        {({
          getSeparatorProps,
          getPrimaryPaneProps,
          valueNow: paneValueNow
        }: IUseSplitterReturnValue) => {
          const separatorProps = getSeparatorProps<HTMLDivElement>({
            'aria-label': 'flex-pane',
            style: separatorStyle
          });
          const { style: primaryPaneStyle, ...primaryPaneProps } =
            getPrimaryPaneProps<HTMLDivElement>({
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
              <div {...separatorProps} ref={separatorRef} />
            </div>
          );
        }}
      </SplitterContainer>
    );
  };

  describe('getSeparatorProps', () => {
    it('returns correct default props', () => {
      let separatorProps;
      let primaryPaneProps;

      render(
        <SplitterContainer idPrefix="1" min={0} max={100} separatorRef={createRef()}>
          {({ getSeparatorProps, getPrimaryPaneProps }: IUseSplitterReturnValue) => {
            separatorProps = getSeparatorProps({ 'aria-label': 'flex-pane' });
            primaryPaneProps = getPrimaryPaneProps();

            return null;
          }}
        </SplitterContainer>
      );
      expect(primaryPaneProps).toMatchInlineSnapshot(`
        {
          "data-garden-container-id": "containers.splitter.primaryPane",
          "data-garden-container-version": "version",
          "id": "1--primary-pane",
        }
      `);
      expect(separatorProps).toMatchInlineSnapshot(`
        {
          "aria-controls": "1--primary-pane",
          "aria-label": "flex-pane",
          "aria-orientation": "vertical",
          "aria-valuemax": 100,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "data-garden-container-id": "containers.splitter.separator",
          "data-garden-container-version": "version",
          "onClick": [Function],
          "onKeyDown": [Function],
          "onMouseDown": [Function],
          "onTouchStart": [Function],
          "role": "separator",
          "tabIndex": 0,
        }
      `);
    });

    describe('accessibility attributes', () => {
      type AccessibilityAttributes = [string, string];
      it.each<AccessibilityAttributes>([
        ['role', 'separator'],
        ['aria-controls', '1--primary-pane'],
        ['aria-label', 'flex-pane'],
        ['aria-valuemin', '0'],
        ['aria-valuemax', '100'],
        ['aria-valuenow', '20'],
        ['tabindex', '0'],
        ['aria-orientation', 'vertical']
      ])('should applies correct accessibility %s', (attribute, value) => {
        const { getByRole } = render(<UncontrolledTestSplitter idPrefix="1" />);
        const element = getByRole('separator');

        expect(element).toHaveAttribute(attribute, value);
      });
    });

    describe('mouse', () => {
      describe('variable mode', () => {
        type MouseDownMatrix = [
          IUseSplitterProps['orientation'],
          'pageX' | 'pageY',
          number,
          number,
          number
        ];
        it.each<MouseDownMatrix>([
          ['vertical', 'pageX', 30, 20, 30],
          ['vertical', 'pageX', 101, 20, 100],
          ['vertical', 'pageX', -21, 20, 0],
          ['horizontal', 'pageY', 70, 20, 70],
          ['horizontal', 'pageY', 101, 20, 100],
          ['horizontal', 'pageY', -21, 20, 0]
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

        it('should respond to mouse leave by continuing to move', () => {
          const { getByRole } = render(<UncontrolledTestSplitter defaultValueNow={20} />);
          const element = getByRole('separator');

          fireEvent.mouseDown(element);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 50 }));
          fireEvent.mouseLeave(document.body);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 70 }));

          expect(element).toHaveAttribute('aria-valuenow', '90');
        });

        it('should respond to mouse up and not move if disengaged', () => {
          const { getByRole } = render(<UncontrolledTestSplitter defaultValueNow={20} />);
          const element = getByRole('separator');

          fireEvent.mouseDown(element);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 50 }));
          fireEvent.mouseUp(document);
          fireEvent(document, new ExtendedMouseEvent('mousemove', { pageX: 70 }));

          expect(element).toHaveAttribute('aria-valuenow', '70');
        });
      });

      it('should return from min to previous position on double click', async () => {
        const { getByRole } = render(<UncontrolledTestSplitter defaultValueNow={50} />);
        const element = getByRole('separator');

        await user.dblClick(element);
        await user.dblClick(element);

        expect(element).toHaveAttribute('aria-valuenow', '50');
      });

      describe('fixed', () => {
        type MouseDownMatrix = [IUseSplitterProps['orientation'], number, number];
        it.each<MouseDownMatrix>([
          ['vertical', 20, 0],
          ['vertical', 0, 100],
          ['vertical', 100, 0],
          ['horizontal', 20, 0],
          ['horizontal', 0, 100],
          ['horizontal', 100, 0]
        ])('should move %s splitter using mouse down from %i to %i', (orientation, start, end) => {
          const { getByRole } = render(
            <UncontrolledTestSplitter isFixed orientation={orientation} defaultValueNow={start} />
          );
          const element = getByRole('separator');

          fireEvent.click(element);

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });
    });

    describe('touch', () => {
      describe('variable mode', () => {
        type TouchMatrix = [
          IUseSplitterProps['orientation'],
          'pageX' | 'pageY',
          number,
          number,
          number
        ];
        it.each<TouchMatrix>([
          ['vertical', 'pageX', 50, 20, 50],
          ['vertical', 'pageX', 101, 20, 100],
          ['vertical', 'pageX', -21, 20, 0],
          ['horizontal', 'pageY', 70, 20, 70],
          ['horizontal', 'pageY', 101, 20, 100],
          ['horizontal', 'pageY', -21, 20, 0]
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
        type TouchMatrix = [IUseSplitterProps['orientation'], number, number];
        it.each<TouchMatrix>([
          ['vertical', 20, 0],
          ['vertical', 0, 100],
          ['vertical', 100, 0],
          ['horizontal', 20, 0],
          ['horizontal', 0, 100],
          ['horizontal', 100, 0]
        ])('should move %s splitter using touch from %i to %i', (orientation, start, end) => {
          const { getByRole } = render(
            <UncontrolledTestSplitter isFixed orientation={orientation} defaultValueNow={start} />
          );
          const element = getByRole('separator');

          fireEvent.click(element);

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });
    });

    describe('keyboard', () => {
      type KeyDownMatrix = [IUseSplitterProps['orientation'], string, number, number];

      describe('variable mode', () => {
        it.each<KeyDownMatrix>([
          ['vertical', 'ArrowRight', 20, 20 + KEYBOARD_STEP],
          ['vertical', 'ArrowLeft', 70, 70 - KEYBOARD_STEP],
          ['vertical', 'Enter', 20, 0],
          ['vertical', 'Enter', 0, 100],
          ['vertical', 'Home', 100, 0],
          ['vertical', 'End', 0, 100],
          ['horizontal', 'ArrowUp', 70, 70 - KEYBOARD_STEP],
          ['horizontal', 'ArrowDown', 20, 20 + KEYBOARD_STEP],
          ['horizontal', 'Enter', 20, 0],
          ['horizontal', 'Enter', 0, 100],
          ['horizontal', 'Home', 100, 0],
          ['horizontal', 'End', 0, 100]
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
          ['vertical', 'Enter', 20, 0],
          ['vertical', 'Enter', 0, 100],
          ['vertical', 'Home', 100, 0],
          ['vertical', 'End', 0, 100],
          ['horizontal', 'Enter', 20, 0],
          ['horizontal', 'Enter', 0, 100],
          ['horizontal', 'Home', 100, 0],
          ['horizontal', 'End', 0, 100]
        ])('should move %s splitter using %s from %i to %i', (orientation, key, start, end) => {
          const { getByRole } = render(
            <UncontrolledTestSplitter isFixed orientation={orientation} defaultValueNow={start} />
          );
          const element = getByRole('separator');

          fireEvent.keyDown(element, { key });

          expect(element).toHaveAttribute('aria-valuenow', String(end));
        });
      });

      it('should return from min to previous position on <enter>', () => {
        const { getByRole } = render(<UncontrolledTestSplitter defaultValueNow={50} />);
        const element = getByRole('separator');

        fireEvent.keyDown(element, { key: 'Enter' });
        fireEvent.keyDown(element, { key: 'Enter' });

        expect(element).toHaveAttribute('aria-valuenow', '50');
      });

      it('should return from <home> to previous position on <enter>', () => {
        const { getByRole } = render(<UncontrolledTestSplitter defaultValueNow={50} />);
        const element = getByRole('separator');

        fireEvent.keyDown(element, { key: 'Home' });
        fireEvent.keyDown(element, { key: 'Enter' });

        expect(element).toHaveAttribute('aria-valuenow', '50');
      });
    });

    describe('controlled mode', () => {
      it('should update onChange with mouse input', () => {
        const valueNowStart = 20;
        const testValues: { valueNow?: number } = {};
        const { getByRole } = render(
          React.createElement(() => {
            const [valueNow, setValueNow] = useState(valueNowStart);

            testValues.valueNow = valueNow;

            return <ControlledTestSplitter valueNow={valueNow} onChange={setValueNow} />;
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
            const [valueNow, setValueNow] = useState(valueNowStart);

            testValues.valueNow = valueNow;

            return <ControlledTestSplitter valueNow={valueNow} onChange={setValueNow} />;
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
            const [valueNow, setValueNow] = useState(20);

            testValues.valueNow = valueNow;

            return <ControlledTestSplitter valueNow={valueNow} onChange={setValueNow} />;
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
              testValues.valueNow = valueNowStart;

              return <ControlledTestSplitter valueNow={testValues.valueNow} />;
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

  describe('position leads mode', () => {
    // JSDom does not support clientWidth or clientHeight and we must mock it to test the inverted position calculation for position leads mode
    const documentMockObject = {
      addEventListener: document.addEventListener.bind(document),
      removeEventListener: document.removeEventListener.bind(document),
      body: {
        addEventListener: document.body.addEventListener.bind(document.body),
        removeEventListener: document.body.removeEventListener.bind(document.body),
        clientWidth: 100,
        clientHeight: 100
      },
      documentElement: {
        scrollLeft: 0,
        scrollTop: 0
      }
    } as Document;

    describe('mouse navigation', () => {
      it('should move vertical splitter with pointer set to 30 from 30 to 70', () => {
        const defaultValueNow = 30;
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={documentMockObject}
            defaultValueNow={defaultValueNow}
            isLeading
          />
        );
        const element = getByRole('separator');

        // must mock right position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: 0,
          height: 0,
          left: 0,
          right: documentMockObject.body.clientWidth - defaultValueNow,
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
            environment={documentMockObject}
            orientation="horizontal"
            defaultValueNow={defaultValueNow}
            isLeading
          />
        );
        const element = getByRole('separator');

        // must mock bottom position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: documentMockObject.body.clientHeight - defaultValueNow,
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
              environment={documentMockObject}
              defaultValueNow={defaultValueNow}
              isLeading
              rtl
            />
          );
          const element = getByRole('separator');

          // must mock right position for offset calculation
          element.getBoundingClientRect = () => ({
            bottom: 0,
            height: 0,
            left: defaultValueNow,
            right: documentMockObject.body.clientWidth - defaultValueNow,
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
      });
    });

    describe('touch navigation', () => {
      it('should move vertical splitter with pointer set to 30 from 30 to 70', () => {
        const defaultValueNow = 30;
        const { getByRole } = render(
          <UncontrolledTestSplitter
            environment={documentMockObject}
            defaultValueNow={defaultValueNow}
            isLeading
          />
        );
        const element = getByRole('separator');

        // must mock right position for vertical position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: 0,
          height: 0,
          left: 0,
          right: documentMockObject.body.clientWidth - defaultValueNow,
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
            environment={documentMockObject}
            orientation="horizontal"
            defaultValueNow={defaultValueNow}
            isLeading
          />
        );
        const element = getByRole('separator');

        // must mock bottom position for offset calculation
        element.getBoundingClientRect = () => ({
          bottom: documentMockObject.body.clientHeight - defaultValueNow,
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
              environment={documentMockObject}
              defaultValueNow={defaultValueNow}
              isLeading
              rtl
            />
          );
          const element = getByRole('separator');

          // must mock right position for vertical position for offset calculation
          element.getBoundingClientRect = () => ({
            bottom: 0,
            height: 0,
            left: defaultValueNow,
            right: documentMockObject.body.clientWidth - defaultValueNow,
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
      });
    });

    describe('keyboard navigation', () => {
      it(`should increase vertical splitter when arrow left is pressed from 30 to ${
        30 + KEYBOARD_STEP
      }`, () => {
        const { getByRole } = render(
          <UncontrolledTestSplitter environment={documentMockObject} defaultValueNow={30} rtl />
        );
        const element = getByRole('separator');

        fireEvent.keyDown(element, { key: 'ArrowLeft' });

        expect(element).toHaveAttribute('aria-valuenow', `${30 + KEYBOARD_STEP}`);
      });

      describe('rtl', () => {
        it(`should decrease vertical splitter when arrow right is pressed from 80 to ${
          80 - KEYBOARD_STEP
        }`, () => {
          const { getByRole } = render(
            <UncontrolledTestSplitter environment={documentMockObject} defaultValueNow={80} rtl />
          );
          const element = getByRole('separator');

          fireEvent.keyDown(element, { key: 'ArrowRight' });

          expect(element).toHaveAttribute('aria-valuenow', `${80 - KEYBOARD_STEP}`);
        });
      });
    });
  });
});
