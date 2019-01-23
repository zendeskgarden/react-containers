/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { ScheduleContainer, useSchedule } from './src';

storiesOf('Schedule Container', module)
  .addDecorator(withKnobs)
  .add('as render prop container', () => (
    <ScheduleContainer
      duration={number('duration', 1250)}
      loop={boolean('loop', true)}
      delayMS={number('delayMS', 750)}
    >
      {elapsed => (
        <div>
          Percentage: {(elapsed * 100).toFixed(0)}%<br />
          Elapsed: {elapsed}
        </div>
      )}
    </ScheduleContainer>
  ))
  .add('as a hook', () => {
    const Animation = () => {
      const duration = number('duration', 1250);
      const loop = boolean('loop', true);
      const delayMS = number('delayMS', 750);
      const elapsed = useSchedule({ duration, loop, delayMS });

      return (
        <div>
          Percentage: {(elapsed * 100).toFixed(0)}%<br />
          Elapsed: {elapsed}
        </div>
      );
    };

    return <Animation />;
  });
