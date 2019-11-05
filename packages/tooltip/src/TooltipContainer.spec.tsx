/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { TooltipContainer, ITooltipContainerProps } from './TooltipContainer';

jest.useFakeTimers();

describe('TooltipContainer', () => {
  const TOOLTIP_ID = 'test';

  const BasicExample = (props: ITooltipContainerProps) => {
    return (
      <TooltipContainer id={TOOLTIP_ID} {...props}>
        {({ getTooltipProps, getTriggerProps }) => (
          <>
            <div {...getTriggerProps({ 'data-test-id': 'trigger' })}>trigger</div>
            <div
              {...getTooltipProps({
                'data-test-id': 'tooltip'
              })}
            >
              tooltip
            </div>
          </>
        )}
      </TooltipContainer>
    );
  };

  beforeEach(() => {
    (clearTimeout as jest.Mock).mockClear();
  });

  it('defaults visibility state with isVisible prop', () => {
    const { getByTestId } = render(<BasicExample isVisible={true} />);

    expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'false');
  });

  describe('getTriggerProps', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(<BasicExample />);
      const trigger = getByTestId('trigger');

      expect(trigger).toHaveAttribute('tabIndex', '0');
      expect(trigger).toHaveAttribute('aria-describedby', TOOLTIP_ID);
    });

    describe('onFocus()', () => {
      it('should not display tooltip immediately when focused', () => {
        const { getByTestId } = render(<BasicExample />);

        fireEvent.focus(getByTestId('trigger'));

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should display tooltip after delay when focused', () => {
        const { getByTestId } = render(<BasicExample />);

        fireEvent.focus(getByTestId('trigger'));
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });
    });

    describe('onBlur()', () => {
      it('should close tooltip immediately after blur', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.focus(trigger);
        fireEvent.blur(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('onMouseEnter()', () => {
      it('should not display tooltip immediately when clicked', () => {
        const { getByTestId } = render(<BasicExample />);

        fireEvent.mouseEnter(getByTestId('trigger'));

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should display tooltip after delay when clicked', () => {
        const { getByTestId } = render(<BasicExample />);

        fireEvent.mouseEnter(getByTestId('trigger'));
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });

      it('should clear open timeout if unmounted during interval', () => {
        const { getByTestId, unmount } = render(<BasicExample />);

        fireEvent.mouseEnter(getByTestId('trigger'));

        unmount();
        // 3 total clearTimeouts occur during this action
        expect(clearTimeout).toHaveBeenCalledTimes(3);
      });
    });

    describe('onMouseLeave()', () => {
      it('should not hide tooltip immediately when mouseleaved', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');
        const tooltip = getByTestId('tooltip');

        fireEvent.mouseEnter(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(tooltip).toHaveAttribute('aria-hidden', 'false');

        fireEvent.mouseLeave(trigger);

        expect(tooltip).toHaveAttribute('aria-hidden', 'false');
      });

      it('should hide tooltip after delay when mouseleaved', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('onKeyDown()', () => {
      it('should hide tooltip when escape is pressed', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.focus(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        fireEvent.keyDown(trigger, { keyCode: 27 });
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should not hide tooltip if escape is not pressed', () => {
        const { getByTestId } = render(<BasicExample />);
        const trigger = getByTestId('trigger');

        fireEvent.focus(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        fireEvent.keyDown(trigger, { keyCode: 31 });
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });

  describe('getTooltipProps', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(<BasicExample />);
      const tooltip = getByTestId('tooltip');

      expect(tooltip).toHaveAttribute('role', 'tooltip');
      expect(tooltip).toHaveAttribute('aria-hidden', 'true');
      expect(tooltip).toHaveAttribute('id', TOOLTIP_ID);
    });

    it('should not close tooltip if mouseenter during close delay period', () => {
      const { getByTestId } = render(<BasicExample />);
      const trigger = getByTestId('trigger');

      fireEvent.mouseEnter(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      fireEvent.mouseLeave(trigger);
      fireEvent.mouseEnter(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should close tooltip if mouseleaveed', () => {
      const { getByTestId } = render(<BasicExample />);
      const trigger = getByTestId('trigger');

      fireEvent.mouseEnter(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      fireEvent.mouseEnter(trigger);
      fireEvent.mouseLeave(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByTestId('tooltip')).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
