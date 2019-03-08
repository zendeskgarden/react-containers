/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

module.exports = ({ config, mode }) => {
  // In order for hooks to work with storybook we need to force a compatible
  // version of hot-loader react-dom.
  // See https://github.com/storybooks/storybook/issues/4691#issuecomment-447570189
  config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  config.module.rules.push({
    test: /stories.js$/u,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  });

  return config;
};
