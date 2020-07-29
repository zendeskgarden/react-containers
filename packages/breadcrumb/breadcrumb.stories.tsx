/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { BreadcrumbContainer, useBreadcrumb } from './src';

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

Hook.story = {
  name: 'useBreadcrumb'
};

Container.story = {
  name: 'BreadcrumbContainer'
};

export default {
  title: 'Breadcrumb Container',
  decorators: [withKnobs]
};
