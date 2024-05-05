import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { ModalContainer } from '@zendeskgarden/container-modal';
import { ModalStory } from './stories/ModalStory';

const meta: Meta<typeof ModalStory> = {
  title: 'Packages/Modal',
  component: ModalContainer
};

export default meta;

export const Modal: StoryObj<typeof ModalStory> = {
  render: args => {
    const modalRef = useRef();
    const updateArgs = useArgs()[1];

    const handleClose = () =>
      updateArgs({
        isOpen: false
      });

    const handleOpen = () =>
      updateArgs({
        isOpen: true
      });

    return <ModalStory {...args} modalRef={modalRef} onClose={handleClose} onOpen={handleOpen} />;
  },

  name: 'Modal',

  args: {
    as: 'hook',
    isOpen: true,
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

    isOpen: {
      table: {
        category: 'Story'
      }
    },

    modalRef: {
      control: false
    }
  }
};
