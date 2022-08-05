/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseSliderProps, IUseSliderReturnValue } from './types';

export const useSlider = ({ title }: IUseSliderProps): IUseSliderReturnValue => {
  const getSliderProps: IUseSliderReturnValue['getSliderProps'] = ({
    role = 'region',
    ...props
  }) => ({
    role: role === null ? undefined : role,
    title,
    'data-garden-container-id': 'containers.slider',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    getSliderProps
  };
};
