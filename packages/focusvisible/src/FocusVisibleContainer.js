/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useFocusVisible } from './useFocusVisible';

export function FocusVisibleContainer({
  scope,
  relativeDocument,
  className,
  dataAttribute,
  children
}) {
  useFocusVisible({ scope, relativeDocument, className, dataAttribute });

  return children;
}

FocusVisibleContainer.propTypes = {
  children: PropTypes.node,
  scope: PropTypes.object.isRequired,
  relativeDocument: PropTypes.object,
  className: PropTypes.string,
  dataAttribute: PropTypes.string
};
