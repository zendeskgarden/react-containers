import { dirname, join } from "path";
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');
const { readdirSync } = require('fs');
const { DefinePlugin } = require('webpack');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const PACKAGE_NAMES = readdirSync(path.resolve(__dirname, '../packages')).filter(
  name => name !== '.template'
);

const options = {
  backgrounds: false,
  measure: false,
  outline: false,
  viewport: false
};

module.exports = {
  stories: ['../packages/*/demo/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [{ name: '@storybook/addon-essentials', options }, {
    name: '@storybook/addon-styling',
    options: {
      postCss: {
        implementation: postcss,
        postcssOptions: {
          plugins: [tailwindcss(path.resolve(__dirname, 'tailwind.config.js')), autoprefixer()]
        }
      }
    }
  }, getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@storybook/addon-mdx-gfm"), '@storybook/addon-webpack5-compiler-babel'],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {}
  },

  webpackFinal: config => {
    config.plugins.push(
      new DefinePlugin({
        PACKAGE_VERSION: JSON.stringify('storybook')
      })
    );

    Object.assign(
      config.resolve.alias,
      PACKAGE_NAMES.reduce((previousValue, packageName) => {
        previousValue[`@zendeskgarden/container-${packageName}`] = path.resolve(
          __dirname,
          `../packages/${packageName}/src`
        );

        return previousValue;
      }, {})
    );

    return config;
  },

  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
