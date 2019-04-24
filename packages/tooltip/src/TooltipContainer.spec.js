/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { TooltipContainer } from './TooltipContainer';

jest.useFakeTimers();

describe('TooltipContainer', () => {
  let wrapper;

  const BasicExample = props => {
    const tooltipRef = useRef(null);

    return (
      <TooltipContainer tooltipRef={tooltipRef} {...props}>
        {({ getTooltipProps, getTriggerProps }) => (
          <>
            <div {...getTriggerProps({ 'data-test-id': 'trigger' })}>trigger</div>
            <div
              {...getTooltipProps({
                'data-test-id': 'tooltip',
                ref: tooltipRef
              })}
            >
              tooltip
            </div>
          </>
        )}
      </TooltipContainer>
    );
  };

  const findTooltip = providedWrapper => {
    return providedWrapper.find('[data-test-id="tooltip"]');
  };

  const findTrigger = providedWrapper => {
    return providedWrapper.find('[data-test-id="trigger"]');
  };

  beforeEach(() => {
    clearTimeout.mockClear();

    act(() => {
      wrapper = mount(<BasicExample />);
    });
  });

  describe('getTriggerProps', () => {
    it('should have tabIndex of 0', () => {
      expect(findTrigger(wrapper)).toHaveProp('tabIndex', 0);
    });

    describe('onFocus()', () => {
      it('should not display tooltip immediately when focused', () => {
        act(() => {
          findTrigger(wrapper).simulate('focus');
        });

        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(true);
      });

      it('should display tooltip after delay when focused', () => {
        act(() => {
          findTrigger(wrapper).simulate('focus');
          jest.runOnlyPendingTimers();
        });

        wrapper.update();
        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(false);
      });
    });

    describe('onBlur()', () => {
      it('should close tooltip immediately after blur', () => {
        act(() => {
          findTrigger(wrapper).simulate('focus');
          findTrigger(wrapper).simulate('blur');

          jest.runOnlyPendingTimers();
        });

        wrapper.update();
        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(true);
      });
    });

    describe('onMouseEnter()', () => {
      it('should not display tooltip immediately when clicked', () => {
        act(() => {
          findTrigger(wrapper).simulate('mouseenter');
        });

        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(true);
      });

      it('should display tooltip after delay when clicked', () => {
        act(() => {
          findTrigger(wrapper).simulate('mouseenter');
          jest.runOnlyPendingTimers();
        });

        wrapper.update();
        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(false);
      });

      it('should clear open timeout if unmounted during interval', () => {
        act(() => {
          findTrigger(wrapper).simulate('mouseenter');
        });

        wrapper.unmount();
        // 3 total clearTimeouts occur during this action
        expect(clearTimeout).toHaveBeenCalledTimes(3);
      });
    });

    describe('onMouseLeave()', () => {
      it('should not hide tooltip immediately when mouseleaved', () => {
        act(() => {
          findTrigger(wrapper).simulate('mouseenter');
          jest.runOnlyPendingTimers();
        });

        wrapper.update();
        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(false);

        act(() => {
          findTrigger(wrapper).simulate('mouseleave');
        });

        wrapper.update();
        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(false);
      });

      it('should hide tooltip aften delay when mouseleaved', () => {
        act(() => {
          findTrigger(wrapper).simulate('mouseenter');
          findTrigger(wrapper).simulate('mouseleave');
          jest.runOnlyPendingTimers();
        });

        wrapper.update();
        expect(findTooltip(wrapper).prop('aria-hidden')).toBe(true);
      });
    });
  });

  describe('getTooltipProps', () => {
    it('should not close tooltip if mouseenter during close delay period', () => {
      act(() => {
        findTrigger(wrapper).simulate('mouseenter');
        jest.runOnlyPendingTimers();
      });

      wrapper.update();

      act(() => {
        findTrigger(wrapper).simulate('mouseleave');
        findTrigger(wrapper).simulate('mouseenter');
        jest.runOnlyPendingTimers();
      });

      wrapper.update();

      expect(findTooltip(wrapper).prop('aria-hidden')).toBe(false);
    });

    it('should close tooltip if mouseleaveed', () => {
      act(() => {
        findTrigger(wrapper).simulate('mouseenter');
        jest.runOnlyPendingTimers();
      });

      wrapper.update();

      act(() => {
        findTrigger(wrapper).simulate('mouseenter');
        findTrigger(wrapper).simulate('mouseleave');
        jest.runOnlyPendingTimers();
      });

      wrapper.update();

      expect(findTooltip(wrapper).prop('aria-hidden')).toBe(true);
    });
  });
});
