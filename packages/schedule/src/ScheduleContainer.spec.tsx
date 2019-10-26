/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, act } from '@testing-library/react';

import { ScheduleContainer, IScheduleContainerProps } from './ScheduleContainer';

jest.useFakeTimers();

describe('ScheduleContainer', () => {
  const BasicExample = (props: IScheduleContainerProps) => (
    <ScheduleContainer {...props}>
      {({ elapsed, delayMS, delayComplete }) => {
        if (!delayComplete && delayMS !== 0) {
          return <div data-test-id="delay">delay</div>;
        }

        return <p data-test-id="schedule">{elapsed}</p>;
      }}
    </ScheduleContainer>
  );

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      const timerId = setTimeout(() => {
        cb(Date.now());
      }, 1000 / 60);

      return Number(timerId);
    });
    jest.spyOn(window, 'cancelAnimationFrame');
    (clearTimeout as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('sets up requestAnimationFrame', () => {
    render(<BasicExample />);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('updates elapsed render prop on each raf call', () => {
    const now = Date.now();
    const { getByTestId } = render(<BasicExample />);

    act(() => {
      const spy = jest.spyOn(Date, 'now').mockImplementationOnce(() => now - 1000);

      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(1000);
      spy.mockRestore();
    });

    expect(getByTestId('schedule').textContent).not.toBe('0');
  });

  it('cancels requestAnimationFrame on duration end', () => {
    render(<BasicExample />);

    act(() => {
      jest.runOnlyPendingTimers(); // delayTimer
      jest.runOnlyPendingTimers(); // loopTimeout
    });

    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<BasicExample />);

    unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('passes correct ms delay to initial setTimeout', () => {
    render(<BasicExample delayMS={1000} />);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it("renders differently if delay hasn't completed yet", () => {
    const { getByTestId } = render(<BasicExample />);

    expect(getByTestId('delay').textContent).toBe('delay');
  });

  it('passes correct ms duration to setTimeout', () => {
    render(<BasicExample duration={500} />);

    act(() => {
      jest.runOnlyPendingTimers(); // trigger delayMS timeout
    });

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
  });

  it('stops animation after single iteration if loop false is passed', () => {
    render(<BasicExample loop={false} />);

    act(() => {
      jest.runOnlyPendingTimers(); // delayTimer
      jest.runOnlyPendingTimers(); // loopTimeout
    });

    expect(setTimeout).toHaveBeenCalledTimes(4);
  });

  it('animation loops once initial duration has completed', () => {
    render(<BasicExample />); // loop = true is the default

    // Is wrapped in act as rAF triggers state update in hook
    act(() => {
      jest.runOnlyPendingTimers(); // delayTimer
      jest.runOnlyPendingTimers(); // loopTimeout
    });

    expect(setTimeout).toHaveBeenCalledTimes(6);
  });
});
