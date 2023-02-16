/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useField } from './useField';
import { IFieldContainerProps } from './types';

export const FieldContainer: React.FC<IFieldContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useField(options))}</>;
};

FieldContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  idPrefix: PropTypes.string,
  hasHint: PropTypes.bool,
  hasMessage: PropTypes.bool
};
