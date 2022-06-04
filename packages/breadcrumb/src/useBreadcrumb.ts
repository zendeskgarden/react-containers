/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseBreadcrumbReturnValue } from './types';

export const useBreadcrumb = (): IUseBreadcrumbReturnValue => ({
  getContainerProps: ({ role = 'navigation', ...other }) => ({
    role: role === null ? undefined : role,
    'data-garden-container-id': 'containers.breadcrumb',
    'data-garden-container-version': PACKAGE_VERSION,
    ...other
  }),
  getCurrentPageProps: props => ({
    'aria-current': 'page',
    ...props
  })
});
