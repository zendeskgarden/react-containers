/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { ComboboxContainer } from '@zendeskgarden/container-combobox';
import { ComboboxStory } from './stories/ComboboxStory';
import { OPTIONS } from './stories/data';

type Story = StoryObj<typeof ComboboxStory>;

const meta: Meta<typeof ComboboxStory> = {
  title: 'Packages/Combobox',
  component: ComboboxContainer,
  args: { as: 'hook', layout: 'Garden', isEditable: true, options: OPTIONS },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    layout: {
      options: ['Downshift', 'Garden'],
      control: 'radio',
      table: { category: 'Story' }
    },
    inputRef: { control: false },
    listboxRef: { control: false },
    triggerRef: { control: false }
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <ComboboxStory {...args} />,
  name: 'Uncontrolled',
  argTypes: {
    isExpanded: { control: false },
    inputValue: { control: false },
    activeIndex: { control: false },
    selectionValue: { control: false }
  }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];
    const handleChange = changes => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, ...args } = changes;
      updateArgs(args);
    };
    return <ComboboxStory {...args} onChange={handleChange} />;
  },
  name: 'Controlled',
  args: {
    isExpanded: false,
    inputValue: '',
    activeIndex: -1,
    selectionValue: null
  },
  argTypes: {
    defaultExpanded: { control: false },
    defaultSelectionValue: { control: false }
  }
};
