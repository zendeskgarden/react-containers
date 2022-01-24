/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { useWindow } from './useWindow';

describe('useWindow()', () => {
  it('returns global window by default', () => {
    let result;

    render(
      <>
        {React.createElement(() => {
          result = useWindow();

          return null;
        })}
      </>
    );
    expect(result).toBe(window);
  });

  it('returns a fake window if provided', () => {
    const fakeWindow = {};
    let result;

    render(
      <>
        {React.createElement(() => {
          result = useWindow(fakeWindow);

          return null;
        })}
      </>
    );

    expect(result).toBe(fakeWindow);
  });
});
