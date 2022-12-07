/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  IComboboxContainerProps,
  IUseComboboxProps,
  IUseComboboxReturnValue,
  ComboboxContainer,
  useCombobox
} from '@zendeskgarden/container-combobox';

interface IComponentProps extends IUseComboboxReturnValue {
  layout: IArgs['layout'];
  values: IUseComboboxProps['values'];
}

const Component = ({
  layout,
  isExpanded,
  activeValue,
  selectedValue,
  getTriggerProps,
  getInputProps,
  getListboxProps,
  getOptionProps,
  values
}: IComponentProps) => (
  <>
    {layout === 'Garden' && (
      <div className="inline-block border border-solid p-1" {...getTriggerProps()}>
        {Array.isArray(selectedValue) &&
          selectedValue.map((value, index) => (
            <button key={index} className="mr-1 px-1">
              {value}
            </button>
          ))}
        <input className="border-none" {...getInputProps()} />
        <button className="ml-1 px-1" tabIndex={-1}>
          &#9660;
        </button>
      </div>
    )}
    {layout === 'Downshift' && (
      <>
        <input {...getInputProps()} />
        <button className="ml-1 px-1" {...getTriggerProps()} type="button">
          &#9660;
        </button>
      </>
    )}
    <ul
      className={classNames('mt-1', 'border', 'border-solid', { invisible: !isExpanded })}
      {...getListboxProps({ 'aria-label': 'Options' })}
    >
      {values.map((value, index) => (
        <li
          key={index}
          className={classNames({ 'bg-blue-100': value === activeValue })}
          {...getOptionProps({ value })}
        >
          {(Array.isArray(selectedValue)
            ? selectedValue.includes(value)
            : selectedValue === value) && '✓ '}
          {value}
        </li>
      ))}
    </ul>
  </>
);

Component.displayName = 'Component';

interface IContainerProps extends IComboboxContainerProps<HTMLDivElement, HTMLUListElement> {
  layout: IArgs['layout'];
}

const Container = (props: IContainerProps) => (
  <ComboboxContainer {...props}>
    {containerProps => <Component {...props} {...containerProps} />}
  </ComboboxContainer>
);

interface IHookProps extends IUseComboboxProps<HTMLDivElement, HTMLUListElement> {
  layout: IArgs['layout'];
}

const Hook = (props: IHookProps) => {
  const hookProps = useCombobox(props);

  return <Component {...props} {...hookProps} />;
};

interface IArgs extends IComboboxContainerProps {
  as: 'hook' | 'container';
  layout: 'Garden' | 'Downshift';
}

export const ComboboxStory: Story<IArgs> = ({ as, ...props }) => {
  const triggerRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const listboxRef = createRef<HTMLUListElement>();

  switch (as) {
    case 'container':
      return (
        <Container {...props} triggerRef={triggerRef} inputRef={inputRef} listboxRef={listboxRef} />
      );

    case 'hook':
    default:
      return (
        <Hook {...props} triggerRef={triggerRef} inputRef={inputRef} listboxRef={listboxRef} />
      );
  }
};
