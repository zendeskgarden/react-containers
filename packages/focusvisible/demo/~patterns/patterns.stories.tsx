/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectionStory } from './stories/SelectionStory';

const meta: Meta<typeof SelectionStory> = {
  title: 'Packages/FocusVisible/[patterns]'
};

export default meta;

export const Selection: StoryObj<typeof SelectionStory> = {
  render: args => <SelectionStory {...args} />,
  name: 'Selection'
};
