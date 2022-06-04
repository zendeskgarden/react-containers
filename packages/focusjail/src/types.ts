/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';

export interface IUseFocusJailProps<T = Element> {
  /** Directs keyboard focus to the container on mount */
  focusOnMount?: boolean;
  /** Returns keyboard focus to the last active element on unmount */
  restoreFocus?: boolean;
  /** Sets the environment where the focus loop is rendered */
  environment?: Document;
  /** Provides ref access to the underlying focus loop container element */
  containerRef: React.RefObject<T>;
  /** @ignore testing-only */
  focusElem?: (element: HTMLElement) => any;
}

export interface IUseFocusJailReturnValue {
  getContainerProps: <T>(props?: HTMLProps<T>) => HTMLProps<T>;
  /** @ignore */
  focusElement: <T>(element?: T) => void;
}

export interface IFocusJailContainerProps<T = Element> extends IUseFocusJailProps<T> {
  /**
   * Provides focus loop render prop functions
   *
   * @param {function} [options.getContainerProps] Container props getter
   */
  render?: (options: {
    getContainerProps: IUseFocusJailReturnValue['getContainerProps'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseFocusJailReturnValue) => React.ReactNode;
}
