/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, createRef } from 'react';
import { FocusJailContainer, useFocusJail } from './src';

export const Container = ({ focusOnMount }) => {
  const containerRef = createRef<HTMLElement>();

  return (
    <FocusJailContainer containerRef={containerRef} focusOnMount={focusOnMount}>
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

export const Hook = ({ focusOnMount }) => {
  const containerRef = useRef(null);
  const { getContainerProps } = useFocusJail({
    focusOnMount,
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

Container.storyName = 'FocusJailContainer';

Container.args = {
  focusOnMount: true
};

Hook.storyName = 'useFocusJail';

Hook.args = {
  focusOnMount: true
};

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useFocusJail\` hook allows you to trap focus to a container element. Useful
      for modals and widgets. Garden uses this in react-components for the modals package.`
    }
  }
};

export default {
  title: 'FocusJail Container',
  component: FocusJailContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useFocusJail hook.`
  }
};
