/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { createRef, useRef, useEffect, useState, useCallback } from 'react';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-utilities';
import tabbable from 'tabbable';
import activeElement from 'dom-helpers/activeElement';

export interface IUseFocusJailProps {
  focusOnMount?: boolean;
  restoreFocus?: boolean;
  environment?: Document;
  focusElem?: (element: HTMLElement) => any;
  containerSecRef: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLElement>;
}

export interface IUseFocusJailReturnValue {
  getContainerProps: <T>(options?: T) => T & React.HTMLProps<any>;
  focusElement: (element?: HTMLElement) => any;
}

export const useFocusJail = (
  {
    focusOnMount = true,
    restoreFocus = true,
    environment,
    focusElem,
    containerRef,
    containerSecRef
  }: IUseFocusJailProps = {
    containerRef: createRef(),
    containerSecRef: createRef()
  }
): IUseFocusJailReturnValue => {
  const restoreFocusElement = useRef<Element | null>(null);

  // To support conditional rendering we need to store the ref in state and
  // trigger a re-render if the ref updates once rendered since react will
  // skip changes to a ref on first render
  const [currentRef, setCurrentRef] = useState(containerRef.current);
  const [currentSecRef, setCurrentSecRef] = useState(containerSecRef.current);

  const containers = [containerRef.current, containerSecRef.current].filter(el => el !== null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const elementsByContainer = containers.map(container => tabbable(container));

  const lastNodes = () => elementsByContainer.map(container => container[container.length - 1]);
  const firstNodes = () => elementsByContainer.map(container => container[0]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (containerRef.current !== currentRef) {
      setCurrentRef(containerRef.current);
    }

    if (containerSecRef && containerSecRef.current !== currentSecRef) {
      setCurrentSecRef(containerSecRef.current);
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

  const getContainerProps = ({ onKeyDown, ...other } = {} as any) => {
    return {
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
        if (event.keyCode !== KEY_CODES.TAB) {
          return;
        }
        validateContainerRef();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const firstNodeIndex = firstNodes().indexOf(event.target);

        if (event.shiftKey && (firstNodeIndex > -1 || event.target === currentRef)) {
          const prevIndex =
            firstNodeIndex === 0 ? elementsByContainer.length - 1 : firstNodeIndex - 1;

          lastNodes()[prevIndex].focus();

          event.preventDefault();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const lastNodeIndex = lastNodes().indexOf(event.target);

        if (!event.shiftKey && lastNodeIndex > -1) {
          const nextIndex =
            lastNodeIndex === elementsByContainer.length - 1 ? 0 : lastNodeIndex + 1;

          firstNodes()[nextIndex].focus();

          event.preventDefault();
        }
      }),
      'data-garden-container-id': 'containers.focusjail',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  useEffect(() => {
    restoreFocusElement.current = activeElement(environment || document);

    if (focusOnMount) {
      focusElement(currentRef);
    }

    return () => {
      const isBodyInactive = restoreFocusElement.current !== document.body;
      const hasActiveElement = restoreFocusElement.current !== null;

      if (isBodyInactive && hasActiveElement && restoreFocus) {
        focusElement(restoreFocusElement.current);
      }
    };
  }, [focusOnMount, restoreFocus, environment, focusElement, currentRef]);

  return {
    getContainerProps,
    focusElement
  };
};
