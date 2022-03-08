/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

// Scroll regions with dynamic layouts should use the dependencies prop.
// The hook re-calculates the tab-index its logic when the dependencies change.

import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

export interface IUseScrollRegionProps<RefType = HTMLElement> {
  /** A [ref](https://reactjs.org/docs/refs-and-the-dom.html) pointing to the scroll region's container element */
  containerRef: React.RefObject<RefType>;
  /** A value that determines if the scroll region tab index should be recalculated */
  dependency?: any;
}

export function useScrollRegion({ containerRef, dependency }: IUseScrollRegionProps) {
  const [containerTabIndex, setContainerTabIndex] = useState<undefined | number>();

  const updateContainerTabIndex = useMemo(
    () =>
      debounce(() => {
        if (containerRef.current) {
          const regionContent = containerRef.current.children[0];
          const regionContentHeight = regionContent.scrollHeight;
          const regionContentWidth = regionContent.scrollWidth;
          const containerHeight = containerRef.current.offsetHeight;
          const containerWidth = containerRef.current.offsetWidth;

          if (regionContentWidth > containerWidth || regionContentHeight > containerHeight) {
            setContainerTabIndex(0);
          } else {
            setContainerTabIndex(undefined);
          }
        }
      }, 100),
    [containerRef, setContainerTabIndex]
  );

  useEffect(() => {
    addEventListener('resize', updateContainerTabIndex);
    updateContainerTabIndex();

    return () => {
      removeEventListener('resize', updateContainerTabIndex);
      updateContainerTabIndex.cancel();
    };
  }, [updateContainerTabIndex, dependency]);

  return containerTabIndex;
}
