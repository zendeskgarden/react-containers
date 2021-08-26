/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTreeview } from './useTreeview';
import { IUseTreeviewProps, IUseTreeviewReturnValue } from './types';

export interface ITreeviewContainerProps<Item> extends IUseTreeviewProps<Item> {
  /** Documents the render function */
  render?: (options: IUseTreeviewReturnValue<Item>) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUseTreeviewReturnValue<Item>) => React.ReactNode;
}

export const TreeviewContainer: React.FC<ITreeviewContainerProps<any>> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useTreeview(options)) as React.ReactElement}</>;
};

TreeviewContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};
