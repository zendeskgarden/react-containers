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
      cursor: pointer;
      height: 44px;
      outline: transparent;
      width: 44px;
      &:focus {
        outline: 1px auto blue;
      }
    `
  }
`;

const Container = ({ value, min, max, disabled, readOnly }: ISliderContainerProps) => (
  <SliderContainer value={value} min={min} max={max} disabled={disabled} readOnly={readOnly}>
    {({ getSliderProps }: IUseSliderReturnValue) => (
      <StyledSliderElement {...getSliderProps()} />
    )}
  </SliderContainer>
);

const Hook = ({ value, min, max, type, disabled, readOnly}: IUseSliderProps) => {
  const { getSliderProps } = useSlider({ value, min, max, type, disabled, readOnly });

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
