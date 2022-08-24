/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { ISliderThumbProps } from '../../src/types';

const StyledSliderTrack = styled.div`
  background: linear-gradient(
    90deg,
    #FFF 0%,
    #FFF 8%,
    #FBDF07 8%,
    #FBDF07 81%,
    #FFF 81%,
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

const StyledSliderThumb = styled.div.attrs(props => ({
  size: "2.75em",
}))`
  align-items: flex-end;
  background: #F94892;
  border: 1px solid black;
  border-radius: 50%;
  bottom: 0;
  box-sizing: border-box;
  cursor: grab;
  display: inline-flex;
  font-size: 1em;
  height: ${props => props.size};
  left: calc(8% - (${props => props.size} / 2));
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
    cursor: grabbing;
  }
  &:focus {
    outline: 1px auto blue;
  }
`;

const StyledSliderThumbLabel = styled.div`
  align-items: center;
  display: inline-flex; 
  flex-direction: column;
  font-size: 0.875em;
  justify-content: center;
  text-align: center;
  transform: translateY(2.25em);
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    border-bottom: 0.5em solid #89CFFD;
  }
  span {
    background-color: #89CFFD;
    border-radius: 0.25em;
    padding: 0.125em 0.25em;
  }
`;

export const SliderComponent = (props: any) => {
  const {root, track, thumbs} = props;
  console.log("root", root);
  console.log("track", track);
  console.log("thumbs", thumbs);

  return (
    <StyledSliderTrack {...root} {...track}>
      {thumbs.map((thumb: ISliderThumbProps) => (
        <StyledSliderThumb {...thumb}>
          <StyledSliderThumbLabel>
            <span>{thumb['aria-valuetext'] || thumb['aria-valuenow']}</span>
          </StyledSliderThumbLabel>
        </StyledSliderThumb>
      ))}
    </StyledSliderTrack>
  );
};