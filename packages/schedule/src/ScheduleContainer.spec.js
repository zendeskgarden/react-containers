/* eslint-disable no-console */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ScheduleContainer from './ScheduleContainer';

jest.useFakeTimers();

describe('ScheduleContainer', () => {
  const BasicExample = props => (
    <ScheduleContainer {...props}>
      {elapsed => <p data-test-id="schedule">{elapsed}</p>}
    </ScheduleContainer>
  );

  let rAFCallbacks = [];

  function runRAFCallbacks() {
    rAFCallbacks.forEach(cb => cb());
    rAFCallbacks = [];
  }

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      return rAFCallbacks.push(cb);
    });
    jest.spyOn(window, 'cancelAnimationFrame');
    clearTimeout.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('sets up requestAnimationFrame', () => {
    render(<BasicExample />);

    jest.runOnlyPendingTimers();

    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('updates elapsed render prop on each raf call', () => {
    const { getByTestId } = render(<BasicExample />);

    jest.runOnlyPendingTimers();

    act(() => {
      runRAFCallbacks();
    });

    expect(getByTestId('schedule').textContent).not.toBe('0');
  });

  it('cancels requestAnimationFrame on duration end', () => {
    render(<BasicExample />);

    jest.runOnlyPendingTimers(); // delayTimer
    jest.runOnlyPendingTimers(); // loopTimeout

    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<BasicExample />);

    unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('passes correct ms delay to intitial setTimeout', () => {
    render(<BasicExample delayMS={1000} />);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it('passes correct ms duration to setTimeout', () => {
    render(<BasicExample duration={500} />);

    jest.runOnlyPendingTimers(); // trigger delayMS timeout

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
  });

  it('stops animation after single iteration if loop false is passed', () => {
    render(<BasicExample loop={false} />);

    jest.runOnlyPendingTimers(); // delayTimer
    jest.runOnlyPendingTimers(); // loopTimeout

    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('animation loops once initial duration has completed', () => {
    render(<BasicExample />); // loop = true is the default

    jest.runOnlyPendingTimers(); // delayTimer
    jest.runOnlyPendingTimers(); // loopTimeout

    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
});
