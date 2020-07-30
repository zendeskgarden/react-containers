/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useTooltip, IUseTooltipProps, IUseTooltipReturnValue } from './useTooltip';

export interface ITooltipContainerProps extends IUseTooltipProps {
  render?: (options: IUseTooltipReturnValue) => React.ReactNode;
  children?: (options: IUseTooltipReturnValue) => React.ReactNode;
}

export const TooltipContainer: React.FunctionComponent<ITooltipContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useTooltip(options)) as React.ReactElement}</>;
};

TooltipContainer.propTypes = {
  /** A children render prop function which receives tooltip state and prop getters */
  children: PropTypes.func,
  /** A render prop function which receives tooltip state and prop getters */
  render: PropTypes.func,
  /** Milliseconds of delay before open/close of tooltip is initiated  */
  delayMilliseconds: PropTypes.number,
  /** Control visibility state of the tooltip */
  isVisible: PropTypes.bool
};
