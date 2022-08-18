/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { Story } from '@storybook/react';
import {
  ISliderContainerProps,
  IUseSliderProps,
  IUseSliderReturnValue,
  SliderContainer,
  useSlider
} from '@zendeskgarden/container-slider';

const SliderElement = (props: any) => {
  const { type, ...other } = props;
  const Slider = type === 'range' ? 'input' : 'div';
  return <Slider type={type} {...other} />;
};

const StyledSliderElement = styled(SliderElement)`
  ${({ type }) => type !== 'range' &&
    css`
      background-color: pink;
      border-radius: 50%;
      height: 2.5rem;
      outline: transparent;
      width: 2.5rem;
      &:focus {
        outline: 1px auto blue;
      }
    `
  }
`;

const Container = ({ value, min, max, title }: ISliderContainerProps) => (
  <SliderContainer value={value} min={min} max={max} title={title}>
    {({ getSliderProps }: IUseSliderReturnValue) => (
      <StyledSliderElement {...getSliderProps()} />
    )}
  </SliderContainer>
);

const Hook = ({ value, min, max, type, title }: IUseSliderProps) => {
  const { getSliderProps } = useSlider({ value, min, max, title, type });

  return <StyledSliderElement {...getSliderProps()} />;
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
