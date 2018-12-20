/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import useSchedule from './useSchedule';

export default function ScheduleContainer({ children, ...props }) {
  return children(useSchedule(props));
}

ScheduleContainer.propTypes = {
  duration: PropTypes.number,
  loop: PropTypes.bool,
  delayMS: PropTypes.number
};
