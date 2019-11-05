/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

// This is for the storybook example only not exported or published in the package
import { useState, useEffect, useRef } from 'react';
import PopperJS, { Placement, Modifiers, Data } from 'popper.js';

export interface IUsePopperOptions {
  referenceRef: React.RefObject<HTMLElement>;
  popperRef: React.RefObject<HTMLElement>;
  modifiers?: Modifiers;
  placement?: Placement;
}

export interface IUsePopperState {
  data?: Data;
  placement?: Placement;
}

export function usePopper(options: IUsePopperOptions) {
  const props = {
    ...{
      placement: 'top' as Placement,
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

  const [state, setState] = useState<IUsePopperState>(() => ({
    data: undefined,
    placement: undefined
  }));
  const popperInstanceRef = useRef<PopperJS | null>();

  useEffect(() => {
    if (referenceRef.current && popperRef.current) {
      popperInstanceRef.current = new PopperJS(referenceRef.current, popperRef.current, {
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

              return data;
            }
          }
        }
      });
    }

    return () => {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = null;
      }
    };
  }, [popperRef, referenceRef, modifiers, popperPlacement, positionFixed, eventsEnabled]);

  const style: React.CSSProperties | CSSStyleDeclaration =
    !popperRef.current || !state.data
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none'
        }
      : {
          ...state.data.styles
        };

  return {
    style,
    placement: state.placement,
    outOfBoundaries: state.data && state.data.hide,
    scheduleUpdate: popperInstanceRef.current && popperInstanceRef.current.scheduleUpdate
  };
}
