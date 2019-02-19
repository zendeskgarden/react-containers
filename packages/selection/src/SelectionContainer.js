/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useSelection } from './useSelection';

export function SelectionContainer({ children, render = children, ...options }) {
  return render(useSelection(options));
}

/** TODO: Update prop-types */
SelectionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};
