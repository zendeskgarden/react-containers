/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

// automatically import all files ending in *.stories.js
const req = require.context('../packages', true, /.stories.js$/u);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withOptions({
    name: 'React Containers',
    url: 'https://github.com/zendeskgarden/react-containers'
  })
);

configure(loadStories, module);
