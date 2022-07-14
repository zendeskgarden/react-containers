/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUse{{capitalize component}}Props {
  /** Documents the label prop */
  label?: string;
}

export interface IUse{{capitalize component}}ReturnValue {
  get{{capitalize component}}Props: <T extends Element>(
    props: Omit<HTMLProps<T>, 'role' | 'aria-label'> & {
      role?: 'region' | null;
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }) => HTMLProps<T>;
}

export interface I{{capitalize component}}ContainerProps extends IUse{{capitalize component}}Props {
  /**
   * Provides {{lowercase component}} render prop functions
   *
   * @param {function} [options.get{{capitalize component}}Props] {{capitalize component}} props getter
   */
  render?: (options: {
    get{{capitalize component}}Props: IUse{{capitalize component}}ReturnValue['get{{capitalize component}}Props'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUse{{capitalize component}}ReturnValue) => ReactNode;
}
