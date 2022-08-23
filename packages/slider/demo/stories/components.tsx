/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { ISliderThumbProps } from '../../src/types';
  
const StyledSliderThumb = styled.div`
  background-color: pink;
  border-radius: 50%;
  cursor: pointer;
  height: 44px;
  outline: transparent;
  width: 44px;
  &:focus {
    outline: 1px auto blue;
  }
`;

export const Slider = (props: any) => {
  const {thumbs} = props
  console.log("thumbs:", thumbs);
  return (
    <div>
      {thumbs.map((thumb: ISliderThumbProps) => <StyledSliderThumb {...thumb} />)}
    </div>
  );
};