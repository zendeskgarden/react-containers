/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useFocusJail, IUseFocusJailProps, IUseFocusJailReturnValue } from './useFocusJail';

export interface IFocusJailContainerProps extends IUseFocusJailProps {
  render?: (options: IUseFocusJailReturnValue) => React.ReactNode;
  children?: (options: IUseFocusJailReturnValue) => React.ReactNode;
}

export const FocusJailContainer: React.FunctionComponent<IFocusJailContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return <>{render!(useFocusJail(options)) as React.ReactElement}</>;
};

FocusJailContainer.propTypes = {
  /** A children render prop function which receives a focus jail prop getter */
  children: PropTypes.func,
  /** A render prop function which receives a focus jail prop getter */
  render: PropTypes.func,
  /** Focuses on the `containerRef` element after mounting */
  focusOnMount: PropTypes.bool,
  /** The global environment where the focus jail is rendered */
  environment: PropTypes.any,
  /** A [ref](https://reactjs.org/docs/refs-and-the-dom.html) pointing to the focus jail's container element */
  containerRef: PropTypes.any.isRequired,
  /** A callback function that receives the focused element */
  focusElem: PropTypes.func
};
