/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useFocusVisible, IUseFocusVisibleProps } from './useFocusVisible';

export interface IFocusVisibleContainerProps extends Omit<IUseFocusVisibleProps, 'scope'> {
  render?: (options: { ref: React.RefObject<HTMLDivElement> }) => React.ReactNode;
  children?: (options: { ref: React.RefObject<HTMLDivElement> }) => React.ReactNode;
}

export const FocusVisibleContainer: React.FunctionComponent<IFocusVisibleContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  const scopeRef = useRef(null);

  useFocusVisible({ scope: scopeRef, ...options });

  return <>{render!({ ref: scopeRef }) as React.ReactElement}</>;
};

FocusVisibleContainer.defaultProps = {
  className: 'garden-focus-visible',
  dataAttribute: 'data-garden-focus-visible'
};

FocusVisibleContainer.propTypes = {
  /** A children render prop function which receives a `ref` */
  children: PropTypes.func,
  /** A render prop function which receives a `ref` */
  render: PropTypes.func,
  /** A relative document */
  relativeDocument: PropTypes.object,
  /** A class name applied to the element with `:focus-visible` behavior */
  className: PropTypes.string,
  /** A data attribute applied to the element with `:focus-visible` behavior */
  dataAttribute: PropTypes.string
};
