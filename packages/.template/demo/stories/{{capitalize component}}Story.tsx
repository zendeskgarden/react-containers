/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import {
  I{{capitalize component}}ContainerProps,
  IUse{{capitalize component}}Props,
  IUse{{capitalize component}}ReturnValue,
  {{capitalize component}}Container,
  use{{capitalize component}}
} from '@zendeskgarden/container-{{lowercase component}}';

const Container = ({ label, text }: I{{capitalize component}}ContainerProps & { text: string }) => (
  <{{capitalize component}}Container>
    {({ get{{capitalize component}}Props }: IUse{{capitalize component}}ReturnValue) => <div {...get{{capitalize component}}Props({ 'aria-label': label || 'container' })}>{text}</div>}
  </{{capitalize component}}Container>
);

const Hook = ({ label }: IUse{{capitalize component}}Props) => {
  const { get{{capitalize component}}Props } = use{{capitalize component}}({ label });

  return <div {...get{{capitalize component}}Props({ 'aria-label': label || 'hook' })} />;
};

interface IArgs extends I{{capitalize component}}ContainerProps {
  as: 'hook' | 'container';
  text: string;
}

export const {{capitalize component}}Story: Story<IArgs> = ({ as, text, ...props }) => {
  switch (as) {
    case 'container':
      return <Container text={text} {...props} />;

    case 'hook':
    default:
      return <Hook {...props}>{text}</Hook>;
  }
};
