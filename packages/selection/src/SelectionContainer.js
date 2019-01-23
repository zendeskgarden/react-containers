/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import useSelection from './useSelection';

const KEYBOARD_DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  BOTH: 'both'
};

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
  focusedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Unique key of currently selected item
   */
  selectedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Callback for all state objects. Used when in 'controlled' mode.
   **/
  onStateChange: PropTypes.func,
  /**
   * The root ID to use for descendants. A unique ID is created if none is provided.
   **/
  id: PropTypes.string,
  /**
   * Same as children
   **/
  render: PropTypes.func
};
