/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { ScrollRegionContainer } from './index';

jest.useFakeTimers();

describe('ScrollRegionContainer', () => {
  const Example = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <ScrollRegionContainer containerRef={containerRef}>
        {containerTabIndex => (
          <div ref={containerRef} tabIndex={containerTabIndex} data-test-id="container">
            <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea.</p>
          </div>
        )}
      </ScrollRegionContainer>
    );
  };

  it('allows keyboard focus when region has overflow', () => {
    render(<Example />);

    const container = screen.getByTestId('container');
    const regionContent = container.children[0];

    // mock region with overflow layout
    Object.defineProperty(regionContent, 'scrollHeight', { value: 248 });
    Object.defineProperty(regionContent, 'scrollWidth', { value: 300 });
    Object.defineProperty(container, 'offsetHeight', { value: 200 });
    Object.defineProperty(container, 'offsetWidth', { value: 300 });

    act(() => {
      jest.runAllTimers();
    });

    userEvent.tab();

    expect(container).toHaveFocus();
    expect(container).toHaveAttribute('tabIndex', '0');
  });

  it('does not allow keyboard focus when region does not overflow', () => {
    render(<Example />);

    const container = screen.getByTestId('container');
    const regionContent = container.children[0];

    // mock region without overflow layout
    Object.defineProperty(regionContent, 'scrollHeight', { value: 151 });
    Object.defineProperty(regionContent, 'scrollWidth', { value: 300 });
    Object.defineProperty(container, 'offsetHeight', { value: 200 });
    Object.defineProperty(container, 'offsetWidth', { value: 300 });

    act(() => {
      jest.runAllTimers();
    });

    userEvent.tab();

    expect(container).not.toHaveFocus();
    expect(container).not.toHaveAttribute('tabIndex');
  });
});
