/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useKeyboardFocus, IUseKeyboardFocusReturnValue } from './useKeyboardFocus';

export interface IKeyboardFocusProps {
  /** A children render prop function */
  render?: (options: IUseKeyboardFocusReturnValue) => React.ReactNode;
  /** A render prop function */
  children?: (options: IUseKeyboardFocusReturnValue) => React.ReactNode;
}

export const KeyboardFocusContainer: React.FunctionComponent<IKeyboardFocusProps> = ({
  children,
  render = children
}) => {
  return <>{render!(useKeyboardFocus()) as React.ReactElement}</>;
};

KeyboardFocusContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};
