/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useRef, useState } from 'react';
import { RenderResult, render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItem, IMenuItemBase, IUseMenuProps, IUseMenuReturnValue } from './types';
import { MenuContainer } from './';
import { StateChangeTypes } from './utils';

const ITEMS: MenuItem[] = [
  { value: 'plant-01', label: 'Petunia' },
  { value: 'plant-02', label: 'Hydrangea' },
  { value: 'separator-01', separator: true },
  { value: 'Violet' },
  { value: 'plant-04', label: 'Succulent' },
  {
    label: 'Fruits',
    items: [
      { value: 'fruit-01', label: 'Apple', type: 'checkbox' },
      { value: 'fruit-02', label: 'Cherry', type: 'checkbox', disabled: true },
      { value: 'fruit-03', label: 'Kiwi', type: 'checkbox' }
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

const ROOT_ITEMS: IMenuItemBase[] = [
  { value: 'next', label: 'Next', isNext: true },
  { value: 'item', label: 'Item' }
];

const NEXT_ITEMS: IMenuItemBase[] = [
  { value: 'prev', label: 'Previous', isPrevious: true },
  { value: 'inner-item', label: 'Inner item' }
];

describe('MenuContainer', () => {
  const user = userEvent.setup();

  const TestMenu = ({
    disabled,
    ...props
  }: Omit<IUseMenuProps<HTMLButtonElement, HTMLUListElement>, 'triggerRef' | 'menuRef'> & {
    disabled?: boolean;
  }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    return (
      <MenuContainer triggerRef={triggerRef} menuRef={menuRef} {...props}>
        {({
          isExpanded,
          getSeparatorProps,
          getItemGroupProps,
          getTriggerProps,
          getMenuProps,
          getItemProps
        }: IUseMenuReturnValue) => (
          <>
            <button {...getTriggerProps({ disabled })} data-test-id="trigger">
              Menu
            </button>
            <ul {...getMenuProps({ hidden: !isExpanded })} data-test-id="menu">
              {props.items.map((item: MenuItem) => {
                if ('items' in item) {
                  return (
                    <li key={item.label}>
                      <ul
                        {...getItemGroupProps({ 'aria-label': item.label })}
                        data-test-id={`group-${item.label}`}
                      >
                        {item.items.map((groupItem: IMenuItemBase) => (
                          <li key={groupItem.value} {...getItemProps({ item: groupItem })}>
                            {groupItem.label || groupItem.value}
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
                    {...getItemProps({ item })}
                    key={item.value}
                    data-test-id={`item-${item.label}`}
                  >
                    {item.label || item.value}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </MenuContainer>
    );
  };

  const TestMenuNested = (
    props: Omit<
      IUseMenuProps<HTMLButtonElement, HTMLUListElement>,
      'triggerRef' | 'menuRef' | 'items' | 'onChange'
    >
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const [items, setItems] = useState(ROOT_ITEMS);

    const handleChange = useCallback<NonNullable<IUseMenuProps['onChange']>>(
      ({ type, isExpanded }) => {
        const isNext = type.includes('next');
        const isPrev = type.includes('previous');

        if (isNext || isPrev) {
          setItems(isNext ? NEXT_ITEMS : ROOT_ITEMS);
        } else if (isExpanded === false) {
          setItems(ROOT_ITEMS);
        }
      },
      []
    );

    return (
      <MenuContainer
        {...props}
        items={items}
        onChange={handleChange}
        triggerRef={triggerRef}
        menuRef={menuRef}
      >
        {({ isExpanded, getTriggerProps, getMenuProps, getItemProps }: IUseMenuReturnValue) => (
          <>
            <button {...getTriggerProps()} data-test-id="trigger">
              Menu
            </button>
            <ul {...getMenuProps({ hidden: !isExpanded })} data-test-id="menu">
              {items.map(item => (
                <li
                  {...getItemProps({ item })}
                  key={item.value}
                  data-test-id={`item-${item.label}`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </>
        )}
      </MenuContainer>
    );
  };

  describe('uncontrolled', () => {
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

      await act(async () => {
        await user.click(trigger);
      });

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(menu).toBeVisible();
    });

    it("doesn't open menu when trigger is disabled", async () => {
      const { getByTestId } = render(<TestMenu items={ITEMS} disabled />);
      const trigger = getByTestId('trigger');
      const menu = getByTestId('menu');

      await act(async () => {
        await user.click(trigger);
      });

      expect(menu).not.toBeVisible();
    });

    it('closes menu on blur', async () => {
      const { getByTestId } = render(<TestMenu items={ITEMS} />);
      const trigger = getByTestId('trigger');
      const menu = getByTestId('menu');

      await waitFor(async () => {
        await user.click(trigger);
        await user.click(document.body);
      });

      expect(menu).not.toBeVisible();
    });

    it('applies external anchor attributes', () => {
      const { getByTestId } = render(
        <TestMenu items={[{ value: 'item', href: '#0', isExternal: true }]} />
      );
      const menu = getByTestId('menu');

      expect(menu.firstChild).toHaveAttribute('target', '_blank');
      expect(menu.firstChild).toHaveAttribute('rel', 'noopener noreferrer');
    });

    describe('focus', () => {
      describe('trigger', () => {
        it('focuses first item on arrow keydown', async () => {
          const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
          const trigger = getByTestId('trigger');
          const firstItem = getByText('Petunia');

          trigger.focus();

          await act(async () => {
            await user.keyboard('{ArrowDown}');
          });

          expect(firstItem).toHaveFocus();
        });

        it('does not focus default value on click', async () => {
          const { getByTestId, getByText } = render(
            <TestMenu items={ITEMS} defaultFocusedValue="plant-04" />
          );
          const trigger = getByTestId('trigger');
          const item = getByText('Succulent');

          await act(async () => {
            await user.click(trigger);
          });

          expect(item).not.toHaveFocus();
        });

        it('focuses defaultFocusedValue on ArrowDown keydown', async () => {
          const { getByText, getByTestId } = render(
            <TestMenu items={ITEMS} defaultFocusedValue="plant-04" />
          );
          const trigger = getByTestId('trigger');
          const item = getByText('Succulent');

          trigger.focus();

          await act(async () => {
            await user.keyboard('{ArrowDown}');
          });

          expect(item).toHaveFocus();
        });

        it('focuses defaultFocusedValue on Enter keydown', async () => {
          const { getByText, getByTestId } = render(
            <TestMenu items={ITEMS} defaultFocusedValue="plant-04" />
          );
          const trigger = getByTestId('trigger');
          const item = getByText('Succulent');

          trigger.focus();

          await act(async () => {
            await user.keyboard('{Enter}');
          });

          expect(item).toHaveFocus();
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

          await act(async () => {
            await user.keyboard(input);
          });

          expect(firstItem).toHaveFocus();
        });

        it('focuses last item on trigger ArrowUp keydown', async () => {
          const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
          const trigger = getByTestId('trigger');
          const lastItem = getByText('Kale');

          trigger.focus();

          await act(async () => {
            await user.keyboard('{ArrowUp}');
          });

          expect(lastItem).toHaveFocus();
        });

        it('focuses trigger when Escape key pressed in expanded menu', async () => {
          const { getByTestId } = render(<TestMenu items={ITEMS} />);
          const trigger = getByTestId('trigger');

          trigger.focus();

          await waitFor(async () => {
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Escape}');
          });

          expect(trigger).toHaveFocus();
        });

        it('does not return focus to trigger when Escape key pressed in expanded menu if `restoreFocus` is false', async () => {
          const { getByTestId } = render(<TestMenu items={ITEMS} restoreFocus={false} />);
          const trigger = getByTestId('trigger');

          trigger.focus();

          await waitFor(async () => {
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Escape}');
          });

          expect(trigger).not.toHaveFocus();
        });
      });

      describe('menu items', () => {
        let trigger;
        let firstItem: HTMLElement;
        let secondItem: HTMLElement;
        let lastItem: HTMLElement;
        let otherItem: HTMLElement;
        let noLabelItem: HTMLElement;

        beforeEach(async () => {
          const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);

          firstItem = getByText('Petunia');
          secondItem = getByText('Hydrangea');
          lastItem = getByText('Kale');
          otherItem = getByText('Apple');
          noLabelItem = getByText('Violet');
          trigger = getByTestId('trigger');

          trigger.focus();

          await act(async () => {
            await user.keyboard('{ArrowDown}');
          });
        });

        it('focuses next item on ArrowDown keydown', async () => {
          await act(async () => {
            await user.keyboard('{ArrowDown}');
          });

          expect(secondItem).toHaveFocus();
        });

        it('focuses first item on last item ArrowDown keydown', async () => {
          await waitFor(async () => {
            await user.keyboard('{ArrowUp}');
            await user.keyboard('{ArrowDown}');
          });

          expect(firstItem).toHaveFocus();
        });

        it('focuses previous item on ArrowUp keydown', async () => {
          await waitFor(async () => {
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowUp}');
          });

          expect(firstItem).toHaveFocus();
        });

        it('focuses last item on first item ArrowUp keydown', async () => {
          await act(async () => {
            await user.keyboard('{ArrowUp}');
          });

          expect(lastItem).toHaveFocus();
        });

        it('focuses first item when ArrowDown pressed on last item keydown', async () => {
          await waitFor(async () => {
            await user.keyboard('{ArrowUp}');
            await user.keyboard('{ArrowDown}');
          });

          expect(firstItem).toHaveFocus();
        });

        it('focuses last item on End keydown', async () => {
          await act(async () => {
            await user.keyboard('{End}');
          });

          expect(lastItem).toHaveFocus();
        });

        it('focuses first item on Home keydown', async () => {
          await act(async () => {
            await user.keyboard('{End}');
          });

          expect(lastItem).toHaveFocus();

          await act(async () => {
            await user.keyboard('{Home}');
          });

          expect(firstItem).toHaveFocus();
        });

        it('focuses item on MouseEnter', async () => {
          await act(async () => {
            await user.hover(otherItem);
          });

          expect(otherItem).toHaveFocus();
        });

        it('focuses matched item on character keydown', async () => {
          await act(async () => {
            await user.keyboard('a');
          });

          expect(otherItem).toHaveFocus();
        });

        it('focuses matched item using value if no label is given', async () => {
          await act(async () => {
            await user.keyboard('v');
          });

          expect(noLabelItem).toHaveFocus();
        });
      });
    });

    describe('selection', () => {
      it('applies initial selected items', () => {
        const { getByText } = render(
          <TestMenu
            items={[
              {
                label: 'Group',
                items: [
                  { value: 'One', type: 'checkbox' },
                  { value: 'Two', type: 'checkbox', selected: true },
                  { value: 'Three', type: 'checkbox' }
                ]
              }
            ]}
          />
        );

        expect(getByText('Two')).toHaveAttribute('aria-checked', 'true');
      });

      it('closes menu when item is clicked', async () => {
        const { getByTestId, getByText } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const menu = getByTestId('menu');
        const item = getByText('Violet');

        await act(async () => {
          await user.click(trigger);
          await user.click(item);
        });

        expect(menu).not.toBeVisible();
      });

      it('closes menu on item Enter keydown', async () => {
        const { getByTestId } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const menu = getByTestId('menu');

        trigger.focus();

        await waitFor(async () => {
          await user.keyboard('{ArrowDown}');
          await user.keyboard('{Enter}');
        });

        expect(menu).not.toBeVisible();
      });

      it('closes menu on item Space keydown', async () => {
        const { getByTestId } = render(<TestMenu items={ITEMS} />);
        const trigger = getByTestId('trigger');
        const menu = getByTestId('menu');

        trigger.focus();

        await waitFor(async () => {
          await user.keyboard('{ArrowDown}');
          await user.keyboard(' ');
        });

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

          await act(async () => {
            await user.click(trigger);
          });
        });

        it('applies correct accessibility attributes to radio items', async () => {
          await act(async () => {
            await user.click(firstRadioItem);
          });

          expect(firstRadioItem).toHaveAttribute('aria-checked', 'true');
        });

        it('moves selection between radio items', async () => {
          await act(async () => {
            await user.click(firstRadioItem);
            await user.click(trigger);
            await user.click(secondRadioItem);
          });

          expect(firstRadioItem).toHaveAttribute('aria-checked', 'false');
          expect(secondRadioItem).toHaveAttribute('aria-checked', 'true');
        });

        it('applies correct accessibility attributes to checkbox item', async () => {
          await act(async () => {
            await user.click(firstCheckboxItem);
          });

          expect(firstCheckboxItem).toHaveAttribute('aria-checked', 'true');
        });

        it('applies correct accessibility attributes to deselected checkbox item', async () => {
          await waitFor(async () => {
            await user.click(firstCheckboxItem);
            await user.click(trigger);
            await user.click(firstCheckboxItem);
          });

          expect(firstCheckboxItem).toHaveAttribute('aria-checked', 'false');
        });

        it('sets correct selection to multiple item types', async () => {
          await waitFor(async () => {
            await user.click(firstCheckboxItem);
            await user.click(trigger);
            await user.click(secondCheckboxItem);
            await user.click(trigger);
            await user.click(firstRadioItem);
          });

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

      beforeEach(async () => {
        const {
          rerender: _rerender,
          getByText,
          getByTestId
        } = render(
          <TestMenu
            items={[
              { value: 'fruit-01', label: 'Apple' },
              { value: 'fruit-02', label: 'Cherry', disabled: true },
              { value: 'fruit-03', label: 'Kiwi' }
            ]}
          />
        );

        rerender = _rerender;

        trigger = getByTestId('trigger');
        menu = getByTestId('menu');
        disabledItem = getByText('Cherry');
        lastItem = getByText('Kiwi');

        trigger.focus();

        await act(async () => {
          await user.keyboard('{ArrowDown}');
        });
      });

      it('applies correct accessibility attributes to items', () => {
        expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
        expect(disabledItem).not.toHaveAttribute('tabindex');
      });

      it('prevents selection on disabled item click', async () => {
        await act(async () => {
          await user.click(disabledItem);
        });

        expect(menu).toBeVisible();
      });

      it('skips item focus', async () => {
        await act(async () => {
          await user.keyboard('{ArrowDown}');
        });

        expect(lastItem).toHaveFocus();
      });

      it('re-enables items as expected', async () => {
        rerender(
          <TestMenu
            items={[
              { value: 'fruit-01', label: 'Apple' },
              { value: 'fruit-02', label: 'Cherry' },
              { value: 'fruit-03', label: 'Kiwi' }
            ]}
          />
        );

        await act(async () => {
          await user.click(disabledItem);
        });

        expect(menu).not.toBeVisible();
      });
    });

    describe('submenu', () => {
      it('focuses first item in "next" menu items', async () => {
        const { getByText, getByTestId } = render(<TestMenuNested />);
        const trigger = getByTestId('trigger');

        trigger.focus();

        await waitFor(async () => {
          await user.keyboard('{ArrowDown}');
          await user.keyboard('{Enter}');
        });

        expect(getByText('Previous')).toHaveFocus();
      });

      it('returns focus to correct item if "previous" item selected', async () => {
        const { getByText, getByTestId } = render(<TestMenuNested />);
        const trigger = getByTestId('trigger');

        trigger.focus();

        await waitFor(async () => {
          await user.keyboard('{ArrowDown}');
          await user.keyboard('{Enter}');
        });

        expect(getByText('Previous')).toHaveFocus();

        await act(async () => {
          await user.keyboard('{Enter}');
        });

        expect(getByText('Next')).toHaveFocus();
      });

      it('correctly focuses items after nested menu closed', async () => {
        const { getByText, getByTestId } = render(<TestMenuNested />);
        const trigger = getByTestId('trigger');

        trigger.focus();

        await waitFor(async () => {
          await user.keyboard('{ArrowDown}');
          await user.keyboard('{Enter}');
        });

        expect(getByText('Previous')).toHaveFocus();

        await act(async () => {
          await user.keyboard('{ArrowDown}');
          await user.keyboard('{Enter}');
          await user.keyboard('{ArrowDown}');
        });

        expect(getByText('Next')).toHaveFocus();

        await act(async () => {
          await user.keyboard('{Enter}');
        });

        expect(getByText('Previous')).toHaveFocus();
      });
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

      trigger.focus();

      await act(async () => {
        await user.keyboard('{ArrowDown}');
      });

      expect(item).toHaveFocus();
    });

    it('expands menu on trigger arrow keydown with controlled focused value', async () => {
      const { getByTestId, getByText } = render(<TestMenu items={ITEMS} focusedValue="plant-01" />);
      const trigger = getByTestId('trigger');
      const item = getByText('Petunia');

      trigger.focus();

      await act(async () => {
        await user.keyboard('{ArrowDown}');
      });

      expect(item).toHaveFocus();
    });

    it('handles controlled selection value', () => {
      const { getByText } = render(
        <TestMenu
          items={ITEMS}
          selectedItems={[
            { value: 'fruit-01' },
            { value: 'fruit-03' },
            { value: 'vegetable-03', name: 'veggies' }
          ]}
        />
      );

      const fruit1 = getByText('Apple');
      const fruit4 = getByText('Kiwi');
      const veg3 = getByText('Brussel sprouts');

      expect(fruit1).toHaveAttribute('aria-checked', 'true');
      expect(fruit4).toHaveAttribute('aria-checked', 'true');
      expect(veg3).toHaveAttribute('aria-checked', 'true');
    });

    it('does not focus menu item on trigger click with controlled expansion', async () => {
      const { getByTestId } = render(<TestMenu items={ITEMS} isExpanded />);
      const trigger = getByTestId('trigger');

      await act(async () => {
        await user.click(trigger);
      });

      expect(trigger).toHaveFocus();
    });

    it('focuses menu item on trigger arrow keydown with controlled expansion', async () => {
      const { getByTestId, getByText } = render(<TestMenu items={ITEMS} isExpanded />);
      const trigger = getByTestId('trigger');
      const item = getByText('Petunia');

      trigger.focus();

      await act(async () => {
        await user.keyboard('{ArrowDown}');
      });

      expect(item).toHaveFocus();
    });

    it('selects item on click with controlled expansion', async () => {
      const { getByText } = render(<TestMenu items={ITEMS} isExpanded />);
      const fruit1 = getByText('Apple');

      await act(async () => {
        await user.click(fruit1);
      });

      expect(fruit1).toHaveAttribute('aria-checked', 'true');
    });

    it('selects item on keydown with controlled expansion', async () => {
      const { getByText } = render(<TestMenu items={ITEMS} isExpanded />);
      const fruit1 = getByText('Apple');

      await waitFor(async () => {
        await user.hover(fruit1);
        await user.keyboard('{Enter}');
      });

      expect(fruit1).toHaveAttribute('aria-checked', 'true');
    });

    it('returns normal keyboard navigation after menu closes', async () => {
      const { getByText, getByTestId } = render(
        <>
          <TestMenu items={ITEMS} />
          <button>focus me</button>
        </>
      );
      const trigger = getByTestId('trigger');
      const nextFocusedElement = getByText('focus me');

      trigger.focus();

      await waitFor(async () => {
        await user.keyboard('{Enter}'); // select trigger
        await user.keyboard('{Enter}'); // select first item
        await user.keyboard('{Tab}');
      });

      expect(nextFocusedElement).toHaveFocus();
    });

    describe('onChange', () => {
      const onChange = jest.fn();

      afterEach(() => {
        onChange.mockReset();
      });

      it('calls onChange on trigger click', async () => {
        const { getByTestId } = render(
          <TestMenu items={ITEMS} onChange={onChange} isExpanded={false} />
        );
        const trigger = getByTestId('trigger');

        await act(async () => {
          await user.click(trigger);
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.TriggerClick);
      });

      it('calls onChange with selected value on item mouse click', async () => {
        const { getByText } = render(
          <TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />
        );

        const item = getByText('Kale');

        await act(() => user.click(item));

        const values = onChange.mock.calls.map(([change]) => change.value);

        expect(values).toContain('vegetable-04');
      });

      it('calls onChange with selected value on item keyboard selection', async () => {
        const { getByTestId } = render(
          <TestMenu items={ITEMS} onChange={onChange} focusedValue="plant-01" />
        );

        const trigger = getByTestId('trigger');

        trigger.focus();

        await act(() => user.keyboard('{ArrowDown}'));
        await act(() => user.keyboard('{Enter}'));

        const values = onChange.mock.calls.map(([change]) => change.value);

        expect(values).toContain('plant-01');
      });

      it.each([
        ['Space', ' ', StateChangeTypes.TriggerKeyDownSpace],
        ['Enter', '{Enter}', StateChangeTypes.TriggerKeyDownEnter],
        ['ArrowUp', '{ArrowUp}', StateChangeTypes.TriggerKeyDownArrowUp],
        ['ArrowDown', '{ArrowDown}', StateChangeTypes.TriggerKeyDownArrowDown]
      ])('calls onChange on trigger %s keydown', async (_, input, type) => {
        const { getByTestId } = render(
          <TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />
        );
        const trigger = getByTestId('trigger');

        trigger.focus();

        await act(async () => {
          await user.keyboard(input);
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(type);
      });

      it.each([
        ['ArrowDown', '{ArrowDown}', StateChangeTypes.MenuItemKeyDownArrowDown],
        ['ArrowUp', '{ArrowUp}', StateChangeTypes.MenuItemKeyDownArrowUp],
        ['Home', '{Home}', StateChangeTypes.MenuItemKeyDownHome],
        ['End', '{End}', StateChangeTypes.MenuItemKeyDownEnd],
        ['Alphanumeric character', 'b', StateChangeTypes.MenuItemKeyDown]
      ])('calls onChange on item %s keydown', async (_, input, type) => {
        render(<TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />);

        await act(async () => {
          await user.keyboard(input);
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(type);
      });

      it('calls onChange on item mouse leave', async () => {
        const { getByText } = render(
          <TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-02" />
        );
        const item = getByText('Petunia');

        await act(async () => {
          await user.hover(item);
          await user.unhover(item);
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuMouseLeave);
      });

      it('calls onChange on item mouse enter', async () => {
        const { getByText } = render(
          <TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />
        );
        const item = getByText('Kale');

        await act(async () => {
          await user.hover(item);
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemMouseMove);
      });

      it('calls onChange on menu blur', async () => {
        render(<TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />);

        await act(async () => {
          await user.click(document.body);
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuBlur);
      });

      it('calls onChange on menu Tab keydown', async () => {
        render(<TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />);

        await act(async () => {
          await user.tab();
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuKeyDownTab);
      });

      it('calls onChange on menu Escape keydown', async () => {
        render(<TestMenu items={ITEMS} onChange={onChange} isExpanded focusedValue="plant-01" />);

        await act(async () => {
          await user.keyboard('{Escape}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuKeyDownEscape);
      });

      it('calls onChange for "next" click', async () => {
        const { getByText } = render(
          <TestMenu items={ROOT_ITEMS} onChange={onChange} isExpanded />
        );

        await act(async () => {
          await user.click(getByText('Next'));
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemClickNext);
      });

      it('calls onChange for "previous" click', async () => {
        const { getByText } = render(
          <TestMenu items={NEXT_ITEMS} onChange={onChange} isExpanded />
        );

        await act(async () => {
          await user.click(getByText('Previous'));
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemClickPrevious);
      });

      it('calls onChange for "next" Enter keydown', async () => {
        const { getByText } = render(
          <TestMenu items={ROOT_ITEMS} onChange={onChange} isExpanded />
        );

        getByText('Next').focus();

        await act(async () => {
          await user.keyboard('{Enter}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownNext);
      });

      it('calls onChange for "next" Space keydown', async () => {
        const { getByText } = render(
          <TestMenu items={ROOT_ITEMS} onChange={onChange} isExpanded />
        );

        getByText('Next').focus();

        await act(async () => {
          await user.keyboard(' ');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownNext);
      });

      it('calls onChange for "previous" Enter keydown', async () => {
        const { getByText } = render(
          <TestMenu items={NEXT_ITEMS} onChange={onChange} isExpanded />
        );

        getByText('Previous').focus();

        await act(async () => {
          await user.keyboard('{Enter}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownPrevious);
      });

      it('calls onChange for "previous" Space keydown', async () => {
        const { getByText } = render(
          <TestMenu items={NEXT_ITEMS} onChange={onChange} isExpanded />
        );

        getByText('Previous').focus();

        await act(async () => {
          await user.keyboard(' ');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownPrevious);
      });

      it('calls onChange for "next" ArrowRight keydown', async () => {
        const { getByText } = render(
          <TestMenu items={ROOT_ITEMS} onChange={onChange} isExpanded />
        );

        getByText('Next').focus();

        await act(async () => {
          await user.keyboard('{ArrowRight}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownNext);
      });

      it('calls onChange for "next" ArrowLeft keydown in rtl', async () => {
        const { getByText } = render(
          <TestMenu items={ROOT_ITEMS} rtl onChange={onChange} isExpanded />
        );

        getByText('Next').focus();

        await act(async () => {
          await user.keyboard('{ArrowLeft}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownNext);
      });

      it('calls onChange for "previous" ArrowLeft keydown', async () => {
        const { getByText } = render(
          <TestMenu items={NEXT_ITEMS} onChange={onChange} isExpanded />
        );

        getByText('Previous').focus();

        await act(async () => {
          await user.keyboard('{ArrowLeft}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownPrevious);
      });

      it('calls onChange for "previous" ArrowRight keydown in rtl', async () => {
        const { getByText } = render(
          <TestMenu items={NEXT_ITEMS} rtl onChange={onChange} isExpanded />
        );

        getByText('Previous').focus();

        await act(async () => {
          await user.keyboard('{ArrowRight}');
        });

        const changeTypes = onChange.mock.calls.map(([change]) => change.type);

        expect(changeTypes).toContain(StateChangeTypes.MenuItemKeyDownPrevious);
      });
    });
  });

  describe('error handling', () => {
    it.each([
      { key: 'isNext', isNext: true },
      { key: 'isPrevious', isPrevious: true }
    ])("throws when anchor item uses '$key'", itemProps => {
      expect(() =>
        render(<TestMenu items={[{ value: 'test', href: '#0', ...itemProps }]} />)
      ).toThrow();
    });

    it.each<'radio' | 'checkbox'>(['radio', 'checkbox'])(
      "throws when anchor item is '%s' type",
      type => {
        expect(() => render(<TestMenu items={[{ value: 'test', href: '#0', type }]} />)).toThrow();
      }
    );
  });
});
