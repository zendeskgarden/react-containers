/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { BreadcrumbContainer, useBreadcrumb } from './src';

export const Container = () => (
  <BreadcrumbContainer>
    {({ getContainerProps, getCurrentPageProps }) => (
      <div {...getContainerProps()}>
        <a href="#foo">Home</a>
        <span aria-hidden="true">&gt;</span>
        <a {...getCurrentPageProps({ href: '#foo' })}>Items</a>
      </div>
    )}
  </BreadcrumbContainer>
);

export const Hook = () => {
  const { getContainerProps, getCurrentPageProps } = useBreadcrumb();

  return (
    <div {...getContainerProps()}>
      <a href="#foo">Home</a>
      <span aria-hidden="true">&gt;</span>
      <a {...getCurrentPageProps({ href: '#' })}>Items</a>
    </div>
  );
};

Hook.storyName = 'useBreadcrumb';

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useBreadcrumb\` hook implements the [breadcrumb](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb) design pattern and can be used to build a breadcrumb component.`
    }
  }
};

Container.storyName = 'BreadcrumbContainer';

export default {
  title: 'Breadcrumb Container',
  component: BreadcrumbContainer,
  decorators: [withKnobs],
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useBreadcrumb hook.`
  }
};
