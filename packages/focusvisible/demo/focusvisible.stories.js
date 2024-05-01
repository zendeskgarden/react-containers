import { useRef } from 'react';
import { FocusVisibleContainer } from '@zendeskgarden/container-focusvisible';
import { FocusVisibleStory } from './stories/FocusVisibleStory';
import README from '../README.md';

export default {
  title: 'Packages/FocusVisible',
  component: FocusVisibleContainer
};

export const FocusVisible = {
  render: args => {
    const scope = useRef();
    return <FocusVisibleStory {...args} scope={scope} />;
  },

  name: 'FocusVisible',

  args: {
    as: 'hook'
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    className: {
      control: false
    },

    dataAttribute: {
      control: false
    }
  }
};
