/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { ExampleContainer, useExample } from './src';

storiesOf('Example Container', module)
  .addDecorator(withKnobs)
  .add('useExample', () => {
    const Example = ({ coolProp }) => {
      const { getCoolProps } = useExample({ coolProp });

      return <div {...getCoolProps()} />;
    };

    return <Example coolProp />;
  })
  .add('ExampleContainer', () => (
    <ExampleContainer>{({ getCoolProps }) => <div {...getCoolProps()} />}</ExampleContainer>
  ));
