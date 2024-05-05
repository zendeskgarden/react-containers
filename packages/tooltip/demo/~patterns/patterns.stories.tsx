import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusStory } from './stories/FocusStory';

const meta: Meta<typeof FocusStory> = { title: 'Packages/Tooltip/[patterns]' };

export default meta;

export const Focus: StoryObj<typeof FocusStory> = {
  render: args => <FocusStory {...args} />,
  name: 'Focus'
};
