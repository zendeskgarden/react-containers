/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { switchFn } from './switchFn';

describe('switchFn', () => {
  it('uses the correct 2nd return value for a case', () => {
    expect(
      switchFn(
        {
          case: false,
          return: 1
        },
        {
          case: true,
          return: 2
        },
        {
          return: 3
        }
      )
    ).toBe(2);
  });
  it('uses the correct return value for a case even when there are other matching cases later on', () => {
    expect(
      switchFn(
        {
          case: false,
          return: 1
        },
        {
          case: false,
          return: 2
        },
        {
          case: true,
          return: 3
        },
        {
          case: false,
          return: 4
        },
        {
          case: true,
          return: 5
        },
        {
          case: true,
          return: 6
        },
        {
          return: 7
        }
      )
    ).toBe(3);
  });
  it('uses the default case if no value matches', () => {
    expect(
      switchFn(
        {
          case: false,
          return: 1
        },
        {
          case: false,
          return: 2
        },
        {
          return: 3
        }
      )
    ).toBe(3);
  });
});
