/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

// This is for the storybook example only not exported or published in the package
import { useState, useEffect, useRef } from 'react';
import PopperJS from 'popper.js';

export function usePopper(options) {
  const props = {
    ...{
      placement: 'top',
      eventsEnabled: true,
      positionFixed: false
    },
    ...options
  };
  const {
    referenceRef,
    popperRef,
    modifiers,
    placement: popperPlacement,
    eventsEnabled,
    positionFixed
  } = props;
  const [state, setState] = useState(() => ({
    data: undefined,
    placement: undefined
  }));
  const popperInstance = useRef();

  useEffect(() => {
    if (referenceRef.current && popperRef.current) {
      popperInstance.current = new PopperJS(referenceRef.current, popperRef.current, {
        placement: popperPlacement,
        eventsEnabled,
        positionFixed,
        modifiers: {
          ...modifiers,
          applyStyle: { enabled: false },
          updateStateModifier: {
            enabled: true,
            order: 900,
            fn: data => {
              const { placement } = data;

              setState({ data, placement });
            }
          }
        }
      });
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
  }, [popperRef, referenceRef, modifiers, popperPlacement, positionFixed, eventsEnabled]);

  const style =
    !popperRef.current || !state.data
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none'
        }
      : {
          position: state.data.offsets.popper.position,
          ...state.data.styles
        };

  return {
    style,
    placement: state.placement,
    outOfBoundaries: state.data && state.data.hide,
    scheduleUpdate: popperInstance && popperInstance.scheduleUpdate
  };
}
