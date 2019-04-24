/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useTooltip } from './useTooltip';

export function TooltipContainer({ children, render = children, ...options }) {
  return render(useTooltip(options));
}

TooltipContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  tooltipRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  delayMilliseconds: PropTypes.number,
  isVisible: PropTypes.bool
};
