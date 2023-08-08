/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useMenu } from './useMenu';
import { IMenuContainerProps } from './types';

export const MenuContainer: React.FC<IMenuContainerProps<any, any>> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useMenu(options))}</>;
};

MenuContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  triggerRef: PropTypes.any.isRequired,
  menuRef: PropTypes.any.isRequired,
  idPrefix: PropTypes.string,
  environment: PropTypes.any,
  onChange: PropTypes.func,
  isExpanded: PropTypes.bool,
  initialExpanded: PropTypes.bool,
  selectedItems: PropTypes.arrayOf(PropTypes.any),
  focusedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialFocusedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
