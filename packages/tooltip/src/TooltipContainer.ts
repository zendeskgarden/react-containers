/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

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
  return render!(useTooltip(options)) as React.ReactElement;
};

TooltipContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  delayMilliseconds: PropTypes.number,
  isVisible: PropTypes.bool
};
