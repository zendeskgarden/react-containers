/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { PaginationContainer } from './PaginationContainer';

describe('PaginationContainer', () => {
  let wrapper;
  const pages = [1, 2, 3, 4, 5];

  const BasicExample = () => {
    const previousPageRef = useRef(null);
    const nextPageRef = useRef(null);
    const pageRefs = pages.map(() => React.createRef(null));

    return (
      <PaginationContainer>
        {({
          getContainerProps,
          getPageProps,
          getPreviousPageProps,
          getNextPageProps,
          focusedItem,
          selectedItem
        }) => (
          <div {...getContainerProps({ 'data-test-id': 'container' })}>
            <div
              {...getPreviousPageProps({
                'data-test-id': 'previous',
                key: 'previous',
                item: 'prev',
                focusRef: previousPageRef,
                ref: previousPageRef,
                'data-focused': focusedItem === 'previous',
                'data-selected': selectedItem === 'previous'
              })}
            />
            {pages.map(page => (
              <div
                {...getPageProps({
                  key: page,
                  item: page,
                  focusRef: pageRefs[page - 1],
                  ref: pageRefs[page - 1],
                  page,
                  current: page === selectedItem ? 'current' : undefined,
                  'data-test-id': 'page',
                  'data-selected': page === selectedItem,
                  'data-focused': page === focusedItem
                })}
              >
                {page}
              </div>
            ))}
            <div
              {...getNextPageProps({
                'data-test-id': 'next',
                key: 'next',
                item: 'next',
                focusRef: nextPageRef,
                ref: nextPageRef,
                'data-focused': focusedItem === 'next',
                'data-selected': selectedItem === 'next'
              })}
            />
          </div>
        )}
      </PaginationContainer>
    );
  };

  const containerProps = props => {
    return mount(
      <PaginationContainer>
        {({ getContainerProps }) => (
          <div {...getContainerProps({ 'data-test-id': 'container', ...props })} />
        )}
      </PaginationContainer>
    );
  };

  const pageProps = props => {
    return mount(
      <PaginationContainer>
        {({ getPageProps }) => <div {...getPageProps(props)} />}
      </PaginationContainer>
    );
  };

  const nextPageProps = props => {
    return mount(
      <PaginationContainer>
        {({ getNextPageProps }) => <div {...getNextPageProps(props)} />}
      </PaginationContainer>
    );
  };

  const previousPageProps = props => {
    return mount(
      <PaginationContainer>
        {({ getPreviousPageProps }) => <div {...getPreviousPageProps(props)} />}
      </PaginationContainer>
    );
  };

  beforeEach(() => {
    act(() => {
      wrapper = mount(<BasicExample />);
    });
  });

  const findContainer = enzymeWrapper => enzymeWrapper.find('[data-test-id="container"]');
  const findPage = enzymeWrapper => enzymeWrapper.find('[data-test-id="page"]');
  const findPrevious = enzymeWrapper => enzymeWrapper.find('[data-test-id="previous"]');
  const findNext = enzymeWrapper => enzymeWrapper.find('[data-test-id="next"]');

  describe('getContainerProps()', () => {
    it('applies correct accessibility attributes', () => {
      const container = findContainer(wrapper);

      expect(container).toHaveProp('role', 'listbox');
      expect(container).toHaveProp('aria-label', 'Pagination navigation');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const component = containerProps({ ariaLabel });

      expect(findContainer(component)).toHaveProp('aria-label', ariaLabel);
    });
  });

  describe('getPreviousPageProps()', () => {
    describe('throws', () => {
      let ref;
      const component = props => {
        return () => {
          previousPageProps(props);
        };
      };

      beforeEach(() => {
        console.error = jest.fn(); // eslint-disable-line no-console

        ref = React.createRef();
      });

      it('if item prop is not provided', () => {
        expect(component({ focusRef: ref })).toThrow(
          'Accessibility Error: You must provide an "item" option to "getItemProps()"'
        );
      });

      it('if focusRef prop is not provided', () => {
        expect(component({ item: 1 })).toThrow(
          'Accessibility Error: You must provide a "focusRef" option to "getItemProps()"'
        );
      });
    });

    it('applies correct accessibility attributes', () => {
      expect(findPrevious(wrapper)).toHaveProp('aria-label', 'Previous Page');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const component = previousPageProps({
        ariaLabel,
        focusRef: React.createRef(),
        item: 1,
        'data-test-id': 'previous'
      });

      expect(findPrevious(component)).toHaveProp('aria-label', ariaLabel);
    });
  });

  describe('getNextPageProps()', () => {
    describe('throws', () => {
      let ref;
      const component = props => {
        return () => {
          nextPageProps(props);
        };
      };

      beforeEach(() => {
        console.error = jest.fn(); // eslint-disable-line no-console

        ref = React.createRef();
      });

      it('if item prop is not provided', () => {
        expect(component({ focusRef: ref })).toThrow(
          'Accessibility Error: You must provide an "item" option to "getItemProps()"'
        );
      });

      it('if focusRef prop is not provided', () => {
        expect(component({ item: 1 })).toThrow(
          'Accessibility Error: You must provide a "focusRef" option to "getItemProps()"'
        );
      });
    });

    it('applies correct accessibility attributes', () => {
      expect(findNext(wrapper)).toHaveProp('aria-label', 'Next Page');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const component = nextPageProps({
        ariaLabel,
        focusRef: React.createRef(),
        item: 1,
        'data-test-id': 'next'
      });

      expect(findNext(component)).toHaveProp('aria-label', ariaLabel);
    });
  });

  describe('getPageProps()', () => {
    describe('throws', () => {
      let ref;
      const component = props => {
        return () => {
          pageProps(props);
        };
      };

      beforeEach(() => {
        console.error = jest.fn(); // eslint-disable-line no-console

        ref = React.createRef();
      });

      it('if item prop is not provided', () => {
        expect(component({ focusRef: ref })).toThrow(
          'Accessibility Error: You must provide an "item" option to "getItemProps()"'
        );
      });

      it('if focusRef prop is not provided', () => {
        expect(component({ item: 1 })).toThrow(
          'Accessibility Error: You must provide a "focusRef" option to "getItemProps()"'
        );
      });
    });

    it('applies correct accessibility attributes if not current page', () => {
      expect(findPage(wrapper).at(0)).toHaveProp('aria-label', 'Page 1');
    });

    it('applies correct accessibility attributes if current page', () => {
      findPage(wrapper)
        .at(0)
        .simulate('click');

      expect(findPage(wrapper).at(0)).toHaveProp('aria-label', 'Current page, Page 1');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const component = pageProps({
        ariaLabel,
        focusRef: React.createRef(),
        item: 1,
        'data-test-id': 'page'
      });

      expect(findPage(component)).toHaveProp('aria-label', ariaLabel);
    });
  });
});
