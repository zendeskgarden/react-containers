/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');
const { defaults } = require('jest-config');

module.exports = {
  rootDir: '../../',
  preset: 'ts-jest/presets/js-with-babel',
  modulePathIgnorePatterns: ['./node_modules'],
  resolver: `${__dirname}/jest.resolver.js`,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  globals: {
    PACKAGE_VERSION: 'version',
    'ts-jest': {
      tsConfig: path.resolve(__dirname, 'tsconfig.test.json')
    }
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  setupFilesAfterEnv: ['<rootDir>/utils/test/jest.setup.js'],
  moduleNameMapper: {
    'garden-test-utils': '<rootDir>/utils/test/utilities.ts'
  },
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/*/src/index.js',
    '!<rootDir>/packages/.template',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageDirectory: '<rootDir>/demo/coverage',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/.template']
};
