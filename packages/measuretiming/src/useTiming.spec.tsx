/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { ReactTestRenderer } from 'react-test-renderer';
import { create, act } from 'react-test-renderer';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { DEFAULT_STAGES, INFORMATIVE_STAGES } from './constants';
import { resetMemoizedCurrentBrowserSupportForNonResponsiveStateDetection } from './utilities';
import type { Report, ReportFn } from './generateReport';
import { ActionLog } from './actionLog';
import { useTimingMeasurement } from './useTimingMeasurement';
import * as performanceMock from './performanceMark';

jest.mock('./performanceMark', () => ({
  performanceMark: jest.fn(),
  performanceMeasure: jest.fn()
}));

const performanceMarkMock = performanceMock.performanceMark as jest.MockedFunction<
  typeof performanceMock.performanceMark
>;
const performanceMeasureMock = performanceMock.performanceMeasure as jest.MockedFunction<
  typeof performanceMock.performanceMeasure
>;

type Assert = (condition: unknown, message?: string) => asserts condition;
const assert: Assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

interface SimplifiedPerformanceEntry {
  readonly duration: number;
  readonly entryType: string;
  readonly name: string;
  readonly startTime: number;
  toJSON: () => string;
}

const createPerfObserverEntryList = (
  entryList: SimplifiedPerformanceEntry[]
): PerformanceObserverEntryList => ({
  getEntries: () => entryList,
  getEntriesByName: () => [],
  getEntriesByType: () => []
});

