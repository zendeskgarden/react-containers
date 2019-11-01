/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { composeEventHandlers, generateId, KEY_CODES } from '@zendeskgarden/container-utilities';
import { useFocusJail } from '@zendeskgarden/container-focusjail';

export interface IUseModalProps {
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  modalRef: React.RefObject<HTMLElement>;
  id?: string;
  focusOnMount?: boolean;
  environment?: Document;
}

export interface IUseModalReturnValue {
  getBackdropProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getModalProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getTitleProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getContentProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getCloseProps: <T>(options?: T) => T & React.ButtonHTMLAttributes<any>;
  closeModal?: (event: any) => void;
}

export function useModal(
  { onClose, modalRef, id: _id, focusOnMount, environment }: IUseModalProps = {} as any
): IUseModalReturnValue {
  const [idPrefix] = useState(_id || generateId('garden-modal-container'));
  const titleId = `${idPrefix}--title`;
  const contentId = `${idPrefix}--content`;

  const closeModal = (event: KeyboardEvent | MouseEvent) => {
    onClose && onClose(event);
  };

  const getBackdropProps = ({ onClick, ...other } = {} as any) => {
    return {
      onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
        closeModal(event);
      }),
      'data-garden-container-id': 'containers.modal',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getModalProps = ({ role = 'dialog', onClick, onKeyDown, ...other } = {} as any) => {
    return {
      role,
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': titleId,
      'aria-describedby': contentId,
      onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
        /**
         * Don't want to trigger the backdrop close event
         * if click originates within the Modal
         */
        event.stopPropagation();
      }),
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
        if (event.keyCode === KEY_CODES.ESCAPE) {
          closeModal(event);
        }
      }),
      ...other
    };
  };

  const getTitleProps = ({ id = titleId, ...other } = {} as any) => {
    return {
      id,
      ...other
    };
  };

  const getContentProps = ({ id = contentId, ...other } = {} as any) => {
    return {
      id,
      ...other
    };
  };

  const getCloseProps = ({ onClick, ...other } = {} as any) => {
    return {
      'aria-label': 'Close modal',
      onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
        closeModal(event);
      }),
      ...other
    };
  };

  const { getContainerProps } = useFocusJail({ containerRef: modalRef, focusOnMount, environment });

  return {
    getBackdropProps,
    getModalProps: props => getContainerProps(getModalProps(props)),
    getTitleProps,
    getContentProps,
    getCloseProps,
    closeModal
  };
}
