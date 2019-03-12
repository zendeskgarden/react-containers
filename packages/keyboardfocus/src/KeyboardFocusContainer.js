/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useKeyboardFocus } from './useKeyboardFocus';

export function KeyboardFocusContainer({ children, render = children }) {
  return render(useKeyboardFocus());
}

/** TODO: Update prop-types */
KeyboardFocusContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};
