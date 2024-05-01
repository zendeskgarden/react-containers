import { useArgs } from '@storybook/client-api';
import { TabsContainer } from '@zendeskgarden/container-tabs';
import { TabsStory } from './stories/TabsStory';
import { TABS } from './stories/data';
import README from '../README.md';

export default {
  title: 'Packages/Tabs',
  component: TabsContainer,

  args: {
    as: 'hook',
    orientation: 'horizontal',
    tabs: TABS,
    defaultSelectedValue: TABS[0].value
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
  render: args => <TabsStory {...args} />,
  name: 'Uncontrolled',

  argTypes: {
    selectedValue: {
      control: false
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

    return <TabsStory {...args} onSelect={handleSelect} />;
  },

  name: 'Controlled',

  argTypes: {
    defaultSelectedValue: {
      control: false
    }
  }
};
