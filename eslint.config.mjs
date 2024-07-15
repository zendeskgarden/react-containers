/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import prettierConfig from 'eslint-config-prettier';
import config from '@zendeskgarden/eslint-config';
import noticePlugin from '@zendeskgarden/eslint-config/plugins/notice.js';
import reactPlugin from '@zendeskgarden/eslint-config/plugins/react.js';
import typescriptPlugin from '@zendeskgarden/eslint-config/plugins/typescript.js';
import typescriptTypeCheckedPlugin from '@zendeskgarden/eslint-config/plugins/typescript-type-checked.js';
import jestPlugin from '@zendeskgarden/eslint-config/plugins/jest.js';

export default [
  ...config,
  noticePlugin,
  reactPlugin,
  prettierConfig,
  { ignores: ['**/dist'] },
  {
    rules: {
      'sort-imports': 'off',
      'react/jsx-no-useless-fragment': 'off'
    }
  },
  {
    files: ['src/**/*.ts'],
    ...typescriptPlugin,
    ...typescriptTypeCheckedPlugin,
    rules: {
      ...typescriptPlugin.rules,
      ...typescriptTypeCheckedPlugin.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/prop-types': 'off'
    }
  },
  {
    files: ['*.spec.*'],
    ...jestPlugin,
    rules: {
      ...jestPlugin.rules,
      'no-console': 'off',
      'jest/prefer-snapshot-hint': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'react/button-has-type': 'off',
      'react/jsx-key': 'off'
    }
  },
  {
    files: ['*.stories.tsx', 'packages/*/demo/**/*'],
    rules: {
      'react/button-has-type': 'off',
      'react/no-array-index-key': 'off',
      'func-name-matching': 'off'
    }
  }
];
