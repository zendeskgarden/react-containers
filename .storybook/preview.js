/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { create } from '@storybook/theming/create';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';

/**
 * Center "Docs" previews
 * See: https://github.com/storybookjs/storybook/issues/7227#issuecomment-680332161
 */
export const decorators = [
  Story => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto'
      }}
    >
      <div style={{ margin: 'auto', maxHeight: '100%' }}>
        <Story />
      </div>
    </div>
  )
];

export const parameters = {
  backgrounds: {
    default: DEFAULT_THEME.colors.base,
    grid: { disable: true }
  },
  docs: {
    theme: create({
      base: DEFAULT_THEME.colors.base
    })
  }
};
