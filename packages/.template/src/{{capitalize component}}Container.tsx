/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { use{{capitalize component}} } from './use{{capitalize component}}';
import { I{{capitalize component}}ContainerProps } from './types';

export const {{capitalize component}}Container: React.FC<I{{capitalize component}}ContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(use{{capitalize component}}(options))}</>;
};

{{capitalize component}}Container.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  label: PropTypes.string
};
