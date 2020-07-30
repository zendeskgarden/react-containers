/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useState } from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import { PaginationContainer, usePagination } from './src';

const pages = new Array(7).fill('page');

export const Container = () => {
  const [controlledSelectedItem, setSelectedItem] = useState(3);
  const previousPageRef = useRef(null);
  const nextPageRef = useRef(null);
  const pageRefs = pages.map(() => React.createRef());

  return (
    <PaginationContainer
      selectedItem={controlledSelectedItem}
      onSelect={newSelectedItem => {
        let modifiedNewSelectedItem = controlledSelectedItem;

        if (newSelectedItem === 'prev') {
          if (controlledSelectedItem > 0) {
            modifiedNewSelectedItem = controlledSelectedItem - 1;
          }
        } else if (newSelectedItem === 'next') {
          if (controlledSelectedItem < pages.length - 1) {
            modifiedNewSelectedItem = controlledSelectedItem + 1;
          }
        } else {
          modifiedNewSelectedItem = newSelectedItem;
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
          <nav aria-label="Pagination (Container)">
            <div
              {...getContainerProps({
                style: { display: 'flex' }
              })}
            >
              <div
                {...getPreviousPageProps({
                  item: 'prev',
                  'aria-disabled': selectedItem === 0,
                  focusRef: previousPageRef,
                  ref: previousPageRef,
                  key: 'previous-page',
                  style: {
                    color: selectedItem === 0 ? 'gray' : undefined,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }
                })}
              >
                Prev
              </div>
              {pages.map((page, index) => {
                return (
                  <div
                    {...getPageProps({
                      page: index,
                      current: index === selectedItem,
                      item: index,
                      focusRef: pageRefs[index],
                      ref: pageRefs[index],
                      key: `page-${index}`,
                      style: {
                        outline: index === focusedItem ? '3px solid red' : undefined,
                        background: index === selectedItem ? 'gray' : undefined,
                        padding: '0 6px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }
                    })}
                  >
                    {index + 1}
                  </div>
                );
              })}
              <div
                {...getNextPageProps({
                  item: 'next',
                  'aria-disabled': selectedItem === pages.length - 1,
                  focusRef: nextPageRef,
                  ref: nextPageRef,
                  key: 'next-page',
                  style: {
                    color: selectedItem === pages.length - 1 ? 'gray' : undefined,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }
                })}
              >
                Next
              </div>
            </div>
          </nav>
        );
      }}
    </PaginationContainer>
  );
};

export const Hook = () => {
  const previousPageRef = useRef(null);
  const nextPageRef = useRef(null);
  const pageRefs = pages.map(() => React.createRef());
  const [controlledSelectedItem, setSelectedItem] = useState(3);

  const {
    selectedItem,
    focusedItem,
    getContainerProps,
    getNextPageProps,
    getPreviousPageProps,
    getPageProps
  } = usePagination<number | string>({
    selectedItem: controlledSelectedItem,
    onSelect: newSelectedItem => {
      let modifiedNewSelectedItem = controlledSelectedItem;

      if (newSelectedItem === 'prev') {
        if (controlledSelectedItem > 0) {
          modifiedNewSelectedItem = controlledSelectedItem - 1;
        }
      } else if (newSelectedItem === 'next') {
        if (controlledSelectedItem < pages.length - 1) {
          modifiedNewSelectedItem = controlledSelectedItem + 1;
        }
      } else {
        modifiedNewSelectedItem = newSelectedItem as number;
      }

      if (modifiedNewSelectedItem !== controlledSelectedItem) {
        setSelectedItem(modifiedNewSelectedItem);
      }
    }
  });

  return (
    <nav aria-label="Pagination (Hook)">
      <ul
        {...getContainerProps({
          role: null,
          style: { display: 'flex' }
        })}
      >
        <li
          {...getPreviousPageProps({
            role: null,
            item: 'prev',
            'aria-disabled': selectedItem === 0,
            focusRef: previousPageRef,
            key: 'previous-page',
            style: {
              color: selectedItem === 0 ? 'gray' : undefined,
              cursor: 'pointer',
              userSelect: 'none'
            }
          })}
        >
          Prev
        </li>
        {pages.map((page, index) => {
          return (
            <li
              {...getPageProps({
                role: null,
                page: index,
                current: index === selectedItem,
                item: index,
                focusRef: pageRefs[index],
                key: `page-${index}`,
                style: {
                  outline: index === focusedItem ? '3px solid red' : undefined,
                  background: index === selectedItem ? 'gray' : undefined,
                  padding: '0 6px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }
              })}
            >
              {index + 1}
            </li>
          );
        })}
        <li
          {...getNextPageProps({
            role: null,
            item: 'next',
            'aria-disabled': selectedItem === pages.length - 1,
            focusRef: nextPageRef,
            key: 'next-page',
            style: {
              color: selectedItem === pages.length - 1 ? 'gray' : undefined,
              cursor: 'pointer',
              userSelect: 'none'
            }
          })}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

Container.story = {
  name: 'PaginationContainer'
};

Hook.story = {
  name: 'usePagination',
  parameters: {
    docs: {
      storyDescription: `The \`usePagination\` hook is wrapper on top of the [\`useSelection\`](/docs/selection-container--container#useselection) hook with
      specific prop getters for pagination.`
    }
  }
};

export default {
  title: 'Pagination Container',
  decorators: [withKnobs],
  component: PaginationContainer,
  parameters: {
    componentSubtitle: `A container component which wraps the usePagination hook.`
  }
};
