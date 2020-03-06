# @zendeskgarden/container-pagination [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-pagination
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-pagination

This package includes containers relating to pagination in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-pagination
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers).

### usePagination

The `usePagination` hook is wrapper on top of the `useSelection` hook with
specific prop getters for pagination.

```jsx static
import { createRef, useRef } from 'react';
import { usePagination } from '@zendeskgarden/container-pagination';

const Pagination = () => {
  const previousPageRef = useRef(null);
  const nextPageRef = useRef(null);
  const pageRefs = pages.map(() => createRef(null));

  const {
    selectedItem,
    focusedItem,
    getContainerProps,
    getNextPageProps,
    getPreviousPageProps,
    getPageProps
  } = usePagination();

  // role="null" is applied due to implied role="navigation" semantics of <nav />
  return (
    <nav {...getContainerProps({ role: null })}>
      <ul style={{ display: 'flex' }}>
        <li
          {...getPreviousPageProps({
            current: selectedItem === 'prev',
            focused: focusedItem === 'prev',
            item: 'prev',
            focusRef: previousPageRef,
            ref: previousPageRef,
            key: 'previous-page'
          })}
        >
          Prev
        </li>
        {pages.map((page, index) => {
          return (
            <li
              {...getPageProps({
                focused: index === focusedItem,
                current: index === selectedItem,
                page: index,
                item: index,
                focusRef: pageRefs[index],
                ref: pageRefs[index],
                key: `page-${index}`,
                style: {
                  outline: index === focusedItem && '3px solid red',
                  background: index === selectedItem && 'gray',
                  padding: '0 6px'
                }
              })}
            >
              {index + 1}
            </li>
          );
        })}
        <li
          {...getNextPageProps({
            current: selectedItem === 'next',
            focused: focusedItem === 'next',
            item: 'next',
            focusRef: nextPageRef,
            ref: nextPageRef,
            key: 'next-page'
          })}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};
```

### PaginationContainer

```jsx static
import { createRef, useRef } from 'react';
import { PaginationContainer } from '@zendeskgarden/container-pagination';

<PaginationContainer>
  {({
    selectedItem,
    focusedItem,
    getContainerProps,
    getNextPageProps,
    getPreviousPageProps,
    getPageProps
  }) => {
    const previousPageRef = useRef(null);
    const nextPageRef = useRef(null);
    const pageRefs = pages.map(() => createRef(null));

    // role="null" is applied due to implied role="navigation" semantics of <nav />
    return (
      <nav {...getContainerProps({ role: null })}>
        <ul style={{ display: 'flex' }}>
          <li
            {...getPreviousPageProps({
              current: selectedItem === 'prev',
              focused: focusedItem === 'prev',
              item: 'prev',
              focusRef: previousPageRef,
              ref: previousPageRef,
              key: 'previous-page'
            })}
          >
            Prev
          </li>
          {pages.map((page, index) => {
            return (
              <li
                {...getPageProps({
                  focused: index === focusedItem,
                  current: index === selectedItem,
                  page: index,
                  item: index,
                  focusRef: pageRefs[index],
                  ref: pageRefs[index],
                  key: `page-${index}`,
                  style: {
                    outline: index === focusedItem && '3px solid red',
                    background: index === selectedItem && 'gray',
                    padding: '0 6px'
                  }
                })}
              >
                {index + 1}
              </li>
            );
          })}
          <li
            {...getNextPageProps({
              current: selectedItem === 'next',
              focused: focusedItem === 'next',
              item: 'next',
              focusRef: nextPageRef,
              ref: nextPageRef,
              key: 'next-page'
            })}
          >
            Next
          </li>
        </ul>
      </nav>
    );
  }}
</PaginationContainer>;
```
