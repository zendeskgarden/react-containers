/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { use{{capitalize component}}, IUse{{capitalize component}}Props, IUse{{capitalize component}}ReturnValue } from './use{{capitalize component}}';

export interface I{{capitalize component}}ContainerProps extends IUse{{capitalize component}}Props {
  /** Documents the render function */
  render?: (options: IUse{{capitalize component}}ReturnValue) => React.ReactNode;
  /** Documents the children prop */
  children?: (options: IUse{{capitalize component}}ReturnValue) => React.ReactNode;
}

export const {{capitalize component}}Container: React.FC<I{{capitalize component}}ContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(use{{capitalize component}}(options)) as React.ReactElement}</>;
};

{{capitalize component}}Container.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  label: PropTypes.string
};
