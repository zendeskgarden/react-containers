/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useScrollRegion, IUseScrollRegionProps } from './useScrollRegion';

export interface IScrollRegionContainerProps<
  RefType = HTMLElement
> extends IUseScrollRegionProps<RefType> {
  /** A render prop function which receives the tab index */
  render?: (tabIndex: number | undefined) => React.ReactNode;
  /** A children render prop function which receives the tab index */
  children?: (tabIndex: number | undefined) => React.ReactNode;
}

export const ScrollRegionContainer: React.FunctionComponent<IScrollRegionContainerProps> = ({
  children,
  render = children,
  ...props
}) => {
  return <>{render!(useScrollRegion(props)) as React.ReactElement}</>;
};

ScrollRegionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  containerRef: PropTypes.any.isRequired,
  dependency: PropTypes.any
};
