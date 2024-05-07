/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { AccordionContainer } from '@zendeskgarden/container-accordion';
import { AccordionStory } from './stories/AccordionStory';
import { SECTIONS } from './stories/data';

type Story = StoryObj<typeof AccordionStory>;

const meta: Meta<typeof AccordionStory> = {
  title: 'Packages/Accordion',
  component: AccordionContainer,
  args: { as: 'hook', sections: SECTIONS },
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
  render: args => <AccordionStory {...args} />,
  name: 'Uncontrolled',
  args: { collapsible: true, expandable: true },
  argTypes: { expandedSections: { control: false } }
};

export const Controlled: Story = {
  render: function Render(args) {
    const updateArgs = useArgs()[1];

    return (
      <AccordionStory
        {...args}
        onChange={value => {
          let expandedSections = args.expandedSections || [];

          expandedSections = expandedSections!.includes(value)
            ? expandedSections!.filter(section => section !== value)
            : [...expandedSections!, value];

          updateArgs({ expandedSections });
        }}
      />
    );
  },
  name: 'Controlled',
  args: { expandedSections: SECTIONS.slice(0, 1) },
  argTypes: {
    defaultExpandedSections: { control: false },
    collapsible: { control: false },
    expandable: { control: false }
  }
};
