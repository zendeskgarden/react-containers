/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useSchedule, IUseScheduleProps, IUseScheduleReturnValue } from './useSchedule';

export interface IScheduleContainerProps extends IUseScheduleProps {
  render?: (options: IUseScheduleReturnValue) => React.ReactNode;
  children?: (options: IUseScheduleReturnValue) => React.ReactNode;
}

export const ScheduleContainer: React.FunctionComponent<IScheduleContainerProps> = ({
  children,
  render = children,
  ...props
}) => {
  return <>{render!(useSchedule(props)) as React.ReactElement}</>;
};

ScheduleContainer.defaultProps = {
  duration: 1250,
  delayMS: 750,
  loop: true
};

ScheduleContainer.propTypes = {
  /** A children render prop function which receives the schedule state */
  children: PropTypes.func,
  /** A render prop function which receives the schedule state */
  render: PropTypes.func,
  /** The duration of a schedule in miliseconds */
  duration: PropTypes.number,
  /** Determines whether a schedule should loop */
  loop: PropTypes.bool,
  /** The delay in miliseconds prior to the beginning of the schedule */
  delayMS: PropTypes.number
};
