/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';

export function useExample({ coolProp }) {
  const [label] = useState(coolProp || 'cool');

  const getCoolProps = ({ role = 'region', ariaLabel = label, ...props } = {}) => ({
    role,
    'aria-label': ariaLabel,
    'data-garden-container-id': 'containers.example',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    getCoolProps
  };
}
