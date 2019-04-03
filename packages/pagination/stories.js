/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useState } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { PaginationContainer, usePagination } from './src';

const pages = new Array(7).fill('page');

storiesOf('Pagination Container', module)
  .addDecorator(withKnobs)
  .add('usePagination', () => {
    const Pagination = () => {
      const previousPageRef = useRef(null);
      const nextPageRef = useRef(null);
      const pageRefs = pages.map(() => React.createRef(null));
      const [controlledSelectedItem, setSelectedItem] = useState();

      const {
        selectedItem,
        focusedItem,
        getContainerProps,
        getNextPageProps,
        getPreviousPageProps,
        getPageProps
      } = usePagination({
        selectedItem: controlledSelectedItem,
        onSelect: newSelectedItem => {
          let modifiedNewSelectedItem = newSelectedItem;

          if (newSelectedItem === 'prev' && controlledSelectedItem > 0) {
            modifiedNewSelectedItem = controlledSelectedItem - 1;
          } else if (
            modifiedNewSelectedItem === 'next' &&
            controlledSelectedItem < pages.length - 1
          ) {
            modifiedNewSelectedItem = controlledSelectedItem + 1;
          }

          if (modifiedNewSelectedItem !== controlledSelectedItem) {
            setSelectedItem(modifiedNewSelectedItem);
          }
        }
      });

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

    return <Pagination />;
  })
  .add('PaginationContainer', () => {
    const Pagination = () => {
      const [controlledSelectedItem, setSelectedItem] = useState();
      const previousPageRef = useRef(null);
      const nextPageRef = useRef(null);
      const pageRefs = pages.map(() => React.createRef(null));

      return (
        <PaginationContainer
          selectedItem={controlledSelectedItem}
          onSelect={newSelectedItem => {
            let modifiedNewSelectedItem = newSelectedItem;

            if (newSelectedItem === 'prev' && controlledSelectedItem > 0) {
              modifiedNewSelectedItem = controlledSelectedItem - 1;
            } else if (
              modifiedNewSelectedItem === 'next' &&
              controlledSelectedItem < pages.length - 1
            ) {
              modifiedNewSelectedItem = controlledSelectedItem + 1;
            }

            if (modifiedNewSelectedItem !== controlledSelectedItem) {
              setSelectedItem(modifiedNewSelectedItem);
            }
          }}
        >
          {({
            selectedItem,
            focusedItem,
            getContainerProps,
            getNextPageProps,
            getPreviousPageProps,
            getPageProps
          }) => {
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
        </PaginationContainer>
      );
    };

    return <Pagination />;
  });
