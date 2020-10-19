/* eslint-disable no-console */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';

import { FocusJailContainer } from './FocusJailContainer';
import { IUseFocusJailProps } from './useFocusJail';

interface IBasicExampleProps extends Omit<IUseFocusJailProps, 'containerRef'> {
  focusableChildren?: React.ReactElement | React.ReactElement[];
}

describe('FocusJailContainer', () => {
  let focusSpy: jest.Mock;
  let containerReference: React.RefObject<HTMLElement> | null;

  const BasicExample = ({
    focusOnMount,
    restoreFocus,
    focusElem = focusSpy,
    environment,
    ...props
  }: IBasicExampleProps = {}) => {
    const containerRef = useRef(null);
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
        restoreFocus={restoreFocus}
        focusElem={focusElem}
        environment={environment}
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
      render(<BasicExample focusElem={focusSpy} focusOnMount={false} restoreFocus={false} />);

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('containerRef', () => {
    it('throws error if containerRef is not provided', () => {
      const originalError = console.error;

      console.error = jest.fn();

      expect(() => {
        render(
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          <FocusJailContainer>
            {({ getContainerProps }) => (
              <div {...getContainerProps({ 'data-test-id': 'container-no-ref' })}>Test</div>
            )}
          </FocusJailContainer>
          /* eslint-enable @typescript-eslint/ban-ts-comment */
        );
      }).toThrow();

      console.error = originalError;
    });
  });

  describe('getContainerProps()', () => {
    it('retrieves references by refKey', () => {
      const { getByTestId } = render(<BasicExample />);

      if (!containerReference) return;

      expect(containerReference.current).toBe(getByTestId('container'));
    });

    describe('onKeyDown()', () => {
      it('performs no action if non-tab key is pressed', () => {
        const { getByTestId } = render(<BasicExample focusElem={focusSpy} restoreFocus={false} />);

        fireEvent.keyDown(getByTestId('container'), { keyCode: KEY_CODES.END });

        // Container is still focused during initial mount
        expect(focusSpy).toHaveBeenCalledTimes(2);
      });

      it('focuses container if no tabbable elements found', () => {
        const { getByTestId } = render(
          <BasicExample focusableChildren={[]} restoreFocus={false} />
        );
        const container = getByTestId('container');

        fireEvent.keyDown(container, { keyCode: KEY_CODES.TAB });

        expect(focusSpy).toHaveBeenCalledTimes(3);
        expect(focusSpy).toHaveBeenLastCalledWith(container);
      });

      it('focuses first element if tab key is pressed', () => {
        const { getByTestId } = render(<BasicExample focusElem={focusSpy} restoreFocus={false} />);

        expect(focusSpy).toHaveBeenCalledTimes(2);
        expect(focusSpy).toHaveBeenLastCalledWith(getByTestId('container'));
      });

      it('focuses last element if tab and shift key is pressed', () => {
        const { getByTestId } = render(
          <BasicExample focusableChildren={[]} restoreFocus={false} />
        );
        const container = getByTestId('container');

        fireEvent.keyDown(container, { keyCode: KEY_CODES.TAB, shiftKey: true });

        expect(focusSpy).toHaveBeenCalledTimes(3);
        expect(focusSpy).toHaveBeenLastCalledWith(container);
      });

      it("doesn't intercept tab key if not the first or last tabbable item", () => {
        const focusableChildren = (
          <>
            <button>Focusable button</button>
            <input ref={ref => setTimeout(() => ref && ref.focus())} />
            <button>Another button</button>
          </>
        );
        const { getByTestId } = render(
          <BasicExample
            focusElem={focusSpy}
            restoreFocus={false}
            focusableChildren={focusableChildren}
          />
        );

        fireEvent.keyDown(getByTestId('container'), { keyCode: KEY_CODES.TAB });

        expect(focusSpy).toHaveBeenCalledTimes(3);
      });

      it('throws error if containerRef is null', () => {
        const originalError = console.error;
        let err = null;

        // Jest won't see the error due to it being thrown in an event.
        // Capture the message here and validate that.
        window.addEventListener('error', e => {
          err = e.message;
        });

        console.error = jest.fn();

        const { getByTestId } = render(
          <FocusJailContainer containerRef={React.createRef()}>
            {({ getContainerProps }) => (
              <div {...getContainerProps({ 'data-test-id': 'container-no-ref' })}>Test</div>
            )}
          </FocusJailContainer>
        );

        fireEvent.keyDown(getByTestId('container-no-ref'), { keyCode: KEY_CODES.TAB });

        expect(err).toBe(
          'Accessibility Error: You must apply the ref prop to your containing element.'
        );

        console.error = originalError;
      });
    });
  });

  describe('restoreFocus', () => {
    const RestoreFocusExample = () => {
      const containerRef = useRef(null);
      const [showFocusJail, setShowFocusJail] = React.useState(false);

      return (
        <>
          {showFocusJail && (
            <FocusJailContainer containerRef={containerRef}>
              {({ getContainerProps }) => (
                <div
                  {...getContainerProps({
                    ref: containerRef,
                    tabIndex: -1,
                    'data-test-id': 'container'
                  })}
                >
                  <button onClick={() => setShowFocusJail(false)}>close</button>
                </div>
              )}
            </FocusJailContainer>
          )}
          <button onClick={() => setShowFocusJail(true)}>open</button>
        </>
      );
    };

    it('can restore focus after unmounting', () => {
      const { getByTestId, getByText } = render(<RestoreFocusExample />);
      const openButton = getByText('open');

      expect(openButton).not.toHaveFocus();

      userEvent.click(openButton);
      userEvent.tab();

      expect(getByTestId('container')).toHaveFocus();
      expect(openButton).not.toHaveFocus();

      const closeButton = getByText('close');

      userEvent.click(closeButton);

      expect(openButton).toHaveFocus();
    });
  });
});
