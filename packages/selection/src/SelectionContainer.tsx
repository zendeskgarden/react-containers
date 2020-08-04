/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useSelection, IUseSelectionProps, UseSelectionReturnValue } from './useSelection';

export interface ISelectionContainerProps<Item> extends IUseSelectionProps<Item> {
  render?: (options: UseSelectionReturnValue<Item>) => React.ReactNode;
  children?: (options: UseSelectionReturnValue<Item>) => React.ReactNode;
}

export const SelectionContainer: React.FunctionComponent<ISelectionContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useSelection(options)) as React.ReactElement}</>;
};

SelectionContainer.defaultProps = {
  direction: 'horizontal',
  defaultFocusedIndex: 0
};

SelectionContainer.propTypes = {
  /** A children render prop function which receives selection state */
  children: PropTypes.func,
  /** A render prop function which receives selection state */
  render: PropTypes.func,
  /** Determines if selection uses right-to-left writing direction */
  rtl: PropTypes.bool,
  /** Determines the orientation of the selection */
  direction: PropTypes.oneOf(['horizontal', 'vertical', 'both']),
  /** Sets the  initial focused item */
  defaultFocusedIndex: PropTypes.number,
  /** Sets the focused item in a controlled selection */
  focusedItem: PropTypes.any,
  /** Sets the selected item in a controlled selection */
  selectedItem: PropTypes.any,
  /** A callback function that receives the selected item */
  onSelect: PropTypes.func,
  /** A callback function that receives the focused item */
  onFocus: PropTypes.func
};
