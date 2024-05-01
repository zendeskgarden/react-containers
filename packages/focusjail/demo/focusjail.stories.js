import { useRef } from 'react';
import { FocusJailContainer } from '@zendeskgarden/container-focusjail';
import { FocusJailStory } from './stories/FocusJailStory';
import README from '../README.md';

export default {
  title: 'Packages/FocusJail',
  component: FocusJailContainer
};

export const FocusJail = {
  render: args => {
    const containerRef = useRef();
    return <FocusJailStory {...args} containerRef={containerRef} />;
  },

  name: 'FocusJail',

  args: {
    as: 'hook',
    focusOnMount: true,
    restoreFocus: true
  },

  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    containerRef: {
      control: false
    }
  }
};
