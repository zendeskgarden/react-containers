import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { SplitterContainer } from '@zendeskgarden/container-splitter';
import { SplitterStory } from './stories/SplitterStory';
type Story = StoryObj<typeof SplitterStory>;

const meta: Meta<typeof SplitterStory> = {
  title: 'Packages/Splitter',
  component: SplitterContainer,

  args: {
    as: 'hook',
    max: 700,
    min: 200,
    orientation: 'vertical'
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    splitterRef: {
      control: false
    }
  },

  parameters: {
    layout: 'padded'
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <SplitterStory {...args} />,
  name: 'Uncontrolled',

  argTypes: {
    valueNow: {
      control: false
    }
  }
};

export const Controlled: Story = {
  render: ({ ...args }) => {
    const updateArgs = useArgs()[1];

    const handleChange = valueNow =>
      updateArgs({
        valueNow
      });

    return <SplitterStory {...args} onChange={handleChange} />;
  },

  name: 'Controlled',

  args: {
    valueNow: 300
  },

  argTypes: {
    defaultValueNow: {
      control: false
    }
  }
};
