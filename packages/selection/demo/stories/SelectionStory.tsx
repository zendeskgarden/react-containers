/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  ISelectionContainerProps,
  IUseSelectionProps,
  IUseSelectionReturnValue,
  SelectionContainer,
  useSelection
} from '@zendeskgarden/container-selection';

interface IComponentProps extends IUseSelectionReturnValue<string> {
  direction: IUseSelectionProps<any>['direction'];
  rtl: IUseSelectionProps<any>['rtl'];
  items: string[];
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
        key={item}
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
        {...getItemProps({ item })}
      >
        {item === selectedItem && <span className="text-lg">✓</span>}
      </li>
    ))}
  </ul>
);

interface IProps extends IUseSelectionProps<string> {
  items: string[];
}

const Container = ({ ...props }: IProps) => (
  <SelectionContainer {...props}>
    {containerProps => (
      <Component
        items={props.items}
        direction={props.direction}
        rtl={props.rtl}
        {...containerProps}
      />
    )}
  </SelectionContainer>
);

const Hook = ({ ...props }: IProps) => {
  const hookProps = useSelection({ ...props });

  return (
    <Component items={props.items} direction={props.direction} rtl={props.rtl} {...hookProps} />
  );
};

interface IArgs extends ISelectionContainerProps<string> {
  as: 'hook' | 'container';
  items: string[];
}

export const SelectionStory: Story<IArgs> = ({ as, ...props }: IArgs) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
