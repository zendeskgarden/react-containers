/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
        loose: true
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true
      }
    ],
    '@babel/plugin-transform-object-assign',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    'babel-plugin-styled-components',
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }]
  ],
  sourceType: 'unambiguous'
};
