/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ButtonGroupContainer, useButtonGroup } from './src';

const buttons = ['Button 1', 'Button 2', 'Button 3'];
const buttonRefs = buttons.map(() => createRef());

export const Hook = () => {
  const [controlledSelectedItem, setSelectedItem] = useState<string>();
  const { selectedItem, focusedItem, getButtonProps, getGroupProps } = useButtonGroup<string>({
    selectedItem: controlledSelectedItem,
    onSelect: newSelectedItem => setSelectedItem(newSelectedItem)
  });

  return (
    <div {...getGroupProps()}>
      {buttons.map((button, index) => (
        <button
          {...getButtonProps({
            key: button,
            item: button,
            focusRef: buttonRefs[index],
            style: {
              boxShadow:
                button === focusedItem ? 'inset 0 0 0 3px rgba(31,115,183, 0.35)' : 'inherit',
              outline: 'none',
              color: button === selectedItem ? '#fff' : '#1f73b7',
              background: button === selectedItem ? '#144a75' : 'inherit',
              padding: '10px'
            }
          })}
        >
          {button}
        </button>
      ))}
    </div>
  );
};
export const Container = () => (
  <ButtonGroupContainer>
    {({ selectedItem, focusedItem, getButtonProps, getGroupProps }) => (
      <div {...getGroupProps()}>
        {buttons.map((button, index) => (
          <button
            {...getButtonProps({
              key: button,
              item: button,
              focusRef: buttonRefs[index],
              style: {
                boxShadow:
                  button === focusedItem ? 'inset 0 0 0 3px rgba(31,115,183, 0.35)' : 'inherit',
                outline: 'none',
                color: button === selectedItem ? '#fff' : '#1f73b7',
                background: button === selectedItem ? '#144a75' : 'inherit',
                padding: '10px'
              }
            })}
          >
            {button}
          </button>
        ))}
      </div>
    )}
  </ButtonGroupContainer>
);

Hook.story = {
  name: 'useButtongroup'
};

Container.story = {
  name: 'ButtongroupContainer'
};

export default {
  title: 'Buttongroup Container',
  decorators: [withKnobs]
};
