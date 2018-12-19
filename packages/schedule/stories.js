import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { ScheduleContainer, useSchedule } from './src';

storiesOf('Schedule Container', module)
  .addDecorator(withKnobs)
  .add('as render prop container', () => (
    <ScheduleContainer
      duration={number('Duration', 12500)}
      loop={boolean('Loop', true)}
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
      const elapsed = useSchedule();

      return (
        <div>
          Percentage: {(elapsed * 100).toFixed(0)}%<br />
          Elapsed: {elapsed}
        </div>
      );
    };

    return <Animation />;
  });
