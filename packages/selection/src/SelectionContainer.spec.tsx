/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import { KEYS } from '@zendeskgarden/container-utilities';
import { SelectionContainer, ISelectionContainerProps } from './';

describe('SelectionContainer', () => {
  const user = userEvent.setup();

  const values = ['Item-1', 'Item-2', 'Item-3'];

  const BasicExample: React.FunctionComponent<
    Omit<ISelectionContainerProps<string>, 'children' | 'values'> & {
      selectedAriaKey?: string;
    }
  > = ({
    direction,
    defaultFocusedValue,
    defaultSelectedValue,
    selectedAriaKey,
    rtl,
    onFocus,
    onSelect
  }) => (
    <SelectionContainer
      values={values}
      direction={direction}
      defaultFocusedValue={defaultFocusedValue}
      defaultSelectedValue={defaultSelectedValue}
      rtl={rtl}
      onFocus={onFocus ? onFocus : undefined}
      onSelect={onSelect ? onSelect : undefined}
    >
      {({ getGroupProps, getElementProps, selectedValue }) => (
        <div data-test-id="container" {...getGroupProps()}>
          {values.map(value => {
            const isSelected = value === selectedValue;

            return (
              <div
                {...getElementProps({
                  selectedAriaKey,
                  key: value,
                  value,
                  'data-test-id': 'value',
                  'aria-selected': isSelected
                } as any)}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
    </SelectionContainer>
  );

  describe('controlled state', () => {
    describe('onFocus', () => {
      it('should call onFocus callback', async () => {
        const onFocusSpy = jest.fn();

        render(<BasicExample onFocus={onFocusSpy} />);

        await user.tab();

        expect(onFocusSpy).toHaveBeenCalledWith(values[0]);
      });
    });

    describe('onSelect', () => {
      it('should call onSelect callback', async () => {
        const onSelectSpy = jest.fn();
        const { getByText } = render(<BasicExample onSelect={onSelectSpy} />);
        const item = getByText('Item-1');

        await user.click(item);

        expect(onSelectSpy).toHaveBeenCalledWith(values[0]);
      });
    });
  });

  describe('getGroupProps', () => {
    it('applies accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);
      const container = getByTestId('container');

      expect(container).not.toHaveAttribute('role');
    });

    it('first item in container defaults as the initial focusable item', async () => {
      const { getByText } = render(<BasicExample />);
      const item = getByText('Item-1');

      expect(document.activeElement).not.toBe(item);

      await user.tab();

      expect(item).toHaveAttribute('tabIndex', '0');
      expect(document.activeElement).toBe(item);
    });

    describe('onFocus', () => {
      it('focuses first item if no item is currently selected', async () => {
        const { getByText } = render(<BasicExample />);
        const item = getByText('Item-1');

        expect(document.activeElement).not.toBe(item);
        await user.tab();
        expect(document.activeElement).toBe(item);
      });

      it('focuses last item if no item is currently selected and defaultFocusedValue is provided', () => {
        const { getByText } = render(
          <BasicExample defaultFocusedValue={values[values.length - 1]} />
        );
        const lastItem = getByText('Item-3');

        expect(lastItem).toHaveAttribute('tabIndex', '0');
      });

      it('will focus currently selected item if available', async () => {
        const { getByText } = render(<BasicExample />);
        const lastItem = getByText('Item-3');

        await user.click(lastItem);
        expect(lastItem).toHaveAttribute('tabIndex', '0');
      });
    });

    describe('onBlur', () => {
      it('clears currently focused item', async () => {
        const { getByText } = render(<BasicExample />);
        const item = getByText('Item-1');

        await user.tab();
        expect(document.activeElement).toBe(item);

        await user.tab();
        expect(document.activeElement).not.toBe(item);
      });
    });

    describe('onKeyDown', () => {
      describe('ENTER keyCode', () => {
        it('selects currently focused item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { key: KEYS.ENTER });
          expect(item).toHaveAttribute('aria-selected', 'true');
        });
      });

      describe('CTRL+ENTER keyCode', () => {
        it('is not consumed', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { key: KEYS.ENTER, ctrlKey: true });
          expect(item).toHaveAttribute('aria-selected', 'false');
        });
      });

      describe('SPACE keyCode', () => {
        it('selects currently focused item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { key: KEYS.SPACE });
          expect(item).toHaveAttribute('aria-selected', 'true');
        });
      });

      describe('HOME keyCode', () => {
        it('focuses first available item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { key: KEYS.HOME });
          expect(document.activeElement).toBe(item);
        });
      });

      describe('END keyCode', () => {
        it('focuses last available item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-2');
          const lastItem = getByText('Item-3');

          fireEvent.keyDown(item, { key: KEYS.END });
          expect(document.activeElement).toBe(lastItem);
        });
      });

      describe('while in horizontal mode', () => {
        describe('LEFT keyCode', () => {
          describe('when dir is LTR', () => {
            it('focuses on the first item when triggered from second item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.click(secondItem);
              fireEvent.focus(secondItem);
              fireEvent.keyDown(secondItem, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(item);
              expect(item).toHaveAttribute('aria-selected', 'false');
            });

            it('focuses on the last item after pressing left arrow key on first item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.tab();
              fireEvent.keyDown(item, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(lastItem);
              expect(lastItem).toHaveAttribute('aria-selected', 'false');
            });
          });

          describe('when dir is RTL', () => {
            it('focuses on the second item when triggered from first item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.tab();
              fireEvent.focus(item);
              fireEvent.keyDown(item, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(secondItem);
              expect(secondItem).toHaveAttribute('aria-selected', 'false');
            });

            it('focuses on the first item when triggered from last item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.click(lastItem);
              fireEvent.keyDown(lastItem, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(item);
              expect(item).toHaveAttribute('aria-selected', 'false');
            });
          });
        });

        describe('RIGHT keyCode', () => {
          describe('when dir is LTR', () => {
            it('focuses on the second next item when triggered from first item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.click(item);
              fireEvent.focus(item);
              fireEvent.keyDown(item, { key: KEYS.RIGHT });
              expect(secondItem).toBe(document.activeElement);
            });

            it('focuses on the first item when triggered from last item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.click(lastItem);
              fireEvent.keyDown(lastItem, { key: KEYS.RIGHT });
              expect(item).toBe(document.activeElement);
            });
          });

          describe('when dir is RTL', () => {
            it('focuses on the first item when triggered from second item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.click(secondItem);
              fireEvent.focus(secondItem);
              fireEvent.keyDown(secondItem, { key: KEYS.RIGHT });

              expect(item).toBe(document.activeElement);
            });

            it('focuses on the last item when triggered from first item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.click(item);
              fireEvent.keyDown(item, { key: KEYS.RIGHT });

              expect(lastItem).toBe(document.activeElement);
            });
          });
        });

        describe('UP keyCode', () => {
          it('does not perform any action', async () => {
            const { getByText } = render(<BasicExample />);
            const item = getByText('Item-1');

            await user.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { key: KEYS.UP });
            expect(item).toBe(document.activeElement);
          });
        });

        describe('DOWN keyCode', () => {
          it('does not perform any action', async () => {
            const { getByText } = render(<BasicExample />);
            const item = getByText('Item-1');

            await user.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { key: KEYS.DOWN });
            expect(item).toBe(document.activeElement);
          });
        });
      });

      describe('while using vertical direction', () => {
        describe('UP keyCode', () => {
          it('focuses on the first item when triggered from second item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(secondItem);
            fireEvent.focus(secondItem);
            fireEvent.keyDown(secondItem, { key: KEYS.UP });

            expect(item).toBe(document.activeElement);
          });

          it('focuses on the first item when triggered from second item in RTL', async () => {
            const { getByText } = render(<BasicExample direction="vertical" rtl />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(secondItem);
            fireEvent.focus(secondItem);
            fireEvent.keyDown(secondItem, { key: KEYS.UP });

            expect(item).toBe(document.activeElement);
          });

          it('focuses on the last item when triggered from first item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const lastItem = getByText('Item-3');

            await user.click(item);
            fireEvent.focus(item);
            fireEvent.keyDown(item, { key: KEYS.UP });

            expect(lastItem).toBe(document.activeElement);
          });
        });

        describe('DOWN keyCode', () => {
          it('focuses on the second item when triggered from first item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(item);
            fireEvent.focus(item);
            fireEvent.keyDown(item, { key: KEYS.DOWN });

            expect(secondItem).toBe(document.activeElement);
          });

          it('focuses on the second item when triggered from first item in RTL', async () => {
            const { getByText } = render(<BasicExample direction="vertical" rtl />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(item);
            fireEvent.focus(item);
            fireEvent.keyDown(item, { key: KEYS.DOWN });

            expect(secondItem).toBe(document.activeElement);
          });

          it('focuses on the first item when triggered from last item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const lastItem = getByText('Item-3');

            await user.click(lastItem);
            fireEvent.focus(lastItem);
            fireEvent.keyDown(lastItem, { key: KEYS.DOWN });

            expect(item).toBe(document.activeElement);
          });
        });

        describe('LEFT keyCode', () => {
          it('does not perform any action', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');

            await user.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { key: KEYS.LEFT });
            expect(item).toBe(document.activeElement);
          });
        });

        describe('RIGHT keyCode', () => {
          it('does not perform any action', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');

            await user.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { key: KEYS.RIGHT });
            expect(item).toBe(document.activeElement);
          });
        });
      });

      describe('while using both direction', () => {
        describe('LEFT keyCode', () => {
          describe('when dir is LTR', () => {
            it('focuses on the first item when triggered from second item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.click(secondItem);
              fireEvent.focus(secondItem);
              fireEvent.keyDown(secondItem, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(item);
              expect(item).toHaveAttribute('aria-selected', 'false');
            });

            it('focuses on the last item after pressing left arrow key on first item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.tab();
              fireEvent.keyDown(item, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(lastItem);
              expect(lastItem).toHaveAttribute('aria-selected', 'false');
            });
          });

          describe('when dir is RTL', () => {
            it('focuses on the second item when triggered from first item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.tab();
              fireEvent.keyDown(item, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(secondItem);
              expect(secondItem).toHaveAttribute('aria-selected', 'false');
            });

            it('focuses on the first item when triggered from last item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.click(lastItem);
              fireEvent.keyDown(lastItem, { key: KEYS.LEFT });

              expect(document.activeElement).toBe(item);
              expect(item).toHaveAttribute('aria-selected', 'false');
            });
          });
        });

        describe('RIGHT keyCode', () => {
          describe('when dir is LTR', () => {
            it('focuses on the second next item when triggered from first item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.click(item);
              fireEvent.focus(item);
              fireEvent.keyDown(item, { key: KEYS.RIGHT });
              expect(secondItem).toBe(document.activeElement);
            });

            it('focuses on the first item when triggered from last item', async () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.click(lastItem);
              fireEvent.focus(lastItem);
              fireEvent.keyDown(lastItem, { key: KEYS.RIGHT });
              expect(item).toBe(document.activeElement);
            });
          });

          describe('when dir is RTL', () => {
            it('focuses on the first item when triggered from second item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              await user.click(secondItem);
              fireEvent.focus(secondItem);
              fireEvent.keyDown(secondItem, { key: KEYS.RIGHT });

              expect(item).toBe(document.activeElement);
            });

            it('focuses on the last item when triggered from first item', async () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              await user.click(item);
              fireEvent.keyDown(item, { key: KEYS.RIGHT });

              expect(lastItem).toBe(document.activeElement);
            });
          });
        });

        describe('UP keyCode', () => {
          it('focuses on the first item when triggered from second item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(secondItem);
            fireEvent.focus(secondItem);
            fireEvent.keyDown(secondItem, { key: KEYS.UP });

            expect(item).toBe(document.activeElement);
          });

          it('focuses on the first item when triggered from second item in RTL', async () => {
            const { getByText } = render(<BasicExample direction="vertical" rtl />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(secondItem);
            fireEvent.focus(secondItem);
            fireEvent.keyDown(secondItem, { key: KEYS.UP });

            expect(item).toBe(document.activeElement);
          });

          it('focuses on the last item when triggered from first item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const lastItem = getByText('Item-3');

            await user.click(item);
            fireEvent.keyDown(item, { key: KEYS.UP });

            expect(lastItem).toBe(document.activeElement);
          });
        });

        describe('DOWN keyCode', () => {
          it('focuses on the second item when triggered from first item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(item);
            fireEvent.focus(item);
            fireEvent.keyDown(item, { key: KEYS.DOWN });

            expect(secondItem).toBe(document.activeElement);
          });

          it('focuses on the second item when triggered from first item in RTL', async () => {
            const { getByText } = render(<BasicExample direction="vertical" rtl />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            await user.click(item);
            fireEvent.focus(item);
            fireEvent.keyDown(item, { key: KEYS.DOWN });

            expect(secondItem).toBe(document.activeElement);
          });

          it('focuses on the first item when triggered from last item', async () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const lastItem = getByText('Item-3');

            await user.click(lastItem);
            fireEvent.focus(lastItem);
            fireEvent.keyDown(lastItem, { key: KEYS.DOWN });

            expect(item).toBe(document.activeElement);
          });
        });
      });
    });
  });

  describe('getElementProps', () => {
    it("doesn't apply accessibility role attribute", () => {
      const { getByText } = render(<BasicExample />);
      const item = getByText('Item-1');

      expect(item).not.toHaveAttribute('role');
    });

    it('applies default selected aria value if none provided', () => {
      const { getByText } = render(<BasicExample />);
      const item = getByText('Item-1');

      expect(item).toHaveAttribute('aria-selected', 'false');
    });

    it('applies selected aria value if defaultSelectedValue is passed', () => {
      const { getByText } = render(<BasicExample defaultSelectedValue={values[1]} />);
      const secondItem = getByText('Item-2');

      expect(secondItem).toHaveAttribute('aria-selected', 'true');
    });

    it('applies custom selected aria value if provided', () => {
      const { getByText } = render(<BasicExample selectedAriaKey="aria-pressed" />);
      const item = getByText('Item-1');

      expect(item).toHaveAttribute('aria-pressed', 'false');
    });

    describe('onClick', () => {
      it('should select and focus item that was clicked', async () => {
        const { getByText } = render(<BasicExample />);
        const lastItem = getByText('Item-3');

        await user.click(lastItem);

        expect(lastItem).toHaveAttribute('aria-selected', 'true');
        expect(lastItem).toBe(document.activeElement);
      });
    });
  });
});
