/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { createRef, useEffect, useState, useCallback } from 'react';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-utilities';
import tabbable from 'tabbable';
import activeElement from 'dom-helpers/activeElement';

export interface IUseFocusJailProps {
  focusOnMount?: boolean;
  environment?: Document;
  focusElem?: (element: HTMLElement) => any;
  containerRef: React.RefObject<HTMLElement>;
}

export interface IUseFocusJailReturnValue {
  getContainerProps: <T>(options?: T) => T & React.HTMLProps<any>;
  focusElement: (element?: HTMLElement) => any;
}

export const useFocusJail = (
  { focusOnMount = true, environment, focusElem, containerRef }: IUseFocusJailProps = {
    containerRef: createRef()
  }
): IUseFocusJailReturnValue => {
  // To support conditional rendering we need to store the ref in state and
  // trigger a re-render if the ref updates once rendered since react will
  // skip changes to a ref on first render
  const [currentRef, setCurrentRef] = useState(containerRef.current);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return containerElem!.contains(activeElem) ? activeElem : containerElem;
  };

  const getTabbableNodes = () => {
    const elements = tabbable(currentRef!);

    return {
      firstItem: elements[0] || getInitialFocusNode(),
      lastItem: elements[elements.length - 1] || getInitialFocusNode()
    };
  };

  const getContainerProps = ({ onKeyDown, ...other } = {} as any) => {
    return {
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
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
      'data-garden-container-id': 'containers.focusjail',
      'data-garden-container-version': PACKAGE_VERSION,
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
};
