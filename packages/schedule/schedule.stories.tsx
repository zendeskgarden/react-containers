/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { ScheduleContainer, useSchedule } from './src';

export const Container = () => (
  <ScheduleContainer
    duration={number('duration', 1250)}
    loop={boolean('loop', true)}
    delayMS={number('delayMS', 750)}
  >
    {({ elapsed, delayMS, delayComplete }) => {
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

export const Hook = () => {
  const Animation = () => {
    const duration = number('duration', 1250);
    const loop = boolean('loop', true);
    const delayMS = number('delayMS', 750);
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

Container.storyName = 'ScheduleContainer';

Hook.storyName = 'useSchedule';

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useSchedule\` hook implements a schedule (timer) and communicates when it has elapsed.`
    }
  }
};

export default {
  title: 'Schedule Container',
  decorators: [withKnobs],
  component: ScheduleContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useSchedule hook.`
  }
};
