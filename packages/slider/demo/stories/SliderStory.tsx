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
import { SliderComponent } from './components';

const Container = ({ ...props }: ISliderContainerProps) => (
  <SliderContainer {...props}>
    {({ getSliderRootProps, getSliderTrackProps, getSliderThumbProps, value }: IUseSliderReturnValue) => (
      <SliderComponent
        storyProps={props}
        value={value}
        getSliderRootProps={getSliderRootProps}
        getSliderTrackProps={getSliderTrackProps}
        getSliderThumbProps={getSliderThumbProps}
      />
    )}
  </SliderContainer>
);

const Hook = ({ ...props }: IUseSliderProps) => {
  const { getSliderRootProps, getSliderTrackProps, getSliderThumbProps, value } = useSlider({ ...props });

  return (
    <SliderComponent
      storyProps={props}
      value={value}
      getSliderRootProps={getSliderRootProps}
      getSliderTrackProps={getSliderTrackProps}
      getSliderThumbProps={getSliderThumbProps}
    />
  );
};

interface IArgs extends ISliderContainerProps {
  as: 'hook' | 'container';
}

export const SliderStory: Story<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
