/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    { name: '@storybook/addon-essentials', options: { actions: false, viewport: false } },
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-postcss'
  ],
  core: {
    builder: 'webpack5'
  },
  // to support IE11, we need to ensure the manager UI bundle is ES5 compatible
  managerWebpack: config => {
    config.target = ['web', 'es5'];

    return config;
  }
};
