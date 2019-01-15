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

// This is easier than injecting via webpack shenanigans
const breadcrumbscss = (
  <link
    href="https://unpkg.com/@zendeskgarden/css-breadcrumbs@0.2.2/dist/index.css"
    rel="stylesheet"
  />
);

storiesOf('Breadcrumb Container', module)
  .addDecorator(withKnobs)
  .add('as a render prop container', () => (
    <>
      {breadcrumbscss}
      <BreadcrumbContainer>
        {({ getContainerProps, getCurrentPageProps }) => (
          <div {...getContainerProps({ className: 'c-breadcrumb' })}>
            <a href="#foo" className="c-breadcrumb__item">
              Home
            </a>
            <a
              {...getCurrentPageProps({ href: '#foo', className: 'c-breadcrumb__item is-current' })}
            >
              Items
            </a>
          </div>
        )}
      </BreadcrumbContainer>
    </>
  ))
  .add('as a hook', () => {
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

    return (
      <>
        {breadcrumbscss}
        <Breadcrumb />
      </>
    );
  });
