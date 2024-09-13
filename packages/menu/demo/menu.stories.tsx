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
    restoreFocus: true,
    focusedValue: 'plant-01',
    selectedItems: [{ value: 'Cherry', type: 'checkbox' }]
  }
};

export const ControlledManagedFocus: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    return (
      <MenuStory
        {...args}
        triggerRef={triggerRef}
        onChange={_args => {
          // eslint-disable-next-line no-console
          console.log('onChange:', _args);

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { type, isExpanded, ...rest } = _args;
          const { selectedItems } = rest;
          const nextArgs: typeof rest & { isExpanded?: boolean } = rest;

          const lastItem = selectedItems?.[selectedItems.length - 1];
          const isNonCheckboxItem = !selectedItems || lastItem?.type !== 'checkbox';

          if (isExpanded !== undefined && isNonCheckboxItem) {
            nextArgs.isExpanded = isExpanded;
          }

          if (!args.restoreFocus && nextArgs.isExpanded === false && triggerRef.current) {
            triggerRef.current.focus();
          }
          updateArgs(nextArgs);
        }}
      />
    );
  },
  name: 'Controlled + Managed Focus',
  argTypes: {
    defaultFocusedValue: { control: false },
    defaultExpanded: { control: false },
    focusedValue: { control: { type: 'text' } }
  },
  args: {
    isExpanded: false,
    restoreFocus: false,
    focusedValue: 'plant-01',
    selectedItems: [{ value: 'Cherry', type: 'checkbox' }]
  }
};
