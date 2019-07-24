/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export default function useBreadcrumb() {
  const getContainerProps = ({ role = 'navigation', ...other } = {}) => {
    return {
      role,
      'aria-label': 'Breadcrumb navigation',
      'data-garden-container-id': 'breadcrumb',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getCurrentPageProps = props => {
    return {
      'aria-current': 'page',
      ...props
    };
  };

  return {
    getContainerProps,
    getCurrentPageProps
  };
}
