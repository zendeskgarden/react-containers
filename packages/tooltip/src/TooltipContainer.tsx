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
  /** A render prop function which receives tooltip state and prop getters */
  render?: (options: IUseTooltipReturnValue) => React.ReactNode;
  /** A children render prop function which receives tooltip state and prop getters */
  children?: (options: IUseTooltipReturnValue) => React.ReactNode;
}

export const TooltipContainer: React.FunctionComponent<ITooltipContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useTooltip(options)) as React.ReactElement}</>;
};

TooltipContainer.defaultProps = {
  delayMilliseconds: 500
};

TooltipContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  delayMilliseconds: PropTypes.number,
  isVisible: PropTypes.bool
};
