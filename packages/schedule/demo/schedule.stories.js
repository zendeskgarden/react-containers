import { ScheduleContainer } from '@zendeskgarden/container-schedule';
import { ScheduleStory } from './stories/ScheduleStory';
import README from '../README.md';

export default {
  title: 'Packages/Schedule',
  component: ScheduleContainer
};

export const Schedule = {
  render: args => <ScheduleStory {...args} />,
  name: 'Schedule',

  args: {
    as: 'hook',
    delayMS: 750,
    duration: 1250,
    loop: true
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    }
  }
};
