/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  I{{capitalize component}}ContainerProps,
  IUse{{capitalize component}}Props,
  IUse{{capitalize component}}ReturnValue,
  {{capitalize component}}Container,
  use{{capitalize component}}
} from '@zendeskgarden/container-{{lowercase component}}';

const Container = ({ title, text }: I{{capitalize component}}ContainerProps & { text: string }) => (
  <{{capitalize component}}Container title={title}>
    {({ get{{capitalize component}}Props }: IUse{{capitalize component}}ReturnValue) => <div {...get{{capitalize component}}Props({ 'aria-label': 'container' })}>{text}</div>}
  </{{capitalize component}}Container>
);

const Hook = ({ title, text }: IUse{{capitalize component}}Props & { text: string }) => {
  const { get{{capitalize component}}Props } = use{{capitalize component}}({ title });

  return <div {...get{{capitalize component}}Props({ 'aria-label': 'hook' })}>{text}</div>;
};

interface IArgs extends I{{capitalize component}}ContainerProps {
  as: 'hook' | 'container';
  text: string;
}

export const {{capitalize component}}Story: StoryFn<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