describe('useTiming', () => {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const mockObserve: jest.Mock = jest.fn<void, [options?: PerformanceObserverInit]>();
  const mockDisconnect: jest.Mock = jest.fn();
  const PerformanceObserverMock: jest.Mock<PerformanceObserver, [PerformanceObserverCallback]> =
    jest.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      takeRecords: jest.fn()
    }));
  const mockGetSupportedEntryTypes = jest.fn<readonly string[], never>(() => []);

  // Set static property supportedEntryTypes on PerformanceObserver
  // eslint-disable-next-line jest/require-hook
  Object.defineProperty(PerformanceObserverMock, 'supportedEntryTypes', {
    get: mockGetSupportedEntryTypes,
    configurable: true
  });

  const originalPerformanceObserver = window.PerformanceObserver;
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const mockReportFn = jest.fn<void, Parameters<ReportFn<any>>>();

  const id = 'test-component';
  const timeIncrement = 100;
  const debounceMs = 5 * timeIncrement;
  const timeoutMs = 10 * timeIncrement;

  const originalConsoleError = console.error;
  const consoleErrorMock = jest.fn();

  const onInternalError = jest.fn();
  let currentTime: number;

  let stageChangeDuration: number;

  beforeAll(() => {
    performanceMarkMock.mockImplementation(name => ({
      name,
      duration: 0,
      startTime: currentTime,
      entryType: 'mark',
      toJSON: () => `(toJSON:${name})`,
      detail: null
    }));

    performanceMeasureMock.mockImplementation((name, startMark) => {
      if (name.includes('-till-') || name.includes('/start-')) currentTime += stageChangeDuration;
      else if (!name.endsWith('timeout')) currentTime += timeIncrement;

      return {
        name,
        duration: currentTime - startMark.startTime,
        startTime: startMark.startTime,
        entryType: 'mark',
        toJSON: () => `(toJSON:${name})`,
        detail: null
      };
    });

    console.error = consoleErrorMock;

    globalThis.PerformanceObserver = PerformanceObserverMock as never;
    jest.useFakeTimers('modern');
  });
  afterAll(() => {
    jest.useRealTimers();

    console.error = originalConsoleError;
    globalThis.PerformanceObserver = originalPerformanceObserver;
  });

  beforeEach(() => {
    currentTime = 0;
    stageChangeDuration = 0;
  });

  afterEach(() => {
    jest.clearAllMocks();
    resetMemoizedCurrentBrowserSupportForNonResponsiveStateDetection();

    // For whatever reason, if this line isn't here, jest's timers go all wack-o
    // even though we're clearing them a line below
    // this one has to be run; otherwise if a test fails, subsequent tests will also fail.
    // Note that for some reason switching to useRealTimers() doesn't clear the timers 🤦‍
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
  });

  describe('without the beacon hook and stages', () => {
    it('should report metrics when ready', () => {
      const simulatedFirstRenderTimeMs = timeIncrement;

      let renderer: ReactTestRenderer;

      const actionLogRef = {
        current: new ActionLog({
          reportFn: mockReportFn,
          debounceMs,
          timeoutMs,
          onInternalError
        })
      };

      const TimedTestComponent = () => {
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            actionLogRef
          },
          []
        );

        return <div>Hello!</div>;
      };

      act(() => {
        renderer = create(<TimedTestComponent />);
      });

      // the hook shouldn't affect the contents being rendered:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello!
        </div>
      `);

      // we're simulating a browser that doesn't support observing frozen states:
      expect(mockObserve).not.toHaveBeenCalled();

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();
      // jest.advanceTimersByTime(1);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(simulatedFirstRenderTimeMs);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(debounceMs);

      // no more timers should be set by this time:
      expect(jest.getTimerCount()).toBe(0);

      expect(mockReportFn).toHaveBeenCalledTimes(1);

      const report: Report = {
        id,
        isFirstLoad: true,
        tti: null,
        ttr: simulatedFirstRenderTimeMs,
        lastStage: INFORMATIVE_STAGES.INITIAL,
        counts: {
          manager: 1
        },
        durations: {
          manager: [timeIncrement]
        },
        timeSpent: {
          manager: timeIncrement
        },
        // no stages were defined:
        stages: {
          [`0_${INFORMATIVE_STAGES.INITIAL}_until_${INFORMATIVE_STAGES.RENDERED}`]: {
            timeToStage: timeIncrement,
            mountedPlacements: ['manager'],
            previousStage: INFORMATIVE_STAGES.INITIAL,
            stage: INFORMATIVE_STAGES.RENDERED,
            timingId: id
          }
        },
        includedStages: [],
        hadError: false,
        handled: true
      };

      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      renderer!.unmount();

      jest.runAllTimers();

      // an un-mount shouldn't change anything
      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should report a new metrics after updating', () => {
      const simulatedFirstRenderTimeMs = timeIncrement;

      let renderer: ReactTestRenderer;

      const actionLogRef = {
        current: new ActionLog({
          reportFn: mockReportFn,
          debounceMs,
          timeoutMs,
          onInternalError
        })
      };

      const TimedTestComponent = ({ action }: { action: string }) => {
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            actionLogRef
          },
          [action]
        );

        return <div>Hello!</div>;
      };

      act(() => {
        renderer = create(<TimedTestComponent action="mount" />);
      });

      // the hook shouldn't affect the contents being rendered:
      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello!
        </div>
      `);

      // we're simulating a browser that doesn't support observing frozen states:
      expect(mockObserve).not.toHaveBeenCalled();

      // exhaust React's (?) next tick timer
      jest.advanceTimersToNextTimer();

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(simulatedFirstRenderTimeMs);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(debounceMs);

      // no more timers should be set by this time:
      expect(jest.getTimerCount()).toBe(0);

      expect(mockReportFn).toHaveBeenCalledTimes(1);

      const report: Report = {
        id,
        isFirstLoad: true,
        tti: null,
        ttr: simulatedFirstRenderTimeMs,
        lastStage: INFORMATIVE_STAGES.INITIAL,
        counts: {
          manager: 1
        },
        durations: {
          manager: [timeIncrement]
        },
        timeSpent: {
          manager: timeIncrement
        },
        // no stages were defined:
        stages: {
          [`0_${INFORMATIVE_STAGES.INITIAL}_until_${INFORMATIVE_STAGES.RENDERED}`]: {
            timeToStage: timeIncrement,
            mountedPlacements: ['manager'],
            previousStage: INFORMATIVE_STAGES.INITIAL,
            stage: INFORMATIVE_STAGES.RENDERED,
            timingId: id
          }
        },
        includedStages: [],
        hadError: false,
        handled: true
      };

      expect(mockReportFn).toHaveBeenCalledWith(report);

      jest.runAllTimers();

      actionLogRef.current.disableReporting();

      act(() => {
        renderer.update(<TimedTestComponent action="update" />);
      });

      jest.advanceTimersByTime(debounceMs);

      // a new report should have been generated
      expect(mockReportFn).toHaveBeenCalledTimes(2);
    });

    it(`should keep debouncing and timeoutMs if the component keeps doing stuff for too long`, () => {
      expect(jest.getTimerCount()).toBe(0);
      let renderer: ReactTestRenderer;
      let keepRerendering = true;

      const actionLogRef = {
        current: new ActionLog({
          debounceMs,
          timeoutMs
        })
      };

      const TimedTestComponentThatKeepsDoingStuffForever = ({
        children
      }: {
        children: ReactNode;
      }) => {
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            onInternalError,
            reportFn: mockReportFn,
            actionLogRef
          },
          []
        );

        const [state, setState] = useState(0);

        useEffect(() => {
          if (keepRerendering) {
            setTimeout(() => {
              setState(state + 1);
            }, timeIncrement);
          }
        });

        return (
          <div>
            {children}
            {state}
          </div>
        );
      };

      act(() => {
        renderer = create(
          <TimedTestComponentThatKeepsDoingStuffForever>
            Hello world! Your lucky number (re-render count) is:
          </TimedTestComponentThatKeepsDoingStuffForever>
        );
      });

      // the hook shouldn't affect the contents being rendered:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello world! Your lucky number (re-render count) is:
          0
        </div>
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs, and the one from the component
      expect(jest.getTimerCount()).toBe(3);

      jest.advanceTimersByTime(timeoutMs - timeIncrement);

      // timeoutMs should still be going
      expect(jest.getTimerCount()).toBe(3);

      jest.advanceTimersByTime(timeIncrement);

      // by this time the timeoutMs should have executed and now the only timer is the one from the component
      expect(jest.getTimerCount()).toBe(1);

      // we should be after 9 re-renders at this point:
      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello world! Your lucky number (re-render count) is:
          9
        </div>
      `);

      expect(mockReportFn).toHaveBeenCalledTimes(1);

      const expectedRenderCount = timeoutMs / timeIncrement;
      const startToEndTime = timeoutMs;
      const report: Report = {
        id,
        isFirstLoad: true,
        tti: null,
        ttr: null,
        lastStage: INFORMATIVE_STAGES.TIMEOUT,
        counts: {
          manager: expectedRenderCount
        },
        durations: {
          manager: [...Array.from({ length: expectedRenderCount }).map(() => timeIncrement)]
        },
        timeSpent: {
          manager: startToEndTime
        },
        // no stages were defined:
        stages: {
          [`0_${INFORMATIVE_STAGES.INITIAL}_until_${INFORMATIVE_STAGES.TIMEOUT}`]: {
            timeToStage: timeoutMs,
            mountedPlacements: ['manager'],
            previousStage: INFORMATIVE_STAGES.INITIAL,
            stage: INFORMATIVE_STAGES.TIMEOUT,
            timingId: id
          }
        },
        includedStages: [INFORMATIVE_STAGES.INITIAL, INFORMATIVE_STAGES.TIMEOUT],
        hadError: false,
        handled: false
      };

      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      jest.advanceTimersByTime(timeIncrement);

      // re-rendering should still be happening, even though we're not measuring anymore:
      expect(jest.getTimerCount()).toBe(1);

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello world! Your lucky number (re-render count) is:
          10
        </div>
      `);

      keepRerendering = false;

      jest.advanceTimersByTime(timeIncrement);

      // no more timers should be set by this time:
      expect(jest.getTimerCount()).toBe(0);

      // ...and we reported only once
      expect(mockReportFn).toHaveBeenCalledTimes(1);

      renderer!.unmount();
    });
  });

  describe('with stages, but without the beacon hook', () => {
    it('should report metrics when ready', () => {
      let renderer: ReactTestRenderer;

      let setStage: (stage: string) => void;

      const actionLogRef = {
        current: new ActionLog({
          debounceMs,
          timeoutMs,
          finalStages: [DEFAULT_STAGES.READY]
        })
      };

      const TimedTestComponent = () => {
        // eslint-disable-next-line react/hook-use-state
        const [stage, _setStage] = useState<string>(INFORMATIVE_STAGES.INITIAL);

        setStage = _setStage;

        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            onInternalError,
            reportFn: mockReportFn,
            stage,
            actionLogRef
          },
          []
        );

        return <div>Hello! We are at stage:{stage}</div>;
      };

      act(() => {
        renderer = create(<TimedTestComponent />);
      });

      // the hook shouldn't affect the contents being rendered:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello! We are at stage:
          initial
        </div>
      `);

      // we're simulating a browser that doesn't support observing frozen states:
      expect(mockObserve).not.toHaveBeenCalled();

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      setStage!(DEFAULT_STAGES.LOADING);

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello! We are at stage:
          loading
        </div>
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      setStage!(DEFAULT_STAGES.READY);

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <div>
          Hello! We are at stage:
          ready
        </div>
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(debounceMs);

      expect(mockReportFn).toHaveBeenCalledTimes(1);

      const expectedRenderCount = 3;
      const timeSpent = timeIncrement * expectedRenderCount;

      const report: Report = {
        id,
        isFirstLoad: true,
        tti: null,
        ttr: timeIncrement * expectedRenderCount,
        lastStage: DEFAULT_STAGES.READY,
        counts: {
          manager: expectedRenderCount
        },
        durations: {
          manager: [timeIncrement, timeIncrement, timeIncrement]
        },
        timeSpent: {
          manager: timeSpent
        },
        // no stages were defined:
        stages: {
          '0_initial_until_loading': {
            mountedPlacements: ['manager'],
            previousStage: 'initial',
            stage: 'loading',
            timeToStage: 100,
            timingId: 'test-component'
          },
          '1_loading_until_ready': {
            mountedPlacements: ['manager'],
            previousStage: 'loading',
            stage: 'ready',
            timeToStage: 200,
            timingId: 'test-component'
          },
          '2_ready_until_rendered': {
            mountedPlacements: ['manager'],
            previousStage: 'ready',
            stage: 'rendered',
            timeToStage: 100,
            timingId: 'test-component'
          }
        },
        includedStages: [INFORMATIVE_STAGES.INITIAL, DEFAULT_STAGES.LOADING, DEFAULT_STAGES.READY],
        hadError: false,
        handled: true
      };

      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      // no more timers should be set by this time:
      expect(jest.getTimerCount()).toBe(0);

      renderer!.unmount();

      jest.runAllTimers();

      // an un-mount shouldn't change anything
      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe('with stages, the beacon hook, custom activation from the beacon and non-responsive state detection', () => {
    it('should report metrics when ready', () => {
      let renderer: ReactTestRenderer;

      // mock a browser that supports 'longtask' monitoring
      mockGetSupportedEntryTypes.mockReturnValue(['longtask']);

      type BeaconState = { stage: string; isActive: boolean };

      let setBeaconState: (state: BeaconState) => void;

      const actionLogRef = {
        current: new ActionLog({
          finalStages: [DEFAULT_STAGES.READY, DEFAULT_STAGES.ERROR],
          debounceMs,
          timeoutMs
        })
      };

      const BeaconComponent = () => {
        // eslint-disable-next-line react/hook-use-state
        const [{ stage, isActive }, _setState] = useState<BeaconState>({
          stage: INFORMATIVE_STAGES.INITIAL,
          isActive: false
        });

        setBeaconState = _setState;
        useTimingMeasurement(
          {
            id,
            placement: 'beacon',
            onInternalError,
            stage,
            isActive,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>We are at stage:{stage}</div>
            <div>We are:{isActive ? 'measuring' : 'not measuring'}</div>
          </>
        );
      };

      const TimedTestComponent = () => {
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            onInternalError,
            reportFn: mockReportFn,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>Hello!</div>
            <BeaconComponent />
          </>
        );
      };

      act(() => {
        renderer = create(<TimedTestComponent />);
      });

      // the hook shouldn't affect the contents being rendered:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        Array [
          <div>
            Hello!
          </div>,
          <div>
            We are at stage:
            initial
          </div>,
          <div>
            We are:
            not measuring
          </div>,
        ]
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we're simulating a browser that does support observing frozen states
      expect(PerformanceObserverMock).toHaveBeenCalledTimes(1);
      expect(PerformanceObserverMock).toHaveBeenLastCalledWith(expect.any(Function));

      // but we aren't active yet:
      expect(mockObserve).not.toHaveBeenCalled();

      assert(PerformanceObserverMock.mock.calls[0]);

      const performanceObserverCallback = PerformanceObserverMock.mock.calls[0][0];

      // report shouldn't have been called yet -- we're inactive:
      expect(mockReportFn).not.toHaveBeenCalled();

      // no timers should be present
      expect(jest.getTimerCount()).toBe(0);

      setBeaconState!({ stage: DEFAULT_STAGES.LOADING, isActive: true });

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        Array [
          <div>
            Hello!
          </div>,
          <div>
            We are at stage:
            loading
          </div>,
          <div>
            We are:
            measuring
          </div>,
        ]
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // now we're active!
      expect(mockObserve).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenLastCalledWith({ entryTypes: ['longtask'] });

      jest.advanceTimersByTime(timeIncrement);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      setBeaconState!({ stage: DEFAULT_STAGES.READY, isActive: true });

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        Array [
          <div>
            Hello!
          </div>,
          <div>
            We are at stage:
            ready
          </div>,
          <div>
            We are:
            measuring
          </div>,
        ]
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      const lagStartTime = currentTime + timeIncrement;
      const lagDuration = timeIncrement * 5;

      // simulate non-responsiveness for 500ms
      performanceObserverCallback(
        createPerfObserverEntryList([
          {
            duration: lagDuration,
            entryType: 'longtask',
            name: 'longtask',
            startTime: lagStartTime,
            toJSON: () => ''
          }
        ]),
        // the 2nd argument isn't used, but we need it to make TypeScript happy
        new PerformanceObserver(() => {
          /* noop*/
        })
      );

      jest.advanceTimersByTime(timeIncrement);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(debounceMs);

      expect(mockReportFn).toHaveBeenCalledTimes(1);
      // we should have disconnected now:
      expect(mockDisconnect).toHaveBeenCalledTimes(1);

      // we should only start counting renders AFTER we activate, that's why we only have 2 (loading and ready):
      const expectedBeaconRenderCount = 2;
      const ttr = timeIncrement * expectedBeaconRenderCount;
      const tti = ttr + timeIncrement + lagDuration;
      const report: Report = {
        id,
        isFirstLoad: true,
        tti,
        ttr,
        lastStage: DEFAULT_STAGES.READY,
        counts: {
          beacon: expectedBeaconRenderCount,
          observer: 1
          // manager wouldn't have re-rendered
        },
        durations: {
          beacon: [timeIncrement, timeIncrement],
          observer: [lagDuration]
        },
        timeSpent: {
          beacon: ttr,
          observer: lagDuration
        },
        stages: {
          '0_loading_until_ready': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'loading',
            stage: 'ready',
            timeToStage: timeIncrement,
            timingId: 'test-component'
          },
          '1_ready_until_rendered': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'ready',
            stage: 'rendered',
            timeToStage: timeIncrement,
            timingId: 'test-component'
          },
          '2_rendered_until_interactive': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'rendered',
            stage: 'interactive',
            // lag started 100ms after the last render,
            // which means total time until interactive will be 100ms when rendered + 500ms of lag
            timeToStage: timeIncrement + lagDuration,
            timingId: 'test-component'
          }
        },
        includedStages: [DEFAULT_STAGES.LOADING, DEFAULT_STAGES.READY],
        hadError: false,
        handled: true
      };

      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      // no more timers should be set by this time:
      expect(jest.getTimerCount()).toBe(0);

      renderer!.unmount();

      jest.runAllTimers();

      // an un-mount shouldn't change anything
      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should wait until beacon is activated', () => {
      let renderer: ReactTestRenderer;

      // mock a browser that supports 'longtask' monitoring
      mockGetSupportedEntryTypes.mockReturnValue(['longtask']);

      type BeaconState = { isActive: boolean };

      let setBeaconState: (state: BeaconState) => void;

      const actionLogRef = {
        current: new ActionLog({
          waitForBeaconActivation: ['beacon'],
          debounceMs,
          timeoutMs
        })
      };

      const BeaconComponent = () => {
        useTimingMeasurement(
          {
            id,
            placement: 'beacon',
            onInternalError,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>We are a beacon</div>
          </>
        );
      };

      const TimedTestComponent = () => {
        // eslint-disable-next-line react/hook-use-state
        const [{ isActive }, _setState] = useState<BeaconState>({
          isActive: false
        });

        setBeaconState = _setState;
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            onInternalError,
            reportFn: mockReportFn,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>Hello!</div>
            {isActive && <BeaconComponent />}
          </>
        );
      };

      act(() => {
        renderer = create(<TimedTestComponent />);
      });

      // the hook shouldn't affect the contents being rendered:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
<div>
  Hello!
</div>
`);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we're simulating a browser that does support observing frozen states
      expect(PerformanceObserverMock).toHaveBeenCalledTimes(1);
      expect(PerformanceObserverMock).toHaveBeenLastCalledWith(expect.any(Function));

      // but we aren't active yet:
      expect(mockObserve).not.toHaveBeenCalled();

      assert(PerformanceObserverMock.mock.calls[0]);
      const performanceObserverCallback = PerformanceObserverMock.mock.calls[0][0];

      // report shouldn't have been called yet -- waitForBeaconActivation has not been satisfied:
      expect(mockReportFn).not.toHaveBeenCalled();

      // no timers should be present
      expect(jest.getTimerCount()).toBe(0);

      setBeaconState!({ isActive: true });

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
Array [
  <div>
    Hello!
  </div>,
  <div>
    We are a beacon
  </div>,
]
`);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // now we're active!
      expect(mockObserve).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenLastCalledWith({ entryTypes: ['longtask'] });

      jest.advanceTimersByTime(timeIncrement);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      const lagStartTime = currentTime + timeIncrement;
      const lagDuration = debounceMs;

      // simulate non-responsiveness for 500ms
      performanceObserverCallback(
        createPerfObserverEntryList([
          {
            duration: lagDuration,
            entryType: 'longtask',
            name: 'longtask',
            startTime: lagStartTime,
            toJSON: () => ''
          }
        ]),
        // the 2nd argument isn't used, but we need it to make TypeScript happy
        new PerformanceObserver(() => {
          /* noop*/
        })
      );

      jest.advanceTimersByTime(timeIncrement);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(debounceMs);

      expect(mockReportFn).toHaveBeenCalledTimes(1);
      // we should have disconnected now:
      expect(mockDisconnect).toHaveBeenCalledTimes(1);

      // we should only start counting renders AFTER we activate, that's why we only have 1:
      const expectedBeaconRenderCount = 1;
      const ttr = 2 * timeIncrement * expectedBeaconRenderCount;
      const tti = ttr + timeIncrement + lagDuration;
      const report: Report = {
        id,
        isFirstLoad: true,
        tti,
        ttr,
        lastStage: INFORMATIVE_STAGES.INITIAL,
        counts: {
          beacon: expectedBeaconRenderCount,
          observer: 1,
          // manager is 1, even though it rendered 2 times in total,
          // because we only started counting after activation
          manager: 1
        },
        durations: {
          beacon: [timeIncrement],
          manager: [2 * timeIncrement],
          observer: [lagDuration]
        },
        timeSpent: {
          beacon: timeIncrement,
          observer: lagDuration,
          manager: ttr
        },
        stages: {
          '0_initial_until_rendered': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'initial',
            stage: 'rendered',
            timeToStage: 2 * timeIncrement,
            timingId: 'test-component'
          },
          '1_rendered_until_interactive': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'rendered',
            stage: 'interactive',
            timeToStage: 6 * timeIncrement,
            timingId: 'test-component'
          }
        },
        includedStages: [],
        hadError: false,
        handled: true
      };

      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      // no more timers should be set by this time:
      expect(jest.getTimerCount()).toBe(0);

      renderer!.unmount();

      jest.runAllTimers();

      // an un-mount shouldn't change anything
      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe('handles errors', () => {
    it('should report metrics immediately after reaching a terminal stage (encountering an error)', () => {
      let renderer: ReactTestRenderer;

      type BeaconState = { stage: string };

      let setBeaconState: (state: BeaconState) => void;

      const actionLogRef = {
        current: new ActionLog({
          debounceMs,
          timeoutMs,
          finalStages: [DEFAULT_STAGES.READY, DEFAULT_STAGES.ERROR]
        })
      };

      const BeaconComponent = () => {
        // eslint-disable-next-line react/hook-use-state
        const [{ stage }, _setState] = useState<BeaconState>({
          stage: DEFAULT_STAGES.LOADING
        });

        setBeaconState = _setState;
        useTimingMeasurement(
          {
            id,
            placement: 'beacon',
            onInternalError,
            stage,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>We are at stage:{stage}</div>
          </>
        );
      };

      const TimedTestComponent = () => {
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            onInternalError,
            reportFn: mockReportFn,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>Hello!</div>
            <BeaconComponent />
          </>
        );
      };

      expect(mockObserve).toHaveBeenCalledTimes(0);
      expect(mockDisconnect).toHaveBeenCalledTimes(0);

      // mock a browser that supports 'longtask' monitoring
      mockGetSupportedEntryTypes.mockReturnValue(['longtask']);

      act(() => {
        renderer = create(<TimedTestComponent />);
      });

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        Array [
          <div>
            Hello!
          </div>,
          <div>
            We are at stage:
            loading
          </div>,
        ]
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // now we're active!
      expect(mockObserve).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenLastCalledWith({ entryTypes: ['longtask'] });
      expect(mockDisconnect).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(timeIncrement);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // --- NEXT STAGE ---

      setBeaconState!({ stage: DEFAULT_STAGES.ERROR });

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        Array [
          <div>
            Hello!
          </div>,
          <div>
            We are at stage:
            error
          </div>,
        ]
      `);

      // we should have timers for:
      // debounce, timeoutMs and willFlushTimeout + something from renderer
      expect(jest.getTimerCount()).toBe(4);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we shouldn't have any timers left
      expect(jest.getTimerCount()).toBe(0);

      expect(mockReportFn).toHaveBeenCalledTimes(1);
      // we should have disconnected now:
      expect(mockDisconnect).toHaveBeenCalledTimes(1);

      // we should only start counting renders AFTER we activate, that's why we only have 1 (error):
      const expectedBeaconRenderCount = 2;
      const ttr = timeIncrement * 3;
      const tti = null;
      const report: Report = {
        id,
        isFirstLoad: true,
        tti,
        ttr,
        lastStage: DEFAULT_STAGES.ERROR,
        counts: {
          manager: 1,
          beacon: expectedBeaconRenderCount
        },
        durations: {
          manager: [timeIncrement * 2],
          beacon: [100, 100]
        },
        timeSpent: {
          manager: timeIncrement * 2,
          beacon: 200
        },
        stages: {
          '0_loading_until_error': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'loading',
            stage: 'error',
            timeToStage: timeIncrement * 2,
            timingId: 'test-component'
          },
          '1_error_until_rendered': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'error',
            stage: 'rendered',
            timeToStage: timeIncrement,
            timingId: 'test-component'
          }
        },
        includedStages: [DEFAULT_STAGES.LOADING, DEFAULT_STAGES.ERROR],
        hadError: true,
        handled: true
      };

      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      renderer!.unmount();

      jest.runAllTimers();

      // an un-mount shouldn't change anything
      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should report metrics immediately after reaching a terminal stage, even when the component throws', () => {
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      const didCatch = jest.fn<void, [Error, unknown]>();

      class TestErrorBoundary extends React.Component<{ children: React.ReactNode }> {
        static getDerivedStateFromError() {
          // Update state so the next render will show the fallback UI.
          return { hasError: true };
        }

        constructor(props: { children: React.ReactNode }) {
          super(props);
          this.state = { hasError: false };
        }

        state: { hasError: boolean };

        // eslint-disable-next-line class-methods-use-this
        componentDidCatch(error: Error, errorInfo: unknown) {
          didCatch(error, errorInfo);
        }

        render() {
          const { hasError } = this.state;

          if (hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
          }

          const { children } = this.props;

          return children;
        }
      }

      let renderer: ReactTestRenderer;

      type BeaconState = { stage: string };

      let setBeaconState: (state: BeaconState) => void;

      const actionLogRef = {
        current: new ActionLog({
          finalStages: [DEFAULT_STAGES.READY, DEFAULT_STAGES.ERROR],
          debounceMs,
          timeoutMs
        })
      };

      const BeaconComponent = () => {
        // eslint-disable-next-line react/hook-use-state
        const [{ stage }, _setState] = useState<BeaconState>({
          stage: DEFAULT_STAGES.LOADING
        });

        setBeaconState = _setState;
        useTimingMeasurement(
          {
            id,
            placement: 'beacon',
            onInternalError,
            stage,
            actionLogRef
          },
          []
        );
        if (stage === DEFAULT_STAGES.ERROR) {
          throw new Error('Something went wrong.');
        }

        return (
          <>
            <div>We are at stage:{stage}</div>
          </>
        );
      };

      const TimedTestComponent = () => {
        useTimingMeasurement(
          {
            id,
            placement: 'manager',
            onInternalError,
            reportFn: mockReportFn,
            actionLogRef
          },
          []
        );

        return (
          <>
            <div>Hello!</div>
            <BeaconComponent />
          </>
        );
      };

      expect(mockObserve).toHaveBeenCalledTimes(0);
      expect(mockDisconnect).toHaveBeenCalledTimes(0);

      // mock a browser that supports 'longtask' monitoring
      mockGetSupportedEntryTypes.mockReturnValue(['longtask']);
      // try {
      act(() => {
        renderer = create(
          <TestErrorBoundary>
            <TimedTestComponent />
          </TestErrorBoundary>
        );
      });

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        Array [
          <div>
            Hello!
          </div>,
          <div>
            We are at stage:
            loading
          </div>,
        ]
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // now we're active!
      expect(mockObserve).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenLastCalledWith({ entryTypes: ['longtask'] });
      expect(mockDisconnect).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(timeIncrement);

      // report shouldn't have been called yet -- it's debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // we should have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      jest.advanceTimersByTime(timeIncrement);

      // we should *still* have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(2);

      // still debounced:
      expect(mockReportFn).not.toHaveBeenCalled();

      // --- NEXT STAGE ---

      setBeaconState!({ stage: DEFAULT_STAGES.ERROR });

      // re-rendered with new data:

      expect(renderer!.toJSON()).toMatchInlineSnapshot(`
        <h1>
          Something went wrong.
        </h1>
      `);

      // exhaust React's next tick timer
      jest.advanceTimersToNextTimer();

      // we shouldn't have timers for: debounce and timeoutMs
      expect(jest.getTimerCount()).toBe(0);

      expect(mockReportFn).toHaveBeenCalledTimes(1);
      // we should have disconnected now:
      expect(mockDisconnect).toHaveBeenCalledTimes(1);

      // we should only start counting renders AFTER we activate, that's why we only have 1 (error):
      const expectedBeaconRenderCount = 2;
      const ttr = timeIncrement * expectedBeaconRenderCount;
      const report: Report = {
        id,
        isFirstLoad: true,
        tti: null,
        ttr,
        lastStage: DEFAULT_STAGES.ERROR,
        counts: {
          manager: 1,
          // minus 1, because the throw would have caused the 2nd time not to render fully:
          beacon: expectedBeaconRenderCount - 1
        },
        durations: {
          manager: [200],
          beacon: [100]
        },
        timeSpent: {
          manager: timeIncrement * 2,
          beacon: timeIncrement
        },
        stages: {
          '0_loading_until_error': {
            mountedPlacements: ['manager', 'beacon'],
            previousStage: 'loading',
            stage: 'error',
            timeToStage: timeIncrement * 2,
            timingId: 'test-component'
          }
        },
        includedStages: [DEFAULT_STAGES.LOADING, DEFAULT_STAGES.ERROR],
        hadError: true,
        handled: false
      };

      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(mockReportFn).toHaveBeenLastCalledWith(report, expect.objectContaining({}));

      renderer!.unmount();

      jest.runAllTimers();

      // an un-mount shouldn't change anything
      expect(mockReportFn).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });
  });
});
