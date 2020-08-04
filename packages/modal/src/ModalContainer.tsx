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
  render?: (options: IUseModalReturnValue) => React.ReactNode;
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
  /** A children render prop function */
  children: PropTypes.func,
  /** A render prop function */
  render: PropTypes.func,
  /** A callback when a close action has been completed */
  onClose: PropTypes.func,
  /** A ref pointing to a DOM element which contains the modal content */
  modalRef: PropTypes.any.isRequired,
  /** An ID that is applied to modal elements */
  id: PropTypes.string,
  /** Determines if the modal's focus jail container should focus on mount */
  focusOnMount: PropTypes.bool,
  /** The environment where the focus jail is rendered */
  environment: PropTypes.any
};
