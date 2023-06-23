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
  direction: 'horizontal'
};

SelectionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
  rtl: PropTypes.bool,
  direction: PropTypes.oneOf(['horizontal', 'vertical', 'both']),
  defaultFocusedValue: PropTypes.string,
  defaultSelectedValue: PropTypes.string,
  focusedValue: PropTypes.any,
  selectedValue: PropTypes.any,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func
};
