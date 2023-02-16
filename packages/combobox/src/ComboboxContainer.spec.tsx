/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboboxContainer } from './';
import { IUseComboboxProps } from './types';

interface ITestComboboxProps
  extends Omit<
    IUseComboboxProps<HTMLElement, HTMLUListElement>,
    'triggerRef' | 'inputRef' | 'listboxRef'
  > {
  layout: 'Garden' | 'Downshift';
  inputTestId?: string;
  triggerTestId?: string;
  listboxTestId?: string;
  optionTestIdPrefix?: string;
}

describe('ComboboxContainer', () => {
  const user = userEvent.setup();
  const TestCombobox = ({
    layout,
    options,
    inputTestId = 'input',
    triggerTestId = 'trigger',
    listboxTestId = 'listbox',
    optionTestIdPrefix = 'option',
    ...props
  }: ITestComboboxProps) => {
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
              <div data-test-id={triggerTestId} {...getTriggerProps()}>
                <input data-test-id={inputTestId} {...getInputProps()} />
              </div>
            ) : (
              <>
                <input data-test-id={inputTestId} {...getInputProps()} />
                <button data-test-id={triggerTestId} {...getTriggerProps()} type="button" />
              </>
            )}
            <ul data-test-id={listboxTestId} {...getListboxProps({ 'aria-label': 'Options' })}>
              {options.map((option, index) => (
                <li
                  key={option.value || index}
                  data-test-id={`${optionTestIdPrefix}-${index + 1}`}
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

      it('can be disabled', () => {
        const { getByTestId } = render(<TestCombobox disabled layout={layout} options={options} />);
        const input = getByTestId('input');
        const trigger = getByTestId('trigger');

        expect(input).toHaveAttribute('disabled');

        if (layout === 'Garden') {
          expect(trigger).toHaveAttribute('aria-disabled', 'true');
        } else {
          expect(trigger).toHaveAttribute('disabled');
        }
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
            await user.keyboard('{ArrowUp}{Home}');

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

      describe('on selection', () => {
        let input: HTMLElement;
        let listboxOptions: HTMLElement[];
        let rerender: RenderResult['rerender'];

        beforeEach(async () => {
          const {
            getByTestId,
            getAllByRole,
            rerender: _rerender
          } = render(
            <TestCombobox
              layout={layout}
              options={[
                { value: 'test-1' },
                { value: 'test-2', selected: true },
                { value: 'test-3' }
              ]}
            />
          );

          input = getByTestId('input');
          listboxOptions = getAllByRole('option');
          rerender = _rerender;

          await user.click(input);
        });

        it('applies the correct accessibility attributes', () => {
          expect(listboxOptions[1]).toHaveAttribute('aria-selected', 'true');
        });

        it('automatically activates the expected option', async () => {
          await user.keyboard('{ArrowDown}');

          expect(input).toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[1].getAttribute('id')
          );

          await user.keyboard('{Escape}{Alt>}{ArrowDown}{/Alt}');

          expect(input).toHaveAttribute('aria-expanded', 'true');
          expect(input).toHaveAttribute('aria-activedescendant', '');
        });

        it('handles default option activation as expected', async () => {
          rerender(
            /* simulate option filtering */
            <TestCombobox
              defaultActiveIndex={0}
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-3' }]}
            />
          );

          await user.keyboard('{ArrowDown}');

          expect(input).toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[0].getAttribute('id')
          );
        });

        it('changes selection as expected', async () => {
          await user.keyboard('{ArrowDown}');
          await user.type(listboxOptions[0], '{Enter}');

          expect(listboxOptions[0]).toHaveAttribute('aria-selected', 'true');
          expect(listboxOptions[1]).toHaveAttribute('aria-selected', 'false');
        });

        it('throws error if initialized with multiple selections', () => {
          const consoleError = console.error;

          console.error = jest.fn();

          expect(() => {
            render(
              <TestCombobox
                layout={layout}
                options={[
                  { value: 'test-1', selected: true },
                  { value: 'test-2', selected: true }
                ]}
              />
            );
          }).toThrow('no more than one selected');

          console.error = consoleError;
        });
      });

      describe('on multiple selection', () => {
        let input: HTMLElement;
        let listbox: HTMLElement;
        let listboxOptions: HTMLElement[];

        beforeEach(async () => {
          const { getByTestId, getAllByRole } = render(
            <TestCombobox
              isMultiselectable
              layout={layout}
              options={[
                { value: 'test-1' },
                { value: 'test-2', selected: true },
                { value: 'test-3' },
                { value: 'test-4', selected: true },
                { value: 'test-5' }
              ]}
            />
          );

          input = getByTestId('input');
          listbox = getByTestId('listbox');
          listboxOptions = getAllByRole('option');

          await user.click(input);
          await user.keyboard('{ArrowDown}');
        });

        it('applies correct accessibility attributes', () => {
          expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
        });

        it('updates selection as expected', async () => {
          await user.click(listboxOptions[2]);

          expect(listboxOptions[1]).toHaveAttribute('aria-selected', 'true');
          expect(listboxOptions[2]).toHaveAttribute('aria-selected', 'true');
          expect(listboxOptions[3]).toHaveAttribute('aria-selected', 'true');
        });

        it('keeps listbox expanded on selection', async () => {
          await user.click(listboxOptions[0]);

          expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        it('handles initial selection', async () => {
          const { getByText } = render(
            <TestCombobox isMultiselectable layout={layout} options={[{ value: 'test' }]} />
          );
          const option = getByText('test');

          await user.click(option);

          expect(option).toHaveAttribute('aria-selected', 'true');
        });

        it('handles deselection', async () => {
          await user.click(listboxOptions[1]);

          expect(listboxOptions[1]).toHaveAttribute('aria-selected', 'false');
          expect(listboxOptions[3]).toHaveAttribute('aria-selected', 'true');
        });
      });

      describe('without autocomplete', () => {
        it('applies correct accessibility attributes', () => {
          const { getByTestId } = render(
            <TestCombobox isAutocomplete={false} layout={layout} options={options} />
          );
          const input = getByTestId('input');
          const trigger = getByTestId('trigger');

          expect(input).not.toHaveAttribute('aria-autocomplete');

          if (layout === 'Garden') {
            expect(trigger).not.toHaveAttribute('aria-controls');
            expect(trigger).not.toHaveAttribute('aria-expanded');
          }
        });
      });

      describe('with disabled options', () => {
        let input: HTMLElement;
        let listboxOptions: HTMLElement[];
        let rerender: RenderResult['rerender'];

        beforeEach(async () => {
          const {
            getByTestId,
            getAllByRole,
            rerender: _rerender
          } = render(
            <TestCombobox
              layout={layout}
              options={[
                { value: 'test-1' },
                { value: 'test-2', disabled: true },
                { value: 'test-3' }
              ]}
            />
          );

          input = getByTestId('input');
          listboxOptions = getAllByRole('option');
          rerender = _rerender;

          await user.click(input);
          await user.keyboard('{ArrowDown}');
        });

        it('applies correct accessibility attributes', () => {
          expect(listboxOptions[1]).toHaveAttribute('aria-disabled', 'true');
        });

        it('prevents disabled option activation', async () => {
          await user.keyboard('{ArrowDown}');

          expect(input).toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[2].getAttribute('id')
          );

          await user.hover(listboxOptions[1]);

          expect(input).not.toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[1].getAttribute('id')
          );
        });

        it('re-enables options as expected', () => {
          rerender(
            /* simulate dynamic option enablement */
            <TestCombobox
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-2' }, { value: 'test-3' }]}
            />
          );

          expect(listboxOptions[1]).not.toHaveAttribute('aria-disabled');
        });
      });

      describe('controlled', () => {
        const handleChange = jest.fn();
        let input: HTMLElement;
        let listboxOptions: HTMLElement[];
        let rerender: RenderResult['rerender'];

        beforeEach(() => {
          handleChange.mockReset();

          const {
            getByTestId,
            getAllByRole,
            rerender: _rerender
          } = render(
            <TestCombobox
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-2' }, { value: 'test-3' }]}
              isExpanded={false}
              inputValue=""
              activeIndex={-1}
              selectionValue={null}
              onChange={handleChange}
            />
          );

          input = getByTestId('input');
          listboxOptions = getAllByRole('option');
          rerender = _rerender;
        });

        it('calls onChange as expected', async () => {
          await user.click(input);
          await user.keyboard('{ArrowDown}');

          expect(handleChange).toHaveBeenCalledTimes(1);

          const changeTypes = handleChange.mock.calls.map(([change]) => change.type);

          expect(changeTypes).toMatchObject(['input:keyDown:ArrowDown']);
        });

        it('handles controlled selection as expected', () => {
          expect(listboxOptions[0]).toHaveAttribute('aria-selected', 'false');

          rerender(
            <TestCombobox
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-2' }, { value: 'test-3' }]}
              isExpanded={false}
              inputValue=""
              activeIndex={-1}
              selectionValue="test-1"
              onChange={handleChange}
            />
          );

          expect(listboxOptions[0]).toHaveAttribute('aria-selected', 'true');
        });

        it('handles controlled multiple selection as expected', () => {
          expect(listboxOptions[0]).toHaveAttribute('aria-selected', 'false');

          rerender(
            <TestCombobox
              isMultiselectable
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-2' }, { value: 'test-3' }]}
              isExpanded={false}
              inputValue=""
              activeIndex={-1}
              selectionValue={['test-1']}
              onChange={handleChange}
            />
          );

          expect(listboxOptions[0]).toHaveAttribute('aria-selected', 'true');
        });

        it('throws for unexpected selection array', () => {
          const consoleError = console.error;

          console.error = jest.fn();

          expect(() => {
            render(
              <TestCombobox
                layout={layout}
                options={[{ value: 'test-1' }, { value: 'test-2' }]}
                selectionValue={['test-1', 'test-2']}
              />
            );
          }).toThrow('to be a string');

          console.error = consoleError;
        });
      });

      it('throws for unexpected selection string', () => {
        const consoleError = console.error;

        console.error = jest.fn();

        expect(() => {
          render(
            <TestCombobox
              isMultiselectable
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-2' }]}
              selectionValue="test-1"
            />
          );
        }).toThrow('to be an array');

        console.error = consoleError;
      });
    }
  );

  describe('only with Garden layout', () => {
    it('handles autocomplete trigger click', async () => {
      const { getByTestId } = render(<TestCombobox layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      expect(input).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger);

      expect(input).not.toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles listbox collapse on input blur', async () => {
      const { getByTestId } = render(<TestCombobox layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);
      await user.keyboard('{Tab}');

      expect(input).not.toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles listbox collapse on unrelated focus', async () => {
      const { getByTestId } = render(<TestCombobox layout="Garden" options={[]} />);
      const trigger = getByTestId('trigger');

      await user.click(trigger);
      await user.click(document.body);

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles disabled trigger click', async () => {
      const { getByTestId } = render(<TestCombobox disabled layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      expect(input).not.toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles trigger click without autocomplete', async () => {
      const { getByTestId } = render(
        <TestCombobox isAutocomplete={false} layout="Garden" options={[]} />
      );
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      expect(input).toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
