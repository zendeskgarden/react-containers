/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { PaginationContainer } from './';

describe('PaginationContainer', () => {
  const pages = [1, 2, 3, 4, 5];

  const BasicExample = () => {
    const previousPageRef = createRef<HTMLDivElement>();
    const nextPageRef = createRef<HTMLDivElement>();
    const pageRefs = pages.map(() => createRef<HTMLDivElement>());

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
          <div data-test-id="container" {...getContainerProps()}>
            <div
              data-test-id="previous"
              data-focused={focusedItem === 'previous'}
              data-selected={selectedItem === 'previous'}
              {...getPreviousPageProps({
                'aria-label': 'Previous page',
                key: 'previous',
                item: 'prev',
                focusRef: previousPageRef
              })}
            />
            {pages.map((page, index) => (
              <div
                data-test-id="page"
                data-selected={page === selectedItem}
                data-focused={page === focusedItem}
                {...getPageProps({
                  'aria-label': `Page ${index + 1}`,
                  key: page,
                  item: page,
                  focusRef: pageRefs[page - 1]
                })}
              >
                {page}
              </div>
            ))}
            <div
              data-test-id="next"
              data-focused={focusedItem === 'next'}
              data-selected={selectedItem === 'next'}
              {...getNextPageProps({
                'aria-label': 'Previous page',
                key: 'next',
                item: 'next',
                focusRef: nextPageRef
              })}
            />
          </div>
        )}
      </PaginationContainer>
    );
  };

  const pageProps = (props: any) => {
    return render(
      <PaginationContainer>
        {({ getPageProps }) => <div {...getPageProps({ 'data-test-id': 'page', ...props })} />}
      </PaginationContainer>
    );
  };

  const nextPageProps = (props: any) => {
    return render(
      <PaginationContainer>
        {({ getNextPageProps }) => (
          <div {...getNextPageProps({ 'data-test-id': 'next', ...props })} />
        )}
      </PaginationContainer>
    );
  };

  const previousPageProps = (props: any) => {
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
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = previousPageProps({
        'aria-label': 'Previous Page',
        item: 1,
        focusRef: React.createRef()
      });

      expect(getByTestId('previous')).toHaveAttribute('aria-label', 'Previous Page');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const { getByTestId } = previousPageProps({
        'aria-label': ariaLabel,
        focusRef: React.createRef(),
        item: 1
      });

      expect(getByTestId('previous')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('getNextPageProps()', () => {
    it('applies correct accessibility attributes', () => {
      const { getByTestId } = nextPageProps({
        'aria-label': 'Next Page',
        item: 1,
        focusRef: React.createRef()
      });

      expect(getByTestId('next')).toHaveAttribute('aria-label', 'Next Page');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const { getByTestId } = nextPageProps({
        'aria-label': ariaLabel,
        focusRef: React.createRef(),
        item: 1
      });

      expect(getByTestId('next')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('getPageProps()', () => {
    it('applies correct accessibility attributes if not current page', () => {
      const { getByTestId } = pageProps({
        'aria-label': 'Page 1',
        item: 1,
        focusRef: React.createRef(),
        page: 1
      });

      expect(getByTestId('page')).toHaveAttribute('aria-label', 'Page 1');
    });

    it('applies correct accessibility attributes if current page', () => {
      const { getByTestId } = pageProps({
        'aria-label': 'Current page, Page 1',
        item: 1,
        focusRef: React.createRef()
      });
      const page = getByTestId('page');

      userEvent.click(page);
      expect(page).toHaveAttribute('aria-label', 'Current page, Page 1');
    });

    it('applies custom aria-label attribute', () => {
      const ariaLabel = 'Test aria label';
      const { getByTestId } = pageProps({
        'aria-label': ariaLabel,
        focusRef: React.createRef(),
        item: 1
      });

      expect(getByTestId('page')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
