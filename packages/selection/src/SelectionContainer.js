/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import useSelection from './useSelection';
import KEYBOARD_DIRECTION from './utils/DIRECTIONS';

export default function SelectionContainer({ children, render = children, ...props }) {
  return render(useSelection(props));
}

SelectionContainer.propTypes = {
  children: PropTypes.func,
  direction: PropTypes.oneOf([
    KEYBOARD_DIRECTION.HORIZONTAL,
    KEYBOARD_DIRECTION.VERTICAL,
    KEYBOARD_DIRECTION.BOTH
  ]),
  /**
   * Default item to assign as focused if container is focused (-1 is equivalent to last item)
   */
  defaultFocusedIndex: PropTypes.number,
  /**
   * Unique key of currently focused item
   */
  focusedIndex: PropTypes.number,
  /**
   * Unique key of currently selected item
   */
  selectedIndex: PropTypes.number,
  /**
   * Callback for all state objects. Used when in 'controlled' mode.
   **/
  onStateChange: PropTypes.func,
  /**
   * Same as children
   **/
  render: PropTypes.func
};
