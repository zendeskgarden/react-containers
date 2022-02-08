/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    brandTitle: 'Zendesk Garden React Containers',
    brandUrl: 'https://github.com/zendeskgarden/react-containers',
    brandImage: null,
    colorSecondary: DEFAULT_THEME.palette.blue[600],
    fontBase: DEFAULT_THEME.fonts.system,
    fontCode: DEFAULT_THEME.fonts.mono
  })
});
