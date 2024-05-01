import { useArgs } from '@storybook/client-api';
import { ComboboxContainer } from '@zendeskgarden/container-combobox';
import { ComboboxStory } from './stories/ComboboxStory';
import { OPTIONS } from './stories/data';
import README from '../README.md';

export default {
  title: 'Packages/Combobox',
  component: ComboboxContainer,

  args: {
    as: 'hook',
    layout: 'Garden',
    isEditable: true,
    options: OPTIONS
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
      options: ['Downshift', 'Garden'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    inputRef: {
      control: false
    },

    listboxRef: {
      control: false
    },

    triggerRef: {
      control: false
    }
  }
};

export const Uncontrolled = {
  render: args => <ComboboxStory {...args} />,
  name: 'Uncontrolled',

  argTypes: {
    isExpanded: {
      control: false
    },

    inputValue: {
      control: false
    },

    activeIndex: {
      control: false
    },

    selectionValue: {
      control: false
    }
  }
};

export const Controlled = {
  render: args => {
    const updateArgs = useArgs()[1];

    const handleChange = changes => {
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
    defaultExpanded: {
      control: false
    },

    defaultSelectionValue: {
      control: false
    }
  }
};
