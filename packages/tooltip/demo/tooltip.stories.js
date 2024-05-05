import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TooltipContainer } from '@zendeskgarden/container-tooltip';
import { TooltipStory } from './stories/TooltipStory';

const meta: Meta<typeof TooltipStory> = {
  title: 'Packages/Tooltip',
  component: TooltipContainer
};

export default meta;

export const Tooltip: StoryObj<typeof TooltipStory> = {
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
