/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { zdFontFamilySystem, zdFontFamilyMonospace } from '@zendeskgarden/css-variables';

addons.setConfig({
  theme: create({
    brandTitle: 'React Containers',
    brandUrl: 'https://zendeskgarden.github.io/',
    brandImage: '../garden.svg',
    fontBase: zdFontFamilySystem,
    fontCode: zdFontFamilyMonospace
  })
});
