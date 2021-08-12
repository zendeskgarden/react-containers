/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { {{capitalize component}}Container, IUse{{capitalize component}}Props, IUse{{capitalize component}}ReturnValue, use{{capitalize component}} } from './src';

const ARGS = {
  label: 'test',
  text: 'Hello world'
};

export const Container = ({ label, text }) => (
  <{{capitalize component}}Container>
    {({ get{{capitalize component}}Props }: IUse{{capitalize component}}ReturnValue) => (
      <div {...get{{capitalize component}}Props({ label })}>{text}</div>
    )}
  </{{capitalize component}}Container>
);

Container.storyName = '{{capitalize component}}Container';
Container.args = ARGS;

export const Hook = ({ label, text }) => {
  const {{capitalize component}} = (props: IUse{{capitalize component}}Props) => {
    const { get{{capitalize component}}Props } = use{{capitalize component}}(props);

    return <div {...get{{capitalize component}}Props()}>{text}</div>;
  };

  return <{{capitalize component}} label={label} />;
};

Hook.storyName = 'use{{capitalize component}}';
Hook.args = ARGS;

export default {
  component: {{capitalize component}}Container,
  title: '{{capitalize component}} Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the use{{capitalize component}} hook.`
  }
};
