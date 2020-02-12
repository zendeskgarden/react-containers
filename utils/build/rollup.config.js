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

const pkg = require(path.resolve('./package.json'));
const babelOptions = require(path.resolve('../../babel.config.js'));

export default [
  {
    input: pkg['zendeskgarden:src'],
    /**
     * Only mark common peerDependencies as externals.
     * These are not included in the bundlesize.
     */
    external: ['react', 'react-dom', 'prop-types', 'react-uid'],
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
        useTsconfigDeclarationDir: true
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**', // only transpile our source code
        ...babelOptions
      }),
      /**
       * Replace PACKAGE_VERSION constant with the current package version
       */
      replace({ PACKAGE_VERSION: `'${pkg.version}'` }),
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
