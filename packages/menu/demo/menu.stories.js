import { useCallback } from 'react';
import { useArgs } from '@storybook/client-api';
import { MenuContainer } from '@zendeskgarden/container-menu';
import { MenuStory } from './stories/MenuStory';
import { ITEMS } from './stories/data';
import README from '../README.md';

export default {
  title: 'Packages/Menu',
  component: MenuContainer,

  args: {
    as: 'hook',
    items: ITEMS
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    menuRef: {
      control: false
    },

    triggerRef: {
      control: false
    }
  }
};

export const Uncontrolled = {
  render: args => <MenuStory {...args} />,
  name: 'Uncontrolled',

  argTypes: {
    isExpanded: {
      control: false
    },

    focusedValue: {
      control: false
    },

    selectedItems: {
      control: false
    }
  }
};

export const Controlled = {
  render: args => {
    const updateArgs = useArgs()[1];

    const handleChange = useCallback(changes => {
      const { type, ...args } = changes;

      updateArgs(args);
    }, []);

    return <MenuStory {...args} onChange={handleChange} />;
  },

  name: 'Controlled',

  argTypes: {
    defaultFocusedValue: {
      control: false
    },

    defaultExpanded: {
      control: false
    },

    focusedValue: {
      control: {
        type: 'text'
      }
    }
  },

  args: {
    isExpanded: false,
    focusedValue: 'plant-01',

    selectedItems: [
      {
        value: 'Cherry',
        type: 'checkbox'
      }
    ]
  }
};
