/* eslint-disable consistent-return */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, createRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { FocusJailContainer, useFocusJail } from './src';

storiesOf('FocusJail Container', module)
  .addDecorator(withKnobs)
  .add('useFocusJail', () => {
    const FocusJail = () => {
      const containerRef = useRef(null);
      const containerSecRef = useRef(null);
      const frame = useRef(null);
      const [loaded, setLoaded] = useState(false);
      const [isTargetReady, setIsTargetReady] = useState(false);

      const rootElement = document.createElement('div');
      const container = useRef(rootElement);

      useEffect(() => {
        const onLoad = () => {
          setLoaded(true);
        };

        if (frame.current.contentDocument.readyState === 'complete') {
          onLoad();

          return;
        }

        const currentFrame = frame.current;

        currentFrame.addEventListener('load', onLoad);

        return () => currentFrame.removeEventListener('load', onLoad());
      }, [frame]);

      useEffect(() => {
        if (!loaded) {
          return;
        }

        const currentContainer = container.current;
        const currentFrame = frame.current;

        currentFrame.contentDocument.body.appendChild(currentContainer);

        setIsTargetReady(true);

        return () => currentFrame.contentDocument.body.removeChild(currentContainer);
      }, [frame, rootElement, loaded]);

      const { getContainerProps } = useFocusJail({
        focusOnMount: boolean('focusOnMount', true),
        containerRef,
        containerSecRef
      });

      const child = (
        <div {...getContainerProps({ ref: containerSecRef, tabIndex: -1 })}>
          <p>Focus is locked within the given elements</p>
          <input />
          <button>Focusable Items</button>
        </div>
      );

      return (
        <>
          <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>
            <p>Focus transfers across an iframe as well</p>
            <input />
            <button>Focusable Items</button>
          </div>
          <div>
            <div>It skips over elements not in either container</div>
            <input />
          </div>
          <iframe id="custom-frame" width="500" height="300" ref={frame} title={'test'}>
            {loaded && isTargetReady && ReactDOM.createPortal(child, container.current)}
          </iframe>
        </>
      );
    };

    return <FocusJail />;
  })
  .add('FocusJailContainer', () => {
    const containerRef = createRef<HTMLElement>();

    return (
      <FocusJailContainer containerRef={containerRef} focusOnMount={boolean('focusOnMount', true)}>
        {({ getContainerProps }) => (
          <>
            <input />
            <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>
              <p>Focus is locked within the parent element</p>
              <input />
              <button>Focusable Items</button>
            </div>
          </>
        )}
      </FocusJailContainer>
    );
  });
