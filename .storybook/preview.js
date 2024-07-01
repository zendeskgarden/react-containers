/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { StrictMode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { create } from '@storybook/theming/create';
import { DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';

import './index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: DEFAULT_THEME.colors.base,
    grid: { disable: true }
  },
  controls: {
    hideNoControlsWarning: true,
    sort: 'alpha'
  },
  docs: {
    theme: create({
      base: DEFAULT_THEME.colors.base
    })
  },
  layout: 'centered'
};

const GlobalStyle = createGlobalStyle`
  :focus-visible {
    outline-color: ${p => getColor('primaryHue', 600, p.theme)};
  }
`;

const withGlobalStyle = Story => (
  <>
    <GlobalStyle />
    <Story />
  </>
);

const withStrictMode = (Story, context) =>
  context.globals.strictMode === 'enabled' ? (
    <StrictMode>
      <Story />
    </StrictMode>
  ) : (
    <Story />
  );

export const decorators = [withGlobalStyle, withStrictMode];

export const globalTypes = {
  ...(process.env.NODE_ENV === 'development' && {
    strictMode: {
      name: 'strictMode',
      description: 'Strict mode',
      defaultValue: 'disabled',
      toolbar: {
        icon: 'alert',
        items: [
          { value: 'disabled', title: 'Strict mode disabled' },
          { value: 'enabled', title: 'Strict mode enabled' }
        ]
      }
    }
  })
};
