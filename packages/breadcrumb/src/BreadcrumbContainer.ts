/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import useBreadcrumb, { IUseBreadcrumbReturnValue } from './useBreadcrumb';

export interface IBreadcrumbContainerProps {
  render?: (options: IUseBreadcrumbReturnValue) => React.ReactNode;
  children?: (options: IUseBreadcrumbReturnValue) => React.ReactNode;
}

const BreadcrumbContainer: React.FunctionComponent<IBreadcrumbContainerProps> = ({
  children,
  render = children
}) => {
  return render!(useBreadcrumb()) as React.ReactElement;
};

BreadcrumbContainer.propTypes = {
  render: PropTypes.func,
  children: PropTypes.func
};

export default BreadcrumbContainer;
