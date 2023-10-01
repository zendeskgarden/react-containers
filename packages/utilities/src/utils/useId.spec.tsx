/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { renderHook } from '@testing-library/react-hooks/server';
import { useId } from './useId';

describe('useId()', () => {
  const consoleError = console.error;

  beforeEach(() => {
    // filter @reach/auto-id useLayoutEffect console errors
    console.error = jest.fn();
  });

  it('generates SSR ID', () => {
    const { result } = renderHook(() => useId());
    const expected = Object.hasOwn(React, 'useId') ? ':R0:' : 'id:';

    expect(result.current).toContain(expected);
  });

  it('generates CSR ID', () => {
    const { result, hydrate } = renderHook(() => useId());

    hydrate();

    if (Object.hasOwn(React, 'useId')) {
      expect(result.current).toBe(':R0:');
    } else {
      expect(result.current).toBeGreaterThanOrEqual(0);
    }
  });

  it('accepts an ID', () => {
    const { result } = renderHook(() => useId('test'));

    expect(result.current).toBe('test');
  });

  afterEach(() => {
    console.error = consoleError;
  });
});
