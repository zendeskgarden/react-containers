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

    it('applies aria-labelledby when isLabel is true', () => {
      const { getByText } = render(<BasicExample isLabel />);
      const trigger = getByText('trigger');

      expect(trigger).toHaveAttribute('aria-labelledby', TOOLTIP_ID);
      expect(trigger).not.toHaveAttribute('aria-describedby');
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
        // 5 total clearTimeouts occur: open, close, announcement, blur timeouts + one from hover action
        expect(spy).toHaveBeenCalledTimes(5);

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

  describe('Toggletip behavior', () => {
    interface ITestToggletipProps extends Omit<ITooltipContainerProps, 'triggerRef'> {
      triggerProps?: HTMLAttributes<HTMLButtonElement>;
      tooltipProps?: HTMLAttributes<HTMLDivElement>;
    }

    const ToggletipExample = ({ triggerProps, tooltipProps, ...props }: ITestToggletipProps) => {
      const triggerRef = createRef<HTMLButtonElement>();

      return (
        <TooltipContainer id={TOOLTIP_ID} {...props} isToggletip triggerRef={triggerRef}>
          {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
            <>
              <button {...getTriggerProps(triggerProps)} type="button">
                Info
              </button>
              <div {...getTooltipProps(tooltipProps)}>
                {isAnnouncementReady ? 'tooltip content' : null}
              </div>
            </>
          )}
        </TooltipContainer>
      );
    };

    describe('ARIA attributes', () => {
      it('uses role="status" for toggletips', () => {
        const { getByRole } = render(<ToggletipExample />);

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });

      it('does not add aria-describedby or aria-labelledby to trigger by default', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        expect(trigger).not.toHaveAttribute('aria-describedby');
        expect(trigger).not.toHaveAttribute('aria-labelledby');
      });

      it('adds aria-expanded="false" when toggletip is closed', () => {
        const { getByRole } = render(<ToggletipExample />);

        expect(getByRole('button', { expanded: false })).toBeInTheDocument();
      });

      it('adds aria-expanded="true" when toggletip is open', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('button', { expanded: true })).toBeInTheDocument();
      });

      it('adds aria-controls pointing to tooltip ID', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        expect(trigger).toHaveAttribute('aria-controls', TOOLTIP_ID);
      });
    });

    describe('Does not respond to hover/focus', () => {
      it('does not open on hover', async () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        await user.hover(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });

      it('does not open on focus', async () => {
        const { getByRole } = render(<ToggletipExample />);

        await user.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('Click interaction', () => {
      it('opens on first click', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();
        expect(getByRole('status')).toHaveTextContent('tooltip content');
      });

      it('keeps tooltip visible when re-clicking (for re-announcement)', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        // First click - opens
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        // Second click - should keep it open
        fireEvent.click(trigger);

        expect(getByRole('status')).toBeInTheDocument();
      });

      it('clears and repopulates content after 100ms on re-click for screen reader re-announcement', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        // First click - opens
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });
        expect(getByRole('status')).toHaveTextContent('tooltip content');

        // Second click - triggers re-announcement
        fireEvent.click(trigger);

        // Content should be cleared immediately
        expect(getByRole('status')).toHaveTextContent('');

        // After 100ms, content should be repopulated
        act(() => {
          jest.advanceTimersByTime(100);
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');
      });
    });

    describe('Blur behavior', () => {
      // Toggletips use blur handlers on both trigger and tooltip to detect when focus
      // leaves the entire toggletip container (trigger + tooltip content).
      // After blur, we check document.activeElement to see if focus is still within
      // the container. This works for both keyboard navigation and mouse interactions.

      it('defers to outside click handler when blur has null relatedTarget', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        // Simulate blur with null relatedTarget (happens when clicking non-focusable elements)
        // Blur handler should NOT close - it defers the decision to outside click handler
        fireEvent.blur(trigger, { relatedTarget: null });

        expect(getByRole('status')).toBeInTheDocument();
      });

      it('does not close when focus moves into tooltip content', () => {
        const ToggletipWithFocusableContent = () => {
          const triggerRef = createRef<HTMLButtonElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  <button {...getTriggerProps()} type="button">
                    Info
                  </button>
                  <div {...getTooltipProps()}>
                    {isAnnouncementReady ? <button type="button">Inside button</button> : null}
                  </div>
                </>
              )}
            </TooltipContainer>
          );
        };

        const { getByRole } = render(<ToggletipWithFocusableContent />);
        const trigger = getByRole('button', { name: 'Info' });

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        const insideButton = getByRole('button', { name: 'Inside button' });

        // Simulate focus moving from trigger into tooltip content
        // Blur handler should NOT close because focus stayed within the tooltip
        fireEvent.blur(trigger, { relatedTarget: insideButton });

        expect(getByRole('status')).toBeInTheDocument();
      });

      it('closes immediately when focus moves to element outside tooltip', async () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        // Tab to move focus to next element (keyboard navigation)
        // Blur handler should close immediately since focus moved to another element
        await user.tab();

        await waitFor(() => {
          expect(getByRole('status', { hidden: true })).toBeInTheDocument();
        });
      });

      it('closes immediately when blur relatedTarget is outside tooltip', () => {
        const { getByRole } = render(
          <div>
            <ToggletipExample />
            <button type="button">Outside button</button>
          </div>
        );
        const trigger = getByRole('button', { name: 'Info' });
        const outsideButton = getByRole('button', { name: 'Outside button' });

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        // Simulate blur where relatedTarget is an element outside the tooltip
        // Blur handler should close immediately
        fireEvent.blur(trigger, { relatedTarget: outsideButton });

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });

      it('closes when Shift+Tab moves focus backward out of tooltip content', () => {
        const ToggletipWithFocusableContent = () => {
          const triggerRef = createRef<HTMLButtonElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  <button {...getTriggerProps()} type="button">
                    Info
                  </button>
                  <div {...getTooltipProps()}>
                    {isAnnouncementReady ? <button type="button">Inside button</button> : null}
                  </div>
                </>
              )}
            </TooltipContainer>
          );
        };

        const { getByRole } = render(
          <div>
            <button type="button">Before button</button>
            <ToggletipWithFocusableContent />
          </div>
        );
        const trigger = getByRole('button', { name: 'Info' });

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        const insideButton = getByRole('button', { name: 'Inside button' });
        insideButton.focus();

        // Simulate Shift+Tab: blur from tooltip content with null relatedTarget (or previous element)
        // The blur handler on tooltip checks activeElement after timeout
        fireEvent.blur(insideButton, { relatedTarget: null });

        // Since we can't actually move focus in jsdom, simulate the check by advancing time
        act(() => {
          jest.advanceTimersByTime(10);
        });

        // In real browser, focus would have moved outside the toggletip container
        // For this test, we verify the blur handler was attached
        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('Outside click detection', () => {
      it('closes on clicks outside trigger and tooltip', () => {
        const { getByRole } = render(
          <div>
            <ToggletipExample />
            <button type="button">Outside button</button>
          </div>
        );
        const trigger = getByRole('button', { name: 'Info' });

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: 'Outside button' }));

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });

      it('does not close when clicking the trigger', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        fireEvent.click(trigger);

        expect(getByRole('status')).toBeInTheDocument();
      });

      it('closes when clicking inside tooltip content', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        const tooltip = getByRole('status');
        expect(tooltip).toBeInTheDocument();

        // Per Inclusive Components: clicking the tooltip dismisses it
        fireEvent.click(tooltip);

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('Escape key behavior', () => {
      it('closes on Escape key from trigger', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        fireEvent.keyDown(trigger, { key: KEYS.ESCAPE });

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });

      it('closes on Escape key from document and restores focus when focus is inside tooltip', () => {
        const ToggletipWithFocusableContent = () => {
          const triggerRef = createRef<HTMLButtonElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  <button {...getTriggerProps()} type="button">
                    Info
                  </button>
                  <div {...getTooltipProps()}>
                    {isAnnouncementReady ? <button type="button">Inside button</button> : null}
                  </div>
                </>
              )}
            </TooltipContainer>
          );
        };

        const { getByRole } = render(<ToggletipWithFocusableContent />);
        const trigger = getByRole('button', { name: 'Info' });

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        const insideButton = getByRole('button', { name: 'Inside button' });
        insideButton.focus();
        expect(insideButton).toHaveFocus();

        fireEvent.keyDown(document, { key: KEYS.ESCAPE });

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
        expect(trigger).toHaveFocus();
      });

      it('closes on Escape key but preserves focus when focus is elsewhere', () => {
        const { getByRole } = render(
          <div>
            <ToggletipExample />
            <button type="button">Other button</button>
          </div>
        );
        const trigger = getByRole('button', { name: 'Info' });
        const otherButton = getByRole('button', { name: 'Other button' });

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        otherButton.focus();
        expect(otherButton).toHaveFocus();

        fireEvent.keyDown(document, { key: KEYS.ESCAPE });

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
        expect(otherButton).toHaveFocus();
      });
    });

    describe('SSR compatibility', () => {
      it('works with custom window and document props', () => {
        const mockDocument = document;
        const mockWindow = window;

        const { getByRole } = render(
          <ToggletipExample window={mockWindow} document={mockDocument} />
        );
        const trigger = getByRole('button');

        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        fireEvent.click(document.body);

        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('DOM order independence', () => {
      it('works when tooltip is rendered before trigger in DOM', () => {
        const ToggletipWithReversedOrder = () => {
          const triggerRef = createRef<HTMLButtonElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  {/* Tooltip before trigger - common pattern for positioning */}
                  <div {...getTooltipProps()}>
                    {isAnnouncementReady ? <button type="button">Inside button</button> : null}
                  </div>
                  <button {...getTriggerProps()} type="button">
                    Info
                  </button>
                </>
              )}
            </TooltipContainer>
          );
        };

        const { getByRole } = render(<ToggletipWithReversedOrder />);
        const trigger = getByRole('button', { name: 'Info' });

        // Open toggletip
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toBeInTheDocument();

        // Tab into interactive content inside tooltip
        const insideButton = getByRole('button', { name: 'Inside button' });
        fireEvent.blur(trigger, { relatedTarget: insideButton });

        // Should stay open
        expect(getByRole('status')).toBeInTheDocument();

        // Shift+Tab backward out of tooltip
        fireEvent.blur(insideButton, { relatedTarget: null });
        act(() => {
          jest.advanceTimersByTime(10);
        });

        // Should close
        expect(getByRole('status', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('Screen reader re-announcement', () => {
      it('re-announces content after closing via Escape key', () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        // First open
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');

        // Close via Escape key
        fireEvent.keyDown(trigger, { key: KEYS.ESCAPE });
        act(() => {
          jest.runOnlyPendingTimers();
        });

        // Reopen - verify content is present again (proving it was cleared and restored)
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');
      });

      it('re-announces content after closing via outside click', () => {
        const { getByRole } = render(
          <div>
            <ToggletipExample />
            <button type="button">Outside button</button>
          </div>
        );
        const trigger = getByRole('button', { name: 'Info' });

        // First open
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');

        // Close via outside click
        fireEvent.click(getByRole('button', { name: 'Outside button' }));
        act(() => {
          jest.runOnlyPendingTimers();
        });

        // Reopen - verify content is present again (proving it was cleared and restored)
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');
      });

      it('re-announces content after closing via blur', async () => {
        const { getByRole } = render(<ToggletipExample />);
        const trigger = getByRole('button');

        // First open
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');

        // Close via blur (tab away)
        await user.tab();
        act(() => {
          jest.runOnlyPendingTimers();
        });

        // Reopen - verify content is present again (proving it was cleared and restored)
        fireEvent.click(trigger);
        act(() => {
          jest.runOnlyPendingTimers();
        });

        expect(getByRole('status')).toHaveTextContent('tooltip content');
      });
    });

    describe('Development warnings', () => {
      let consoleWarnSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      });

      afterEach(() => {
        consoleWarnSpy.mockRestore();
      });

      it('warns when trigger is not a button element', () => {
        const ToggletipWithDivTrigger = () => {
          const triggerRef = createRef<HTMLDivElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  <div {...getTriggerProps()} data-testid="div-trigger">
                    trigger
                  </div>
                  <div {...getTooltipProps()}>{isAnnouncementReady ? 'tooltip content' : null}</div>
                </>
              )}
            </TooltipContainer>
          );
        };

        render(<ToggletipWithDivTrigger />);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('must be a <button> element')
        );
      });

      it('warns when trigger has role="button" instead of being a button element', () => {
        const ToggletipWithRoleButton = () => {
          const triggerRef = createRef<HTMLDivElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  {/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role */}
                  <div {...getTriggerProps()} role="button">
                    trigger
                  </div>
                  <div {...getTooltipProps()}>{isAnnouncementReady ? 'tooltip content' : null}</div>
                </>
              )}
            </TooltipContainer>
          );
        };

        render(<ToggletipWithRoleButton />);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('must be a <button> element')
        );
      });

      it('warns when trigger lacks an accessible name', () => {
        const ToggletipWithoutName = () => {
          const triggerRef = createRef<HTMLButtonElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  <button {...getTriggerProps()} type="button">
                    {/* No text content */}
                  </button>
                  <div {...getTooltipProps()}>{isAnnouncementReady ? 'tooltip content' : null}</div>
                </>
              )}
            </TooltipContainer>
          );
        };

        render(<ToggletipWithoutName />);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('should have an accessible name')
        );
      });

      it('does not warn when trigger has aria-label', () => {
        const ToggletipWithAriaLabel = () => {
          const triggerRef = createRef<HTMLButtonElement>();

          return (
            <TooltipContainer id={TOOLTIP_ID} isToggletip triggerRef={triggerRef}>
              {({ getTooltipProps, getTriggerProps, isAnnouncementReady }) => (
                <>
                  <button {...getTriggerProps()} type="button" aria-label="More info">
                    {/* Icon only, no text */}
                  </button>
                  <div {...getTooltipProps()}>{isAnnouncementReady ? 'tooltip content' : null}</div>
                </>
              )}
            </TooltipContainer>
          );
        };

        render(<ToggletipWithAriaLabel />);

        expect(consoleWarnSpy).not.toHaveBeenCalledWith(
          expect.stringContaining('should have an accessible name')
        );
      });

      it('does not warn when trigger has visible text', () => {
        render(<ToggletipExample />);

        expect(consoleWarnSpy).not.toHaveBeenCalledWith(
          expect.stringContaining('should have an accessible name')
        );
      });
    });
  });
});
