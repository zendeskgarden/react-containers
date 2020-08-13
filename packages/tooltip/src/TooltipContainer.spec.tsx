/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { KEY_CODES } from '@zendeskgarden/container-utilities';

import { TooltipContainer, ITooltipContainerProps } from './TooltipContainer';

jest.useFakeTimers();

describe('TooltipContainer', () => {
  const TOOLTIP_ID = 'test';

  const BasicExample = (props: ITooltipContainerProps) => {
    return (
      <TooltipContainer id={TOOLTIP_ID} {...props}>
        {({ getTooltipProps, getTriggerProps }) => (
          <>
            <div {...getTriggerProps()}>trigger</div>
            <div {...getTooltipProps()}>tooltip</div>
          </>
        )}
      </TooltipContainer>
    );
  };

  beforeEach(() => {
    (clearTimeout as jest.Mock).mockClear();
  });

  it('defaults visibility state with isVisible prop', () => {
    const { getByText } = render(<BasicExample isVisible={true} />);

    expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'false');
  });

  describe('getTriggerProps', () => {
    it('applies correct accessibility attributes', () => {
      const { getByText } = render(<BasicExample />);
      const trigger = getByText('trigger');

      expect(trigger).toHaveAttribute('tabIndex', '0');
      expect(trigger).toHaveAttribute('aria-describedby', TOOLTIP_ID);
    });

    describe('onFocus()', () => {
      it('should not display tooltip immediately when focused', () => {
        const { getByText } = render(<BasicExample />);

        userEvent.tab();

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should display tooltip after delay when focused', () => {
        const { getByRole } = render(<BasicExample />);

        userEvent.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });
    });

    describe('onBlur()', () => {
      it('should close tooltip immediately after blur', () => {
        const { getByText, getByRole } = render(<BasicExample />);

        userEvent.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');

        userEvent.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('onMouseEnter()', () => {
      it('should not display tooltip immediately when clicked', () => {
        const { getByText } = render(<BasicExample />);

        userEvent.hover(getByText('trigger'));

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should display tooltip after delay when clicked', () => {
        const { getByText, getByRole } = render(<BasicExample />);

        userEvent.hover(getByText('trigger'));
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });

      it('should clear open timeout if unmounted during interval', () => {
        const { getByText, unmount } = render(<BasicExample />);

        userEvent.hover(getByText('trigger'));

        unmount();
        // 3 total clearTimeouts occur during this action
        expect(clearTimeout).toHaveBeenCalledTimes(3);
      });
    });

    describe('onMouseLeave()', () => {
      it('should not hide tooltip immediately when mouseleaved', () => {
        const { getByText, getByRole } = render(<BasicExample />);
        const trigger = getByText('trigger');

        userEvent.hover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');

        userEvent.unhover(trigger);

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });

      it('should hide tooltip after delay when mouseleaved', () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        userEvent.hover(trigger);
        userEvent.unhover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('onKeyDown()', () => {
      it('should hide tooltip when escape is pressed', () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        userEvent.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        fireEvent.keyDown(trigger, { keyCode: KEY_CODES.ESCAPE });
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should not hide tooltip if escape is not pressed', () => {
        const { getByText, getByRole } = render(<BasicExample />);
        const trigger = getByText('trigger');

        userEvent.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        fireEvent.keyDown(trigger, { keyCode: 31 });
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });

  describe('getTooltipProps', () => {
    it('applies correct accessibility attributes', () => {
      const { getByText } = render(<BasicExample />);
      const tooltip = getByText('tooltip');

      expect(tooltip).toHaveAttribute('role', 'tooltip');
      expect(tooltip).toHaveAttribute('aria-hidden', 'true');
      expect(tooltip).toHaveAttribute('id', TOOLTIP_ID);
    });

    it('should not close tooltip if mouseenter during close delay period', () => {
      const { getByText, getByRole } = render(<BasicExample />);
      const trigger = getByText('trigger');

      userEvent.hover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      userEvent.unhover(trigger);
      userEvent.hover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should close tooltip if mouseleaveed', () => {
      const { getByText, getByRole } = render(<BasicExample />);
      const trigger = getByText('trigger');

      userEvent.hover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');

      userEvent.unhover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
