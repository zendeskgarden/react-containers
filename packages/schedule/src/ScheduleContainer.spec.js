/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { mount } from 'enzyme';
import createMockRaf from 'mock-raf';
import ScheduleContainer from './ScheduleContainer';

jest.useFakeTimers();

describe('ScheduleContainer', () => {
  let wrapper;
  let requestAnimationFrame;
  let cancelAnimationFrame;

  const mockRaf = createMockRaf();

  const basicExample = props => (
    <ScheduleContainer {...props}>{elapsed => <p>{elapsed}</p>}</ScheduleContainer>
  );

  beforeEach(() => {
    requestAnimationFrame = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(mockRaf.raf);
    cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
    setTimeout.mockClear();
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    jest.clearAllTimers();
  });

  it('sets up requestAnimationFrame', () => {
    wrapper = mount(basicExample());
    jest.runOnlyPendingTimers();
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('updates elapsed render prop on each raf call', () => {
    wrapper = mount(basicExample());
    jest.runOnlyPendingTimers();
    mockRaf.step({ count: 60 });
    wrapper.update();
    expect(parseFloat(wrapper.find('p').prop('children'))).not.toBe(0);
  });

  it('cancels requestAnimationFrame on duration end', () => {
    wrapper = mount(basicExample());
    jest.runOnlyPendingTimers(); // delayTimer
    jest.runOnlyPendingTimers(); // loopTimeout
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    wrapper = mount(basicExample());

    wrapper.unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('passes correct ms delay to intitial setTimeout', () => {
    wrapper = mount(basicExample({ delayMS: 1000 }));
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it('passes correct ms duration to setTimeout', () => {
    wrapper = mount(basicExample({ duration: 500 }));
    jest.runOnlyPendingTimers(); // trigger delayMS timeout
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
  });

  it('stops animation after single iteration if loop false is passed', () => {
    wrapper = mount(basicExample({ loop: false }));
    jest.runOnlyPendingTimers(); // delayTimer
    jest.runOnlyPendingTimers(); // loopTimeout
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('animation loops once initial duration has completed', () => {
    wrapper = mount(basicExample()); // loop = true is the default
    jest.runOnlyPendingTimers(); // delayTimer
    jest.runOnlyPendingTimers(); // loopTimeout
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
});
