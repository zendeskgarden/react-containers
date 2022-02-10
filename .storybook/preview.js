/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
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
  :focus {
    outline-color: ${p => getColor('primaryHue', 600, p.theme)};
  }
`;

export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
];
