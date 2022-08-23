/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps } from 'react';
import { Story } from '@storybook/react';
import {
  ISliderContainerProps,
  IUseSliderProps,
  IUseSliderReturnValue,
  SliderContainer,
  useSlider
} from '@zendeskgarden/container-slider';
import { Slider } from './components';

const Container = ({...props}: ISliderContainerProps) => (
  <SliderContainer {...props}>
    {({ getThumbProps }: IUseSliderReturnValue) => (
      <Slider thumbs={[getThumbProps(0), getThumbProps(1)]}></Slider>
    )}
  </SliderContainer>
);

const Hook = ({...props}: IUseSliderProps) => {
  const { getThumbProps } = useSlider({...props});

  return <Slider thumbs={[getThumbProps(0), getThumbProps(1)]}></Slider>
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
