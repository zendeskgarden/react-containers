/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IGetPageProps } from './usePagination';
import { PaginationContainer } from './PaginationContainer';

describe('PaginationContainer', () => {
  const pages = [1, 2, 3, 4, 5];

  const BasicExample = () => {
    const previousPageRef = useRef(null);
    const nextPageRef = useRef(null);
    const pageRefs = pages.map(() => React.createRef());

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
                'data-focused': focusedItem === 'next',
                'data-selected': selectedItem === 'next'
              })}
            />
          </div>
        )}
      </PaginationContainer>
    );
  };

  const pageProps = (props: IGetPageProps<any>) => {
    return render(
      <PaginationContainer>
        {({ getPageProps }) => <div {...getPageProps({ 'data-test-id': 'page', ...props })} />}
      </PaginationContainer>
    );
  };

  const nextPageProps = (props: IGetPageProps<any>) => {
    return render(
      <PaginationContainer>
        {({ getNextPageProps }) => (
          <div {...getNextPageProps({ 'data-test-id': 'next', ...props })} />
        )}
      </PaginationContainer>
    );
  };

  const previousPageProps = (props: IGetPageProps<any>) => {
    return render(
      <PaginationContainer>
        {({ getPreviousPageProps }) => {
          return <div {...getPreviousPageProps({ 'data-test-id': 'previous', ...props })} />;
        }}
      </PaginationContainer>
    );
  };

  describe('getContainerProps()', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(<BasicExample />);
      const container = getByTestId('container');

      expect(container).toHaveAttribute('role', 'list');
    });
  });

  describe('getPreviousPageProps()', () => {
    describe('throws', () => {
      let ref: React.RefObject<HTMLElement>;
      const component = (props: IGetPageProps<any>) => {
        return () => {
          const { container } = previousPageProps(props);

          return container;
        };
      };

      beforeEach(() => {
        console.error = jest.fn();

        ref = React.createRef();
      });

      it('if item prop is not provided', () => {
        expect(component({ focusRef: ref } as any)).toThrow(
          'Accessibility Error: You must provide an "item" option to "getPreviousPageProps()"'
        );
      });

      it('if focusRef prop is not provided', () => {
        expect(component({ item: 1 } as any)).toThrow(
          'Accessibility Error: You must provide a "focusRef" option to "getPreviousPageProps()"'
        );
      });
    });

    it('applies correct accessibility attributes', () => {
      const { getByTestId } = previousPageProps({
        item: 1,
        focusRef: React.createRef()
      });

      expect(getByTestId('previous')).toHaveAttribute('aria-label', 'Previous Page');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const { getByTestId } = previousPageProps({
        ariaLabel,
        focusRef: React.createRef(),
        item: 1
      });

      expect(getByTestId('previous')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('getNextPageProps()', () => {
    describe('throws', () => {
      let ref: React.RefObject<HTMLElement>;
      const component = (props: IGetPageProps<any>) => {
        return () => {
          const { container } = nextPageProps(props);

          return container;
        };
      };

      beforeEach(() => {
        console.error = jest.fn();

        ref = React.createRef();
      });

      it('if item prop is not provided', () => {
        expect(component({ focusRef: ref } as any)).toThrow(
          'Accessibility Error: You must provide an "item" option to "getNextPageProps()"'
        );
      });

      it('if focusRef prop is not provided', () => {
        expect(component({ item: 1 } as any)).toThrow(
          'Accessibility Error: You must provide a "focusRef" option to "getNextPageProps()"'
        );
      });
    });

    it('applies correct accessibility attributes', () => {
      const { getByTestId } = nextPageProps({ item: 1, focusRef: React.createRef() });

      expect(getByTestId('next')).toHaveAttribute('aria-label', 'Next Page');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const { getByTestId } = nextPageProps({
        ariaLabel,
        focusRef: React.createRef(),
        item: 1
      });

      expect(getByTestId('next')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('getPageProps()', () => {
    describe('throws', () => {
      let ref: React.RefObject<HTMLElement>;
      const component = (props: IGetPageProps<any>) => {
        return () => {
          const { container } = pageProps(props);

          return container;
        };
      };

      beforeEach(() => {
        console.error = jest.fn();

        ref = React.createRef();
      });

      it('if item prop is not provided', () => {
        expect(component({ focusRef: ref } as any)).toThrow(
          'Accessibility Error: You must provide an "item" option to "getPageProps()"'
        );
      });

      it('if focusRef prop is not provided', () => {
        expect(component({ item: 1 } as any)).toThrow(
          'Accessibility Error: You must provide a "focusRef" option to "getPageProps()"'
        );
      });
    });

    it('applies correct accessibility attributes if not current page', () => {
      const { getByTestId } = pageProps({ item: 1, focusRef: React.createRef(), page: 1 });

      expect(getByTestId('page')).toHaveAttribute('aria-label', 'Page 1');
    });

    it('applies correct accessibility attributes if current page', () => {
      const { getByTestId } = pageProps({
        item: 1,
        focusRef: React.createRef(),
        page: 1,
        current: true
      });
      const page = getByTestId('page');

      fireEvent.click(page);
      expect(page).toHaveAttribute('aria-label', 'Current page, Page 1');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const { getByTestId } = pageProps({
        ariaLabel,
        focusRef: React.createRef(),
        item: 1
      });

      expect(getByTestId('page')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
