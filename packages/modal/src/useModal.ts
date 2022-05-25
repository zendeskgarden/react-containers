/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useRef, useMemo, KeyboardEvent, MouseEvent } from 'react';
import { useUIDSeed } from 'react-uid';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-utilities';
import { useFocusJail } from '@zendeskgarden/container-focusjail';

export interface IUseModalProps<RefType = HTMLElement> {
  /** A callback when a close action has been completed */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /** A ref pointing to a DOM element which contains the modal content */
  modalRef: React.RefObject<RefType>;
  /** An ID that is applied to modal elements */
  id?: string;
  /** Determines if the modal's focus jail container should focus on mount */
  focusOnMount?: boolean;
  /** Determines whether to return keyboard focus to the element that triggered the modal */
  restoreFocus?: boolean;
  /** The environment where the focus jail is rendered */
  environment?: Document;
}

export interface IUseModalReturnValue {
  getBackdropProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getModalProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getTitleProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getContentProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getCloseProps: <T>(options?: T) => T & React.HTMLProps<any>;
  closeModal?: (event: any) => void;
}

export function useModal(
  {
    onClose,
    modalRef,
    id: _id,
    focusOnMount,
    restoreFocus,
    environment
  }: IUseModalProps = {} as any
): IUseModalReturnValue {
  const seed = useUIDSeed();
  const idPrefix = useMemo(() => _id || seed(`modal_${PACKAGE_VERSION}`), [_id, seed]);
  const titleId = `${idPrefix}--title`;
  const contentId = `${idPrefix}--content`;
  const isModalMousedDownRef = useRef(false);

  const closeModal = (event: KeyboardEvent | MouseEvent) => {
    onClose && onClose(event);
  };

  const getBackdropProps = ({ onMouseUp, ...other } = {} as any) => {
    const containerId = 'containers.modal';

    return {
      onMouseUp: composeEventHandlers(onMouseUp, (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const isModalContainer = containerId === target.getAttribute('data-garden-container-id');

        if (!isModalMousedDownRef.current && isModalContainer) {
          closeModal(event);
        }

        isModalMousedDownRef.current = false;
      }),
      'data-garden-container-id': containerId,
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getModalProps = ({ role = 'dialog', onKeyDown, onMouseDown, ...other } = {} as any) => {
    return {
      role,
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': titleId,
      'aria-describedby': contentId,
      onMouseDown: composeEventHandlers(onMouseDown, () => {
        isModalMousedDownRef.current = true;
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

  const { getContainerProps } = useFocusJail({
    containerRef: modalRef,
    focusOnMount,
    restoreFocus,
    environment
  });

  return {
    getBackdropProps,
    getModalProps: props => getContainerProps(getModalProps(props)),
    getTitleProps,
    getContentProps,
    getCloseProps,
    closeModal
  };
}
