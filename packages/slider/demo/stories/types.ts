/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLAttributes } from 'react';
import { IUseSliderProps } from '@zendeskgarden/container-slider';

export interface IArgs extends IUseSliderProps {
  as: 'hook' | 'container';
}

export interface IStyledElement extends HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element | JSX.Element[] | string | number;
  thumbs?: number[];
  sliderMax?: number;
}
