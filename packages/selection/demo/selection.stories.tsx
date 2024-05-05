import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { SelectionContainer } from '@zendeskgarden/container-selection';
import { SelectionStory } from './stories/SelectionStory';
import { VALUES } from './stories/data';

type Story = StoryObj<typeof SelectionStory>;

const meta: Meta<typeof SelectionStory> = {
  title: 'Packages/Selection',
  component: SelectionContainer,
  args: { as: 'hook', values: VALUES, direction: 'horizontal' },
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
  render: args => <SelectionStory {...args} />,
  name: 'Uncontrolled',
  args: { defaultFocusedValue: 'item-1' },
  argTypes: {
    selectedValue: { control: false },
    focusedValue: { control: false },
    defaultFocusedValue: { control: { type: 'text' } },
    defaultSelectedValue: { control: { type: 'text' } }
  }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];
    const handleSelect = selectedValue => updateArgs({ selectedValue });
    const handleFocus = focusedValue => updateArgs({ focusedValue });
    return (
      <SelectionStory {...args} onSelect={handleSelect} onFocus={handleFocus} />
    );
  },
  name: 'Controlled',
  args: { selectedValue: 'item-3' },
  argTypes: {
    selectedValue: { control: { type: 'text' } },
    focusedValue: { control: { type: 'text' } },
    defaultFocusedValue: { control: false },
    defaultSelectedValue: { control: false }
  }
};
