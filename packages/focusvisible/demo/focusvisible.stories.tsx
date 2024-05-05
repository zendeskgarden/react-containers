import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusVisibleContainer } from '@zendeskgarden/container-focusvisible';
import { FocusVisibleStory } from './stories/FocusVisibleStory';

const meta: Meta<typeof FocusVisibleStory> = {
  title: 'Packages/FocusVisible',
  component: FocusVisibleContainer
};

export default meta;

export const FocusVisible: StoryObj<typeof FocusVisibleStory> = {
  render: function Render(args) {
    const scope = useRef();
    return <FocusVisibleStory {...args} scope={scope} />;
  },
  name: 'FocusVisible',
  args: { as: 'hook' },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    className: { control: false },
    dataAttribute: { control: false }
  }
};
