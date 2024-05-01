import { TooltipContainer } from '@zendeskgarden/container-tooltip';
import { TooltipStory } from './stories/TooltipStory';
import README from '../README.md';

export default {
  title: 'Packages/Tooltip',
  component: TooltipContainer
};

export const Tooltip = {
  render: args => <TooltipStory {...args} />,
  name: 'Tooltip',

  args: {
    as: 'hook',
    delayMilliseconds: TooltipContainer.defaultProps.delayMilliseconds
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
