/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  IScheduleContainerProps,
  IUseScheduleProps,
  IUseScheduleReturnValue,
  ScheduleContainer,
  useSchedule
} from '@zendeskgarden/container-schedule';

interface IComponentProps extends IUseScheduleReturnValue {
  duration?: IUseScheduleProps['duration'];
  loop?: IUseScheduleProps['loop'];
}

const Component = ({ delayMS, delayComplete, elapsed, loop, duration = 1250 }: IComponentProps) => (
  <div>
    <label>
      <span>
        Schedule {delayMS / 1000}s delay followed by {duration / 1000}s{' '}
        {loop ? 'looped' : 'elapsed'} progress
      </span>
      <progress className="block w-full" value={delayComplete ? elapsed : undefined} />
    </label>
  </div>
);

const Container = ({ loop, ...props }: IScheduleContainerProps) => (
  <ScheduleContainer loop={loop} {...props}>
    {containerProps => <Component {...containerProps} loop={loop} />}
  </ScheduleContainer>
);

const Hook = (props: IUseScheduleProps) => {
  const hookProps = useSchedule(props);

  return <Component {...hookProps} {...props} />;
};

interface IArgs extends IScheduleContainerProps {
  as: 'hook' | 'container';
}

export const ScheduleStory: StoryFn<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
