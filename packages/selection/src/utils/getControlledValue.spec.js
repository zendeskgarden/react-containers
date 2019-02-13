/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import getControlledValue from './getControlledValue';

describe('getControlledValue', () => {
  it('returns first truthy value', () => {
    let foo;
    const val = 'foo';
    const controlledValue = getControlledValue(foo, val);

    expect(controlledValue).toBe(val);
  });

  it('returns undefined if no truthy value is found', () => {
    let foo;
    let val;
    const controlledValue = getControlledValue(foo, val);

    expect(controlledValue).toBeUndefined();
  });
});
