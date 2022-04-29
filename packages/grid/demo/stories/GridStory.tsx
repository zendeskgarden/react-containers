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

interface IComponent extends IUseGridProps, IUseGridReturnValue {
  layout: IArgs['layout'];
}

const Component = ({ rtl, matrix, layout, getGridCellProps }: IComponent) => (
  <table role="grid" style={{ direction: rtl ? 'rtl' : 'ltr' }}>
    <tbody>
      {matrix.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((column, colIdx) => {
            const { role, ...props } = getGridCellProps({ rowIdx, colIdx });

            switch (layout) {
              case 'text':
                return (
                  <td key={colIdx} className="w-5 h-5 text-center" role={role} {...props}>
                    {matrix[rowIdx][colIdx]}
                  </td>
                );

              case 'radio':
                return (
                  <td key={colIdx} role={role}>
                    <label>
                      <span className="sr-only">{matrix[rowIdx][colIdx]}</span>
                      <input className="w-5 h-5" name="demo" type="radio" {...props} />
                    </label>
                  </td>
                );

              case 'button':
              default:
                return (
                  <td key={colIdx} role={role}>
                    <button className="h-7 w-7" type="button" {...props}>
                      {matrix[rowIdx][colIdx]}
                    </button>
                  </td>
                );
            }
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

interface IProps extends IGridContainerProps {
  layout: IArgs['layout'];
}

const Container = (props: IProps) => (
  <GridContainer {...props}>
    {containerProps => <Component {...containerProps} {...props} />}
  </GridContainer>
);

const Hook = (props: IProps) => {
  const hookProps = useGrid(props);

  return <Component {...hookProps} {...props} />;
};

interface IArgs extends IGridContainerProps {
  as: 'hook' | 'container';
  layout: 'button' | 'radio' | 'text';
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
