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
import jestPlugin from '@zendeskgarden/eslint-config/plugins/jest.js';

const typescriptRules = {
  ...typescriptPlugin.rules,
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  'n/no-unsupported-features/es-builtins': ['error', { version: '>=16.9.0' }],
  'react/prop-types': 'off'
};

export default [
  ...config,
  noticePlugin,
  reactPlugin,
  prettierConfig,
  {
    ignores: ['**/dist']
  },
  {
    rules: {
      'sort-imports': 'off',
      'react/jsx-no-useless-fragment': 'off'
    }
  },
  {
    files: ['packages/*/src/**/*.{ts,tsx}'],
    ignores: ['packages/.template/**/*.{ts,tsx}'],
    ...typescriptPlugin,
    rules: typescriptRules
  },
  {
    files: ['packages/*/src/**/*.spec.{ts,tsx}'],
    ignores: ['packages/.template/**/*.spec.{ts,tsx}'],
    ...typescriptPlugin,
    ...jestPlugin,
    rules: {
      ...typescriptRules,
      ...jestPlugin.rules,
      'no-console': 'off',
      'jest/prefer-snapshot-hint': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'react/button-has-type': 'off',
      'react/jsx-key': 'off'
    }
  },
  {
    files: ['packages/*/demo/**/*.{ts,tsx}'],
    ignores: ['packages/.template/demo/**/*.{ts,tsx}'],
    ...typescriptPlugin,
    rules: {
      ...typescriptRules,
      'func-name-matching': 'off',
      'react/button-has-type': 'off',
      'react/no-array-index-key': 'off'
    }
  }
];
