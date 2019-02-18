/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { KEY_CODES } from '../utils/KEY_CODES';
import { SelectionContainer } from './SelectionContainer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('SelectionContainer', () => {
  const itemValues = ['Item-1', 'Item-2', 'Item-3'];
  let wrapper;

  const BasicExample = ({ direction, defaultFocusedIndex, selectedAriaKey } = {}) => (
    <SelectionContainer direction={direction} defaultFocusedIndex={defaultFocusedIndex}>
      {({ getContainerProps, getItemProps, focusedItem, selectedItem }) => (
        <div {...getContainerProps({ 'data-test-id': 'container' })}>
          {itemValues.map(item => {
            const ref = React.createRef();
            const isSelected = item === selectedItem;
            const isFocused = item === focusedItem;

            return (
              <div
                {...getItemProps(
                  {
                    key: item,
                    item,
                    focusRef: ref,
                    ref,
                    selectedAriaKey,
                    'data-test-id': 'item',
                    'data-focused': isFocused,
                    'data-selected': isSelected
                  },
                  {
                    selectedAriaKey
                  }
                )}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </SelectionContainer>
  );

  const findItems = enzymeWrapper => enzymeWrapper.find('[data-test-id="item"]');
  const findContainer = enzymeWrapper => enzymeWrapper.find('[data-test-id="container"]');

  beforeEach(() => {
    act(() => {
      wrapper = mount(<BasicExample />);
    });
  });

  describe('getContainerProps', () => {
    it('applies accessibility role', () => {
      const container = findContainer(wrapper);

      expect(container).toHaveProp('role', 'listbox');
    });

    it('first item in container defaults as the only initial focusable item', () => {
      let item = findItems(wrapper).first();

      item.simulate('focus');

      // Need to requery item to get update dom attribute
      item = findItems(wrapper).first();
      expect(item).toHaveProp('tabIndex', 0);
      expect(item).toHaveProp('data-focused', true);
    });

    describe('onFocus', () => {
      it('does not focus item if item is moused down', () => {
        findItems(wrapper)
          .first()
          .simulate('click');

        expect(findItems(wrapper).first()).toHaveProp('data-focused', false);
        expect(findItems(wrapper).first()).toHaveProp('data-selected', true);
      });

      it('focuses first item if no item is currently selected', () => {
        findItems(wrapper)
          .first()
          .simulate('focus');

        expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
      });

      it('focuses last item if no item is currently selected and defaultFocusedIndex is provided', () => {
        wrapper = mount(<BasicExample defaultFocusedIndex={itemValues.length - 1} />);

        expect(findItems(wrapper).last()).toHaveProp('tabIndex', 0);
      });

      it('will focus currently selected item if available', () => {
        findItems(wrapper)
          .last()
          .simulate('click');

        expect(findItems(wrapper).last()).toHaveProp('tabIndex', 0);
      });
    });

    describe('onBlur', () => {
      it('clears currently focused item', () => {
        const firstItem = findItems(wrapper)
          .first()
          .simulate('focus');

        expect(findItems(wrapper).first()).toHaveProp('data-focused', true);

        firstItem.simulate('blur');
        expect(findItems(wrapper).first()).toHaveProp('data-focused', false);
      });
    });

    describe('onKeyDown', () => {
      describe('ENTER keyCode', () => {
        it('selects currently focused item', () => {
          const firstItem = findItems(wrapper).first();

          firstItem.simulate('focus');
          firstItem.simulate('keydown', { keyCode: KEY_CODES.ENTER });
          expect(findItems(wrapper).first()).toHaveProp('data-selected', true);
        });
      });

      describe('SPACE keyCode', () => {
        it('selects currently focused item', () => {
          const firstItem = findItems(wrapper).first();

          firstItem.simulate('focus');
          firstItem.simulate('keydown', { keyCode: KEY_CODES.SPACE });
          expect(findItems(wrapper).first()).toHaveProp('data-selected', true);
        });
      });

      describe('HOME keyCode', () => {
        it('focuses first available item', () => {
          const lastItem = findItems(wrapper).last();

          lastItem.simulate('focus');
          lastItem.simulate('keydown', { keyCode: KEY_CODES.HOME });
          expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
        });
      });

      describe('END keyCode', () => {
        it('focuses last available item', () => {
          const firstItem = findItems(wrapper).first();

          firstItem.simulate('focus');
          firstItem.simulate('keydown', { keyCode: KEY_CODES.END });
          expect(findItems(wrapper).last()).toHaveProp('data-focused', true);
        });
      });

      describe('while in horizontal mode', () => {
        describe('LEFT keyCode', () => {
          describe('when dir is LTR', () => {
            it('decrements focusedIndex if currently greater than 0', () => {
              const secondItem = findItems(wrapper).at(1);

              secondItem.simulate('focus');
              secondItem.simulate('keydown', { keyCode: KEY_CODES.LEFT });

              expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
            });

            it('decrements and wraps focusedIndex if currently less than or equal to 0', () => {
              const firstItem = findItems(wrapper).first();

              firstItem.simulate('focus');
              firstItem.simulate('keydown', { keyCode: KEY_CODES.LEFT });
              expect(findItems(wrapper).last()).toHaveProp('data-focused', true);
            });
          });

          // TODO: enzyme doesn't yet support useContext
          describe.skip('when dir is RTL', () => {
            beforeEach(() => {
              wrapper = mount(<BasicExample />, { rtl: true });
            });

            it('increments focusedIndex if currently less than items length', () => {
              const firstItem = findItems(wrapper).first();

              firstItem.simulate('focus');
              firstItem.simulate('keydown', { keyCode: KEY_CODES.LEFT });

              expect(findItems(wrapper).at(1)).toHaveProp('data-focused', true);
            });

            it('increments and wraps focusedIndex if currently greater than or equal to items length', () => {
              const container = findContainer(wrapper);

              findItems(wrapper)
                .last()
                .simulate('click');
              container.simulate('keydown', { keyCode: KEY_CODES.LEFT });
              expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
            });
          });
        });

        describe('RIGHT keyCode', () => {
          describe('when dir is LTR', () => {
            it('increments focusedIndex if currently less than items length', () => {
              const firstItem = findItems(wrapper).first();

              firstItem.simulate('click');
              firstItem.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
              expect(findItems(wrapper).at(1)).toHaveProp('data-focused', true);
            });

            it('increments and wrap focusedIndex if currently greater than or equal to items length', () => {
              const lastItem = findItems(wrapper).last();

              lastItem.simulate('click');
              lastItem.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
              expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
            });
          });

          // TODO: enzyme doesn't yet support useContext
          describe.skip('when dir is RTL', () => {
            beforeEach(() => {
              wrapper = mount(<BasicExample />, { rtl: true });
            });

            it('decrements focusedIndex if currently greater than 0', () => {
              const container = findContainer(wrapper);

              findItems(wrapper)
                .at(1)
                .simulate('click');
              container.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
              expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
            });

            it('decrements and wraps focusedIndex if currently 0', () => {
              const container = findContainer(wrapper);

              findItems(wrapper)
                .first()
                .simulate('click');
              container.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
              expect(findItems(wrapper).last()).toHaveProp('data-focused', true);
            });
          });
        });

        describe('UP keyCode', () => {
          it('does not perform any action', () => {
            const firstItem = findItems(wrapper).first();

            firstItem.simulate('click');
            firstItem.simulate('keydown', { keyCode: KEY_CODES.UP });
            const items = findItems(wrapper);

            expect(items.at(0)).toHaveProp('data-focused', false);
            expect(items.at(1)).toHaveProp('data-focused', false);
            expect(items.at(2)).toHaveProp('data-focused', false);
          });
        });

        describe('DOWN keyCode', () => {
          it('does not perform any action', () => {
            const firstItem = findItems(wrapper).first();

            firstItem.simulate('click');
            firstItem.simulate('keydown', { keyCode: KEY_CODES.DOWN });
            const items = findItems(wrapper);

            expect(items.at(0)).toHaveProp('data-focused', false);
            expect(items.at(1)).toHaveProp('data-focused', false);
            expect(items.at(2)).toHaveProp('data-focused', false);
          });
        });
      });

      describe('while using vertical direction', () => {
        beforeEach(() => {
          wrapper = mount(<BasicExample direction="vertical" />);
        });

        describe('UP keyCode', () => {
          it('decrements focusedIndex if currently greater than 0', () => {
            const secondItem = findItems(wrapper).at(1);

            secondItem.simulate('click');
            secondItem.simulate('keydown', { keyCode: KEY_CODES.UP });
            expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
          });

          it('decrements and wraps focusedIndex if currently less than or equal to 0', () => {
            const firstItem = findItems(wrapper).first();

            firstItem.simulate('click');
            firstItem.simulate('keydown', { keyCode: KEY_CODES.UP });
            expect(findItems(wrapper).last()).toHaveProp('data-focused', true);
          });
        });

        describe('DOWN keyCode', () => {
          it('increments focusedIndex if currently less than items length', () => {
            const firstItem = findItems(wrapper).first();

            firstItem.simulate('click');
            firstItem.simulate('keydown', { keyCode: KEY_CODES.DOWN });
            expect(findItems(wrapper).at(1)).toHaveProp('data-focused', true);
          });

          it('increments and wraps focusedIndex if currently greater than or equal to items length', () => {
            const lastItem = findItems(wrapper).last();

            lastItem.simulate('click');
            lastItem.simulate('keydown', { keyCode: KEY_CODES.DOWN });
            expect(findItems(wrapper).first()).toHaveProp('data-focused', true);
          });
        });

        describe('LEFT keyCode', () => {
          it('does not perform any action', () => {
            const firstItem = findItems(wrapper).first();

            firstItem.simulate('click');
            firstItem.simulate('keydown', { keyCode: KEY_CODES.LEFT });
            const items = findItems(wrapper);

            expect(items.at(0)).toHaveProp('data-focused', false);
            expect(items.at(1)).toHaveProp('data-focused', false);
            expect(items.at(2)).toHaveProp('data-focused', false);
          });
        });

        describe('RIGHT keyCode', () => {
          it('does not perform any action', () => {
            const firstItem = findItems(wrapper).first();

            firstItem.simulate('click');
            firstItem.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
            const items = findItems(wrapper);

            expect(items.at(0)).toHaveProp('data-focused', false);
            expect(items.at(1)).toHaveProp('data-focused', false);
            expect(items.at(2)).toHaveProp('data-focused', false);
          });
        });
      });
    });
  });

  describe('getItemProps', () => {
    it('throws if no item is applied', () => {
      console.error = jest.fn(); // eslint-disable-line no-console

      expect(() => {
        mount(
          <SelectionContainer>
            {({ getContainerProps, getItemProps }) => (
              <div {...getContainerProps()}>
                <div {...getItemProps()}>Example</div>
              </div>
            )}
          </SelectionContainer>
        );
      }).toThrow('Accessibility Error: You must provide an "item" option to "getItemProps()"');
    });

    it('throws if no focusRef prop is applied', () => {
      console.error = jest.fn(); // eslint-disable-line no-console

      expect(() => {
        mount(
          <SelectionContainer>
            {({ getContainerProps, getItemProps }) => (
              <div {...getContainerProps()}>
                <div {...getItemProps({ item: 'example' })}>Example</div>
              </div>
            )}
          </SelectionContainer>
        );
      }).toThrow('Accessibility Error: You must provide a "focusRef" option to "getItemProps()"');
    });

    it('does not throw if item and focusRef props are applied', () => {
      expect(() => {
        mount(
          <SelectionContainer>
            {({ getContainerProps, getItemProps }) => (
              <div {...getContainerProps()}>
                <div {...getItemProps({ item: 'example', focusRef: {} })}>Example</div>
              </div>
            )}
          </SelectionContainer>
        );
      }).not.toThrow();
    });

    it('applies accessibility role attribute', () => {
      expect(findItems(wrapper).first()).toHaveProp('role', 'option');
    });

    it('applies default selected aria value if none provided', () => {
      expect(findItems(wrapper).first()).toHaveProp('aria-selected');
    });

    it('applies custom selected aria value if provided', () => {
      wrapper = mount(<BasicExample selectedAriaKey="aria-pressed" />);
      expect(findItems(wrapper).first()).toHaveProp('aria-pressed');
    });

    describe('onClick', () => {
      it('should select item that was clicked', () => {
        findItems(wrapper)
          .last()
          .simulate('click');
        expect(findItems(wrapper).last()).toHaveProp('aria-selected', true);
      });

      it('should remove focus from all items', () => {
        findItems(wrapper)
          .last()
          .simulate('click');

        const items = findItems(wrapper);

        expect(items.at(0)).toHaveProp('data-focused', false);
        expect(items.at(1)).toHaveProp('data-focused', false);
        expect(items.at(2)).toHaveProp('data-focused', false);
      });
    });
  });
});
