/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { composeEventHandlers, generateId, KEY_CODES } from '@zendeskgarden/container-utilities';
import { useFocusJail } from '@zendeskgarden/container-focusjail';

const HOOK_ID = 'modal';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function useModal({ onClose, modalRef, id: _id } = {}) {
  const [idPrefix] = useState(_id || generateId('garden-modal-container'));
  const titleId = `${idPrefix}--title`;
  const contentId = `${idPrefix}--content`;

  const closeModal = event => {
    onClose && onClose(event);
  };

  const getBackdropProps = ({ onClick, ...other } = {}) => {
    return {
      onClick: composeEventHandlers(onClick, event => {
        closeModal(event);
      }),
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
      ...other
    };
  };

  const getModalProps = ({ role = 'dialog', onClick, onKeyDown, ...other } = {}) => {
    return {
      role,
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': titleId,
      'aria-describedby': contentId,
      onClick: composeEventHandlers(onClick, event => {
        /**
         * Don't want to trigger the backdrop close event
         * if click originates within the Modal
         */
        event.stopPropagation();
      }),
      onKeyDown: composeEventHandlers(onKeyDown, event => {
        if (event.keyCode === KEY_CODES.ESCAPE) {
          closeModal(event);
        }
      }),
      ...other
    };
  };

  const getTitleProps = ({ id = titleId, ...other } = {}) => {
    return {
      id,
      ...other
    };
  };

  const getContentProps = ({ id = contentId, ...other } = {}) => {
    return {
      id,
      ...other
    };
  };

  const getCloseProps = ({ onClick, ...other } = {}) => {
    return {
      'aria-label': 'Close modal',
      onClick: composeEventHandlers(onClick, event => {
        closeModal(event);
      }),
      ...other
    };
  };

  const { getContainerProps } = useFocusJail({ containerRef: modalRef });

  return {
    getBackdropProps,
    getModalProps: props => getContainerProps(getModalProps(props)),
    getTitleProps,
    getContentProps,
    getCloseProps,
    closeModal
  };
}
