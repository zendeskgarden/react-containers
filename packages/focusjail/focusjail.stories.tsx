/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, createRef } from 'react';

import { withKnobs, boolean } from '@storybook/addon-knobs';

import { FocusJailContainer, useFocusJail } from './src';

export const Hook = () => {
  const containerRef = useRef(null);
  const { getContainerProps } = useFocusJail({
    focusOnMount: boolean('focusOnMount', true),
    containerRef
  });

  return (
    <>
      <input />
      <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>
        <p>Focus is locked within the parent element</p>
        <input />
        <button>Focusable Items</button>
      </div>
    </>
  );
};

export const Container = () => {
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
};

Hook.story = {
  name: 'useFocusJail'
};

Container.story = {
  name: 'FocusJailContainer'
};

export default {
  title: 'FocusJail Container',
  decorators: [withKnobs]
};
