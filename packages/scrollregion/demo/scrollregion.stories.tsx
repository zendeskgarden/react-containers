/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollRegionContainer } from '@zendeskgarden/container-scrollregion';
import { ScrollRegionStory } from './stories/ScrollRegionStory';
import { DEPENDENCY } from './stories/data';

const meta: Meta<typeof ScrollRegionStory> = {
  title: 'Packages/ScrollRegion',
  component: ScrollRegionContainer as Meta<typeof ScrollRegionStory>['component']
};

export default meta;

export const ScrollRegion: StoryObj<typeof ScrollRegionStory> = {
  render: function Render(args) {
    const containerRef = useRef<HTMLDivElement>(null);

    return <ScrollRegionStory {...args} containerRef={containerRef} />;
  },
  name: 'ScrollRegion',
  args: { as: 'hook', height: 100, width: 200, dependency: DEPENDENCY },
  argTypes: {
    containerRef: { control: false },
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    height: { table: { category: 'Story' } },
    width: { table: { category: 'Story' } }
  }
};
