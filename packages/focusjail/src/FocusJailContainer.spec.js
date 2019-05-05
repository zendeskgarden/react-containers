/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { FocusJailContainer } from './FocusJailContainer';

describe('FocusJailContainer', () => {
  let wrapper;
  let focusSpy;
  let containerReference;

  // eslint-disable-next-line react/prop-types
  const BasicExample = ({ focusOnMount, focusElem = focusSpy } = {}) => {
    const containerRef = useRef(null);

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
              <button data-test-id="button">focusable button</button>
              <input data-test-id="input" />
            </div>
          );
        }}
      </FocusJailContainer>
    );
  };

  const findContainer = enzymeWrapper => enzymeWrapper.find('[data-test-id="container"]');

  beforeEach(() => {
    focusSpy = jest.fn();

    act(() => {
      wrapper = mount(<BasicExample />);
    });
  });

  afterEach(() => {
    focusSpy.mockClear();

    // clean up wrapper after each test, if it was used
    if (wrapper !== null) {
      wrapper.unmount();
      wrapper = null;
    }

    containerReference = null;
  });

  describe('render', () => {
    it('focuses container element by default', () => {
      act(() => {
        wrapper = mount(<BasicExample focusElem={focusSpy} />);
      });

      expect(focusSpy).toHaveBeenCalled();
    });

    it('does not focus container element if focusOnMount is false', () => {
      focusSpy.mockClear();
      act(() => {
        wrapper = mount(<BasicExample focusOnMount={false} />);
      });

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('containerRef', () => {
    it('throws error if containerRef is not provided', () => {
      console.error = jest.fn(); // eslint-disable-line no-console

      expect(() => {
        act(() => {
          mount(
            <FocusJailContainer>
              {({ getContainerProps }) => (
                <div {...getContainerProps({ 'data-test-id': 'container-no-ref' })}>Test</div>
              )}
            </FocusJailContainer>
          );
        });
      }).toThrow();
    });
  });

  describe('getContainerProps()', () => {
    it('retrieves references by refKey', () => {
      expect(containerReference.current).toBe(findContainer(wrapper).getDOMNode());
    });

    describe('onKeyDown()', () => {
      it('performs no action if non-tab key is pressed', () => {
        act(() => {
          wrapper.simulate('keydown', { keyCode: KEY_CODES.END });
        });

        // Container is still focused during initial mount
        expect(focusSpy).toHaveBeenCalledTimes(2);
      });

      it('focuses container if no tabbable elements found', () => {
        focusSpy.mockClear();
        act(() => {
          const FocusJail = () => {
            const containerRef = useRef(null);

            return (
              <FocusJailContainer containerRef={containerRef} focusElem={focusSpy}>
                {({ getContainerProps }) => (
                  <div {...getContainerProps({ 'data-test-id': 'container', ref: containerRef })}>
                    <p>non-focusable test</p>
                  </div>
                )}
              </FocusJailContainer>
            );
          };

          wrapper = mount(<FocusJail />);
        });

        wrapper.simulate('keydown', { keyCode: KEY_CODES.TAB });

        expect(focusSpy).toHaveBeenCalledTimes(3);
        expect(focusSpy).toHaveBeenLastCalledWith(findContainer(wrapper).getDOMNode());
      });

      it('focuses first element if tab key is pressed', () => {
        focusSpy.mockClear();
        act(() => {
          wrapper.simulate('keydown', { keyCode: KEY_CODES.TAB });
        });

        expect(focusSpy).toHaveBeenCalledTimes(1);
        expect(focusSpy).toHaveBeenLastCalledWith(findContainer(wrapper).getDOMNode());
      });

      it('focuses last element if tab and shift key is pressed', () => {
        focusSpy.mockClear();
        act(() => {
          wrapper.simulate('keydown', { keyCode: KEY_CODES.TAB, shiftKey: true });
        });

        expect(focusSpy).toHaveBeenCalledTimes(1);
        expect(focusSpy).toHaveBeenLastCalledWith(findContainer(wrapper).getDOMNode());
      });

      it("doesn't intercept tab key if not the first or last tabbable item", () => {
        act(() => {
          const FocusJail = () => {
            const containerRef = useRef(null);

            return (
              <FocusJailContainer containerRef={containerRef}>
                {({ getContainerProps }) => (
                  <div {...getContainerProps({ 'data-test-id': 'container', ref: containerRef })}>
                    <p>non-focusable test</p>
                    <button>Focusable button</button>
                    <input ref={ref => setTimeout(() => ref && ref.focus())} />
                    <button>Another button</button>
                  </div>
                )}
              </FocusJailContainer>
            );
          };

          wrapper = mount(<FocusJail />);
          focusSpy.mockClear();
        });
        wrapper.simulate('keydown', { keyCode: KEY_CODES.TAB });

        expect(focusSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
