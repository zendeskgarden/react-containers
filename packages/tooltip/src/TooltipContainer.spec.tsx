/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { KEYS } from '@zendeskgarden/container-utilities';
import { TooltipContainer, ITooltipContainerProps } from './';

jest.useFakeTimers();

describe('TooltipContainer', () => {
  const user = userEvent.setup({ delay: null });

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
