import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { GridContainer } from '@zendeskgarden/container-grid';
import { GridStory } from './stories/GridStory';
import { MATRIX } from './stories/data';
type Story = StoryObj<typeof GridStory>;

const meta: Meta<typeof GridStory> = {
  title: 'Packages/Grid',
  component: GridContainer,

  args: {
    as: 'hook',
    layout: 'button',
    matrix: MATRIX,
    'aria-label': 'Grid'
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    layout: {
      options: ['button', 'radio', 'text'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    }
  }
};

export default meta;

export const Uncontrolled: Story = {
  render: args => <GridStory {...args} />,
  name: 'Uncontrolled',

  argTypes: {
    colIndex: {
      control: false
    },

    rowIndex: {
      control: false
    }
  }
};

export const Controlled: Story = {
  render: args => {
    const updateArgs = useArgs()[1];

    const handleChange = (rowIndex, colIndex) =>
      updateArgs({
        rowIndex,
        colIndex
      });

    return <GridStory {...args} onChange={handleChange} />;
  },

  name: 'Controlled',

  argTypes: {
    defaultColIndex: {
      control: false
    },

    defaultRowIndex: {
      control: false
    }
  }
};
