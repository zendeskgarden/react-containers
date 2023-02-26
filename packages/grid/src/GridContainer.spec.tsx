/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GridContainer, IUseGridProps, IUseGridReturnValue } from './';

const gridCell = (text: string) => screen.getByRole('gridcell', { name: new RegExp(text, 'u') });

interface IExample extends IUseGridProps {
  rtl?: boolean;
  onFocus?: () => void;
  onClick?: () => void;
}

describe('useGrid', () => {
  const user = userEvent.setup();

  const idPrefix = 'some-id-prefix';

  const Example = ({ rtl, matrix, onFocus, onClick, ...props }: IExample) => (
    <GridContainer rtl={rtl} matrix={matrix} idPrefix={idPrefix} {...props}>
      {({ getGridCellProps }: IUseGridReturnValue) => (
        <table role="grid">
          <tbody>
            {matrix.map((row, rowIndex: number) => (
              <tr key={row[0] as string}>
                {row.map((rowItem, colIndex: number) => (
                  <td role="presentation" key={rowItem as string}>
                    <button
                      {...getGridCellProps({
                        colIndex,
                        rowIndex,
                        onFocus,
                        onClick
                      })}
                      type="button"
                    >
                      {rowItem}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </GridContainer>
  );

  test('composes gridcell onClick handler', async () => {
    const onClick = jest.fn();
    const matrix = [
      ['#d1e8df', '#aecfc2'],
      ['#f5d5d8', '#f5b5ba']
    ];

    render(<Example matrix={matrix} onClick={onClick} />);

    await user.click(gridCell('#f5b5ba'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('composes gridcell onFocus handler', async () => {
    const onFocus = jest.fn();
    const matrix = [
      ['#d1e8df', '#aecfc2'],
      ['#f5d5d8', '#f5b5ba']
    ];

    render(<Example matrix={matrix} onFocus={onFocus} />);

    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  describe('uncontrolled usages', () => {
    test('sets a default focused cell', async () => {
      const matrix = [
        ['#d1e8df', '#aecfc2'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Example matrix={matrix} defaultRowIndex={1} defaultColIndex={1} />);

      await user.tab();
      expect(gridCell('#f5b5ba')).toHaveFocus();
    });

    test('focus moves when arrow keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Example matrix={matrix} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 0);

      await user.keyboard('{arrowright}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowdown}');
      expect(gridCell('#f5b5ba')).toHaveFocus();

      await user.keyboard('{arrowdown}');
      expect(gridCell('#f5b5ba')).toHaveFocus();

      await user.keyboard('{arrowright}');
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#f5d5d8')).toHaveFocus();

      await user.keyboard('{arrowleft}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(7);
      expect(onChange).toHaveBeenCalledWith(0, 0);
    });

    test('focus moves with wrapped navigation when arrow keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91', '#228f67'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Example wrap matrix={matrix} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 0);

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();

      await user.keyboard('{arrowleft}');
      expect(gridCell('#d1e8df')).toHaveFocus();

      await user.keyboard('{arrowright}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowdown}');
      expect(gridCell('#228f67')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(0, 3);

      await user.keyboard('{arrowright}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#228f67')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenCalledWith(0, 3);

      await user.keyboard('{arrowup}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(7);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowup}');
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(8);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{arrowdown}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(9);
      expect(onChange).toHaveBeenCalledWith(0, 2);
    });

    test('focus moves when arrow keys are pressed in RTL', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(
        <Example rtl matrix={matrix} onChange={onChange} defaultRowIndex={0} defaultColIndex={1} />
      );

      await user.tab();
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowright}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 1);
    });

    test('focus moves with wrapped navigation when arrow keys are pressed in RTL', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(
        <Example
          rtl
          wrap
          matrix={matrix}
          onChange={onChange}
          defaultRowIndex={0}
          defaultColIndex={1}
        />
      );

      await user.tab();
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(0, 2);
    });

    test('focus moves to the first/last cell on the focused row when home/end keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba', '#e35b66'],
        ['#cee2f2', '#adcce4']
      ];

      render(
        <Example matrix={matrix} onChange={onChange} defaultRowIndex={1} defaultColIndex={1} />
      );

      await user.tab();
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{home}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{end}');
      expect(gridCell('#e35b66')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(1, 2);
    });

    test('focus moves to the first/last cell of the first/last row when control + home/end keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba', '#e35b66'],
        ['#cee2f2', '#adcce4']
      ];

      render(
        <Example matrix={matrix} onChange={onChange} defaultRowIndex={1} defaultColIndex={1} />
      );

      await user.tab();
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{Control>}{home}{/Control}');
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 0);

      await user.keyboard('{Control>}{end}{/Control}');
      expect(gridCell('#adcce4')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(2, 1);
    });

    test('focus wraps non-balanced grid when up arrow is pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91', '#228f67', '#0b3b29'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(
        <Example wrap matrix={matrix} onChange={onChange} defaultRowIndex={0} defaultColIndex={4} />
      );

      await user.tab();
      expect(gridCell('#0b3b29')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 4);

      await user.keyboard('{arrowup}');
      expect(gridCell('#228f67')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 3);

      await user.keyboard('{arrowup}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowup}');
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{arrowup}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowup}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(7);
      expect(onChange).toHaveBeenCalledWith(0, 0);
    });

    test('handles matrix mutation', async () => {
      const onChange = jest.fn();
      let matrix = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9']
      ];

      const { rerender } = render(<Example matrix={matrix} onChange={onChange} />);

      await user.click(gridCell('9'));
      expect(gridCell('9')).toHaveFocus();

      matrix = [
        ['1', '2'],
        ['3', '4']
      ];

      rerender(<Example matrix={matrix} onChange={onChange} />);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(1, 1);
      expect(gridCell('4')).toHaveAttribute('tabIndex', '0');

      await user.click(gridCell('4'));
      expect(gridCell('4')).toHaveFocus();

      matrix = [['1', '2']];

      rerender(<Example matrix={matrix} onChange={onChange} />);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(0, 1);
      expect(gridCell('2')).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('controlled usages', () => {
    const Controlled = ({
      rtl,
      wrap,
      matrix,
      onChange,
      rowIndex = 0,
      colIndex = 0
    }: IUseGridProps) => {
      const [rowIdx, setRowIdx] = useState(rowIndex);
      const [colIdx, setColIdx] = useState(colIndex);

      return (
        <Example
          rtl={rtl}
          wrap={wrap}
          rowIndex={rowIdx}
          colIndex={colIdx}
          matrix={matrix}
          onChange={(_rowIdx: number, _colIdx: number) => {
            onChange && onChange(_rowIdx, _colIdx);
            setRowIdx(_rowIdx);
            setColIdx(_colIdx);
          }}
        />
      );
    };

    test('sets the focused cell', async () => {
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Controlled matrix={matrix} rowIndex={0} colIndex={1} />);

      expect(gridCell('#aecfc2')).not.toHaveFocus();
      await user.tab();
      expect(gridCell('#aecfc2')).toHaveFocus();
    });

    test('focus moves when arrow keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Controlled matrix={matrix} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 0);

      await user.keyboard('{arrowright}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowdown}');
      expect(gridCell('#f5b5ba')).toHaveFocus();

      await user.keyboard('{arrowdown}');
      expect(gridCell('#f5b5ba')).toHaveFocus();

      await user.keyboard('{arrowright}');
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#f5d5d8')).toHaveFocus();

      await user.keyboard('{arrowleft}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(7);
      expect(onChange).toHaveBeenCalledWith(0, 0);
    });

    test('focus moves with wrapped navigation when arrow keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91', '#228f67'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Controlled wrap matrix={matrix} rowIndex={0} colIndex={0} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 0);

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();

      await user.keyboard('{arrowleft}');
      expect(gridCell('#d1e8df')).toHaveFocus();

      await user.keyboard('{arrowright}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowdown}');
      expect(gridCell('#228f67')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(0, 3);

      await user.keyboard('{arrowright}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#228f67')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenCalledWith(0, 3);

      await user.keyboard('{arrowup}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(7);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowup}');
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(8);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{arrowdown}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(9);
      expect(onChange).toHaveBeenCalledWith(0, 2);
    });

    test('focus moves when arrow keys are pressed in RTL', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Controlled rtl matrix={matrix} onChange={onChange} rowIndex={0} colIndex={1} />);

      await user.tab();
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowright}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 1);
    });

    test('focus moves with wrapped navigation when arrow keys are pressed in RTL', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Controlled rtl wrap matrix={matrix} onChange={onChange} rowIndex={0} colIndex={1} />);

      await user.tab();
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowleft}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowright}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(0, 2);
    });

    test('focus moves to the first/last cell on the focused row when home/end keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba', '#e35b66'],
        ['#cee2f2', '#adcce4']
      ];

      render(<Controlled wrap rowIndex={1} colIndex={1} matrix={matrix} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{home}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{end}');
      expect(gridCell('#e35b66')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(1, 2);
    });

    test('focus moves to the first/last cell of the first/last row when control + home/end keys are pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91'],
        ['#f5d5d8', '#f5b5ba', '#e35b66'],
        ['#cee2f2', '#adcce4']
      ];

      render(<Controlled wrap rowIndex={1} colIndex={1} matrix={matrix} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{Control>}{home}{/Control}');
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 0);

      await user.keyboard('{Control>}{end}{/Control}');
      expect(gridCell('#adcce4')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(2, 1);
    });

    test('focus wraps non-balanced grid when up arrow is pressed', async () => {
      const onChange = jest.fn();
      const matrix = [
        ['#d1e8df', '#aecfc2', '#5eae91', '#228f67', '#0b3b29'],
        ['#f5d5d8', '#f5b5ba']
      ];

      render(<Controlled wrap rowIndex={0} colIndex={4} matrix={matrix} onChange={onChange} />);

      await user.tab();
      expect(gridCell('#0b3b29')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(0, 4);

      await user.keyboard('{arrowup}');
      expect(gridCell('#228f67')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(0, 3);

      await user.keyboard('{arrowup}');
      expect(gridCell('#5eae91')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith(0, 2);

      await user.keyboard('{arrowup}');
      expect(gridCell('#f5b5ba')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(1, 1);

      await user.keyboard('{arrowup}');
      expect(gridCell('#aecfc2')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toHaveBeenCalledWith(0, 1);

      await user.keyboard('{arrowup}');
      expect(gridCell('#f5d5d8')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(6);
      expect(onChange).toHaveBeenCalledWith(1, 0);

      await user.keyboard('{arrowup}');
      expect(gridCell('#d1e8df')).toHaveFocus();
      expect(onChange).toHaveBeenCalledTimes(7);
      expect(onChange).toHaveBeenCalledWith(0, 0);
    });
  });
});
