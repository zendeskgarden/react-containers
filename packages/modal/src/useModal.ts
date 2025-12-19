/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useRef, KeyboardEvent, MouseEvent, MouseEventHandler } from 'react';
import { composeEventHandlers, KEYS, useId } from '@zendeskgarden/container-utilities';
import { useFocusJail } from '@zendeskgarden/container-focusjail';
import { IUseModalProps, IUseModalReturnValue } from './types';

export const useModal = <T extends Element = Element>({
  onClose,
  modalRef,
  idPrefix,
  focusOnMount,
  restoreFocus,
  environment
}: IUseModalProps<T>): IUseModalReturnValue => {
  const prefix = useId(idPrefix);
  const titleId = `${prefix}__title`;
  const contentId = `${prefix}__content`;
  const isBackdropMouseDownRef = useRef(false);
  const isModalMouseDownRef = useRef(false);

  const closeModal: IUseModalReturnValue['closeModal'] = event => {
    onClose?.(event);
  };

  const getBackdropProps: IUseModalReturnValue['getBackdropProps'] = ({
    onMouseDown,
    onMouseUp,
    ...other
  } = {}) => {
    const containerId = 'containers.modal';

    const handleMouseDown: MouseEventHandler = () => {
      isBackdropMouseDownRef.current = true;
    };

    const handleMouseUp: MouseEventHandler = event => {
      const target = event.target as Element;
      const isModalContainer = containerId === target.getAttribute('data-garden-container-id');

      if (!isModalMouseDownRef.current && isModalContainer) {
        closeModal(event);
      }

      isModalMouseDownRef.current = false;

      // Timeout is required to allow modal onBlur to settle first
      setTimeout(() => {
        isBackdropMouseDownRef.current = false;
      });
    };

    return {
      onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
      onMouseUp: composeEventHandlers(onMouseUp, handleMouseUp),
      'data-garden-container-id': containerId,
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getModalProps: IUseModalReturnValue['getModalProps'] = ({
    role = 'dialog',
    onBlur,
    onKeyDown,
    onMouseDown,
    ...other
  } = {}) => ({
    role: role === null ? undefined : role,
    tabIndex: -1,
    'aria-modal': true,
    'aria-labelledby': titleId,
    'aria-describedby': contentId,
    onBlur: composeEventHandlers(onBlur, event => {
      const doc = environment || document;
      const relatedTarget = event.relatedTarget as Element | null;

      if (relatedTarget === null || !modalRef.current?.contains(relatedTarget)) {
        // Timeout is required to ensure blur is handled after focus
        setTimeout(() => {
          const activeElement = doc.activeElement;

          if (!(isBackdropMouseDownRef.current || modalRef.current?.contains(activeElement))) {
            closeModal(event);
          }
        });
      }
    }),
    onMouseDown: composeEventHandlers(onMouseDown, () => {
      isModalMouseDownRef.current = true;
    }),
    onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
      if (event.key === KEYS.ESCAPE) {
        closeModal(event);
      }
    }),
    ...other
  });

  const getTitleProps: IUseModalReturnValue['getTitleProps'] = ({
    id = titleId,
    ...other
  } = {}) => ({
    id,
    ...other
  });

  const getContentProps: IUseModalReturnValue['getContentProps'] = ({
    id = contentId,
    ...other
  } = {}) => ({
    id,
    ...other
  });

  const getCloseProps: IUseModalReturnValue['getCloseProps'] = ({ onClick, ...other }) => ({
    onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
      closeModal(event);
    }),
    ...other
  });

  const { getContainerProps } = useFocusJail<T>({
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
};
