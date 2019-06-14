/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import centered from '@storybook/addon-centered/react';
import { withA11y } from '@storybook/addon-a11y';
import { zdFontFamilySystem, zdFontFamilyMonospace } from '@zendeskgarden/css-variables';

// automatically import all files ending in *.stories.js
const req = require.context('../packages', true, /.stories.js$/u);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(centered);
addDecorator(withA11y);

addParameters({
  options: {
    theme: create({
      brandTitle: 'React Containers',
      brandUrl: 'https://zendeskgarden.github.io/',
      brandImage: '/zendesk.svg',
      fontBase: zdFontFamilySystem,
      fontCode: zdFontFamilyMonospace
    })
  }
});

configure(loadStories, module);
