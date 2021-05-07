/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useBreadcrumb, IUseBreadcrumbReturnValue } from './useBreadcrumb';

export interface IBreadcrumbContainerProps {
  /** A render prop function */
  render?: (options: IUseBreadcrumbReturnValue) => React.ReactNode;
  /** A children render prop function */
  children?: (options: IUseBreadcrumbReturnValue) => React.ReactNode;
}

export const BreadcrumbContainer: React.FunctionComponent<IBreadcrumbContainerProps> = ({
  children,
  render = children
}) => {
  return <>{render!(useBreadcrumb()) as React.ReactElement}</>;
};

BreadcrumbContainer.propTypes = {
  render: PropTypes.func,
  children: PropTypes.func
};
