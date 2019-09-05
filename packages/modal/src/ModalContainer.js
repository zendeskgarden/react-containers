/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useModal } from './useModal';

export function ModalContainer({ children, render = children, ...options }) {
  return render(useModal(options));
}

ModalContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  onClose: PropTypes.func,
  modalRef: PropTypes.object.isRequired,
  id: PropTypes.string,
  focusOnMount: PropTypes.bool,
  environment: PropTypes.object
};
