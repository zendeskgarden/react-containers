/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from './useCombobox';
import { IComboboxContainerProps } from './types';

export const ComboboxContainer: React.FC<IComboboxContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useCombobox(options))}</>;
};

ComboboxContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  triggerRef: PropTypes.any.isRequired,
  inputRef: PropTypes.any.isRequired,
  listboxRef: PropTypes.any.isRequired,
  isMultiselectable: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  transformValue: PropTypes.func,
  defaultExpanded: PropTypes.bool,
  onExpansionChange: PropTypes.func
};
