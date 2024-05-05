/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbContainer } from '@zendeskgarden/container-breadcrumb';
import { BreadcrumbStory } from './stories/BreadcrumbStory';

const meta: Meta<typeof BreadcrumbStory> = {
  title: 'Packages/Breadcrumb',
  component: BreadcrumbContainer
};

export default meta;

export const Breadcrumb: StoryObj<typeof BreadcrumbStory> = {
  render: args => <BreadcrumbStory {...args} />,
  name: 'Breadcrumb',
  args: { as: 'hook', 'aria-label': 'Breadcrumbs' },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    'aria-label': { control: 'text' }
  }
};
