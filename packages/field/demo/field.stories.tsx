/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FieldContainer } from '@zendeskgarden/container-field';
import { FieldStory } from './stories/FieldStory';

const meta: Meta<typeof FieldStory> = {
  title: 'Packages/Field',
  component: FieldContainer
};

export default meta;

export const Field: StoryObj<typeof FieldStory> = {
  render: args => <FieldStory {...args} />,
  name: 'Field',
  args: { as: 'hook', hasHint: true, hasMessage: true },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    }
  }
};
