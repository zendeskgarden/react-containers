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

import '@zendeskgarden/css-breadcrumbs';

storiesOf('Breadcrumb Container', module)
  .addDecorator(withKnobs)
  .add('useBreadcrumb', () => {
    const Breadcrumb = () => {
      const { getContainerProps, getCurrentPageProps } = useBreadcrumb();

      return (
        <div {...getContainerProps({ className: 'c-breadcrumb' })}>
          <a href="#foo" className="c-breadcrumb__item">
            Home
          </a>
          <a {...getCurrentPageProps({ href: '#', className: 'c-breadcrumb__item is-current' })}>
            Items
          </a>
        </div>
      );
    };

    return <Breadcrumb />;
  })
  .add('BreadcrumbContainer', () => (
    <BreadcrumbContainer>
      {({ getContainerProps, getCurrentPageProps }) => (
        <div {...getContainerProps({ className: 'c-breadcrumb' })}>
          <a href="#foo" className="c-breadcrumb__item">
            Home
          </a>
          <a {...getCurrentPageProps({ href: '#foo', className: 'c-breadcrumb__item is-current' })}>
            Items
          </a>
        </div>
      )}
    </BreadcrumbContainer>
  ));
