/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes, HTMLProps } from 'react';
import { Story } from '@storybook/react';
import {
  BreadcrumbContainer,
  IBreadcrumbContainerProps,
  IUseBreadcrumbReturnValue,
  useBreadcrumb
} from '@zendeskgarden/container-breadcrumb';

const Component = ({
  getContainerProps,
  getCurrentPageProps,
  ...props
}: IUseBreadcrumbReturnValue) => (
  <div {...getContainerProps(props)}>
    <a href="#foo">Home</a>
    <span aria-hidden="true" className="mx-2">
      &gt;
    </span>
    <a {...getCurrentPageProps({ href: '#' })}>Items</a>
  </div>
);

const Container = (props: HTMLProps<HTMLAttributes<HTMLDivElement>>) => (
  <BreadcrumbContainer>
    {containerProps => <Component {...containerProps} {...props} />}
  </BreadcrumbContainer>
);

const Hook = (props: HTMLProps<HTMLAttributes<HTMLDivElement>>) => {
  const hookProps = useBreadcrumb();

  return <Component {...hookProps} {...props} />;
};

interface IArgs extends IBreadcrumbContainerProps {
  as: 'hook' | 'container';
}

export const BreadcrumbStory: Story<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
