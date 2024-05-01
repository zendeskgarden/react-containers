import { useArgs } from '@storybook/client-api';
import { SplitterContainer } from '@zendeskgarden/container-splitter';
import { SplitterStory } from './stories/SplitterStory';
import README from '../README.md';

export default {
  title: 'Packages/Splitter',
  component: SplitterContainer,

  args: {
    as: 'hook',
    max: 700,
    min: 200,
    orientation: 'vertical'
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    splitterRef: {
      control: false
    }
  },

  parameters: {
    layout: 'padded'
  }
};

export const Uncontrolled = {
  render: args => <SplitterStory {...args} />,
  name: 'Uncontrolled',

  argTypes: {
    valueNow: {
      control: false
    }
  }
};

export const Controlled = {
  render: ({ ...args }) => {
    const updateArgs = useArgs()[1];

    const handleChange = valueNow =>
      updateArgs({
        valueNow
      });

    return <SplitterStory {...args} onChange={handleChange} />;
  },

  name: 'Controlled',

  args: {
    valueNow: 300
  },

  argTypes: {
    defaultValueNow: {
      control: false
    }
  }
};
