/* eslint-disable no-console */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import { render, fireEvent } from 'react-testing-library';

import { FocusJailContainer } from './FocusJailContainer';

describe('FocusJailContainer', () => {
  let focusSpy;
  let containerReference;

  // eslint-disable-next-line react/prop-types
  const BasicExample = ({ focusOnMount, focusElem = focusSpy, ...props } = {}) => {
    const containerRef = useRef(null);
    // eslint-disable-next-line react/prop-types
    const focusableChildren = props.focusableChildren || (
      <>
        <button data-test-id="button">focusable button</button>
        <input data-test-id="input" />
      </>
    );

    return (
      <FocusJailContainer
        containerRef={containerRef}
        focusOnMount={focusOnMount}
        focusElem={focusElem}
      >
        {({ getContainerProps }) => {
          containerReference = containerRef;

          return (
            <div
              {...getContainerProps({
                'data-test-id': 'container',
                ref: containerRef
              })}
            >
              <p>non-focusable test</p>
              {focusableChildren}
            </div>
          );
        }}
      </FocusJailContainer>
    );
  };

  beforeEach(() => {
    focusSpy = jest.fn();
  });

  afterEach(() => {
    focusSpy.mockClear();

    containerReference = null;
  });

  describe('render', () => {
    it('focuses container element by default', () => {
      render(<BasicExample focusElem={focusSpy} />);

      expect(focusSpy).toHaveBeenCalled();
    });

    it('does not focus container element if focusOnMount is false', () => {
      render(<BasicExample focusElem={focusSpy} focusOnMount={false} />);

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('containerRef', () => {
    it('throws error if containerRef is not provided', () => {
      const originalError = console.error;

      console.error = jest.fn();

      expect(() => {
        render(
          <FocusJailContainer>
            {({ getContainerProps }) => (
              <div {...getContainerProps({ 'data-test-id': 'container-no-ref' })}>Test</div>
            )}
          </FocusJailContainer>
        );
      }).toThrow();

      console.error = originalError;
    });
  });

  describe('getContainerProps()', () => {
    it('retrieves references by refKey', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(containerReference.current).toBe(getByTestId('container'));
    });

    describe('onKeyDown()', () => {
      it('performs no action if non-tab key is pressed', () => {
        const { container } = render(<BasicExample focusElem={focusSpy} />);

        fireEvent.keyDown(container, { keyCode: KEY_CODES.END });

        // Container is still focused during initial mount
        expect(focusSpy).toHaveBeenCalledTimes(2);
      });

      it('focuses container if no tabbable elements found', () => {
        const { container, getByTestId } = render(<BasicExample focusableChildren={[]} />);

        fireEvent.keyDown(container, { keyCode: KEY_CODES.TAB });

        expect(focusSpy).toHaveBeenCalledTimes(2);
        expect(focusSpy).toHaveBeenLastCalledWith(getByTestId('container'));
      });

      it('focuses first element if tab key is pressed', () => {
        const { getByTestId } = render(<BasicExample focusElem={focusSpy} />);

        expect(focusSpy).toHaveBeenCalledTimes(2);
        expect(focusSpy).toHaveBeenLastCalledWith(getByTestId('container'));
      });

      it('focuses last element if tab and shift key is pressed', () => {
        const { container, getByTestId } = render(<BasicExample focusableChildren={[]} />);

        fireEvent.keyDown(container, { keyCode: KEY_CODES.TAB, shiftKey: true });

        expect(focusSpy).toHaveBeenCalledTimes(2);
        expect(focusSpy).toHaveBeenLastCalledWith(getByTestId('container'));
      });

      it("doesn't intercept tab key if not the first or last tabbable item", () => {
        const focusableChildren = (
          <>
            <button>Focusable button</button>
            <input ref={ref => setTimeout(() => ref && ref.focus())} />
            <button>Another button</button>
          </>
        );
        const { container } = render(
          <BasicExample focusElem={focusSpy} focusableChildren={focusableChildren} />
        );

        fireEvent.keyDown(container, { keyCode: KEY_CODES.TAB });

        expect(focusSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
