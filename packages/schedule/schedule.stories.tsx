/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { ScheduleContainer, useSchedule } from './src';

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

Hook.story = {
  name: 'useSchedule'
};

Container.story = {
  name: 'ScheduleContainer'
};

export default {
  title: 'Schedule Container',
  decorators: [withKnobs]
};
