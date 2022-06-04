/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { FocusJailContainer, IUseFocusJailProps } from './';

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
    focusableChildren
  }: IBasicExampleProps = {}) => {
    const containerRef = useRef(null);
    const focusJailContainerChildren = focusableChildren || (
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
            <div data-test-id="container" {...getContainerProps()} ref={containerRef}>
              <p>non-focusable test</p>
              {focusJailContainerChildren}
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
          // @ts-expect-error
          <FocusJailContainer>
            {({ getContainerProps }) => (
              <div data-test-id="container-no-ref" {...getContainerProps()}>
                Test
              </div>
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
        const { getByTestId } = render(
          <BasicExample
            focusElem={() => undefined}
            restoreFocus={false}
            focusableChildren={
              <>
                <p>non-focusable test</p>
                <button>First button</button>
                <button>Second button</button>
                <button>Last button</button>
              </>
            }
          />
        );

        const focusJailContainer = getByTestId('container');
        const firstButton = screen.getByRole('button', { name: /First button/iu });
        const secondButton = screen.getByRole('button', { name: /Second button/iu });
        const lastButton = screen.getByRole('button', { name: /Last button/iu });

        expect(document.body).toHaveFocus();

        userEvent.tab({ focusTrap: focusJailContainer });
        expect(firstButton).toHaveFocus();

        userEvent.tab({ shift: true, focusTrap: focusJailContainer });
        expect(firstButton).toHaveFocus();

        userEvent.tab({ focusTrap: focusJailContainer });
        expect(secondButton).toHaveFocus();

        userEvent.tab({ focusTrap: focusJailContainer });
        expect(lastButton).toHaveFocus();

        userEvent.tab({ focusTrap: focusJailContainer });
        expect(lastButton).toHaveFocus();
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
              <div data-test-id="container-no-ref" {...getContainerProps()}>
                Test
              </div>
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
                  data-test-id="container"
                  {...getContainerProps({
                    tabIndex: -1
                  })}
                  ref={containerRef}
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

    it('can restore focus after unmounting', async () => {
      const { queryByText, getByText, getByTestId } = render(<RestoreFocusExample />);
      const openButton = getByText('open');

      expect(openButton).not.toHaveFocus();

      userEvent.click(openButton);

      expect(getByText('close')).not.toHaveFocus();

      userEvent.tab({ focusTrap: getByTestId('container') });

      expect(getByText('close')).toHaveFocus();

      userEvent.click(getByText('close'));

      await waitFor(() => expect(queryByText('close')).not.toBeInTheDocument());

      expect(openButton).toHaveFocus();
    });
  });
});
