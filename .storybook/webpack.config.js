/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  return defaultConfig;
};
