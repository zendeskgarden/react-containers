/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { act, createRef, HTMLAttributes } from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { KEYS } from '@zendeskgarden/container-utilities';
import { TooltipContainer, ITooltipContainerProps } from './';

jest.useFakeTimers();

interface ITestTooltipProps extends Omit<ITooltipContainerProps, 'triggerRef'> {
  triggerProps?: HTMLAttributes<HTMLDivElement>;
  tooltipProps?: HTMLAttributes<HTMLDivElement>;
}

describe('TooltipContainer', () => {
  const user = userEvent.setup({ delay: null });

  const TOOLTIP_ID = 'test';

  const BasicExample = ({ triggerProps, tooltipProps, ...props }: ITestTooltipProps) => {
    const triggerRef = createRef<HTMLDivElement>();

    return (
      <TooltipContainer id={TOOLTIP_ID} {...props} triggerRef={triggerRef}>
        {({ getTooltipProps, getTriggerProps }) => (
          <>
            <div {...getTriggerProps(triggerProps)}>trigger</div>
            <div {...getTooltipProps(tooltipProps)}>tooltip</div>
          </>
        )}
      </TooltipContainer>
    );
  };

  beforeAll(() => {
    const elementMatches = HTMLElement.prototype.matches;

    // Override `.matches` currently missing from JSDOM
    HTMLElement.prototype.matches = function matches(selector: string) {
      let retVal;

      if (selector === ':focus-visible') {
        retVal = this === document.activeElement;
      } else {
        retVal = elementMatches.call(this, selector);
      }

      return retVal;
    };
  });

  it('defaults visibility state with isVisible prop', () => {
    const { getByText } = render(<BasicExample isVisible />);

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
      it('should not display tooltip immediately when focused', async () => {
        const { getByText } = render(<BasicExample />);

        await user.tab();

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should display tooltip after delay when focused', async () => {
        const { getByRole } = render(<BasicExample />);

        await user.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });
    });

    describe('onBlur()', () => {
      it('should close tooltip immediately after blur', async () => {
        const { getByText, getByRole } = render(<BasicExample />);

        await user.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');

        await user.tab();

        await waitFor(() => {
          expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
        });
      });
    });

    describe('onMouseEnter()', () => {
      it('should not display tooltip immediately when clicked', async () => {
        const { getByText } = render(<BasicExample />);

        await user.hover(getByText('trigger'));

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should display tooltip after delay when clicked', async () => {
        const { getByText, getByRole } = render(<BasicExample />);

        await user.hover(getByText('trigger'));
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });

      it('should clear open timeout if unmounted during interval', async () => {
        const spy: jest.SpyInstance = jest.spyOn(window, 'clearTimeout');
        const { getByText, unmount } = render(<BasicExample />);

        await user.hover(getByText('trigger'));

        unmount();
        // 3 total clearTimeouts occur during this action
        expect(spy).toHaveBeenCalledTimes(3);

        spy.mockRestore();
      });
    });

    describe('onMouseLeave()', () => {
      it('should not hide tooltip immediately when mouseleaved', async () => {
        const { getByText, getByRole } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.hover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');

        await user.unhover(trigger);

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });

      it('should hide tooltip after delay when mouseleaved', async () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.hover(trigger);
        await user.unhover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('onKeyDown()', () => {
      it('should hide tooltip when escape is pressed', async () => {
        const { getByText } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        fireEvent.keyDown(trigger, { key: KEYS.ESCAPE });
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should not hide tooltip if escape is not pressed', async () => {
        const { getByText, getByRole } = render(<BasicExample />);
        const trigger = getByText('trigger');

        await user.tab();
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

    describe('tooltip suppression with expanded popup', () => {
      it('should not show tooltip on focus when trigger has expanded popup', async () => {
        const { getByText } = render(
          <BasicExample triggerProps={{ 'aria-haspopup': true, 'aria-expanded': true }} />
        );

        await user.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should not show tooltip on mouse enter when trigger has expanded popup', async () => {
        const { getByText } = render(
          <BasicExample triggerProps={{ 'aria-haspopup': true, 'aria-expanded': true }} />
        );

        await user.hover(getByText('trigger'));
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
      });

      it('should allow tooltip to show when popup collapses', async () => {
        const { getByText, getByRole, rerender } = render(
          <BasicExample triggerProps={{ 'aria-haspopup': true, 'aria-expanded': true }} />
        );
        const trigger = getByText('trigger');

        // Initially try to show tooltip with expanded popup - should be suppressed
        await user.hover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');

        // Collapse popup
        rerender(<BasicExample triggerProps={{ 'aria-haspopup': true, 'aria-expanded': false }} />);

        // Now try to show tooltip again
        await user.unhover(trigger);
        await user.hover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
      });

      it('should handle trigger without aria-haspopup normally', async () => {
        const { getByText, getByRole } = render(
          <BasicExample triggerProps={{ 'aria-expanded': true }} />
        );
        const trigger = getByText('trigger');

        await user.hover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        // Should show tooltip normally since aria-haspopup is not true
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

    it('should not close tooltip if mouseenter during close delay period', async () => {
      const { getByText, getByRole } = render(<BasicExample />);
      const trigger = getByText('trigger');

      await user.hover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      await user.unhover(trigger);
      await user.hover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should close tooltip if mouseleaveed', async () => {
      const { getByText, getByRole } = render(<BasicExample />);
      const trigger = getByText('trigger');

      await user.hover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false');

      await user.unhover(trigger);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(getByText('tooltip')).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
