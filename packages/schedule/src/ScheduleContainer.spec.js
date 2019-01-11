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

  const basicExample = ({ delayMS } = {}) => (
    <ScheduleContainer delayMS={delayMS}>{elapsed => <p>{elapsed}</p>}</ScheduleContainer>
  );

  beforeEach(() => {
    requestAnimationFrame = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(mockRaf.raf);
    cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
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
});
