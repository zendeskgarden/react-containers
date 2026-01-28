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
  /** A render prop function which receives the schedule state */
  render?: (options: IUseScheduleReturnValue) => React.ReactNode;
  /** A children render prop function which receives the schedule state */
  children?: (options: IUseScheduleReturnValue) => React.ReactNode;
}

export const ScheduleContainer: React.FunctionComponent<IScheduleContainerProps> = ({
  children,
  render = children,
  ...props
}) => {
  return <>{render!(useSchedule(props)) as React.ReactElement}</>;
};

ScheduleContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  duration: PropTypes.number,
  loop: PropTypes.bool,
  delayMS: PropTypes.number
};
