/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useTooltip } from './useTooltip';
import { GARDEN_PLACEMENTS } from './utils/gardenPlacements';

export function TooltipContainer({ children, render = children, ...options }) {
  return render(useTooltip(options));
}

TooltipContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  triggerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  popperRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  delayMilliseconds: PropTypes.number,
  eventsEnabled: PropTypes.bool,
  isVisible: PropTypes.bool,
  popperModifiers: PropTypes.object,
  placement: PropTypes.oneOf(Object.values(GARDEN_PLACEMENTS))
};
