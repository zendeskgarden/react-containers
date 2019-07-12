/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const HOOK_ID = 'breadcrumb';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export default function useBreadcrumb() {
  const getContainerProps = ({ role = 'navigation', ...other } = {}) => {
    return {
      role,
      'aria-label': 'Breadcrumb navigation',
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
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
