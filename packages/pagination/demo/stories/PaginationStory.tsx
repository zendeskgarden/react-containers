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
  IUsePaginationReturnValue,
  PaginationContainer,
  usePagination
} from '@zendeskgarden/container-pagination';
import classNames from 'classnames';

interface IComponentProps extends IUsePaginationReturnValue<any> {
  pages: Record<string, RefObject<any>>;
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
  const keys = Object.keys(pages);

  return (
    <nav aria-label="pagination">
      <ul className="flex" {...getContainerProps()}>
        <li
          className={classNames(className, { 'text-grey-400': selectedItem === keys[0] })}
          {...getPreviousPageProps({ item: 'prev', focusRef: previousRef })}
        >
          &lt;
        </li>
        {keys.map((key, index) => {
          const current = key === selectedItem;

          return (
            <li
              key={key}
              className={classNames(className, { 'bg-blue-300': current })}
              {...getPageProps({
                item: key,
                focusRef: pages[key],
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
            'text-grey-400': selectedItem === keys[keys.length - 1]
          })}
          {...getNextPageProps({ item: 'next', focusRef: nextRef })}
        >
          &gt;
        </li>
      </ul>
    </nav>
  );
};

interface IProps extends IPaginationContainerProps<any> {
  pages: Record<string, RefObject<any>>;
}

const Container = ({ pages, ...props }: IProps) => (
  <PaginationContainer {...props}>
    {containerProps => <Component pages={pages} {...containerProps} />}
  </PaginationContainer>
);

const Hook = ({ pages, ...props }: IProps) => {
  const hookProps = usePagination(props);

  return <Component pages={pages} {...hookProps} />;
};

interface IArgs extends IPaginationContainerProps<any> {
  as: 'hook' | 'container';
  pages: number;
}

export const PaginationStory: Story<IArgs> = ({ as, pages, ...props }) => {
  const _pages = Array.from({ length: pages }, (_, index) => index).reduce(
    (previous, current) => ({ ...previous, [current]: createRef() }),
    {}
  );

  switch (as) {
    case 'container':
      return <Container pages={_pages} {...props} />;

    case 'hook':
    default:
      return <Hook pages={_pages} {...props} />;
  }
};
