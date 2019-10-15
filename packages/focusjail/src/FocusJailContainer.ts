/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useFocusJail, IUseFocusJailProps, IUseFocusJailReturnValue } from './useFocusJail';

export interface IFocusJailContainerProps extends IUseFocusJailProps {
  render?: (options: IUseFocusJailReturnValue) => React.ReactElement;
  children?: (options: IUseFocusJailReturnValue) => React.ReactElement;
}

export const FocusJailContainer: React.FunctionComponent<IFocusJailContainerProps> = ({
  children,
  render = children,
  ...options
}) => {
  return render!(useFocusJail(options));
};

FocusJailContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  focusOnMount: PropTypes.bool,
  environment: PropTypes.object,
  containerRef: PropTypes.object.isRequired,
  focusElem: PropTypes.func
};
