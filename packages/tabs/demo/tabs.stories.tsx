/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TabsContainer } from '@zendeskgarden/container-tabs';
import { TabsStory } from './stories/TabsStory';
import { TABS } from './stories/data';

type Story = StoryObj<typeof TabsStory>;

const meta: Meta<typeof TabsStory> = {
  title: 'Packages/Tabs',
  component: TabsContainer,
  args: {
    as: 'hook',
    orientation: 'horizontal',
    tabs: TABS,
    defaultSelectedValue: TABS[0].value
  },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    }
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <TabsStory {...args} />,
  name: 'Uncontrolled',
  argTypes: { selectedValue: { control: false } }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];

    return <TabsStory {...args} onSelect={selectedValue => updateArgs({ selectedValue })} />;
  },
  name: 'Controlled',
  argTypes: { defaultSelectedValue: { control: false } }
};
