/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboboxContainer } from './';
import { IUseComboboxProps } from './types';

interface ITestComboboxProps
  extends Omit<
    IUseComboboxProps<HTMLElement, HTMLUListElement>,
    'triggerRef' | 'inputRef' | 'listboxRef'
  > {
  layout: 'Garden' | 'Downshift';
}

describe('ComboboxContainer', () => {
  const user = userEvent.setup();
  const TestCombobox = ({ layout, options, ...props }: ITestComboboxProps) => {
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
            {layout === 'Garden' ? (
              <div data-test-id="trigger" {...getTriggerProps()}>
                <input data-test-id="input" {...getInputProps()} />
              </div>
            ) : (
              <>
                <input data-test-id="input" {...getInputProps()} />
                <button data-test-id="trigger" {...getTriggerProps()} type="button" />
              </>
            )}
            <ul data-test-id="listbox" {...getListboxProps({ 'aria-label': 'Options' })}>
              {options.map((option, index) => (
                <li
                  key={option.value || index}
                  data-test-id={`option-${index + 1}`}
                  {...getOptionProps({ option })}
                >
                  {option.label || option.value}
                </li>
              ))}
            </ul>
          </>
        )}
      </ComboboxContainer>
    );
  };

  describe.each<ITestComboboxProps['layout'][]>([['Garden'], ['Downshift']])(
    'with %s layout',
    layout => {
      const options = [
        { value: 'test-1', label: 'Test one' },
        { value: 'test-2', label: 'Test two' },
        { value: 'test-3', label: 'Test three' }
      ];

      it('applies correct accessibility attributes', () => {
        const { getByTestId } = render(<TestCombobox layout={layout} options={options} />);
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
        expect(option).toHaveAttribute('aria-selected', 'false');
      });

      it('is in the tab sequence', async () => {
        const { getByTestId } = render(<TestCombobox layout={layout} options={options} />);
        const input = getByTestId('input');

        await user.tab();

        expect(document.activeElement).toBe(input);
      });

      it('keeps non-input elements out of the tab sequence', async () => {
        const { getByTestId } = render(<TestCombobox layout={layout} options={options} />);
        const input = getByTestId('input');
        const trigger = getByTestId('trigger');
        const listbox = getByTestId('listbox');
        const option = getByTestId('option-1');

        await user.tab();
        await user.tab();

        expect(document.activeElement).not.toBe(input);
        expect(document.activeElement).not.toBe(trigger);
        expect(document.activeElement).not.toBe(listbox);
        expect(document.activeElement).not.toBe(option);
      });

      it('focuses input when triggered', async () => {
        const { getByTestId } = render(<TestCombobox layout={layout} options={options} />);
        const trigger = getByTestId('trigger');
        const input = getByTestId('input');

        await user.click(trigger);

        expect(document.activeElement).toBe(input);
      });

      describe('when focused', () => {
        let input: HTMLElement;
        let listboxOptions: HTMLElement[];

        beforeEach(async () => {
          const { getByTestId, getAllByRole } = render(
            <TestCombobox layout={layout} options={options} />
          );

          input = getByTestId('input');
          listboxOptions = getAllByRole('option');

          await user.click(input);
        });

        it('expands and activates the first option on down arrow', async () => {
          await user.keyboard('{ArrowDown}');

          expect(input).toHaveAttribute('aria-expanded', 'true');
          expect(input).toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[0].getAttribute('id')
          );
        });

        it('expands and activates the last option on up arrow', async () => {
          await user.keyboard('{ArrowUp}');

          expect(input).toHaveAttribute('aria-expanded', 'true');
          expect(input).toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[listboxOptions.length - 1].getAttribute('id')
          );
        });

        it('dismisses expansion on escape', async () => {
          await user.keyboard('{ArrowDown}');

          expect(input).toHaveAttribute('aria-expanded', 'true');

          await user.keyboard('{Esc}');

          expect(input).toHaveAttribute('aria-expanded', 'false');
        });

        describe('with listbox active', () => {
          beforeEach(async () => {
            await user.keyboard('{ArrowDown}');
          });

          it('selects the active option on enter', async () => {
            await user.keyboard('{Enter}');

            expect(listboxOptions[0]).toHaveAttribute('aria-selected', 'true');
            expect(input).toHaveAttribute('value', options[0].label);
          });

          it('activates next option on down arrow', async () => {
            await user.keyboard('{ArrowDown}');

            expect(input).toHaveAttribute(
              'aria-activedescendant',
              listboxOptions[1].getAttribute('id')
            );
          });

          it('activates last option on up arrow', async () => {
            await user.keyboard('{ArrowUp}');

            expect(input).toHaveAttribute(
              'aria-activedescendant',
              listboxOptions[listboxOptions.length - 1].getAttribute('id')
            );
          });

          it('activates first option on home', async () => {
            await user.keyboard('{ArrowUp}');
            await user.keyboard('{Home}');

            expect(input).toHaveAttribute(
              'aria-activedescendant',
              listboxOptions[0].getAttribute('id')
            );
          });

          it('activates last option on end', async () => {
            await user.keyboard('{End}');

            expect(input).toHaveAttribute(
              'aria-activedescendant',
              listboxOptions[listboxOptions.length - 1].getAttribute('id')
            );
          });

          it('does not jump on page up/down', async () => {
            await user.keyboard('{PageDown}');

            expect(input).toHaveAttribute(
              'aria-activedescendant',
              listboxOptions[0].getAttribute('id')
            );

            await user.keyboard('{PageUp}');

            expect(input).toHaveAttribute(
              'aria-activedescendant',
              listboxOptions[0].getAttribute('id')
            );
          });
        });
      });
    }
  );
});
