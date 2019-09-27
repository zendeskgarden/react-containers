/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { BreadcrumbContainer, useBreadcrumb } from './src';

storiesOf('Breadcrumb Container', module)
  .addDecorator(withKnobs)
  .add('useBreadcrumb', () => {
    const Breadcrumb = () => {
      const { getContainerProps, getCurrentPageProps } = useBreadcrumb();

      return (
        <div {...getContainerProps()}>
          <a href="#foo">Home</a>
          <span aria-hidden="true">&gt;</span>
          <a {...getCurrentPageProps({ href: '#' })}>Items</a>
        </div>
      );
    };

    return <Breadcrumb />;
  })
  .add('BreadcrumbContainer', () => (
    <BreadcrumbContainer>
      {({ getContainerProps, getCurrentPageProps }) => (
        <div {...getContainerProps()}>
          <a href="#foo">Home</a>
          <span aria-hidden="true">&gt;</span>
          <a {...getCurrentPageProps({ href: '#foo' })}>Items</a>
        </div>
      )}
    </BreadcrumbContainer>
  ));
