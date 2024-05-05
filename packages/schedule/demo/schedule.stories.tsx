import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScheduleContainer } from '@zendeskgarden/container-schedule';
import { ScheduleStory } from './stories/ScheduleStory';

const meta: Meta<typeof ScheduleStory> = {
  title: 'Packages/Schedule',
  component: ScheduleContainer
};

export default meta;

export const Schedule: StoryObj<typeof ScheduleStory> = {
  render: args => <ScheduleStory {...args} />,
  name: 'Schedule',
  args: { as: 'hook', delayMS: 750, duration: 1250, loop: true },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    }
  }
};
