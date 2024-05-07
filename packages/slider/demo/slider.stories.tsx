/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { SliderContainer } from '@zendeskgarden/container-slider';
import { SliderStory } from './stories/SliderStory';

type Story = StoryObj<typeof SliderStory>;

const meta: Meta<typeof SliderStory> = {
  title: 'Packages/Slider',
  component: SliderContainer as Meta<typeof SliderStory>['component'],
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

    return (
      <SliderStory
        {...args}
        onChange={({ minValue, maxValue }) => updateArgs({ minValue, maxValue })}
      />
    );
  },
  name: 'Controlled',
  args: { minValue: 25, maxValue: 75 },
  argTypes: {
    defaultMinValue: { control: false },
    defaultMaxValue: { control: false }
  }
};
