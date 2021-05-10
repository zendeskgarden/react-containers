/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export interface IUseBreadcrumbReturnValue {
  getContainerProps: <T>(options?: T & React.HTMLProps<any>) => T & React.HTMLProps<any>;
  getCurrentPageProps: <T>(options?: T & React.HTMLProps<any>) => T & React.HTMLProps<any>;
}

export function useBreadcrumb(): IUseBreadcrumbReturnValue {
  const getContainerProps = (
    { role = 'navigation', ...other }: React.HTMLProps<any> = {} as any
  ): any => {
    return {
      role,
      'aria-label': 'Breadcrumb navigation',
      'data-garden-container-id': 'containers.breadcrumb',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getCurrentPageProps = (props: React.HTMLProps<any> = {}): any => {
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
