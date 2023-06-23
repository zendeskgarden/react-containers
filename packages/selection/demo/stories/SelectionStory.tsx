/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { StoryFn } from '@storybook/react';
import classNames from 'classnames';
import {
  ISelectionContainerProps,
  IUseSelectionProps,
  IUseSelectionReturnValue,
  SelectionContainer,
  useSelection
} from '@zendeskgarden/container-selection';

interface ISelectionElementProps {
  getElementProps: IUseSelectionReturnValue<any>['getElementProps'];
  value: string;
  index: number;
  direction: IUseSelectionProps<any>['direction'];
  selectedValue: IUseSelectionProps<any>['selectedValue'];
}

const SelectionElement = ({
  getElementProps,
  value,
  index,
  direction,
  selectedValue
}: ISelectionElementProps) => {
  const { ref: selectionRef, ...elementProps } = getElementProps({ value });
  const focusRef = useRef(null);

  return (
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
      ref={mergeRefs([focusRef, selectionRef!])}
      {...elementProps}
    >
      {value === selectedValue && <span className="text-lg">✓</span>}
    </li>
  );
};

interface IComponentProps extends IUseSelectionReturnValue<string> {
  direction: IUseSelectionProps<any>['direction'];
  rtl: IUseSelectionProps<any>['rtl'];
  values: IUseSelectionProps<any>['values'];
}

const SelectionGroup = ({
  direction,
  rtl,
  values,
  getGroupProps,
  getElementProps,
  selectedValue
}: IComponentProps) => (
  <ul
    aria-label="selection"
    className={classNames('flex', {
      'flex-col': direction === 'vertical',
      'flex-row-reverse': direction !== 'vertical' && rtl
    })}
    {...getGroupProps()}
  >
    {values.map((value, index) => (
      <SelectionElement
        key={value}
        value={value}
        index={index}
        direction={direction}
        selectedValue={selectedValue}
        getElementProps={getElementProps}
      />
    ))}
  </ul>
);

const Container = ({ ...props }: IUseSelectionProps<string>) => (
  <SelectionContainer {...props}>
    {containerProps => (
      <SelectionGroup
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
    <SelectionGroup
      values={props.values}
      direction={props.direction}
      rtl={props.rtl}
      {...hookProps}
    />
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
