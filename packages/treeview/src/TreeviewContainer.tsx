/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTreeview } from './useTreeview';
import { ContainerOrientation } from '@zendeskgarden/container-utilities';
import { ITreeviewContainerProps } from './types';

export const TreeviewContainer: React.FC<ITreeviewContainerProps<any>> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useTreeview(options))}</>;

TreeviewContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  openNodes: PropTypes.array,
  orientation: PropTypes.oneOf([ContainerOrientation.VERTICAL, ContainerOrientation.HORIZONTAL]),
  rtl: PropTypes.bool,
  onChange: PropTypes.func,
  defaultSelectedIndex: PropTypes.number,
  selectedItem: PropTypes.any,
  onSelect: PropTypes.func
};
