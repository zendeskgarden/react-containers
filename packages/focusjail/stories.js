/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { FocusJailContainer, useFocusJail } from './src';

storiesOf('FocusJail Container', module)
  .addDecorator(withKnobs)
  .add('useFocusJail', () => {
    const FocusJail = () => {
      const { getContainerProps, containerRef } = useFocusJail({
        focusOnMount: boolean('focusOnMount', true)
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

    return <FocusJail />;
  })
  .add('FocusJailContainer', () => (
    <FocusJailContainer focusOnMount={boolean('focusOnMount', true)}>
      {({ getContainerProps, containerRef }) => (
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
  ));
