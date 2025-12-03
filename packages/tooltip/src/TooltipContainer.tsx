/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useTooltip } from './useTooltip';
import { ITooltipContainerProps } from './types';

export const TooltipContainer: FC<ITooltipContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useTooltip(options))}</>;
};

TooltipContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  delayMilliseconds: PropTypes.number,
  id: PropTypes.string,
  isVisible: PropTypes.bool,
  triggerRef: PropTypes.any.isRequired
};
