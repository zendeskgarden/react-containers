/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';

import { SelectionContainer, ISelectionContainerProps } from './SelectionContainer';

describe('SelectionContainer', () => {
  const itemValues = ['Item-1', 'Item-2', 'Item-3'];

  const BasicExample: React.FunctionComponent<
    Omit<ISelectionContainerProps<string>, 'children'> & {
      selectedAriaKey?: string;
    }
  > = ({
    direction,
    defaultFocusedIndex,
    defaultSelectedIndex,
    selectedAriaKey,
    rtl,
    onFocus,
    onSelect
  }) => (
    <SelectionContainer
      direction={direction}
      defaultFocusedIndex={defaultFocusedIndex}
      defaultSelectedIndex={defaultSelectedIndex}
      rtl={rtl}
      onFocus={onFocus ? onFocus : undefined}
      onSelect={onSelect ? onSelect : undefined}
    >
      {({ getContainerProps, getItemProps, selectedItem }) => (
        <div {...getContainerProps({ 'data-test-id': 'container' })}>
          {itemValues.map(item => {
            const ref = React.createRef();
            const isSelected = item === selectedItem;

            return (
              <div
                {...getItemProps({
                  selectedAriaKey,
                  key: item,
                  item,
                  focusRef: ref,
                  'data-test-id': 'item',
                  'aria-selected': isSelected
                } as any)}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </SelectionContainer>
  );

  const itemProps = (props: any) => {
    return render(
      <SelectionContainer>
        {({ getItemProps }) => <div {...getItemProps(props)}>Example</div>}
      </SelectionContainer>
    );
  };

  describe('controlled state', () => {
    describe('onFocus', () => {
      it('should call onFocus callback', () => {
        const onFocusSpy = jest.fn();

        render(<BasicExample onFocus={onFocusSpy} />);

        userEvent.tab();

        expect(onFocusSpy).toHaveBeenCalledWith(itemValues[0]);
      });
    });

    describe('onSelect', () => {
      it('should call onSelect callback', () => {
        const onSelectSpy = jest.fn();
        const { getByText } = render(<BasicExample onSelect={onSelectSpy} />);
        const item = getByText('Item-1');

        userEvent.click(item);

        expect(onSelectSpy).toHaveBeenCalledWith(itemValues[0]);
      });
    });
  });

  describe('getContainerProps', () => {
    it('applies accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);
      const container = getByTestId('container');

      expect(container).toHaveAttribute('role', 'listbox');
    });

    it('first item in container defaults as the only initial focusable item', () => {
      const { getByText } = render(<BasicExample />);
      const item = getByText('Item-1');

      expect(document.activeElement).not.toBe(item);

      userEvent.tab();

      expect(item).toHaveAttribute('tabIndex', '0');
      expect(document.activeElement).toBe(item);
    });

    describe('onFocus', () => {
      it('focuses first item if no item is currently selected', () => {
        const { getByText } = render(<BasicExample />);
        const item = getByText('Item-1');

        expect(document.activeElement).not.toBe(item);
        userEvent.tab();
        expect(document.activeElement).toBe(item);
      });

      it('focuses last item if no item is currently selected and defaultFocusedIndex is provided', () => {
        const { getByText } = render(<BasicExample defaultFocusedIndex={itemValues.length - 1} />);
        const lastItem = getByText('Item-3');

        expect(lastItem).toHaveAttribute('tabIndex', '0');
      });

      it('will focus currently selected item if available', () => {
        const { getByText } = render(<BasicExample />);
        const lastItem = getByText('Item-3');

        userEvent.click(lastItem);
        expect(lastItem).toHaveAttribute('tabIndex', '0');
      });
    });

    describe('onBlur', () => {
      it('clears currently focused item', () => {
        const { getByText } = render(<BasicExample />);
        const item = getByText('Item-1');

        userEvent.tab();
        expect(document.activeElement).toBe(item);

        userEvent.tab();
        expect(document.activeElement).not.toBe(item);
      });
    });

    describe('onKeyDown', () => {
      describe('ENTER keyCode', () => {
        it('selects currently focused item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { keyCode: KEY_CODES.ENTER });
          expect(item).toHaveAttribute('aria-selected', 'true');
        });
      });

      describe('SPACE keyCode', () => {
        it('selects currently focused item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { keyCode: KEY_CODES.SPACE });
          expect(item).toHaveAttribute('aria-selected', 'true');
        });
      });

      describe('HOME keyCode', () => {
        it('focuses first available item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-1');

          fireEvent.keyDown(item, { keyCode: KEY_CODES.HOME });
          expect(document.activeElement).toBe(item);
        });
      });

      describe('END keyCode', () => {
        it('focuses last available item', () => {
          const { getByText } = render(<BasicExample />);
          const item = getByText('Item-2');
          const lastItem = getByText('Item-3');

          fireEvent.keyDown(item, { keyCode: KEY_CODES.END });
          expect(document.activeElement).toBe(lastItem);
        });
      });

      describe('while in horizontal mode', () => {
        describe('LEFT keyCode', () => {
          describe('when dir is LTR', () => {
            it('focuses on the first item when triggered from second item', () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              userEvent.click(secondItem);
              fireEvent.keyDown(secondItem, { keyCode: KEY_CODES.LEFT });

              expect(document.activeElement).toBe(item);
              expect(item).toHaveAttribute('aria-selected', 'false');
            });

            it('focuses on the last item after pressing left arrow key on first item', () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              userEvent.tab();
              fireEvent.keyDown(item, { keyCode: KEY_CODES.LEFT });

              expect(document.activeElement).toBe(lastItem);
              expect(lastItem).toHaveAttribute('aria-selected', 'false');
            });
          });

          describe('when dir is RTL', () => {
            it('focuses on the second item when triggered from first item', () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              userEvent.tab();
              fireEvent.keyDown(item, { keyCode: KEY_CODES.LEFT });

              expect(document.activeElement).toBe(secondItem);
              expect(secondItem).toHaveAttribute('aria-selected', 'false');
            });

            it('focuses on the first item when triggered from last item', () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              userEvent.click(lastItem);
              fireEvent.keyDown(lastItem, { keyCode: KEY_CODES.LEFT });

              expect(document.activeElement).toBe(item);
              expect(item).toHaveAttribute('aria-selected', 'false');
            });
          });
        });

        describe('RIGHT keyCode', () => {
          describe('when dir is LTR', () => {
            it('focuses on the second next item when triggered from first item', () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              userEvent.click(item);
              fireEvent.keyDown(item, { keyCode: KEY_CODES.RIGHT });
              expect(secondItem).toBe(document.activeElement);
            });

            it('focuses on the first item when triggered from last item', () => {
              const { getByText } = render(<BasicExample />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              userEvent.click(lastItem);
              fireEvent.keyDown(lastItem, { keyCode: KEY_CODES.RIGHT });
              expect(item).toBe(document.activeElement);
            });
          });

          describe('when dir is RTL', () => {
            it('focuses on the first item when triggered from second item', () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const secondItem = getByText('Item-2');

              userEvent.click(secondItem);
              fireEvent.keyDown(secondItem, { keyCode: KEY_CODES.RIGHT });

              expect(item).toBe(document.activeElement);
            });

            it('focuses on the last item when triggered from first item', () => {
              const { getByText } = render(<BasicExample rtl />);
              const item = getByText('Item-1');
              const lastItem = getByText('Item-3');

              userEvent.click(item);
              fireEvent.keyDown(item, { keyCode: KEY_CODES.RIGHT });

              expect(lastItem).toBe(document.activeElement);
            });
          });
        });

        describe('UP keyCode', () => {
          it('does not perform any action', () => {
            const { getByText } = render(<BasicExample />);
            const item = getByText('Item-1');

            userEvent.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { keyCode: KEY_CODES.UP });
            expect(item).toBe(document.activeElement);
          });
        });

        describe('DOWN keyCode', () => {
          it('does not perform any action', () => {
            const { getByText } = render(<BasicExample />);
            const item = getByText('Item-1');

            userEvent.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { keyCode: KEY_CODES.DOWN });
            expect(item).toBe(document.activeElement);
          });
        });
      });

      describe('while using vertical direction', () => {
        describe('UP keyCode', () => {
          it('focuses on the first item when triggered from second item', () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            userEvent.click(secondItem);
            fireEvent.keyDown(secondItem, { keyCode: KEY_CODES.UP });

            expect(item).toBe(document.activeElement);
          });

          it('focuses on the first item when triggered from second item in RTL', () => {
            const { getByText } = render(<BasicExample direction="vertical" rtl />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            userEvent.click(secondItem);
            fireEvent.keyDown(secondItem, { keyCode: KEY_CODES.UP });

            expect(item).toBe(document.activeElement);
          });

          it('focuses on the last item when triggered from first item', () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const lastItem = getByText('Item-3');

            userEvent.click(item);
            fireEvent.keyDown(item, { keyCode: KEY_CODES.UP });

            expect(lastItem).toBe(document.activeElement);
          });
        });

        describe('DOWN keyCode', () => {
          it('focuses on the second item when triggered from first item', () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            userEvent.click(item);
            fireEvent.keyDown(item, { keyCode: KEY_CODES.DOWN });

            expect(secondItem).toBe(document.activeElement);
          });

          it('focuses on the second item when triggered from first item in RTL', () => {
            const { getByText } = render(<BasicExample direction="vertical" rtl />);
            const item = getByText('Item-1');
            const secondItem = getByText('Item-2');

            userEvent.click(item);
            fireEvent.keyDown(item, { keyCode: KEY_CODES.DOWN });

            expect(secondItem).toBe(document.activeElement);
          });

          it('focuses on the first item when triggered from last item', () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');
            const lastItem = getByText('Item-3');

            userEvent.click(lastItem);
            fireEvent.keyDown(lastItem, { keyCode: KEY_CODES.DOWN });

            expect(item).toBe(document.activeElement);
          });
        });

        describe('LEFT keyCode', () => {
          it('does not perform any action', () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');

            userEvent.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { keyCode: KEY_CODES.LEFT });
            expect(item).toBe(document.activeElement);
          });
        });

        describe('RIGHT keyCode', () => {
          it('does not perform any action', () => {
            const { getByText } = render(<BasicExample direction="vertical" />);
            const item = getByText('Item-1');

            userEvent.click(item);
            expect(item).toBe(document.activeElement);

            fireEvent.keyDown(item, { keyCode: KEY_CODES.RIGHT });
            expect(item).toBe(document.activeElement);
          });
        });
      });
    });
  });

  describe('getItemProps', () => {
    it('throws if no item is applied', () => {
      const originalError = console.error;

      console.error = jest.fn();

      expect(() => {
        (itemProps as any)();
      }).toThrow('Accessibility Error: You must provide an "item" option to "getItemProps()"');

      console.error = originalError;
    });

    it('throws if no focusRef prop is applied', () => {
      const originalError = console.error;

      console.error = jest.fn();

      expect(() => {
        itemProps({ item: 'example' });
      }).toThrow('Accessibility Error: You must provide a "focusRef" option to "getItemProps()"');

      console.error = originalError;
    });

    it('does not throw if item and focusRef props are applied', () => {
      expect(() => {
        itemProps({ item: 'example', focusRef: React.createRef() });
      }).not.toThrow();
    });

    it('applies accessibility role attribute', () => {
      const { getByText } = render(<BasicExample />);
      const item = getByText('Item-1');

      expect(item).toHaveAttribute('role', 'option');
    });

    it('applies default selected aria value if none provided', () => {
      const { getByText } = render(<BasicExample />);
      const item = getByText('Item-1');

      expect(item).toHaveAttribute('aria-selected', 'false');
    });

    it('applies selected aria value if defaultSelectedIndex is passed', () => {
      const { getByText } = render(<BasicExample defaultSelectedIndex={1} />);
      const secondItem = getByText('Item-2');

      expect(secondItem).toHaveAttribute('aria-selected', 'true');
    });

    it('applies custom selected aria value if provided', () => {
      const { getByText } = render(<BasicExample selectedAriaKey="aria-pressed" />);
      const item = getByText('Item-1');

      expect(item).toHaveAttribute('aria-pressed', 'false');
    });

    describe('onClick', () => {
      it('should select and focus item that was clicked', () => {
        const { getByText } = render(<BasicExample />);
        const lastItem = getByText('Item-3');

        userEvent.click(lastItem);

        expect(lastItem).toHaveAttribute('aria-selected', 'true');
        expect(lastItem).toBe(document.activeElement);
      });
    });
  });
});
