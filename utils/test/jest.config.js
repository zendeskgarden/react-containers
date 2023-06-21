/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

module.exports = {
  rootDir: '../../',
  cacheDirectory: '<rootDir>/.cache/jest',
  coverageDirectory: '<rootDir>/.cache/coverage',
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/*/src/index.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/*/src/types.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/.template/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    // constant files that are not tested
    '!<rootDir>/packages/utilities/src/utils/DocumentPosition.ts',
    '!<rootDir>/packages/utilities/src/utils/KeyboardEventValues.ts',
    '!<rootDir>/packages/utilities/src/utils/useId.ts'
  ],
  testMatch: ['<rootDir>/packages/*/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/.template'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/utils/test/jest.setup.js'],
  modulePathIgnorePatterns: ['./node_modules'],
  transformIgnorePatterns: ['/node_modules/(?!(@zendeskgarden|@babel|react-merge-refs))'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            preserveAllComments: true
          }
        }
      }
    ],
    '^.+\\.mjs?$': 'babel-jest'
  },
  moduleNameMapper: {
    'garden-test-utils': '<rootDir>/utils/test/utilities.ts'
  },
  globals: {
    PACKAGE_VERSION: 'version'
  }
};
