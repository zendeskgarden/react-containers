/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';
import {
  ISliderContainerProps,
  IUseSliderProps,
  IUseSliderReturnValue,
  SliderContainer,
  useSlider
} from '@zendeskgarden/container-slider';
import { SliderComponent } from './components';

const SliderComponentWrapper = styled.div`
  width: 50vw;
`;

const Container = ({...props}: ISliderContainerProps) => (
  <SliderContainer {...props}>
    {({ getRootProps, getTrackProps, getThumbProps }: IUseSliderReturnValue) => (
      <SliderComponentWrapper>
        <SliderComponent
          rangeMax={props.max}
          getRootProps={getRootProps} 
          getTrackProps={getTrackProps} 
          getThumbProps={getThumbProps} 
        />
      </SliderComponentWrapper>
    )}
  </SliderContainer>
);

const Hook = ({...props}: IUseSliderProps) => {
  const { getRootProps, getTrackProps, getThumbProps } = useSlider({...props});

  return (
    <SliderComponentWrapper>
      <SliderComponent
        rangeMax={props.max} 
        getRootProps={getRootProps} 
        getTrackProps={getTrackProps} 
        getThumbProps={getThumbProps} 
      />
    </SliderComponentWrapper>
  )
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
