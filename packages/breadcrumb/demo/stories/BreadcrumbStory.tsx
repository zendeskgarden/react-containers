/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps } from 'react';
import { StoryFn } from '@storybook/react';
import {
  BreadcrumbContainer,
  IBreadcrumbContainerProps,
  IUseBreadcrumbReturnValue,
  useBreadcrumb
} from '@zendeskgarden/container-breadcrumb';

interface IProps extends Omit<HTMLProps<HTMLDivElement>, 'children'> {
  'aria-label': NonNullable<HTMLProps<HTMLDivElement>['aria-label']>;
  children?: IBreadcrumbContainerProps['children'];
}

interface IComponentProps extends IUseBreadcrumbReturnValue, IProps {}

const Component = ({
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  children,
  getContainerProps,
  getCurrentPageProps,
  role,
  ...props
}: IComponentProps) => (
  <div role={role} {...getContainerProps(props)}>
    <a href="#foo">Home</a>
    <span aria-hidden="true" className="mx-2">
      &gt;
    </span>
    <a {...getCurrentPageProps({ href: '#' })}>Items</a>
  </div>
);

const Container = ({ 'aria-label': ariaLabel, ...props }: IProps) => (
  <BreadcrumbContainer>
    {containerProps => <Component {...containerProps} {...props} aria-label={ariaLabel} />}
  </BreadcrumbContainer>
);

const Hook = ({ 'aria-label': ariaLabel, ...props }: IProps) => {
  const hookProps = useBreadcrumb();

  return <Component {...hookProps} {...props} aria-label={ariaLabel} />;
};

interface IArgs extends IBreadcrumbContainerProps {
  as: 'hook' | 'container';
  'aria-label': IProps['aria-label'];
}

export const BreadcrumbStory: StoryFn<IArgs> = ({ as, 'aria-label': ariaLabel, ...props }) => {
  switch (as) {
    case 'container':
      return <Container aria-label={ariaLabel} {...props} />;

    case 'hook':
    default:
      return <Hook aria-label={ariaLabel} {...props} />;
  }
};
