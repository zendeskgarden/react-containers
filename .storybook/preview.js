/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

/**
 * There are layout issues when using addon-centered with addon-docs.
 * This is a temporary fix for the issue as it is fixed in Storybook v6.
 * See: https://github.com/storybookjs/storybook/issues/8128
 */
addDecorator((...args) => {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const params = new URL(document.location).searchParams;
  const isInDockView = params.get('viewMode') === 'docs';

  if (isInDockView) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'auto'
        }}
      >
        <div style={{ margin: 'auto', maxHeight: '100%' }}>{args[0]()}</div>
      </div>
    );
  }

  return centered(...args);
});
