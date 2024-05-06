/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { MenuContainer } from '@zendeskgarden/container-menu';
import { MenuStory } from './stories/MenuStory';
import { ITEMS } from './stories/data';

type Story = StoryObj<typeof MenuStory>;

const meta: Meta<typeof MenuStory> = {
  title: 'Packages/Menu',
  component: MenuContainer,
  args: { as: 'hook', items: ITEMS },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    menuRef: { control: false },
    triggerRef: { control: false }
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <MenuStory {...args} />,
  name: 'Uncontrolled',
  argTypes: {
    isExpanded: { control: false },
    focusedValue: { control: false },
    selectedItems: { control: false }
  }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];

    return (
      <MenuStory
        {...args}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange={({ type, ...rest }) => {
          updateArgs(rest);
        }}
      />
    );
  },
  name: 'Controlled',
  argTypes: {
    defaultFocusedValue: { control: false },
    defaultExpanded: { control: false },
    focusedValue: { control: { type: 'text' } }
  },
  args: {
    isExpanded: false,
    focusedValue: 'plant-01',
    selectedItems: [{ value: 'Cherry', type: 'checkbox' }]
  }
};
