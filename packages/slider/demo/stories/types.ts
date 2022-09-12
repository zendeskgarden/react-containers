/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, ReactNode } from 'react';
import { IUseSliderProps } from '@zendeskgarden/container-slider';

export interface IArgs extends IUseSliderProps {
  as: 'hook' | 'container';
}

export interface IStyledElementProps extends HTMLProps<HTMLDivElement> {
  thumbs?: number[];
  sliderMax?: number;
  dir: 'rtl' | 'ltr';
  children?: ReactNode | ReactNode[];
}
