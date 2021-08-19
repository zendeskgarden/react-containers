/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTreeview, IUseTreeviewProps, IUseTreeviewReturnValue } from './useTreeview';

export interface ITreeviewContainerProps extends IUseTreeviewProps {
  /** Documents the render function */
  render?: (options: IUseTreeviewReturnValue) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUseTreeviewReturnValue) => React.ReactNode;
}

export const TreeviewContainer: React.FC<ITreeviewContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useTreeview(options)) as React.ReactElement}</>;
};

TreeviewContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};
