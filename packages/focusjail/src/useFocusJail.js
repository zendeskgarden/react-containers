/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useEffect, useState, useCallback } from 'react';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-utilities';
import tabbable from 'tabbable';
import activeElement from 'dom-helpers/activeElement';

export function useFocusJail({ focusOnMount = true, environment, focusElem, containerRef } = {}) {
  // To support conditional rendering we need to store the ref in state and
  // trigger a re-render if the ref updates once rendered since react will
  // skip changes to a ref on first render
  const [currentRef, setCurrentRef] = useState(containerRef.current);

  useEffect(() => {
    if (containerRef.current !== currentRef) {
      setCurrentRef(containerRef.current);
    }
  });

  const focusElement = useCallback(
    element => {
      // This is to help with testing since jsdom doesn't seem to call the
      // React synthetic event onFocus callback
      if (focusElem) {
        focusElem(element);
      } else {
        element && element.focus();
      }
    },
    [focusElem]
  );

  const validateContainerRef = () => {
    if (!currentRef) {
      throw new Error(
        'Accessibility Error: You must apply the ref prop to your containing element.'
      );
    }
  };

  const getInitialFocusNode = () => {
    const doc = environment ? environment : document;
    const activeElem = activeElement(doc);
    const containerElem = currentRef;

    return containerElem.contains(activeElem) ? activeElem : containerElem;
  };

  const getTabbableNodes = () => {
    const elements = tabbable(currentRef);

    return {
      firstItem: elements[0] || getInitialFocusNode(),
      lastItem: elements[elements.length - 1] || getInitialFocusNode()
    };
  };

  const getContainerProps = ({ onKeyDown, ...other } = {}) => {
    return {
      onKeyDown: composeEventHandlers(onKeyDown, event => {
        if (event.keyCode !== KEY_CODES.TAB) {
          return;
        }

        validateContainerRef();

        const tabbableNodes = getTabbableNodes();

        if (
          event.shiftKey &&
          (event.target === tabbableNodes.firstItem || event.target === currentRef)
        ) {
          focusElement(tabbableNodes.lastItem);
          event.preventDefault();
        }

        if (!event.shiftKey && event.target === tabbableNodes.lastItem) {
          focusElement(tabbableNodes.firstItem);
          event.preventDefault();
        }
      }),
      ...other
    };
  };

  useEffect(() => {
    if (focusOnMount) {
      focusElement(currentRef);
    }
  }, [focusOnMount, focusElement, currentRef]);

  return {
    getContainerProps,
    focusElement
  };
}
