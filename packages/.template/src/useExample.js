/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';

export function useExample({ coolProp }) {
  const [example, setExample] = useState(0);

  const getCoolProps = ({ coolProp = 'cool', ...other } = {}) => ({ coolProp, ...other });

  return {
    getCoolProps
  };
}
