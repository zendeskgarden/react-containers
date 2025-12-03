/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { renderHook } from '@testing-library/react';
import { useId } from './useId';

describe('useId()', () => {
  const consoleError = console.error;

  beforeEach(() => {
    // filter @reach/auto-id useLayoutEffect console errors
    console.error = jest.fn();
  });

  it('generates SSR ID', () => {
    const { result } = renderHook(() => useId());
    const expected = Object.hasOwn(React, 'useId') ? '_r_0_' : 'id:';

    expect(result.current).toContain(expected);
  });

  it('accepts an ID', () => {
    const { result } = renderHook(() => useId('test'));

    expect(result.current).toBe('test');
  });

  afterEach(() => {
    console.error = consoleError;
  });
});
