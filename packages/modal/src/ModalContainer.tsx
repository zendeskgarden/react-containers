/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useModal, IUseModalProps, IUseModalReturnValue } from './useModal';

export interface IModalContainerProps extends IUseModalProps {
  /** A render prop function */
  render?: (options: IUseModalReturnValue) => React.ReactNode;
  /** A children render prop function */
  children?: (options: IUseModalReturnValue) => React.ReactNode;
}

export const ModalContainer: React.FunctionComponent<IModalContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useModal(options)) as React.ReactElement}</>;
};

ModalContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  onClose: PropTypes.func,
  modalRef: PropTypes.any.isRequired,
  id: PropTypes.string,
  focusOnMount: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  environment: PropTypes.any
};
