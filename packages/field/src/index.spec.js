/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { getExports } from '@zendeskgarden/react-testing';
import * as rootIndex from './';
import { generateId, setIdCounter } from '@zendeskgarden/container-utilities';

describe('Index', () => {
  it('exports all components and utilities', async () => {
    const exports = await getExports({
      cwd: __dirname,
      fileMapper: files => {
        return files
          .map(entry =>
            entry
              .replace(/\.js$/u, '')
              .split('/')
              .pop()
          )
          .concat(Object.keys({ generateId, setIdCounter }))
          .sort();
      }
    });

    expect(Object.keys(rootIndex).sort()).toEqual(exports);
  });
});
