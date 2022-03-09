/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, RefObject, useRef } from 'react';
import { Story } from '@storybook/react';
import {
  IPaginationContainerProps,
  IUsePaginationProps,
  IUsePaginationReturnValue,
  PaginationContainer,
  usePagination
} from '@zendeskgarden/container-pagination';
import classNames from 'classnames';

interface IComponentProps extends IUsePaginationReturnValue<string> {
  pages: RefObject<HTMLLIElement>[];
}

const Component = ({
  pages,
  getContainerProps,
  getPreviousPageProps,
  getPageProps,
  getNextPageProps,
  selectedItem
}: IComponentProps) => {
  const previousRef = useRef();
  const nextRef = useRef();
  const className = 'border border-solid cursor-pointer px-3 py-1 select-none';

  return (
    <nav aria-label="pagination">
      <ul className="flex" {...getContainerProps()}>
        <li
          className={classNames(className, { 'text-grey-400': selectedItem === '0' })}
          {...getPreviousPageProps({ item: 'prev', focusRef: previousRef })}
        >
          &lt;
        </li>
        {pages.map((page, index) => {
          const current = index.toString() === selectedItem;

          return (
            <li
              key={index}
              className={classNames(className, { 'bg-blue-300': current })}
              {...getPageProps({
                item: index.toString(),
                focusRef: page,
                page: index + 1,
                current
              })}
            >
              {index + 1}
            </li>
          );
        })}
        <li
          className={classNames(className, {
            'text-grey-400': selectedItem === (pages.length - 1).toString()
          })}
          {...getNextPageProps({ item: 'next', focusRef: nextRef })}
        >
          &gt;
        </li>
      </ul>
    </nav>
  );
};

interface IProps extends IUsePaginationProps<string> {
  pageRefs: RefObject<HTMLLIElement>[];
}

const Container = ({ pageRefs, ...props }: IProps) => (
  <PaginationContainer {...props}>
    {containerProps => <Component pages={pageRefs} {...containerProps} />}
  </PaginationContainer>
);

const Hook = ({ pageRefs, ...props }: IProps) => {
  const hookProps = usePagination(props);

  return <Component pages={pageRefs} {...hookProps} />;
};

interface IArgs extends IPaginationContainerProps<string> {
  as: 'hook' | 'container';
  pages: number;
}

export const PaginationStory: Story<IArgs> = ({ as, pages, ...props }) => {
  const pageRefs = Array.from({ length: pages }, () => createRef<HTMLLIElement>());

  switch (as) {
    case 'container':
      return <Container pageRefs={pageRefs} {...props} />;

    case 'hook':
    default:
      return <Hook pageRefs={pageRefs} {...props} />;
  }
};
