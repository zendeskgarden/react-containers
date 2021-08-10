/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { ExampleContainer, IUseExampleProps, IUseExampleReturnValue, useExample } from './src';

const ARGS = {
  label: 'test',
  text: 'Hello world'
};

export const Container = ({ label, text }) => (
  <ExampleContainer>
    {({ getExampleProps }: IUseExampleReturnValue) => (
      <div {...getExampleProps({ label })}>{text}</div>
    )}
  </ExampleContainer>
);

Container.storyName = 'ExampleContainer';
Container.args = ARGS;

export const Hook = ({ label, text }) => {
  const Example = (props: IUseExampleProps) => {
    const { getExampleProps } = useExample(props);

    return <div {...getExampleProps()}>{text}</div>;
  };

  return <Example label={label} />;
};

Hook.storyName = 'useExample';
Hook.args = ARGS;

export default {
  component: ExampleContainer,
  title: 'Example Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useExample hook.`
  }
};
