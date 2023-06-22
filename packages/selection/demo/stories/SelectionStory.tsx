/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StoryFn } from '@storybook/react';
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
  values: IUseSelectionProps<any>['values'];
}

const Component = ({
  direction,
  rtl,
  values,
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
    {values.map((value, index) => (
      <li
        key={value}
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
        {...getItemProps({ value })}
      >
        {value === selectedItem && <span className="text-lg">✓</span>}
      </li>
    ))}
  </ul>
);

const Container = ({ ...props }: IUseSelectionProps<string>) => (
  <SelectionContainer {...props}>
    {containerProps => (
      <Component
        values={props.values}
        direction={props.direction}
        rtl={props.rtl}
        {...containerProps}
      />
    )}
  </SelectionContainer>
);

const Hook = ({ ...props }: IUseSelectionProps<string>) => {
  const hookProps = useSelection({ ...props });

  return (
    <Component values={props.values} direction={props.direction} rtl={props.rtl} {...hookProps} />
  );
};

interface IArgs extends ISelectionContainerProps<string> {
  as: 'hook' | 'container';
}

export const SelectionStory: StoryFn<IArgs> = ({ as, ...props }: IArgs) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
