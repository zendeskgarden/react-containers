/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, PropsWithChildren } from 'react';
import { act } from 'react-dom/test-utils';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboboxContainer, useCombobox } from './';
import { IUseComboboxProps, IUseComboboxReturnValue } from './types';

interface ITestComboboxProps
  extends Omit<
    IUseComboboxProps<HTMLElement, HTMLUListElement>,
    'triggerRef' | 'inputRef' | 'listboxRef'
  > {
  layout: 'Garden' | 'Downshift';
  labelTestId?: string;
  hintTestId?: string;
  tagTestId?: string;
  inputTestId?: string;
  triggerTestId?: string;
  listboxTestId?: string;
  optGroupTestIdPrefix?: string;
  optionTestIdPrefix?: string;
  messageTestId?: string;
}

describe('ComboboxContainer', () => {
  const user = userEvent.setup();
  const TestCombobox = ({
    layout,
    options,
    isAutocomplete = true,
    isEditable = true,
    hasHint = true,
    hasMessage = true,
    labelTestId = 'label',
    hintTestId = 'hint',
    tagTestId = 'tag',
    inputTestId = 'input',
    triggerTestId = 'trigger',
    listboxTestId = 'listbox',
    optGroupTestIdPrefix = 'optgroup',
    optionTestIdPrefix = 'option',
    messageTestId = 'message',
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
        hasHint={hasHint}
        hasMessage={hasMessage}
        isAutocomplete={isAutocomplete}
        isEditable={isEditable}
        {...props}
      >
        {({
          getLabelProps,
          getHintProps,
          getTriggerProps,
          getTagProps,
          getInputProps,
          getListboxProps,
          getOptGroupProps,
          getOptionProps,
          getMessageProps,
          selection
        }) => (
          <>
            <label data-test-id={labelTestId} {...getLabelProps()}>
              Label
            </label>
            {hasHint && (
              <div data-test-id={hintTestId} {...getHintProps()}>
                Hint
              </div>
            )}
            {layout === 'Garden' ? (
              <div data-test-id={triggerTestId} {...getTriggerProps()}>
                {Array.isArray(selection) &&
                  selection.map(option => (
                    <button
                      key={option.value as string}
                      data-test-id={tagTestId}
                      disabled={option.disabled}
                      {...getTagProps({ 'aria-label': 'tag', option })}
                      type="button"
                    >
                      {option.label || option.value}
                    </button>
                  ))}
                <input data-test-id={inputTestId} {...getInputProps()} />
              </div>
            ) : (
              <div
                data-test-id={!isEditable && triggerTestId}
                {...(!isEditable && getTriggerProps())}
              >
                {Array.isArray(selection) &&
                  selection.map(option => (
                    <button
                      key={option.value as string}
                      data-test-id={tagTestId}
                      disabled={option.disabled}
                      {...getTagProps({ 'aria-label': 'tag', option })}
                      type="button"
                    >
                      {option.label || option.value}
                    </button>
                  ))}
                <input data-test-id={inputTestId} {...getInputProps()} />
                {isEditable && (
                  <button data-test-id={triggerTestId} {...getTriggerProps()} type="button" />
                )}
              </div>
            )}
            {hasMessage && (
              <div data-test-id={messageTestId} {...getMessageProps()}>
                Message
              </div>
            )}
            <ul data-test-id={listboxTestId} {...getListboxProps({ 'aria-label': 'Options' })}>
              {options.map((option, index) =>
                'options' in option ? (
                  <li key={option.label || index}>
                    <ul
                      {...getOptGroupProps({ 'aria-label': option.label || 'group' })}
                      data-test-id={`${optGroupTestIdPrefix}-${index + 1}`}
                    >
                      {option.options.map((groupOption, groupIndex) => (
                        <li
                          key={(groupOption.value as string) || groupIndex}
                          data-test-id={`${optionTestIdPrefix}-${index + 1}.${groupIndex + 1}`}
                          {...getOptionProps({ option: groupOption })}
                        >
                          {groupOption.label || groupOption.value}
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li
                    key={(option.value as string) || index}
                    data-test-id={`${optionTestIdPrefix}-${index + 1}`}
                    {...getOptionProps({ option })}
                  >
                    {option.label || option.value}
                  </li>
                )
              )}
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
        { value: 'test-3', label: 'Test three' },
        {
          options: [
            { value: 'test-4', label: 'Test four' },
            { value: 'test-5', label: 'Test five' }
          ],
          label: 'Group'
        }
      ];

      it('applies correct accessibility attributes', () => {
        const { getByTestId } = render(<TestCombobox layout={layout} options={options} />);
        const label = getByTestId('label');
        const hint = getByTestId('hint');
        const trigger = getByTestId('trigger');
        const input = getByTestId('input');
        const message = getByTestId('message');
        const listbox = getByTestId('listbox');
        const listboxId = listbox.getAttribute('id');
        const option = getByTestId('option-1');
        const optGroup = getByTestId('optgroup-4');

        expect(label).toHaveAttribute('for', input.getAttribute('id'));
        expect(trigger).toHaveAttribute('aria-controls', listboxId);
        expect(input).toHaveAttribute('role', 'combobox');
        expect(input).toHaveAttribute('aria-activedescendant');
        expect(input).toHaveAttribute('aria-autocomplete', 'list');
        expect(input).toHaveAttribute('aria-controls', listboxId);
        expect(input).toHaveAttribute(
          'aria-describedby',
          `${hint.getAttribute('id')} ${message.getAttribute('id')}`
        );
        expect(input).toHaveAttribute('aria-expanded', 'false');
        expect(input).toHaveAttribute('aria-labelledby', label.getAttribute('id'));
        expect(input).toHaveAttribute('autocomplete', 'off');
        expect(listbox).toHaveAttribute('role', 'listbox');
        expect(listbox).toHaveAttribute('aria-label', 'Options');
        expect(option).toHaveAttribute('role', 'option');
        expect(option).toHaveAttribute('aria-selected', 'false');
        expect(optGroup).toHaveAttribute('role', 'group');
      });

      it('applies correct non-editable accessibility attributes', () => {
        const { getByTestId } = render(
          <TestCombobox layout={layout} options={options} isEditable={false} />
        );
        const label = getByTestId('label');
        const trigger = getByTestId('trigger');
        const input = getByTestId('input');

        expect(label).not.toHaveAttribute('for');
        expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
        expect(trigger).toHaveAttribute('tabIndex', '0');
        expect(input).not.toHaveAttribute('role');
        expect(input).toHaveAttribute('readOnly');
        expect(input).toHaveAttribute('aria-hidden', 'true');
        expect(input).toHaveAttribute('tabIndex', '-1');
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

      describe('on click', () => {
        it('expands and collapses the listbox', async () => {
          const { getByTestId } = render(<TestCombobox layout={layout} options={options} />);
          const trigger = getByTestId('trigger');
          const input = getByTestId('input');

          expect(input).toHaveAttribute('aria-expanded', 'false');

          await user.click(trigger);

          expect(input).toHaveAttribute('aria-expanded', 'true');

          await user.click(trigger);

          expect(input).toHaveAttribute('aria-expanded', 'false');
        });
      });

      describe('when focused', () => {
        let input: HTMLElement;
        let listboxOptions: HTMLElement[];

        beforeEach(() => {
          const { getByTestId, getAllByRole } = render(
            <TestCombobox layout={layout} options={options} />
          );

          input = getByTestId('input');
          listboxOptions = getAllByRole('option');

          input.focus();
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

        beforeEach(() => {
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

          input.focus();
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
              defaultActiveIndex={1}
              layout={layout}
              options={[{ value: 'test-1' }, { value: 'test-3' }]}
            />
          );

          await user.keyboard('{ArrowDown}');

          expect(input).toHaveAttribute(
            'aria-activedescendant',
            listboxOptions[1].getAttribute('id')
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
        let tags: HTMLElement[];
        let input: HTMLElement;
        let listbox: HTMLElement;
        let listboxOptions: HTMLElement[];

        beforeEach(async () => {
          const { getByTestId, getAllByRole, getAllByTestId } = render(
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
          tags = getAllByTestId('tag');

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

          await act(async () => {
            await user.click(tags[1]);
          });

          expect(tags[1]).toHaveFocus();

          await user.keyboard('{Delete}');

          expect(listboxOptions[3]).toHaveAttribute('aria-selected', 'false');
          expect(input).toHaveFocus();

          await user.keyboard('{Tab}');

          expect(input).not.toHaveFocus();
        });
      });

      describe('non-editable', () => {
        let label: HTMLElement;
        let trigger: HTMLElement;
        let input: HTMLElement;
        let listboxOptions: HTMLElement[];

        beforeEach(() => {
          const { getByTestId, getAllByRole } = render(
            <TestCombobox
              isEditable={false}
              layout={layout}
              options={[
                { value: 'test-1', label: 'Apple' },
                { value: 'test-2', label: 'Banana' },
                { value: 'test-3', label: 'Cherry', selected: true },
                { value: 'test-4', label: 'Brussel sprouts' }
              ]}
            />
          );

          label = getByTestId('label');
          trigger = getByTestId('trigger');
          input = getByTestId('input');
          listboxOptions = getAllByRole('option');
        });

        it('handles label click', async () => {
          await user.click(label);

          expect(trigger).toHaveFocus();
        });

        it('handles expansion keys', async () => {
          trigger.focus();

          expect(trigger).toHaveAttribute('aria-expanded', 'false');

          await user.keyboard('{Enter}');

          expect(trigger).toHaveAttribute('aria-expanded', 'true');

          await user.keyboard('{Enter}');

          expect(trigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('handles option matching', async () => {
          trigger.focus();

          await user.keyboard('a');

          expect(trigger).toHaveAttribute('aria-expanded', 'true');
          expect(trigger).toHaveAttribute('aria-activedescendant', listboxOptions[0].id);

          await user.keyboard('PPLE');

          expect(trigger).toHaveAttribute('aria-activedescendant', listboxOptions[0].id);
        });

        it('starts matching at selection', async () => {
          trigger.focus();

          await user.keyboard('b');

          expect(trigger).toHaveAttribute('aria-activedescendant', listboxOptions[3].id);
        });

        it('prevents programmatic input focus', () => {
          input.focus();

          expect(trigger).toHaveFocus();
        });

        it('disables as expected', () => {
          const { getByTestId } = render(
            <TestCombobox
              disabled
              isEditable={false}
              layout={layout}
              options={options}
              triggerTestId="no-edit-trigger"
            />
          );
          const testTrigger = getByTestId('no-edit-trigger');

          expect(testTrigger).toHaveAttribute('tabIndex', '-1');
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

          input.focus();
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

          await user.click(listboxOptions[1]);

          expect(input).toHaveAttribute('aria-expanded', 'true');
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

          expect(handleChange).toHaveBeenCalledTimes(2);

          const changeTypes = handleChange.mock.calls.map(([change]) => change.type);

          expect(changeTypes).toMatchObject(['input:click', 'input:keyDown:ArrowDown']);
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
          }).toThrow('not to be an array');

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

  describe('`removeSelection`', () => {
    let selection: IUseComboboxReturnValue['selection'];
    let removeSelection: IUseComboboxReturnValue['removeSelection'];
    const TestRemoveSelectionCombobox = ({
      options,
      children,
      ...props
    }: PropsWithChildren<Omit<ITestComboboxProps, 'layout'>>) => {
      const triggerRef = createRef<HTMLDivElement>();
      const inputRef = createRef<HTMLInputElement>();
      const listboxRef = createRef<HTMLUListElement>();
      const {
        selection: _selection,
        removeSelection: _removeSelection,
        getInputProps,
        getListboxProps
      } = useCombobox({
        triggerRef,
        inputRef,
        listboxRef,
        options,
        ...props
      });

      selection = _selection;
      removeSelection = _removeSelection;

      return (
        <>
          <input {...getInputProps()} />
          {children}
          <ul {...getListboxProps({ 'aria-label': 'Options' })} />
        </>
      );
    };

    it('clears multiselectable values', async () => {
      const options = [{ value: 'test-1', selected: true }];
      const { getByTestId } = render(
        <TestRemoveSelectionCombobox isMultiselectable options={options}>
          <button data-test-id="button" onClick={() => removeSelection('test-1')} />
        </TestRemoveSelectionCombobox>
      );
      const button = getByTestId('button');

      expect(selection).toHaveLength(1);

      await user.click(button);

      expect(selection).toHaveLength(0);
    });

    it('clears multiselectable objects', async () => {
      const options = [{ value: 'test-1', selected: true }];
      const { getByTestId } = render(
        <TestRemoveSelectionCombobox isMultiselectable options={options}>
          <button data-test-id="button" onClick={() => removeSelection(options[0])} />
        </TestRemoveSelectionCombobox>
      );
      const button = getByTestId('button');

      expect(selection).toHaveLength(1);

      await user.click(button);

      expect(selection).toHaveLength(0);
    });

    it('clears all selections', async () => {
      const options = [
        { value: 'test-1', selected: true },
        { value: 'test-2', selected: true }
      ];
      const { getByTestId } = render(
        <TestRemoveSelectionCombobox isMultiselectable options={options}>
          <button data-test-id="button" onClick={() => removeSelection()} />
        </TestRemoveSelectionCombobox>
      );
      const button = getByTestId('button');

      expect(selection).toHaveLength(2);

      await user.click(button);

      expect(selection).toHaveLength(0);
    });

    it('clears single selection values', async () => {
      const { getByTestId } = render(
        <TestRemoveSelectionCombobox options={[{ value: 'test-1', selected: true }]}>
          <button data-test-id="button" onClick={() => removeSelection('test-1')} />
        </TestRemoveSelectionCombobox>
      );
      const button = getByTestId('button');

      expect(selection).not.toBeNull();

      await user.click(button);

      expect(selection).toBeNull();
    });

    it('warns if selection cannot be removed', async () => {
      const consoleWarn = console.warn;

      console.warn = jest.fn();

      const { getByTestId } = render(
        <TestRemoveSelectionCombobox options={[]}>
          <button data-test-id="button" onClick={() => removeSelection('test-1')} />
        </TestRemoveSelectionCombobox>
      );
      const button = getByTestId('button');

      await user.click(button);

      expect(console.warn).toHaveBeenCalled();

      console.warn = consoleWarn;
    });
  });

  describe('only with Garden layout', () => {
    it('handles autocomplete trigger click', async () => {
      const { getByTestId } = render(<TestCombobox layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      expect(input).toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger);

      expect(input).not.toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles listbox collapse on input blur', async () => {
      const { getByTestId } = render(<TestCombobox layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);
      await user.keyboard('{Tab}');

      expect(input).not.toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles listbox collapse on non-editable multiselectable blur', async () => {
      const { getByTestId } = render(
        <TestCombobox layout="Garden" options={[]} isEditable={false} isMultiselectable />
      );
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Tab}');

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles listbox collapse on unrelated focus', async () => {
      const { getByTestId } = render(<TestCombobox layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      await act(async () => {
        await user.click(document.body);
      });

      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles disabled trigger click', async () => {
      const { getByTestId } = render(<TestCombobox disabled layout="Garden" options={[]} />);
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');

      await user.click(trigger);

      expect(input).not.toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'false');
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

    it('retains multiselectable listbox expansion on tag focus', async () => {
      const { getByTestId } = render(
        <TestCombobox
          layout="Garden"
          isMultiselectable
          options={[{ value: 'test', selected: true }]}
        />
      );
      const input = getByTestId('input');
      const trigger = getByTestId('trigger');
      const tag = getByTestId('tag');

      await user.click(trigger);

      expect(input).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Shift>}{Tab}{/Shift}');

      expect(tag).toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('prevents tag propagation to trigger', async () => {
      const { getByTestId } = render(
        <TestCombobox
          layout="Garden"
          isEditable={false}
          isMultiselectable
          options={[{ value: 'test', selected: true }]}
        />
      );
      const trigger = getByTestId('trigger');
      const tag = getByTestId('tag');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(tag);
      await user.keyboard('{Enter}');

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('handles multiselectable value keystrokes', async () => {
      const { getByTestId } = render(
        <TestCombobox
          layout="Garden"
          isMultiselectable
          options={[{ value: 'test-1' }, { value: 'test-2', selected: true }, { value: 'test-3' }]}
        />
      );
      const tag = getByTestId('tag');
      const input = getByTestId('input');

      await user.click(tag);
      await user.keyboard('{ArrowDown}');

      expect(input).toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Shift>}{Tab}{/Shift}');
      await user.keyboard('{Escape}');

      expect(input).toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'false');

      await user.keyboard('{Shift>}{Tab}{/Shift}');
      await user.keyboard('{ArrowUp}');

      expect(input).toHaveFocus();
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('handles non-editable multiselectable value keystrokes', async () => {
      const { getByTestId } = render(
        <TestCombobox
          layout="Garden"
          isEditable={false}
          isMultiselectable
          options={[{ value: 'test-1' }, { value: 'test-2', selected: true }, { value: 'test-3' }]}
        />
      );
      const tag = getByTestId('tag');
      const trigger = getByTestId('trigger');

      await user.click(tag);
      await user.keyboard('{ArrowDown}');

      expect(trigger).toHaveFocus();
    });
  });
});
