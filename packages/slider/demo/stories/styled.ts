/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { css } from 'styled-components';

import { IStyledElementProps } from './types';

const THUMB_COLOR = '#FDCA40';
const TRACK_COLOR = '#542E71';
const DISABLED_COLOR = '#A799B7';
const FOCUS_COLOR = '#fb3640';
const CURRENT_COLOR = '#222831';
const BASE_COLOR = '#fff';

const isRTL = (props: IStyledElementProps) => props.dir === 'rtl';
const isNonInteractive = (props: IStyledElementProps) =>
  !!(props['aria-disabled'] || props['aria-readonly']);

const computeThumbPosition = (value: number, max: number): string => `${(value / max) * 100}%`;

const calculateCursor = (props: IStyledElementProps, type: 'default' | 'grab' = 'default') => css`
  cursor: ${isNonInteractive(props) ? 'not-allowed' : type};
`;

const calculateThumbCursor = (props: IStyledElementProps) => calculateCursor(props, 'grab');

const calculateThumbBackground = (props: IStyledElementProps) => css`
  background: ${isNonInteractive(props) ? DISABLED_COLOR : THUMB_COLOR};
`;

const calculateThumbDimensions = (props: IStyledElementProps) => {
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
    ${positionRule}
    box-sizing: border-box;
    padding: 0;
    margin: auto;
  `;
};

const calculateTrackGradient = (props: IStyledElementProps) => {
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

  return `
    linear-gradient(
      ${direction},
      ${BASE_COLOR} 0%,
      ${BASE_COLOR} ${fillStart},
      ${trackColor} ${fillStart},
      ${trackColor} ${fillEnd},
      ${BASE_COLOR} ${fillEnd},
      ${BASE_COLOR} 100%
    )
  `.trim();
};

export const StyledSliderWrapper = styled.div<IStyledElementProps>`
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: 50vw;
  color: ${CURRENT_COLOR};
`;

export const StyledSliderTrack = styled.div.attrs(props => ({
  // When the slider is sliding via a mouse event, styled-components updates the background property a whole bunch of times.
  // When this property existed inside of the class, styled-components gave a warning in the dev console that it was generating too many classes.
  // They were the ones who (in the warning) recommended taking the Styled Objects approach here.
  // @see {@link https://styled-components.com/docs/advanced#style-objects|Style Objects}
  style: {
    background: calculateTrackGradient(props as any)
  }
}))<IStyledElementProps>`
  box-sizing: border-box;
  display: block;
  position: relative;
  height: 1.5em;
  width: min(30em, 100%);
  margin: 0.5em 0;
  font-size: 16px;
  border: 1px solid currentColor;
  border-radius: 50em;

  ${calculateCursor}
`;

export const StyledSliderThumb = styled.div<IStyledElementProps>`
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  outline: 1px solid transparent;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-size: 1em;
  user-select: none;

  ${calculateThumbBackground}
  ${calculateThumbDimensions}
  ${calculateThumbCursor}

  &:focus {
    box-shadow: 0 0 0 0.125em ${BASE_COLOR}, 0 0 0 0.25em ${FOCUS_COLOR};
    outline: 1px solid transparent;
  }
`;

export const StyledSliderThumbLabel = styled.div<IStyledElementProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  font-size: 0.875em;
  pointer-events: none;
`;
