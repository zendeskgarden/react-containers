/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSliderWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  width: 50vw;
`;

const StyledSliderTrack = styled.div`
  background: linear-gradient(
    90deg,
    #FFF 0%,
    #FFF ${props => props.fillStart},
    #5800FF ${props => props.fillStart},
    #5800FF ${props => props.fillEnd},
    #FFF ${props => props.fillEnd},
    #FFF 100%
  );
  border: 1px solid black;
  border-radius: 50em;
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  height: 1.5em;
  margin: 0.5em 0;
  position: relative;
  width: min(30em, 100%);
`;

// TODO: update left position to right position if RTL is true
const StyledSliderThumb = styled.div.attrs(props => ({
  size: "2.75em",
}))`
  align-items: flex-end;
  background: ${props => props['aria-disabled'] ? "darkgray" : "#FFC600"};
  border: 1px solid black;
  border-radius: 50%;
  bottom: 0;
  box-sizing: border-box;
  cursor: ${props => props['aria-disabled'] ? "not-allowed" : "grab"};
  display: inline-flex;
  font-size: 1em;
  height: ${props => props.size};
  left: calc(${props => props.position} - (${props => props.size} / 2));
  margin: auto;
  justify-content: center;
  outline: 1px solid transparent;
  padding: 0;
  position: absolute;
  top: 0;
  width: ${props => props.size};
  z-index: 1;
  &:active,
  &:focus {
    cursor: ${props => props['aria-disabled'] ? "not-allowed" : "grabbing"};
  }
  &:focus {
    outline: 1px auto blue;
  }
`;

const StyledSliderThumbLabel = styled.div`
  align-items: center;
  display: inline-flex;
  height: 100%;
  font-size: 0.875em;
  justify-content: center;
  text-align: center;
`;

const StyledSliderThumbLabelWithValueText = styled(StyledSliderThumbLabel).attrs(props => ({
  background: "#E900FF",
}))`
  align-items: flex-end;
  flex-direction: column;
  height: auto;
  transform: translateY(2.25em);
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    border-bottom: 0.5em solid ${props => props.background};
  }
  span {
    background-color: ${props => props.background};
    border-radius: 0.25em;
    padding: 0.125em 0.25em;
  }
`;

const SliderThumbComponent = ({elementAttributes, position}) => {
  return (
    <StyledSliderThumb {...elementAttributes} position={position}>
      {elementAttributes['aria-valuetext'] ? (
        <StyledSliderThumbLabelWithValueText>
          <span>{elementAttributes['aria-valuetext']}</span>
        </StyledSliderThumbLabelWithValueText>
      ) : (
        <StyledSliderThumbLabel>{elementAttributes['aria-valuenow']}</StyledSliderThumbLabel>
      )}
    </StyledSliderThumb>
  )
}

const MemoizedSliderThumbComponent = React.memo(SliderThumbComponent);

export const SliderComponent = ({
  storyProps, 
  getRootProps, 
  getTrackProps, 
  getThumbProps
}: any) => {
  const computeThumbPosition = (newValue: number) => {
    // console.log("👋 Slider value changed!", newValue);
    // console.log("👋 Range max:", storyProps.max);
    // Compute thumb position based on how much of the maximum value percentage it is
    const percentage = (newValue / storyProps.max) * 100;
    const test2 = `${percentage}%`;
    // console.log("test2", test2);
    return test2;
  }

  const [thumb1Position, setThumb1Position] = useState(computeThumbPosition(storyProps.defaultValue[0]));
  const [thumb2Position, setThumb2Position] = useState(computeThumbPosition(storyProps.defaultValue[1]));

  const handleThumb1ValueChange = (event: any) => {
    console.log('handleThumb1ValueChange', event.target.ariaValueNow);
    const newThumb1Position = computeThumbPosition(event.target.ariaValueNow);
    setThumb1Position(newThumb1Position);
  }

  const handleThumb2ValueChange = (event: any) => {
    const newThumb2Position = computeThumbPosition(event.target.ariaValueNow);
    setThumb2Position(newThumb2Position);
  }

  useEffect(() => {
    setThumb1Position(computeThumbPosition(storyProps.defaultValue[0]));
    setThumb2Position(computeThumbPosition(storyProps.defaultValue[1]));
  }, [storyProps.defaultValue]);

  return (
    <StyledSliderWrapper {...getRootProps()}>
      <span>{storyProps.min}</span>
      <StyledSliderTrack
        {...getTrackProps({
          // onClick: 
        })} 
        fillStart={thumb1Position} 
        fillEnd={thumb2Position}
      >
        <MemoizedSliderThumbComponent 
          elementAttributes={getThumbProps({
            index: 0, 
            'aria-label': 'Minimum value', 
            onKeyDown: handleThumb1ValueChange
          })} 
          position={thumb1Position} 
        />
        <MemoizedSliderThumbComponent 
          elementAttributes={getThumbProps({
            index: 1, 
            'aria-label': 'Maximum value', 
            onKeyDown: handleThumb2ValueChange
          })} 
          position={thumb2Position} 
        />

      </StyledSliderTrack>
      <span>{storyProps.max}</span>
    </StyledSliderWrapper>
  );
};