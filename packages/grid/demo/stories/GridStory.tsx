/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { FocusEventHandler, HTMLProps } from 'react';
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
  'aria-label': IArgs['aria-label'];
}

const Component = ({
  rtl,
  matrix,
  layout,
  'aria-label': ariaLabel,
  getGridProps,
  getGridCellProps
}: IComponent) => (
  <table style={{ direction: rtl ? 'rtl' : 'ltr' }} {...getGridProps({ 'aria-label': ariaLabel })}>
    <tbody>
      {matrix.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((column, colIndex) => {
            switch (layout) {
              case 'text': {
                const { role, ...props } = getGridCellProps<HTMLTableCellElement>({
                  rowIndex,
                  colIndex
                });

                return (
                  <td key={colIndex} className="w-5 h-5 text-center" role={role} {...props}>
                    {matrix[rowIndex][colIndex] as number}
                  </td>
                );
              }

              case 'radio': {
                const { role, ...props } = getGridCellProps<HTMLInputElement>({
                  rowIndex,
                  colIndex
                });

                const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
                  /**
                   * When the grid loses focus, reset the roving tab index to
                   * the checked input. Otherwise, keyboard access to the native
                   * radio group is lost.
                   */
                  if (event.relatedTarget === null) {
                    const selectedInput = document.querySelector(
                      `input[name='${event.target.name}']:checked`
                    );

                    if (selectedInput !== null) {
                      const inputs = document.getElementsByName(
                        event.target.name
                      ) as NodeListOf<HTMLInputElement>;

                      inputs.forEach(input =>
                        input.setAttribute('tabIndex', input.checked ? '0' : '-1')
                      );
                    }
                  }
                };

                return (
                  <td key={colIndex} role={role}>
                    <label>
                      <span className="sr-only">{matrix[rowIndex][colIndex] as number}</span>
                      <input
                        className="w-5 h-5"
                        name="demo"
                        type="radio"
                        onBlur={handleBlur}
                        {...props}
                      />
                    </label>
                  </td>
                );
              }

              case 'button':
              default: {
                const { role, ...props } = getGridCellProps<HTMLButtonElement>({
                  rowIndex,
                  colIndex
                });

                return (
                  <td key={colIndex} role={role}>
                    <button className="h-7 w-7" {...props} type="button">
                      {matrix[rowIndex][colIndex] as number}
                    </button>
                  </td>
                );
              }
            }
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

interface IProps extends IGridContainerProps {
  layout: IArgs['layout'];
  'aria-label': IArgs['aria-label'];
}

const Container = ({ 'aria-label': ariaLabel, ...props }: IProps) => (
  <GridContainer {...props}>
    {containerProps => <Component aria-label={ariaLabel} {...containerProps} {...props} />}
  </GridContainer>
);

const Hook = ({ 'aria-label': ariaLabel, ...props }: IProps) => {
  const hookProps = useGrid(props);

  return <Component aria-label={ariaLabel} {...hookProps} {...props} />;
};

interface IArgs extends IGridContainerProps {
  as: 'hook' | 'container';
  layout: 'button' | 'radio' | 'text';
  'aria-label': NonNullable<HTMLProps<HTMLDivElement>['aria-label']>;
}

export const GridStory: Story<IArgs> = ({ as, 'aria-label': ariaLabel, ...props }) => {
  switch (as) {
    case 'container':
      return <Container aria-label={ariaLabel} {...props} />;

    case 'hook':
    default:
      return <Hook aria-label={ariaLabel} {...props} />;
  }
};
