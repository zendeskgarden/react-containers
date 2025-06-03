/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusStory } from './stories/FocusStory';
import { MenuStory } from './stories/MenuStory';

const meta: Meta = { title: 'Packages/Tooltip/[patterns]' };

export default meta;

export const Focus: StoryObj<typeof FocusStory> = {
  render: args => <FocusStory {...args} />,
  name: 'Focus'
};

export const Menu: StoryObj<typeof MenuStory> = {
  render: args => <MenuStory {...args} />,
  name: 'Menu'
};
