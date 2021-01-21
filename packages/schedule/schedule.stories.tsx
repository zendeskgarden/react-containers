/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { ScheduleContainer, useSchedule } from './src';

export const Container = ({ duration, loop, delayMS }) => (
  <ScheduleContainer duration={duration} loop={loop} delayMS={delayMS}>
    {({ elapsed, delayComplete }) => {
      if (!delayComplete && delayMS !== 0) {
        return <div>Delay...</div>;
      }

      return (
        <div>
          Percentage: {(elapsed * 100).toFixed(0)}%<br />
          Elapsed: {elapsed}
        </div>
      );
    }}
  </ScheduleContainer>
);

export const Hook = ({ duration, loop, delayMS }) => {
  const Animation = () => {
    const { elapsed, delayComplete } = useSchedule({ duration, loop, delayMS });

    if (!delayComplete && delayMS !== 0) {
      return <div>Delay...</div>;
    }

    return (
      <div>
        Percentage: {(elapsed * 100).toFixed(0)}%<br />
        Elapsed: {elapsed}
      </div>
    );
  };

  return <Animation />;
};

const ARGS = {
  duration: 1250,
  loop: true,
  delayMS: 750
};

Container.storyName = 'ScheduleContainer';

Container.args = ARGS;

Hook.storyName = 'useSchedule';

Hook.args = ARGS;

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useSchedule\` hook implements a schedule (timer) and communicates when it has elapsed.`
    }
  }
};

export default {
  title: 'Schedule Container',
  component: ScheduleContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useSchedule hook.`
  }
};
