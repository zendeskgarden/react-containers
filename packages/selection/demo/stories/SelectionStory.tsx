/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, RefObject } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  ISelectionContainerProps,
  IUseSelectionProps,
  SelectionContainer,
  useSelection,
  UseSelectionReturnValue
} from '@zendeskgarden/container-selection';

interface IComponentProps extends UseSelectionReturnValue<string> {
  direction: IUseSelectionProps<any>['direction'];
  rtl: IUseSelectionProps<any>['rtl'];
  items: RefObject<HTMLLIElement>[];
}

const Component = ({
  direction,
  rtl,
  items,
  getContainerProps,
  getItemProps,
  selectedItem
}: IComponentProps) => (
  <ul
    aria-label="selection"
    className={classNames('flex', {
      'flex-col': direction === 'vertical',
      'flex-row-reverse': direction !== 'vertical' && rtl
    })}
    {...getContainerProps()}
  >
    {items.map((item, index) => (
      <li
        key={index}
        className={classNames(
          'flex',
          'justify-center',
          'items-center',
          'border',
          'border-solid',
          'cursor-pointer',
          'rounded',
          'h-8',
          'w-8',
          'm-2',
          {
            [`mt-${index * 4}`]: direction === 'both'
          }
        )}
        {...getItemProps({ item: index.toString(), focusRef: item })}
      >
        {index.toString() === selectedItem && <span className="text-lg">✓</span>}
      </li>
    ))}
  </ul>
);

interface IProps extends IUseSelectionProps<string> {
  itemRefs: RefObject<HTMLLIElement>[];
}

const Container = ({ itemRefs, ...props }: IProps) => (
  <SelectionContainer {...props}>
    {containerProps => (
      <Component items={itemRefs} direction={props.direction} rtl={props.rtl} {...containerProps} />
    )}
  </SelectionContainer>
);

const Hook = ({ itemRefs, ...props }: IProps) => {
  const hookProps = useSelection(props);

  return <Component items={itemRefs} direction={props.direction} rtl={props.rtl} {...hookProps} />;
};

interface IArgs extends ISelectionContainerProps<any> {
  as: 'hook' | 'container';
  items: number;
}

export const SelectionStory: Story<IArgs> = ({ as, items, ...props }: IArgs) => {
  const itemRefs = Array.from({ length: items }, () => createRef<HTMLLIElement>());

  switch (as) {
    case 'container':
      return <Container itemRefs={itemRefs} {...props} />;

    case 'hook':
    default:
      return <Hook itemRefs={itemRefs} {...props} />;
  }
};
