/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ComboboxContainer } from './';
import { IUseComboboxProps } from './types';

describe('ComboboxContainer', () => {
  describe('with Garden layout', () => {
    const TestCombobox = ({
      options,
      ...props
    }: Omit<
      IUseComboboxProps<HTMLDivElement, HTMLUListElement>,
      'triggerRef' | 'inputRef' | 'listboxRef'
    >) => {
      const triggerRef = createRef<HTMLDivElement>();
      const inputRef = createRef<HTMLInputElement>();
      const listboxRef = createRef<HTMLUListElement>();

      return (
        <ComboboxContainer
          triggerRef={triggerRef}
          inputRef={inputRef}
          listboxRef={listboxRef}
          options={options}
          {...props}
        >
          {({ getTriggerProps, getInputProps, getListboxProps, getOptionProps }) => (
            <>
              <div data-test-id="trigger" {...getTriggerProps()}>
                <input data-test-id="input" {...getInputProps()} />
              </div>
              <ul data-test-id="listbox" {...getListboxProps({ 'aria-label': 'Options' })}>
                {options.map((option, index) => (
                  <li data-test-id={`option-${index + 1}`} {...getOptionProps({ option })}>
                    {option.label || option.value}
                  </li>
                ))}
              </ul>
            </>
          )}
        </ComboboxContainer>
      );
    };

    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(
        <TestCombobox options={[{ value: 1, label: 'One', selected: true }]} />
      );
      const trigger = getByTestId('trigger');
      const input = getByTestId('input');
      const listbox = getByTestId('listbox');
      const listboxId = listbox.getAttribute('id');
      const option = getByTestId('option-1');

      expect(trigger).toHaveAttribute('aria-controls', listboxId);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-activedescendant');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-controls', listboxId);
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('autocomplete', 'off');
      expect(listbox).toHaveAttribute('role', 'listbox');
      expect(listbox).toHaveAttribute('aria-label', 'Options');
      expect(option).toHaveAttribute('role', 'option');
      expect(option).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('with Downshift layout', () => {
    const TestCombobox = ({
      options,
      ...props
    }: Omit<
      IUseComboboxProps<HTMLDivElement, HTMLUListElement>,
      'triggerRef' | 'inputRef' | 'listboxRef'
    >) => {
      const triggerRef = createRef<HTMLButtonElement>();
      const inputRef = createRef<HTMLInputElement>();
      const listboxRef = createRef<HTMLUListElement>();

      return (
        <ComboboxContainer
          triggerRef={triggerRef}
          inputRef={inputRef}
          listboxRef={listboxRef}
          options={options}
          {...props}
        >
          {({ getTriggerProps, getInputProps, getListboxProps, getOptionProps }) => (
            <>
              <input data-test-id="input" {...getInputProps()} />
              <button data-test-id="trigger" {...getTriggerProps()} type="button" />
              <ul data-test-id="listbox" {...getListboxProps({ 'aria-label': 'Options' })}>
                {options.map((option, index) => (
                  <li data-test-id={`option-${index + 1}`} {...getOptionProps({ option })}>
                    {option.label || option.value}
                  </li>
                ))}
              </ul>
            </>
          )}
        </ComboboxContainer>
      );
    };

    it('applies correct accessibility attributes', () => {
      const { getByTestId } = render(
        <TestCombobox options={[{ value: 1, label: 'One', selected: true }]} />
      );
      const trigger = getByTestId('trigger');
      const input = getByTestId('input');
      const listbox = getByTestId('listbox');
      const listboxId = listbox.getAttribute('id');
      const option = getByTestId('option-1');

      expect(trigger).toHaveAttribute('aria-controls', listboxId);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-activedescendant');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-controls', listboxId);
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('autocomplete', 'off');
      expect(listbox).toHaveAttribute('role', 'listbox');
      expect(listbox).toHaveAttribute('aria-label', 'Options');
      expect(option).toHaveAttribute('role', 'option');
      expect(option).toHaveAttribute('aria-selected', 'true');
    });
  });
});
