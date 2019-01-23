/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import useBreadcrumb from './useBreadcrumb';

export default function BreadcrumbContainer({ children, render = children, ...props }) {
  return render(useBreadcrumb(props));
}

BreadcrumbContainer.propTypes = {
  render: PropTypes.func,
  children: PropTypes.func
};
