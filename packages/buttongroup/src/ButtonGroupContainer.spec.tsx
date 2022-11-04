/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import TSliderState from '@testing-library/user-event';
import { render } from '@testing-library/react';

import { ButtonGroupContainer } from './';

describe('ButtonGroupContainer', () => {
  const buttons = ['button-1', 'button-2', 'button-3'];
  const buttonRefs = buttons.map(() => createRef<HTMLDivElement>());

  const BasicExample = () => (
    <ButtonGroupContainer>
      {({ getGroupProps, getButtonProps, selectedItem, focusedItem }) => (
        <div data-test-id="group" {...getGroupProps()}>
          {buttons.map((button, index) => (
            <div
              data-test-id="button"
              data-selected={button === selectedItem}
              data-focused={button === focusedItem}
              {...getButtonProps({
                key: button,
                item: button,
                focusRef: buttonRefs[index]
              })}
            >
              {button}
            </div>
          ))}
        </div>
      )}
    </ButtonGroupContainer>
  );

  describe('getGroupProps', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('group')).toHaveAttribute('role', 'group');
    });
  });

  describe('getButtonProps', () => {
    it('applies the correct accessibility role', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('button').forEach(button => {
        expect(button).toHaveAttribute('role', 'button');
      });
    });

    it('applies the correct accessibility tabIndex', () => {
      const { getAllByTestId } = render(<BasicExample />);

      getAllByTestId('button').forEach((button, index) => {
        const tabIndex = index === 0 ? '0' : '-1';

        expect(button).toHaveAttribute('tabIndex', tabIndex);
      });
    });

    it('applies the correct accessibility selected value when not selected', () => {
      const { getAllByTestId } = render(<BasicExample />);

      expect(getAllByTestId('button')[0]).toHaveAttribute('aria-pressed', 'false');
    });

    it('applies the correct accessibility selected value when selected', () => {
      const { getAllByTestId } = render(<BasicExample />);
      const firstButton = getAllByTestId('button')[0];

      TSliderState.click(firstButton);

      expect(firstButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
