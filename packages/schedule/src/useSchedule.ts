/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useLayoutEffect } from 'react';

export interface IUseScheduleProps {
  /** The duration of a schedule in miliseconds */
  duration?: number;
  /** The delay in miliseconds prior to the beginning of the schedule */
  delayMS?: number;
  /** Determines whether a schedule should loop */
  loop?: boolean;
}

export interface IUseScheduleReturnValue {
  elapsed: number;
  delayMS: number;
  delayComplete: boolean;
}

export const useSchedule = ({
  duration = 1250,
  delayMS = 750,
  loop = true
}: IUseScheduleProps = {}): IUseScheduleReturnValue => {
  const [elapsed, setElapsed] = useState(0);
  const [delayComplete, setDelayComplete] = useState(false);

  useLayoutEffect(() => {
    let raf: number;
    let start: number;
    let loopTimeout: ReturnType<typeof setTimeout>;
    let destroyed = false;

    const tick = () => {
      if (destroyed) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      raf = requestAnimationFrame(performAnimationFrame);
    };

    const performAnimationFrame = () => {
      setElapsed(Date.now() - start);
      tick();
    };

    const onStart = () => {
      if (destroyed) {
        return;
      }

      loopTimeout = setTimeout(() => {
        cancelAnimationFrame(raf);
        setElapsed(Date.now() - start);
        if (loop) onStart();
      }, duration);

      // Start the loop
      start = Date.now();
      setDelayComplete(true);
      tick();
    };

    const renderingDelayTimeout = setTimeout(onStart, delayMS);

    return () => {
      destroyed = true;
      clearTimeout(renderingDelayTimeout);
      clearTimeout(loopTimeout);
      cancelAnimationFrame(raf);
    };
  }, [duration, delayMS, loop]);

  return {
    elapsed: Math.min(1, elapsed / duration),
    delayMS,
    delayComplete
  };
};
