import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { SliderContainer } from '@zendeskgarden/container-slider';
import { SliderStory } from './stories/SliderStory';

type Story = StoryObj<typeof SliderStory>;

const meta: Meta<typeof SliderStory> = {
  title: 'Packages/Slider',
  component: SliderContainer,
  args: { as: 'hook', max: 100, min: 0, step: 1 },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    trackRef: { control: false },
    minThumbRef: { control: false },
    maxThumbRef: { control: false }
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <SliderStory {...args} />,
  name: 'Uncontrolled',
  argTypes: { minValue: { control: false }, maxValue: { control: false } }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];
    const handleChange = ({ minValue, maxValue }) =>
      updateArgs({ minValue, maxValue });
    return <SliderStory {...args} onChange={handleChange} />;
  },
  name: 'Controlled',
  args: { minValue: 25, maxValue: 75 },
  argTypes: {
    defaultMinValue: { control: false },
    defaultMaxValue: { control: false }
  }
};
