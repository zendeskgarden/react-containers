import { useArgs } from '@storybook/client-api';
import { GridContainer } from '@zendeskgarden/container-grid';
import { GridStory } from './stories/GridStory';
import { MATRIX } from './stories/data';
import README from '../README.md';

export default {
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

export const Uncontrolled = {
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

export const Controlled = {
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
