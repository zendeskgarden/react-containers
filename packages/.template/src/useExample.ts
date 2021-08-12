/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';

export interface IUseExampleProps {
  /** Documents the label prop */
  label?: string;
}

export interface IUseExampleReturnValue {
  getExampleProps: <T>(options?: T & HTMLProps<any>) => any;
}

export function useExample({ label }: IUseExampleProps = {}): IUseExampleReturnValue {
  const [ariaLabel] = useState(label);

  const getExampleProps = ({ role = 'region', ...props }: HTMLProps<any> = {}) => ({
    role,
    'aria-label': ariaLabel,
    'data-garden-container-id': 'containers.example',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    getExampleProps
  };
}
