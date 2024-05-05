/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusJailContainer } from '@zendeskgarden/container-focusjail';
import { FocusJailStory } from './stories/FocusJailStory';

const meta: Meta<typeof FocusJailStory> = {
  title: 'Packages/FocusJail',
  component: FocusJailContainer
};

export default meta;

export const FocusJail: StoryObj<typeof FocusJailStory> = {
  render: function Render(args) {
    const containerRef = useRef();
    return <FocusJailStory {...args} containerRef={containerRef} />;
  },
  name: 'FocusJail',
  args: { as: 'hook', focusOnMount: true, restoreFocus: true },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    containerRef: { control: false }
  }
};
