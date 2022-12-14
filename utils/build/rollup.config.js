/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import analyze from 'rollup-plugin-analyzer';
import license from 'rollup-plugin-license';
import cleanup from 'rollup-plugin-cleanup';
import del from 'rollup-plugin-delete';
import jsx from 'acorn-jsx';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import tsc from 'typescript';

const pkg = require(path.resolve('./package.json'));
const babelOptions = require(path.resolve('../../babel.config.js'));

const externalPackages = [
  'react',
  'react-dom',
  'prop-types',
  'react-uid',
  ...Object.keys(pkg.dependencies || {})
];

if (!externalPackages.includes('@babel/runtime')) {
  throw new Error(`Package "${pkg.name}" must include the "@babel/runtime" dependency.`);
}

export default [
  {
    input: pkg['zendeskgarden:src'],
    /**
     * Only mark common dependencies as externals.
     * These are not included in the bundlesize.
     */
    external: id => externalPackages.includes(id),
    acornInjectPlugins: [jsx()],
    plugins: [
      /**
       * Remove existing dist files and type definitions
       */
      del({ targets: 'dist/*' }),
      nodeResolve({
        mainFields: ['module', 'main', 'jsnext', 'browser']
      }),
      commonjs({ include: 'node_modules/**' }),
      typescript({
        tsconfig: 'tsconfig.build.json',
        useTsconfigDeclarationDir: true,
        typescript: tsc
      }),
      babel({
        babelrc: false,
        runtimeHelpers: true,
        exclude: 'node_modules/**', // only transpile our source code
        ...babelOptions,
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
      }),
      /**
       * Replace PACKAGE_VERSION constant with the current package version
       */
      replace({ PACKAGE_VERSION: `'${pkg.version}'`, preventAssignment: true }),
      /**
       * Remove comments from source files
       */
      cleanup({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
      /**
       * Apply global Zendesk license
       */
      license({
        banner: `
      Copyright Zendesk, Inc.

      Use of this source code is governed under the Apache License, Version 2.0
      found at http://www.apache.org/licenses/LICENSE-2.0.
          `.trim()
      }),
      /**
       * Only enforce matching size snapshot files in CI environments
       */
      sizeSnapshot({
        matchSnapshot: !!process.env.CI,
        printInfo: !!process.env.CI || !!process.env.ANALYZE_BUNDLE
      }),
      !!process.env.ANALYZE_BUNDLE && analyze({ summaryOnly: true })
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
