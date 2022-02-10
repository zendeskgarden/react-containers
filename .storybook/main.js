/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');
const { readdirSync } = require('fs');
const { DefinePlugin } = require('webpack');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const options = {
  backgrounds: false,
  docs: process.env.BROWSER ? process.env.BROWSER.toUpperCase() !== 'IE11' : true,
  measure: false,
  outline: false,
  viewport: false
};

const PACKAGE_NAMES = readdirSync(path.resolve(__dirname, '../packages')).filter(
  name => name !== '.template'
);

module.exports = {
  stories: [
    '../packages/*/demo/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/*/*.stories.@(tsx|mdx)'
  ],
  addons: [
    { name: '@storybook/addon-essentials', options },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
          postcssOptions: {
            plugins: [tailwindcss(path.resolve(__dirname, 'tailwind.config.js')), autoprefixer()]
          }
        }
      }
    },
    '@storybook/addon-a11y'
  ],
  core: {
    builder: 'webpack5'
  },
  managerWebpack: config => {
    // TODO: remove after June 15, 2022 for IE 11 EOL
    // to support IE11, we need to ensure the manager UI bundle is ES5 compatible
    config.target = ['web', 'es5'];

    return config;
  },
  webpackFinal: config => {
    config.plugins.push(
      new DefinePlugin({
        PACKAGE_VERSION: JSON.stringify('storybook')
      })
    );

    return config;
  }
};
