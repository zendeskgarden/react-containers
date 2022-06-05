/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUseBreadcrumbReturnValue {
  getContainerProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label' | 'role'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
      role?: HTMLProps<T>['role'] | null;
    }
  ) => HTMLProps<T>;
  getCurrentPageProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
}

export interface IBreadcrumbContainerProps {
  /**
   * Provides breadcrumb render prop functions
   *
   * @param {function} [options.getContainerProps] Container props getter
   * @param {function} [options.getCurrentPageProps] Current page props getter
   */
  render?: (options: {
    getContainerProps: IUseBreadcrumbReturnValue['getContainerProps'];
    getCurrentPageProps: IUseBreadcrumbReturnValue['getCurrentPageProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseBreadcrumbReturnValue) => ReactNode;
}
