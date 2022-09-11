/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';

import {
  ISliderContainerProps,
  IUseSliderProps,
  IUseSliderReturnValue,
  SliderContainer,
  useSlider
} from '@zendeskgarden/container-slider';

import { IArgs } from './types';
import { Wrapper, Track, Thumb } from './styled';

export const Component = ({
  storyArgs,
  value,
  getSliderRootProps,
  getSliderTrackProps,
  getSliderThumbProps
}: { storyArgs: Omit<IArgs, 'as'> } & IUseSliderReturnValue) => {
  const { rtl, min, max } = storyArgs;

  return (
    <fieldset dir={rtl ? 'rtl' : 'ltr'}>
      <legend>
        <h2>Rate your experience</h2>
      </legend>

      <Wrapper {...getSliderRootProps()}>
        <span aria-hidden="true">{min}</span>
        <Track thumbs={value} sliderMax={max} {...getSliderTrackProps()}>
          {value.map((_, index: number) => {
            const props = getSliderThumbProps({
              index,
              'aria-label': index === 0 ? 'Minimum rating' : 'Maximum rating'
            });

            return <Thumb key={index} sliderMax={max} {...props} />;
          })}
        </Track>
        <span aria-hidden="true">{max}</span>
      </Wrapper>
    </fieldset>
  );
};

const Container = ({ ...args }: ISliderContainerProps & Omit<IArgs, 'as'>) => (
  <SliderContainer {...args}>
    {({
      getSliderRootProps,
      getSliderTrackProps,
      getSliderThumbProps,
      value
    }: IUseSliderReturnValue) => (
      <Component
        storyArgs={args}
        value={value}
        getSliderRootProps={getSliderRootProps}
        getSliderTrackProps={getSliderTrackProps}
        getSliderThumbProps={getSliderThumbProps}
      />
    )}
  </SliderContainer>
);

const Hook = ({ ...args }: IUseSliderProps & Omit<IArgs, 'as'>) => {
  const {
    getSliderRootProps,
    getSliderTrackProps,
    getSliderThumbProps,
    value
  }: IUseSliderReturnValue = useSlider({
    ...args
  });

  return (
    <Component
      storyArgs={args}
      value={value}
      getSliderRootProps={getSliderRootProps}
      getSliderTrackProps={getSliderTrackProps}
      getSliderThumbProps={getSliderThumbProps}
    />
  );
};

export const SliderStory: Story<IArgs> = ({ as, ...args }) => {
  switch (as) {
    case 'container':
      return <Container {...args} />;

    case 'hook':
    default:
      return <Hook {...args} />;
  }
};
