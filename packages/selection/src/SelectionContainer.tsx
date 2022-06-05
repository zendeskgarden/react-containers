/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelection } from './useSelection';
import { ISelectionContainerProps } from './types';

export const SelectionContainer: React.FC<ISelectionContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useSelection(options))}</>;

SelectionContainer.defaultProps = {
  direction: 'horizontal',
  defaultFocusedIndex: 0
};

SelectionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  rtl: PropTypes.bool,
  direction: PropTypes.oneOf(['horizontal', 'vertical', 'both']),
  defaultFocusedIndex: PropTypes.number,
  defaultSelectedIndex: PropTypes.number,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func
};
