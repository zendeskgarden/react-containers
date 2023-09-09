/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

// import { renderHook } from '@testing-library/react-hooks';
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

    expect(result.current).toContain('id:');
  });

  it('generates CSR ID', () => {
    const { result, hydrate } = renderHook(() => useId());

    hydrate();

    expect(result.current).toBeGreaterThanOrEqual(0);
  });

  it('accepts an ID', () => {
    const { result } = renderHook(() => useId('test'));

    expect(result.current).toBe('test');
  });

  afterEach(() => {
    console.error = consoleError;
  });
});