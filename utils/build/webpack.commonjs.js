/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const packageManifest = require(path.resolve('package.json'));
const babelOptions = require(path.resolve('../../babel.config.js'));

const options = {
  mode: 'production',
  entry: path.resolve('src', 'index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  devtool: 'source-map',
  plugins: [
    /**
     * Allows the `data-garden-version` attribute to be applied to all
     * views without importing entire package.json into the bundle
     */
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(packageManifest.version)
    }),
    new webpack.BannerPlugin(
      `
Copyright Zendesk, Inc.
Use of this source code is governed under the Apache License, Version 2.0
found at http://www.apache.org/licenses/LICENSE-2.0
    `.trim()
    )
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/u,
        exclude: /node_modules/u,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }
    ]
  },
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ]
};

if (process.env.ANALYZE_BUNDLE) {
  options.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

module.exports = options;
