import React, { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { NestedStory } from './stories/NestedStory';
import { BASE_ITEMS, NESTED_ITEMS } from './stories/data';

type Story = StoryObj<typeof NestedStory>;

const meta: Meta<typeof NestedStory> = { title: 'Packages/Menu/[patterns]' };

export default meta;

export const NestedFocusUncontrolled: Story = {
  render: function Render(args) {
    const [_, updateArgs, resetArgs] = useArgs();
    const onChange = useCallback(({ type, isExpanded }) => {
      const isNext = type.includes('next');
      const isPrev = type.includes('previous');
      if (isNext || isPrev) {
        updateArgs({ items: isNext ? NESTED_ITEMS : BASE_ITEMS });
      } else if (isExpanded === false) {
        resetArgs(['items']);
      }
    }, []);
    return <NestedStory {...args} onChange={onChange} />;
  },
  name: 'Nested focus uncontrolled',
  args: { rtl: false, items: BASE_ITEMS }
};

export const NestedFocusControlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];
    const onChange = useCallback(
      ({ type, focusedValue, isExpanded }) => {
        const isNext = type.includes('next');
        const isPrev = type.includes('previous');
        const _focusedValue = focusedValue || args.focusedValue;
        if (isNext || isPrev) {
          updateArgs({
            items: isNext ? NESTED_ITEMS : BASE_ITEMS,
            focusedValue: isNext ? 'Fruits' : 'Berry'
          });
        } else if (isExpanded === false) {
          updateArgs({ items: BASE_ITEMS, focusedValue: _focusedValue });
        } else {
          updateArgs({ focusedValue: _focusedValue });
        }
      },
      [args.focusedValue]
    );
    return <NestedStory {...args} onChange={onChange} />;
  },
  name: 'Nested focus controlled',
  argTypes: { focusedValue: { control: { type: 'text' } } },
  args: { rtl: false, items: BASE_ITEMS, focusedValue: 'Orange' }
};
