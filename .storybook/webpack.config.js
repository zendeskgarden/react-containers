/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const webpack = require('webpack');
const path = require('path');
const babelOptions = require(path.resolve(__dirname, '../babel.config.js'));

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /stories.tsx$/u,
    loader: require.resolve('@storybook/source-loader'),
    enforce: 'pre'
  });

  config.module.rules.push({
    test: /\.tsx?$/u,
    exclude: /node_modules/u,
    use: [
      {
        loader: 'babel-loader',
        options: { ...babelOptions, envName: 'production' }
      },
      {
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.storybook.json')
        }
      }
    ]
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify('storybook')
    })
  );

  // TODO: remove after June 15, 2022 for IE 11 EOL
  // to support IE11, we need to ensure the preview iframe bundle is ES5 compatible
  config.target = ['web', 'es5'];

  return config;
};
