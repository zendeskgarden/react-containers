/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';

const useControlledState = (initialState = {}, onStateChange = () => {}) => {
  const [state, set] = useState(initialState);

  const setState = newState => {
    set({ ...state, ...newState });
    onStateChange({ ...state, ...newState });
  };

  return [state, setState];
};

export default useControlledState;
