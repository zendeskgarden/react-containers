import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { AccordionContainer } from '@zendeskgarden/container-accordion';
import { AccordionStory } from './stories/AccordionStory';
import { SECTIONS } from './stories/data.ts';
type Story = StoryObj<typeof AccordionStory>;

const meta: Meta<typeof AccordionStory> = {
  title: 'Packages/Accordion',
  component: AccordionContainer,

  args: {
    as: 'hook',
    sections: SECTIONS
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    }
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <AccordionStory {...args} />,
  name: 'Uncontrolled',

  args: {
    collapsible: true,
    expandable: true
  },

  argTypes: {
    expandedSections: {
      control: false
    }
  }
};

export const Controlled: Story = {
  render: args => {
    const updateArgs = useArgs()[1];

    const handleChange = value => {
      const expandedSections = args.expandedSections.includes(value)
        ? args.expandedSections.filter(section => section !== value)
        : [...args.expandedSections, value];

      updateArgs({
        expandedSections
      });
    };

    return <AccordionStory {...args} onChange={handleChange} />;
  },

  name: 'Controlled',

  args: {
    expandedSections: SECTIONS.slice(0, 1)
  },

  argTypes: {
    defaultExpandedSections: {
      control: false
    },

    collapsible: {
      control: false
    },

    expandable: {
      control: false
    }
  }
};
