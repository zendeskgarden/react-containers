/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSliderWrapper = styled.div`
  align-items: center;
  color: #222831;
  display: flex;
  gap: 0.5em;
  width: 50vw;
`;

const StyledSliderTrack = styled.div.attrs(props => ({
  // When the slider is sliding via a mouse event, styled-components updates the background property a whole bunch of times.
  // When this property existed inside of the class, styled-components gave a warning in the dev console that it was generating too many classes.
  // They were the ones who (in the warning) recommended taking the Styled Objects approach here.
  // @see {@link https://styled-components.com/docs/advanced#style-objects|Style Objects}
  style: {
    background: `linear-gradient(
      ${props.dir === 'rtl' ? '-90deg' : '90deg'}, 
      #fff 0%, #fff ${props.fillStart}, 
      ${props['aria-disabled'] || props['aria-readonly'] ? '#A799B7' : '#542E71'} ${
      props.fillStart
    }, 
      ${props['aria-disabled'] || props['aria-readonly'] ? '#A799B7' : '#542E71'} ${props.fillEnd}, 
      #fff ${props.fillEnd}, 
      #fff 100%)`
  }
}))`
  border: 1px solid currentColor;
  border-radius: 50em;
  box-sizing: border-box;
  cursor: ${props =>
    props['aria-disabled'] || props['aria-readonly'] ? 'not-allowed' : 'default'};
  display: block;
  font-size: 16px;
  height: 1.5em;
  margin: 0.5em 0;
  position: relative;
  width: min(30em, 100%);
`;

const StyledSliderThumb = styled.div.attrs(props => ({
  size: props.size || '2.75em'
}))`
  align-items: flex-end;
  background: ${props =>
    props['aria-disabled'] || props['aria-readonly'] ? '#A799B7' : '#FDCA40'};
  border: 1px solid currentColor;
  border-radius: 50%;
  bottom: 0;
  box-sizing: border-box;
  cursor: ${props => (props['aria-disabled'] || props['aria-readonly'] ? 'not-allowed' : 'grab')};
  display: inline-flex;
  font-size: 1em;
  height: ${props => props.size};
  ${props => (props.dir === 'rtl' ? 'right' : 'left')}: calc(${props =>
    props.position} - (${props => props.size} / 2));
  margin: auto;
  justify-content: center;
  outline: 1px solid transparent;
  padding: 0;
  position: absolute;
  top: 0;
  user-select: none;
  width: ${props => props.size};
  &:active,
  &:focus {
    cursor: ${props => (props['aria-disabled'] || props['aria-readonly'] ? 'not-allowed' : 'grab')};
  }
  &:focus {
    box-shadow: 0 0 0 0.125em #fff, 0 0 0 0.25em #fb3640;
    outline: 1px solid transparent;
  }
`;

const StyledSliderThumbLabel = styled.div`
  align-items: center;
  display: inline-flex;
  height: 100%;
  font-size: 0.875em;
  justify-content: center;
  pointer-events: none;
  text-align: center;
`;

const SliderThumbComponent = ({ elementAttributes, position }) => {
  return (
    <StyledSliderThumb {...elementAttributes} position={position}>
      <StyledSliderThumbLabel>{elementAttributes['aria-valuenow']}</StyledSliderThumbLabel>
    </StyledSliderThumb>
  );
};

const MemoizedSliderThumbComponent = React.memo(SliderThumbComponent);

export const SliderComponent = ({
  storyProps,
  value,
  getSliderRootProps,
  getSliderTrackProps,
  getSliderThumbProps
}: any) => {
  const computeThumbPosition = useCallback(
    (newValue: number) => `${(newValue / storyProps.max) * 100}%`,
    [storyProps.max]
  );

  const [thumb1Position, setThumb1Position] = useState(computeThumbPosition(value[0]));
  const [thumb2Position, setThumb2Position] = useState(computeThumbPosition(value[1]));

  useEffect(() => {
    setThumb1Position(computeThumbPosition(value[0]));
    setThumb2Position(computeThumbPosition(value[1]));
  }, [value, computeThumbPosition]);

  return (
    <fieldset dir={storyProps.rtl ? 'rtl' : 'ltr'}>
      <legend>
        <h2>Rate your experience</h2>
      </legend>
      <StyledSliderWrapper {...getSliderRootProps()}>
        <span aria-hidden="true">{storyProps.min}</span>
        <StyledSliderTrack
          {...getSliderTrackProps()}
          fillStart={thumb1Position}
          fillEnd={thumb2Position}
        >
          <MemoizedSliderThumbComponent
            elementAttributes={getSliderThumbProps({
              index: 0,
              'aria-label': 'Minimum rating'
            })}
            position={thumb1Position}
          />
          <MemoizedSliderThumbComponent
            elementAttributes={getSliderThumbProps({
              index: 1,
              'aria-label': 'Maximum rating'
            })}
            position={thumb2Position}
          />
        </StyledSliderTrack>
        <span aria-hidden="true">{storyProps.max}</span>
      </StyledSliderWrapper>
    </fieldset>
  );
};
