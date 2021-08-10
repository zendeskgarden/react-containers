/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { ExampleContainer, IUseExampleReturnValue, useExample } from './src';

export const Container = () => (
  <ExampleContainer>
    {({ getCoolProps }: IUseExampleReturnValue) => (
      <div {...getCoolProps({ ariaLabel: 'test' })}>Hello world</div>
    )}
  </ExampleContainer>
);

Container.storyName = 'ExampleContainer';

export const Hook = () => {
  const Example = ({ coolProp }) => {
    const { getCoolProps } = useExample({ coolProp });

    return <div {...getCoolProps()}>Hello World</div>;
  };

  return <Example coolProp="test" />;
};

Hook.storyName = 'useExample';

export default {
  component: ExampleContainer,
  title: 'Example Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useExample hook.`
  }
};
