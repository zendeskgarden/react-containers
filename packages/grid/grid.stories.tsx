/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import { convertToMatrix } from '@zendeskgarden/container-utilities';
import { useGrid, GridContainer, IUseGridReturnValue } from './src';

const ARGS = {
  wrap: true,
  selection: true,
  rtl: false
};

const Grid = ({ rtl, matrix, selection, selectedRowIndex, selectedColIndex, getGridCellProps }) => (
  <table role="grid" style={{ direction: rtl ? 'rtl' : 'ltr' }}>
    <tbody>
      {matrix.map((row, rowIdx) => (
        <tr key={`rowIdx-${row[0]}`}>
          {row.map((item, colIdx) => {
            const selected = rowIdx === selectedRowIndex && colIdx === selectedColIndex;

            return (
              <td role="presentation" key={item}>
                <button
                  {...getGridCellProps({
                    rowIdx,
                    colIdx,
                    'aria-label': `cell ${rowIdx}, ${colIdx}`,
                    style: { width: 30, height: 30 }
                  })}
                >
                  {selection && selected ? '✓' : null}
                </button>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export const Container = ({ rtl, wrap, selection, cellCount }) => {
  const items = Array(cellCount)
    .fill(undefined)
    .map((s, i) => i);
  const idPrefix = 'prefix-1';
  const matrix = convertToMatrix(items, 5);
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState(selection ? 0 : null);
  const [selectedColIndex, setSelectedColIndex] = useState(selection ? 0 : null);

  const onChange = (rowIdx: number, colIdx: number) => {
    setRowIndex(rowIdx);
    setColIndex(colIdx);
  };

  const onSelect = (rowIdx: number, colIdx: number) => {
    setSelectedRowIndex(rowIdx);
    setSelectedColIndex(colIdx);
  };

  return (
    <GridContainer
      rtl={rtl}
      wrap={wrap}
      selection={selection}
      matrix={matrix}
      onChange={onChange}
      onSelect={onSelect}
      idPrefix={idPrefix}
      rowIndex={rowIndex}
      colIndex={colIndex}
      selectedRowIndex={selectedRowIndex}
      selectedColIndex={selectedColIndex}
    >
      {({ getGridCellProps }: IUseGridReturnValue) => (
        <Grid
          rtl={rtl}
          matrix={matrix}
          selection={selection}
          selectedRowIndex={selectedRowIndex}
          selectedColIndex={selectedColIndex}
          getGridCellProps={getGridCellProps}
        />
      )}
    </GridContainer>
  );
};

Container.storyName = 'GridContainer';
Container.args = { ...ARGS, cellCount: 25 };
Container.argTypes = {
  cellCount: {
    name: 'cell count',
    description: 'Adjusts the cell count',
    control: { type: 'range', min: 1, max: 25 }
  },
  matrix: { control: { disable: true } },
  idPrefix: { control: { disable: true } },
  rowIndex: { control: { disable: true } },
  colIndex: { control: { disable: true } },
  selectedRowIndex: { control: { disable: true } },
  selectedColIndex: { control: { disable: true } },
  defaultRowIndex: { control: { disable: true } },
  defaultColIndex: { control: { disable: true } },
  defaultSelectedRowIndex: { control: { disable: true } },
  defaultSelectedColIndex: { control: { disable: true } }
};

export const Hook = ({ rtl, ...other }) => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const idPrefix = 'prefix-2';
  const [rowIndex, setRowIndex] = useState(1);
  const [colIndex, setColIndex] = useState(1);
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [selectedColIndex, setSelectedColIndex] = useState(1);

  const onChange = (rowIdx: number, colIdx: number) => {
    setRowIndex(rowIdx);
    setColIndex(colIdx);
  };

  const onSelect = (rowIdx: number, colIdx: number) => {
    setSelectedRowIndex(rowIdx);
    setSelectedColIndex(colIdx);
  };

  const { getGridCellProps } = useGrid({
    ...other,
    matrix,
    onChange,
    onSelect,
    idPrefix,
    rowIndex,
    colIndex,
    selectedRowIndex,
    selectedColIndex
  });

  return (
    <Grid
      rtl={rtl}
      selection
      matrix={matrix}
      selectedRowIndex={selectedRowIndex}
      selectedColIndex={selectedColIndex}
      getGridCellProps={getGridCellProps}
    />
  );
};

Hook.storyName = 'useGrid';
Hook.args = ARGS;
Hook.parameters = {
  docs: {
    description: {
      story: `The \`useGrid\` hook implements the [grid](https://www.w3.org/TR/wai-aria-practices-1.1/#grid) design pattern.`
    }
  }
};

export default {
  component: GridContainer,
  title: 'Grid Container',
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useGrid hook.`
  }
};
