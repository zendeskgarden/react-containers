/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { ModalContainer } from '@zendeskgarden/container-modal';
import { ModalStory } from './stories/ModalStory';

const meta: Meta<typeof ModalStory> = {
  title: 'Packages/Modal',
  component: ModalContainer as Meta<typeof ModalStory>['component']
};

export default meta;

export const Modal: StoryObj<typeof ModalStory> = {
  render: function Render(args) {
    const modalRef = useRef<HTMLDivElement>(null);
    const updateArgs = useArgs()[1];

    return (
      <ModalStory
        {...args}
        modalRef={modalRef}
        onClose={() => {
          action('onClose')();
          updateArgs({ isOpen: false });
        }}
        onOpen={() => {
          action('onOpen')();
          updateArgs({ isOpen: true });
        }}
      />
    );
  },
  name: 'Modal',
  args: { as: 'hook', isOpen: true, focusOnMount: true, restoreFocus: true },
  argTypes: {
    as: {
      options: ['container', 'hook'],
      control: 'radio',
      table: { category: 'Story' }
    },
    isOpen: { table: { category: 'Story' } },
    modalRef: { control: false }
  }
};
