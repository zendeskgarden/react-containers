/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useButtonGroup, IUseButtonGroupProps, UseButtonGroupReturnValue } from './useButtonGroup';

export interface IButtonGroupContainerProps<Item> extends IUseButtonGroupProps<Item> {
  render?: (options: UseButtonGroupReturnValue<Item>) => React.ReactNode;
  children?: (options: UseButtonGroupReturnValue<Item>) => React.ReactNode;
}

export const ButtonGroupContainer: React.FunctionComponent<IButtonGroupContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useButtonGroup(options)) as React.ReactElement}</>;
};

ButtonGroupContainer.propTypes = {
  /** A render prop function */
  children: PropTypes.func,
  /** A children render prop function */
  render: PropTypes.func,
  /** The focused item in a controlled buttongroup */
  focusedItem: PropTypes.any,
  /** The selected item in a controlled buttongroup */
  selectedItem: PropTypes.any,
  /** A callback function that receives the selected item */
  onSelect: PropTypes.func,
  /** A callback function that receives the focused item */
  onFocus: PropTypes.func
};
