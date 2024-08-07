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
  idPrefix: PropTypes.string,
  triggerRef: PropTypes.any.isRequired,
  inputRef: PropTypes.any.isRequired,
  listboxRef: PropTypes.any.isRequired,
  isAutocomplete: PropTypes.bool,
  isMultiselectable: PropTypes.bool,
  isEditable: PropTypes.bool,
  disabled: PropTypes.bool,
  hasHint: PropTypes.bool,
  hasMessage: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  inputValue: PropTypes.string,
  selectionValue: PropTypes.any,
  isExpanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  initialExpanded: PropTypes.bool,
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number,
  initialActiveIndex: PropTypes.number,
  onChange: PropTypes.func,
  environment: PropTypes.any
};

ComboboxContainer.defaultProps = {
  isEditable: true
};
