/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');
const gardenTailwindCss = require('@zendeskgarden/tailwindcss');

module.exports = {
  content: [`${path.resolve(__dirname, '../packages')}/*/demo/**/*.{mdx,tsx}`],
  plugins: [gardenTailwindCss],
  safelist: process.env.NODE_ENV === 'development' ? [{ pattern: /.*/u }] : []
};
