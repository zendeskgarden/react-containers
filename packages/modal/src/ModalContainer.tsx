/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useModal } from './useModal';
import { IModalContainerProps } from './types';

export const ModalContainer: React.FC<IModalContainerProps> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useModal(options))}</>;

ModalContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  onClose: PropTypes.func,
  modalRef: PropTypes.any.isRequired,
  idPrefix: PropTypes.string,
  focusOnMount: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  environment: PropTypes.any
};

ModalContainer.defaultProps = {
  focusOnMount: true,
  restoreFocus: true
};
