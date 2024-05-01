import { useArgs } from '@storybook/client-api';
import { SelectionContainer } from '@zendeskgarden/container-selection';
import { SelectionStory } from './stories/SelectionStory';
import { VALUES } from './stories/data';
import README from '../README.md';

export default {
  title: 'Packages/Selection',
  component: SelectionContainer,

  args: {
    as: 'hook',
    values: VALUES,
    direction: 'horizontal'
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
  render: args => <SelectionStory {...args} />,
  name: 'Uncontrolled',

  args: {
    defaultFocusedValue: 'item-1'
  },

  argTypes: {
    selectedValue: {
      control: false
    },

    focusedValue: {
      control: false
    },

    defaultFocusedValue: {
      control: {
        type: 'text'
      }
    },

    defaultSelectedValue: {
      control: {
        type: 'text'
      }
    }
  }
};

export const Controlled = {
  render: args => {
    const updateArgs = useArgs()[1];

    const handleSelect = selectedValue =>
      updateArgs({
        selectedValue
      });

    const handleFocus = focusedValue =>
      updateArgs({
        focusedValue
      });

    return <SelectionStory {...args} onSelect={handleSelect} onFocus={handleFocus} />;
  },

  name: 'Controlled',

  args: {
    selectedValue: 'item-3'
  },

  argTypes: {
    selectedValue: {
      control: {
        type: 'text'
      }
    },

    focusedValue: {
      control: {
        type: 'text'
      }
    },

    defaultFocusedValue: {
      control: false
    },

    defaultSelectedValue: {
      control: false
    }
  }
};
