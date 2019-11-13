/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useRef } from 'react';
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

  return render!({ ref: scopeRef }) as React.ReactElement;
};

FocusVisibleContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  relativeDocument: PropTypes.object,
  className: PropTypes.string,
  dataAttribute: PropTypes.string
};
