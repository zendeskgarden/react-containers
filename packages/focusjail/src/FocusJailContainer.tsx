/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useFocusJail } from './useFocusJail';
import { IFocusJailContainerProps } from './types';

export const FocusJailContainer: React.FC<IFocusJailContainerProps> = ({
  children,
  render = children,
  ...options
}) => <>{render!(useFocusJail(options))}</>;

FocusJailContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  focusOnMount: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  environment: PropTypes.any,
  containerRef: PropTypes.any.isRequired,
  focusElem: PropTypes.func
};

FocusJailContainer.defaultProps = {
  focusOnMount: true,
  restoreFocus: true
};
