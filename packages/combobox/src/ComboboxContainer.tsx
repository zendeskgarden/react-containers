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
  values: PropTypes.arrayOf(PropTypes.string),
  onOpenChange: PropTypes.func
};
