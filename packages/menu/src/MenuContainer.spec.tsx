/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import { RenderResult, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import {
  MenuItem,
  IMenuItemBase,
  MenuChangeHandler,
  IUseMenuProps,
  IUseMenuReturnValue
} from './types';
import { MenuContainer } from './';
import { StateChangeTypes } from './utils';

const ITEMS: MenuItem[] = [
  { value: 'plant-01', label: 'Petunia' },
  { value: 'plant-02', label: 'Hydrangea' },
  { value: 'separator-01', separator: true },
  { value: 'plant-03', label: 'Violet' },
  { value: 'plant-04', label: 'Succulent' },
  {
    label: 'Fruits',
    items: [
      { value: 'fruit-01', label: 'Apple', type: 'checkbox' },
      { value: 'fruit-03', label: 'Cherry', type: 'checkbox', disabled: true },
      { value: 'fruit-04', label: 'Kiwi', type: 'checkbox' }
    ]
  },
  {
    label: 'Veggies',
    items: [
      { value: 'vegetable-01', label: 'Asparagus', type: 'radio', name: 'veggies' },
      { value: 'vegetable-03', label: 'Brussel sprouts', type: 'radio', name: 'veggies' },
      { value: 'vegetable-04', label: 'Kale', type: 'radio', name: 'veggies' }
    ]
  }
];

describe('MenuContainer', () => {
  const user = userEvent.setup();

  const TestMenu = (
    props: Omit<IUseMenuProps<HTMLButtonElement, HTMLUListElement>, 'triggerRef' | 'menuRef'>
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const Fixture = () => (
      <MenuContainer triggerRef={triggerRef} menuRef={menuRef} {...props}>
        {({
          isExpanded,
          getSeparatorProps,
          getItemGroupProps,
          getTriggerProps,
          getMenuProps,
          getItemProps
        }: IUseMenuReturnValue<HTMLButtonElement, HTMLUListElement>) => (
          <>
            <button {...getTriggerProps({ type: 'button' })} data-test-id="trigger">
              Menu
            </button>
            <ul {...getMenuProps({ hidden: !isExpanded })} data-test-id="menu">
              {ITEMS.map((item: MenuItem) => {
                if ('items' in item) {
                  return (
                    <li key={item.label}>
                      <ul
                        {...getItemGroupProps({ 'aria-label': item.label })}
                        data-test-id={`group-${item.label}`}
                      >
                        {item.items.map((groupItem: IMenuItemBase) => (
                          <li key={groupItem.value} {...getItemProps({ ...groupItem })}>
                            {groupItem.label}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                if ('separator' in item) {
                  return <li {...getSeparatorProps()} key={item.value} data-test-id="separator" />;
                }

                return (
                  <li
                    {...getItemProps({ ...item })}
                    key={item.value}
                    data-test-id={`item-${item.label}`}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </MenuContainer>
    );

    return <Fixture />;
  };

  it('applies correct accessibility attributes to menu button', () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} idPrefix="test" />);
    const trigger = getByTestId('trigger');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('id', 'test-menu-trigger');
    expect(trigger).toHaveAttribute('role', 'button');
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('tabindex', '0');
  });

  it('applies correct accessibility attributes to menu', () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} idPrefix="test" />);
    const menu = getByTestId('menu');

    expect(menu).toHaveAttribute('aria-labelledby', 'test-menu-trigger');
    expect(menu).toHaveAttribute('hidden');
    expect(menu).toHaveAttribute('role', 'menu');
  });

  it('applies correct accessibility attributes to item groups', () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} />);
    const group = getByTestId('group-Fruits');

    expect(group).toHaveAttribute('aria-label', 'Fruits');
    expect(group).toHaveAttribute('role', 'group');
  });

  it('applies correct accessibility attributes to items', () => {
    const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
    const firstItem = getByText('Petunia');
    const otherItem = getByText('Hydrangea');
    const separator = getByTestId('separator');
    const checkboxItem = getByText('Apple');
    const radioItem = getByText('Kale');
    const disabledItem = getByText('Cherry');

    expect(firstItem).toHaveAttribute('role', 'menuitem');
    expect(firstItem).toHaveAttribute('tabindex', '0');
    expect(otherItem).toHaveAttribute('tabindex', '-1');
    expect(checkboxItem).toHaveAttribute('role', 'menuitemcheckbox');
    expect(checkboxItem).toHaveAttribute('aria-checked', 'false');
    expect(radioItem).toHaveAttribute('role', 'menuitemradio');
    expect(radioItem).toHaveAttribute('aria-checked', 'false');
    expect(separator).toHaveAttribute('role', 'separator');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    expect(disabledItem).not.toHaveAttribute('tabindex');
  });

  it('applies correct accessibility attributes when expanded', async () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} />);
    const trigger = getByTestId('trigger');
    const menu = getByTestId('menu');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(menu).not.toHaveAttribute('hidden');
  });

  it('can disable menu activation', () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} disabled />);
    const trigger = getByTestId('trigger');

    expect(trigger).toBeDisabled();
  });

  it("doesn't open disabled menu", async () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} disabled />);
    const trigger = getByTestId('trigger');
    const menu = getByTestId('menu');

    await user.click(trigger);

    expect(menu).not.toBeVisible();
  });

  it('closes menu on blur', async () => {
    const { getByTestId } = render(<TestMenu items={ITEMS} />);
    const trigger = getByTestId('trigger');
    const menu = getByTestId('menu');

    await act(async () => {
      await user.click(trigger);
      await user.click(document.body);
    });

    expect(menu).not.toBeVisible();
  });

  describe('focus', () => {
    describe('trigger', () => {
      it('focuses first item on trigger click', async () => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const firstItem = getByText('Petunia');

        await user.click(trigger);

        expect(firstItem).toHaveFocus();
      });

      it.each([
        ['Enter', '{Enter}'],
        ['Space', ' '],
        ['ArrowDown', '{ArrowDown}']
      ])('focuses first item on trigger %s keydown', async (_, input) => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const firstItem = getByText('Petunia');

        trigger.focus();
        await user.keyboard(input);

        expect(firstItem).toHaveFocus();
      });

      it('focuses last item on trigger ArrowUp keydown', async () => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const lastItem = getByText('Kale');

        trigger.focus();
        await user.keyboard('{ArrowUp}');

        expect(lastItem).toHaveFocus();
      });

      it('focuses trigger when item clicked', async () => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const item = getByText('Violet');

        await user.click(trigger);
        await user.click(item);

        await waitFor(() => expect(trigger).toHaveFocus());
      });

      it.each([
        ['Escape', '{Escape}'],
        ['Tab', '{Tab}']
      ])('focuses trigger when %s key pressed in expanded menu', async (_, input) => {
        const { getByTestId } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');

        await user.click(trigger);
        await user.keyboard(input);

        await waitFor(() => expect(trigger).toHaveFocus());
      });
    });

    describe('menu items', () => {
      let trigger;
      let firstItem: HTMLElement;
      let secondItem: HTMLElement;
      let lastItem: HTMLElement;
      let otherItem: HTMLElement;

      beforeEach(async () => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);

        firstItem = getByText('Petunia');
        secondItem = getByText('Hydrangea');
        lastItem = getByText('Kale');
        otherItem = getByText('Apple');
        trigger = getByTestId('trigger');

        await user.click(trigger);
      });

      it('focuses next item on ArrowDown', async () => {
        await user.keyboard('{ArrowDown}');

        expect(secondItem).toHaveFocus();
      });

      it('focuses previous item on ArrowUp', async () => {
        await user.keyboard('{ArrowUp}');

        expect(lastItem).toHaveFocus();
      });

      it('focuses first item when ArrowDown pressed on last item', async () => {
        await user.keyboard('{ArrowUp}');
        await user.keyboard('{ArrowDown}');

        expect(firstItem).toHaveFocus();
      });

      it('focuses last item on End', async () => {
        await user.keyboard('{End}');
        expect(lastItem).toHaveFocus();
      });

      it('focuses first item on Home', async () => {
        await user.keyboard('{End}');
        expect(lastItem).toHaveFocus();

        await user.keyboard('{Home}');
        expect(firstItem).toHaveFocus();
      });

      it('focuses item on MouseEnter', async () => {
        await user.hover(otherItem);

        expect(otherItem).toHaveFocus();
      });

      it('focuses matched item on alphanumeric character key', async () => {
        await user.keyboard('a');
        expect(otherItem).toHaveFocus();
      });
    });
  });

  describe('selection', () => {
    it('closes menu when item is clicked', async () => {
      const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
      const trigger = getByTestId('trigger');
      const menu = getByTestId('menu');
      const item = getByText('Violet');

      await user.click(trigger);
      await user.click(item);

      expect(menu).not.toBeVisible();
    });

    it('closes menu on item Enter keydown', async () => {
      const { getByTestId } = render(<TestMenu items={ITEMS} />);
      const trigger = getByTestId('trigger');
      const menu = getByTestId('menu');

      await user.click(trigger);
      await user.keyboard('{Enter}');

      expect(menu).not.toBeVisible();
    });

    it('closes menu on item Space keydown', async () => {
      const { getByTestId } = render(<TestMenu items={ITEMS} />);
      const trigger = getByTestId('trigger');
      const menu = getByTestId('menu');

      await user.click(trigger);
      await user.keyboard(' ');

      expect(menu).not.toBeVisible();
    });

    describe('radio & checkbox items', () => {
      let trigger: HTMLElement;
      let firstCheckboxItem: HTMLElement;
      let secondCheckboxItem: HTMLElement;
      let firstRadioItem: HTMLElement;
      let secondRadioItem: HTMLElement;

      beforeEach(async () => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);

        firstCheckboxItem = getByText('Apple');
        secondCheckboxItem = getByText('Kiwi');
        firstRadioItem = getByText('Asparagus');
        secondRadioItem = getByText('Kale');
        trigger = getByTestId('trigger');

        await user.click(trigger);
      });

      it('applies correct accessibility attributes to radio items', async () => {
        await user.click(firstRadioItem);

        expect(firstRadioItem).toHaveAttribute('aria-checked', 'true');
      });

      it('moves selection between radio items', async () => {
        await user.click(firstRadioItem);
        await user.click(trigger);
        await user.click(secondRadioItem);

        expect(firstRadioItem).toHaveAttribute('aria-checked', 'false');
        expect(secondRadioItem).toHaveAttribute('aria-checked', 'true');
      });

      it('applies correct accessibility attributes to checkbox item', async () => {
        await user.click(firstCheckboxItem);

        expect(firstCheckboxItem).toHaveAttribute('aria-checked', 'true');
      });

      it('sets correct selection to multiple item types', async () => {
        await user.click(firstCheckboxItem);
        await user.click(trigger);
        await user.click(secondCheckboxItem);
        await user.click(trigger);
        await user.click(firstRadioItem);

        expect(firstCheckboxItem).toHaveAttribute('aria-checked', 'true');
        expect(secondCheckboxItem).toHaveAttribute('aria-checked', 'true');
        expect(firstRadioItem).toHaveAttribute('aria-checked', 'true');
      });
    });
  });

  describe('disabled items', () => {
    let disabledItem: HTMLElement;
    let lastItem: HTMLElement;
    let rerender: RenderResult['rerender'];
    let trigger: HTMLElement;
    let menu: HTMLElement;

    beforeEach(() => {
      const {
        rerender: _rerender,
        getByText,
        getByTestId
      } = render(
        <TestMenu
          items={[
            { value: 'fruit-01', label: 'Apple' },
            { value: 'fruit-03', label: 'Cherry', disabled: true },
            { value: 'fruit-04', label: 'Kiwi' }
          ]}
        />
      );

      rerender = _rerender;

      trigger = getByTestId('trigger');
      menu = getByTestId('menu');
      disabledItem = getByText('Cherry');
      lastItem = getByText('Kiwi');
    });

    it('applies correct accessibility attributes to items', () => {
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
      expect(disabledItem).not.toHaveAttribute('tabindex');
    });

    it('prevents selection on disabled item click', async () => {
      await user.click(trigger);
      await user.click(disabledItem);

      expect(menu).toBeVisible();
    });

    it('skips item focus', async () => {
      await user.click(trigger);
      await user.keyboard('{ArrowDown}');

      expect(lastItem).toHaveFocus();
    });

    it('re-enables items as expected', async () => {
      rerender(
        <TestMenu
          items={[
            { value: 'fruit-01', label: 'Apple' },
            { value: 'fruit-03', label: 'Cherry' },
            { value: 'fruit-04', label: 'Kiwi' }
          ]}
        />
      );

      await user.click(trigger);
      await user.click(disabledItem);

      expect(menu).not.toBeVisible();
    });
  });

  describe('controlled', () => {
    it('handles controlled expansion', () => {
      const { getByTestId } = render(<TestMenu items={ITEMS} isExpanded />);
      const menu = getByTestId('menu');

      expect(menu).toBeVisible();
    });

    it('handles controlled focused value', async () => {
      const { getByTestId, getByText } = render(<TestMenu items={ITEMS} focusedValue="fruit-01" />);
      const trigger = getByTestId('trigger');
      const item = getByText('Apple');

      await user.click(trigger);

      expect(item).toHaveFocus();
    });

    it('handles controlled selection value', () => {
      const { getByText } = render(
        <TestMenu
          items={ITEMS}
          selectedItems={[
            { value: 'fruit-01' },
            { value: 'fruit-04' },
            { value: 'vegetable-03', name: 'veggies' }
          ]}
        />
      );

      const fruit1 = getByText('Apple');
      const fruit4 = getByText('Apple');
      const veg3 = getByText('Brussel sprouts');

      expect(fruit1).toHaveAttribute('aria-checked', 'true');
      expect(fruit4).toHaveAttribute('aria-checked', 'true');
      expect(veg3).toHaveAttribute('aria-checked', 'true');
    });

    it('throws if given invalid selection value', () => {
      const consoleError = console.error;

      console.error = jest.fn();

      expect(() => {
        render(
          <TestMenu
            items={ITEMS}
            // @ts-expect-error: The selecteditems prop will error with a non-array value
            selectedItems="test-1"
          />
        );
      }).toThrow('to be an array');

      console.error = consoleError;
    });

    it('calls onChange on trigger click', async () => {
      const onChange = (changes: MenuChangeHandler) => {
        expect(changes.type).toStrictEqual(StateChangeTypes.TriggerClick);
      };

      const { getByTestId } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');

      await user.click(trigger);
    });

    it.each([
      ['Space', ' ', StateChangeTypes.TriggerClick],
      ['Enter', '{Enter}', StateChangeTypes.TriggerClick],
      ['ArrowUp', '{ArrowUp}', StateChangeTypes.TriggerKeyDownArrowUp],
      ['ArrowDown', '{ArrowDown}', StateChangeTypes.TriggerKeyDownArrowDown]
    ])('calls onChange on trigger %s keydown', async (_, input, type) => {
      const onChange = (changes: MenuChangeHandler) => {
        expect(changes.type).toStrictEqual(type);
      };

      const { getByTestId } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');

      trigger.focus();
      await user.keyboard(input);
    });

    it.each([
      ['ArrowDown', '{ArrowDown}', StateChangeTypes.MenuItemKeyDownArrowDown],
      ['ArrowUp', '{ArrowUp}', StateChangeTypes.MenuItemKeyDownArrowUp],
      ['Home', '{Home}', StateChangeTypes.MenuItemKeyDownHome],
      ['End', '{End}', StateChangeTypes.MenuItemKeyDownEnd],
      ['Alphanumeric character', 'b', StateChangeTypes.MenuItemKeyDown]
    ])('calls onChange on item %s keydown', async (_, input, type) => {
      const changeTypes: string[] = [];

      const onChange = (changes: MenuChangeHandler) => {
        changeTypes.push(changes.type);
      };

      const { getByTestId } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');

      await user.click(trigger);
      await user.keyboard(input);

      expect(changeTypes).toContain(type);
    });

    it('calls onChange on item mouse leave', async () => {
      const changeTypes: string[] = [];

      const onChange = (changes: MenuChangeHandler) => {
        changeTypes.push(changes.type);
      };

      const { getByTestId, getByText } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');
      const item = getByText('Petunia');

      await user.click(trigger);
      await user.hover(item);
      await user.unhover(item);

      expect(changeTypes).toContain(StateChangeTypes.MenuMouseLeave);
    });

    it('calls onChange on item mouse enter', async () => {
      const changeTypes: string[] = [];

      const onChange = (changes: MenuChangeHandler) => {
        changeTypes.push(changes.type);
      };

      const { getByTestId, getByText } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');
      const item = getByText('Kale');

      await user.click(trigger);
      await user.hover(item);

      expect(changeTypes).toContain(StateChangeTypes.MenuItemMouseMove);
    });

    it('calls onChange on menu blur', async () => {
      const changeTypes: string[] = [];

      const onChange = (changes: MenuChangeHandler) => {
        changeTypes.push(changes.type);
      };

      const { getByTestId } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');

      await act(async () => {
        await user.click(trigger);
        await user.click(document.body);
      });

      await waitFor(() => expect(changeTypes).toContain(StateChangeTypes.MenuBlur));
    });

    it('calls onChange on menu Tab keydown', async () => {
      const changeTypes: string[] = [];

      const onChange = (changes: MenuChangeHandler) => {
        changeTypes.push(changes.type);
      };

      const { getByTestId } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');

      await user.click(trigger);
      await user.tab();

      expect(changeTypes).toContain(StateChangeTypes.MenuKeyDownTab);
    });

    it('calls onChange on menu Escape keydown', async () => {
      const changeTypes: string[] = [];

      const onChange = (changes: MenuChangeHandler) => {
        changeTypes.push(changes.type);
      };

      const { getByTestId } = render(<TestMenu items={ITEMS} onChange={onChange} />);
      const trigger = getByTestId('trigger');

      await user.click(trigger);
      await user.keyboard('{Escape}');

      expect(changeTypes).toContain(StateChangeTypes.MenuKeyDownEscape);
    });
  });
});