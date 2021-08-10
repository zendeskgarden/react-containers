/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';

export interface IUseExampleProps {
  /** Documents the cool prop */
  coolProp?: string;
}

interface ICoolProps extends HTMLProps<any> {
  ariaLabel?: string;
}

export interface IUseExampleReturnValue {
  getCoolProps: <T>(options?: T & ICoolProps) => any;
}

export function useExample({ coolProp }: IUseExampleProps = {}): IUseExampleReturnValue {
  const [label] = useState(coolProp || 'cool');

  const getCoolProps = ({ role = 'region', ariaLabel = label, ...props }: ICoolProps = {}) => ({
    role,
    'aria-label': ariaLabel,
    'data-garden-container-id': 'containers.example',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    getCoolProps
  };
}
