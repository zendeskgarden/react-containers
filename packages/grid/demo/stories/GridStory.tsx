/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import {
  GridContainer,
  IGridContainerProps,
  IUseGridProps,
  IUseGridReturnValue,
  useGrid
} from '@zendeskgarden/container-grid';

interface IComponent extends IUseGridProps, IUseGridReturnValue {}

const Component = ({ rtl, matrix, selection, getGridCellProps }: IComponent) => (
  <table role="grid" style={{ direction: rtl ? 'rtl' : 'ltr' }}>
    <tbody>
      {matrix.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((column, colIdx) => {
            const {
              role,
              'aria-selected': selected, // the gridcell itself is not selectable in this implementation
              ...props
            } = getGridCellProps({ rowIdx, colIdx });

            return (
              <td key={colIdx} role={role}>
                {selection ? (
                  <label>
                    <span className="sr-only">{matrix[rowIdx][colIdx]}</span>
                    <input
                      className="w-5 h-5"
                      name="demo"
                      type="radio"
                      {...props}
                      defaultChecked={selected === true}
                    />
                  </label>
                ) : (
                  <button className="h-7 w-7" type="button" {...props}>
                    {matrix[rowIdx][colIdx]}
                  </button>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

const Container = (props: IGridContainerProps) => (
  <GridContainer {...props}>
    {containerProps => <Component {...containerProps} {...props} />}
  </GridContainer>
);

const Hook = (props: IUseGridProps) => {
  const hookProps = useGrid(props);

  return <Component {...hookProps} {...props} />;
};

interface IArgs extends IGridContainerProps {
  as: 'hook' | 'container';
  size: number;
}

export const GridStory: Story<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
