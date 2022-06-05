/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

export interface IUseModalProps<T = Element> {
  /** Handles close actions */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /** Provides ref access to the underlying dialog element */
  modalRef: RefObject<T>;
  /** Prefixes IDs for modal elements */
  idPrefix?: string;
  /** Directs keyboard focus to the modal on mount */
  focusOnMount?: boolean;
  /** Returns keyboard focus to the element that triggered the modal */
  restoreFocus?: boolean;
  /** Sets the environment where the modal is rendered */
  environment?: Document;
}

export interface IUseModalReturnValue {
  getBackdropProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getModalProps: <T extends Element>(
    props?: Omit<HTMLProps<T>, 'role'> & {
      role?: HTMLProps<T>['role'] | null;
    }
  ) => HTMLProps<T>;
  getTitleProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getContentProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getCloseProps: <T extends Element>(
    props: Omit<HTMLProps<T>, 'aria-label'> & {
      'aria-label': NonNullable<HTMLProps<T>['aria-label']>;
    }
  ) => HTMLProps<T>;
  closeModal?: IUseModalProps['onClose'];
}

export interface IModalContainerProps<T = Element> extends IUseModalProps<T> {
  /**
   * Provides modal render prop functions
   *
   * @param {function} [options.getBackdropProps] Backdrop props getter
   * @param {function} [options.getModalProps] Modal dialog props getter
   * @param {function} [options.getCloseProps] Modal close button props getter
   * @param {function} [options.getTitleProps] Modal title props getter
   * @param {function} [options.getContentProps] Modal content props getter
   */
  render?: (options: {
    getBackdropProps: IUseModalReturnValue['getBackdropProps'];
    getModalProps: IUseModalReturnValue['getModalProps'];
    getCloseProps: IUseModalReturnValue['getCloseProps'];
    getTitleProps: IUseModalReturnValue['getTitleProps'];
    getContentProps: IUseModalReturnValue['getContentProps'];
    closeModal?: IUseModalReturnValue['closeModal'];
  }) => ReactNode;
  /** @ignore */
  children?: (options: IUseModalReturnValue) => ReactNode;
}
