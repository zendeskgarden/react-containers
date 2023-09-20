/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, useState } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import { IUseComboboxProps, useCombobox } from '@zendeskgarden/container-combobox';
import { OPTIONS } from './data';

export const IMEStory: Story = () => {
  const triggerRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const listboxRef = createRef<HTMLUListElement>();
  const [inputValue, setInputValue] = useState(OPTIONS.find(option => option.selected)?.label);

  const handleChange: IUseComboboxProps['onChange'] = ({ inputValue: _inputValue }) => {
    if (_inputValue !== undefined) {
      setInputValue(_inputValue);
    }
  };

  const {
    getLabelProps,
    getTriggerProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    activeValue,
    isExpanded,
    selection
  } = useCombobox({
    triggerRef,
    inputRef,
    listboxRef,
    options: OPTIONS,
    inputValue,
    onChange: handleChange
  });

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <div className="relative">
      <label {...getLabelProps()}>Test IME input</label>
      <div className={classNames('border', 'border-solid', 'p-1')} {...getTriggerProps()}>
        <input
          className={classNames('border-none', 'background-transparent')}
          {...getInputProps()}
        />
        <ul
          className={classNames('mt-1', 'border', 'border-solid', 'absolute', 'w-full', {
            invisible: !isExpanded
          })}
          {...getListboxProps({ 'aria-label': 'Options' })}
        >
          {OPTIONS.map((option, index) => (
            <li
              key={index}
              className={classNames({ 'bg-blue-100': option.value === activeValue })}
              {...getOptionProps({ option })}
            >
              {selection && !Array.isArray(selection) && selection.value === option.value && '✓ '}
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
