/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useEffect } from 'react';

export const useWindow = (windowObject?: Partial<Window>) => {
  const [controlledWindow, setControlledWindow] = useState<Partial<Window>>();

  /**
   * Only reference `window` after initial render to support SSR environments
   */
  useEffect(() => {
    if (windowObject) {
      setControlledWindow(windowObject);
    } else {
      setControlledWindow(window);
    }
  }, [windowObject]);

  return controlledWindow;
};
