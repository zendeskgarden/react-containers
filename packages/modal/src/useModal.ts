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
  const isModalMousedDownRef = useRef(false);

  const closeModal: IUseModalReturnValue['closeModal'] = event => {
    onClose && onClose(event);
  };

  const getBackdropProps: IUseModalReturnValue['getBackdropProps'] = ({
    onMouseUp,
    ...other
  } = {}) => {
    const containerId = 'containers.modal';

    const handleMouseUp: MouseEventHandler = event => {
      const target = event.target as Element;
      const isModalContainer = containerId === target.getAttribute('data-garden-container-id');

      if (!isModalMousedDownRef.current && isModalContainer) {
        closeModal(event);
      }

      isModalMousedDownRef.current = false;
    };

    return {
      onMouseUp: composeEventHandlers(onMouseUp, handleMouseUp),
      'data-garden-container-id': containerId,
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getModalProps: IUseModalReturnValue['getModalProps'] = ({
    role = 'dialog',
    onKeyDown,
    onMouseDown,
    ...other
  } = {}) => ({
    role: role === null ? undefined : role,
    tabIndex: -1,
    'aria-modal': true,
    'aria-labelledby': titleId,
    'aria-describedby': contentId,
    onMouseDown: composeEventHandlers(onMouseDown, () => {
      isModalMousedDownRef.current = true;
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
