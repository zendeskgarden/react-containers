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

const Container = ({ title, text }: ISliderContainerProps & { text: string }) => (
  <SliderContainer title={title}>
    {({ getSliderProps }: IUseSliderReturnValue) => (
      <div {...getSliderProps({ 'aria-label': 'container' })}>{text}</div>
    )}
  </SliderContainer>
);

const Hook = ({ title, text }: IUseSliderProps & { text: string }) => {
  const { getSliderProps } = useSlider({ title });

  return <div {...getSliderProps({ 'aria-label': 'hook' })}>{text}</div>;
};

interface IArgs extends ISliderContainerProps {
  as: 'hook' | 'container';
  text: string;
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
