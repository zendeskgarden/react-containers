import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectionStory } from './stories/SelectionStory';

const meta: Meta<typeof SelectionStory> = {
  title: 'Packages/FocusVisible/[patterns]'
};

export default meta;

export const Selection: StoryObj<typeof SelectionStory> = {
  render: args => <SelectionStory {...args} />,
  name: 'Selection'
};
