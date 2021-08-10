/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useExample, IUseExampleProps, IUseExampleReturnValue } from './useExample';

export interface IExampleContainerProps extends IUseExampleProps {
  /** Documents the render function */
  render?: (options: IUseExampleReturnValue) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUseExampleReturnValue) => React.ReactNode;
}

export const ExampleContainer: React.FC<IExampleContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render(useExample(options)) as React.ReactElement}</>;
};

ExampleContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  coolProp: PropTypes.string
};
