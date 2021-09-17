/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSplitter, IUseSplitterProps, IUseSplitterReturnValue } from './useSplitter';

export interface ISplitterContainerProps extends IUseSplitterProps {
  /** Documents the render function */
  render?: (options: IUseSplitterReturnValue) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUseSplitterReturnValue) => React.ReactNode;
}

export const SplitterContainer: React.FC<ISplitterContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useSplitter(options)) as React.ReactElement}</>;
};

SplitterContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  label: PropTypes.string
};
