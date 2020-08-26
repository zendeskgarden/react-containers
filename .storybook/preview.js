/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { addDecorator } from '@storybook/react';

/**
 * Temporarily used to center `addon-docs` previews
 * See: https://github.com/storybookjs/storybook/issues/7227#issuecomment-680332161
 */
addDecorator((...args) => {
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
});
