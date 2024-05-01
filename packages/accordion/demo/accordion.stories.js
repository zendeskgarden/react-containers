import { useArgs } from '@storybook/client-api';
import { AccordionContainer } from '@zendeskgarden/container-accordion';
import { AccordionStory } from './stories/AccordionStory';
import { SECTIONS } from './stories/data.ts';
import README from '../README.md';

export default {
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

export const Uncontrolled = {
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

export const Controlled = {
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
