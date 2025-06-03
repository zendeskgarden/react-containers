/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, RefObject } from 'react';

export interface IUseTooltipProps<T = HTMLElement> {
  /** Sets delay to the opening and closing of the tooltip */
  delayMilliseconds?: number;
  /** Specifies the tooltip ID */
  id?: string;
  /** Controls visibility state of the tooltip */
  isVisible?: boolean;
  /** Provides ref access to the underlying trigger element */
  triggerRef: RefObject<T>;
}

export interface IUseTooltipReturnValue {
  getTooltipProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  getTriggerProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>;
  isVisible?: boolean;
  openTooltip: (delayMs?: number) => void;
  closeTooltip: (delayMs?: number) => void;
}

export interface ITooltipContainerProps<T = HTMLElement> extends IUseTooltipProps<T> {
  /**
   * Provides tooltip render prop functions, state, and actions
   *
   * @param {function} [options.getTooltipProps] Tooltip props getter
   * @param {function} [options.getTriggerProps] Trigger props getter
   * @param {boolean} options.isVisible Current tooltip visibility
   * @param {function} [options.openTooltip] Open the tooltip with an optional delay
   * @param {function} [options.closeTooltip] Close the tooltip with an optional delay
   */
  render?: (options: {
    /* prop getters */
    getTooltipProps: IUseTooltipReturnValue['getTooltipProps'];
    getTriggerProps: IUseTooltipReturnValue['getTriggerProps'];
    /* state */
    isVisible?: boolean;
    /* actions */
    openTooltip: IUseTooltipReturnValue['openTooltip'];
    closeTooltip: IUseTooltipReturnValue['closeTooltip'];
  }) => React.ReactNode;
  /** @ignore */
  children?: (options: IUseTooltipReturnValue) => React.ReactNode;
}
