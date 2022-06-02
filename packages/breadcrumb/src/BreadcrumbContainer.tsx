/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useBreadcrumb } from './useBreadcrumb';
import { IBreadcrumbContainerProps } from './types';

export const BreadcrumbContainer: React.FC<IBreadcrumbContainerProps> = ({
  children,
  render = children
}) => <>{render!(useBreadcrumb())}</>;

BreadcrumbContainer.propTypes = {
  render: PropTypes.func,
  children: PropTypes.func
};
