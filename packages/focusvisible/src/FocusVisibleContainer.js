/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useRef } from 'react';
import PropTypes from 'prop-types';

import { useFocusVisible } from './useFocusVisible';

export function FocusVisibleContainer({ children, render = children, ...options }) {
  const scopeRef = useRef();

  useFocusVisible({ scope: scopeRef, ...options });

  return render({ ref: scopeRef });
}

FocusVisibleContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  relativeDocument: PropTypes.object,
  className: PropTypes.string,
  dataAttribute: PropTypes.string
};
