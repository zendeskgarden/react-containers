/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import styled, { css } from 'styled-components';

import { IStyledElement } from './types';

const THUMB_COLOR = '#FDCA40';
const TRACK_COLOR = '#542E71';
const DISABLED_COLOR = '#A799B7';
const FOCUS_COLOR = '#fb3640';
const CURRENT_COLOR = '#222831';
const BASE_COLOR = '#fff';

const isRTL = (props: IStyledElement) => (props.dir === 'rtl' ? 'right' : 'left');
const isNonInteractive = (props: IStyledElement) =>
  props['aria-disabled'] || props['aria-readonly'];

const computeThumbPosition = (value: number, max: number): string => `${(value / max) * 100}%`;

const calculateCursor = (props: IStyledElement, type: 'default' | 'grab' = 'default') => css`
  cursor: ${isNonInteractive(props) ? 'not-allowed' : type};
`;

const calculateThumbCursor = (props: IStyledElement) => calculateCursor(props, 'grab');

const calculateThumbBackground = (props: IStyledElement) => css`
  background: ${isNonInteractive(props) ? DISABLED_COLOR : THUMB_COLOR};
`;

const calculateThumbDimensions = (props: IStyledElement) => {
  const { sliderMax = 10 } = props;

  const position = computeThumbPosition(props['aria-valuenow'] as number, sliderMax);
  const direction = isRTL(props) ? 'right' : 'left';
  const size = '2.75em';

  const positionRule = `${direction}: calc(${position} - (${size} / 2));`;

  return css`
    height: ${size};
    width: ${size};
    position: absolute;
    bottom: 0;
    top: 0;
    padding: 0;
    margin: auto;
    font-size: 1em;
    ${positionRule}
  `;
};

const calculateTrackGradient = (props: IStyledElement) => {
  const { thumbs = [], sliderMax = 10 } = props;

  const direction = isRTL(props) ? '-90deg' : '90deg';
  const trackColor = isNonInteractive(props) ? DISABLED_COLOR : TRACK_COLOR;

  let fillStart = '';
  let fillEnd = '';

  if (thumbs.length > 1) {
    fillStart = computeThumbPosition(thumbs[0], sliderMax);
    fillEnd = computeThumbPosition(thumbs[thumbs.length - 1], sliderMax);
  } else {
    fillStart = '0%';
    fillEnd = computeThumbPosition(thumbs[0] || 0, sliderMax);
  }

  return css`
    background: linear-gradient(
      ${direction},
      ${BASE_COLOR} 0%,
      ${BASE_COLOR} ${fillStart},
      ${trackColor} ${fillStart},
      ${trackColor} ${fillEnd},
      ${BASE_COLOR} ${fillEnd},
      ${BASE_COLOR} 100%
    );
  `;
};

export const StyledSliderWrapper = styled.div<IStyledElement>`
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: 50vw;
  color: ${CURRENT_COLOR};
`;

export const StyledSliderTrack = styled.div<IStyledElement>`
  box-sizing: border-box;
  display: block;
  position: relative;
  height: 1.5em;
  width: min(30em, 100%);
  margin: 0.5em 0;
  font-size: 16px;
  border: 1px solid currentColor;
  border-radius: 50em;

  ${calculateTrackGradient}
  ${calculateCursor}
`;

export const StyledSliderThumb = styled.div<IStyledElement>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  outline: 1px solid transparent;
  border: 1px solid currentColor;
  border-radius: 50%;
  user-select: none;

  ${calculateThumbBackground}
  ${calculateThumbDimensions}
  ${calculateThumbCursor}

  &:focus {
    box-shadow: 0 0 0 0.125em ${BASE_COLOR}, 0 0 0 0.25em ${FOCUS_COLOR};
    outline: 1px solid transparent;
  }
`;

export const StyledSliderThumbLabel = styled.div<IStyledElement>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  font-size: 0.875em;
  pointer-events: none;
`;

export const Wrapper = (props: any) => {
  return <StyledSliderWrapper {...props} />;
};

export const Track = (props: any) => {
  return <StyledSliderTrack {...props} />;
};

export const Thumb = ({ max, index, ...props }: any) => {
  return (
    <StyledSliderThumb key={index} sliderMax={max} {...props}>
      <StyledSliderThumbLabel>{props['aria-valuenow']}</StyledSliderThumbLabel>
    </StyledSliderThumb>
  );
};
