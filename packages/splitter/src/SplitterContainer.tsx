/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSplitter } from './useSplitter';
import { ISplitterContainerProps } from './types';

export const SplitterContainer: React.FC<ISplitterContainerProps> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useSplitter(options))}</>;

SplitterContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  idPrefix: PropTypes.string,
  environment: PropTypes.any,
  isFixed: PropTypes.bool,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  keyboardStep: PropTypes.number,
  defaultValueNow: PropTypes.number,
  valueNow: PropTypes.number,
  onChange: PropTypes.func,
  separatorRef: PropTypes.any.isRequired,
  isLeading: PropTypes.bool,
  rtl: PropTypes.bool
};
