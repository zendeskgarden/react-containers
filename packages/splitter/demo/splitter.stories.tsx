/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { SplitterContainer } from '@zendeskgarden/container-splitter';
import { SplitterStory } from './stories/SplitterStory';

type Story = StoryObj<typeof SplitterStory>;

const meta: Meta<typeof SplitterStory> = {
  title: 'Packages/Splitter',
  component: SplitterContainer as Meta<typeof SplitterStory>['component'],
  args: { as: 'hook', max: 700, min: 200, orientation: 'vertical' },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    }
  },
  parameters: { layout: 'padded' }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <SplitterStory {...args} />,
  name: 'Uncontrolled',
  argTypes: { valueNow: { control: false } }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];

    return <SplitterStory {...args} onChange={valueNow => updateArgs({ valueNow })} />;
  },
  name: 'Controlled',
  args: { valueNow: 300 },
  argTypes: { defaultValueNow: { control: false } }
};
