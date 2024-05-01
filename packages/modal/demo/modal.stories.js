import { useRef } from 'react';
import { useArgs } from '@storybook/client-api';
import { ModalContainer } from '@zendeskgarden/container-modal';
import { ModalStory } from './stories/ModalStory';
import README from '../README.md';

export default {
  title: 'Packages/Modal',
  component: ModalContainer
};

export const Modal = {
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
