/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IMEStory } from './stories/IMEStory';

const meta: Meta<typeof IMEStory> = { title: 'Packages/Combobox/[patterns]' };

export default meta;

export const Ime: StoryObj<typeof IMEStory> = {
  render: args => <IMEStory {...args} />,
  name: 'IME'
};
