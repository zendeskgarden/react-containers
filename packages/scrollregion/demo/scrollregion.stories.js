import { useRef } from 'react';
import { ScrollRegionContainer } from '@zendeskgarden/container-scrollregion';
import { ScrollRegionStory } from './stories/ScrollRegionStory';
import { DEPENDENCY } from './stories/data';
import README from '../README.md';

export default {
  title: 'Packages/ScrollRegion',
  component: ScrollRegionContainer
};

export const ScrollRegion = {
  render: args => {
    const containerRef = useRef();
    return <ScrollRegionStory {...args} containerRef={containerRef} />;
  },

  name: 'ScrollRegion',

  args: {
    as: 'hook',
    height: 100,
    width: 200,
    dependency: DEPENDENCY
  },

  argTypes: {
    containerRef: {
      control: false
    },

    as: {
      options: ['container', 'hook'],
      control: 'radio',

      table: {
        category: 'Story'
      }
    },

    height: {
      table: {
        category: 'Story'
      }
    },

    width: {
      table: {
        category: 'Story'
      }
    }
  }
};
