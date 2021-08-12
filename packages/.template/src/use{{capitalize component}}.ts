/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLProps, useState } from 'react';

export interface IUse{{capitalize component}}Props {
  /** Documents the label prop */
  label?: string;
}

export interface IUse{{capitalize component}}ReturnValue {
  get{{capitalize component}}Props: <T>(options?: T & HTMLProps<any>) => any;
}

export function use{{capitalize component}}({ label }: IUse{{capitalize component}}Props = {}): IUse{{capitalize component}}ReturnValue {
  const [ariaLabel] = useState(label);

  const get{{capitalize component}}Props = ({ role = 'region', ...props }: HTMLProps<any> = {}) => ({
    role,
    'aria-label': ariaLabel,
    'data-garden-container-id': 'containers.{{snakecase component}}',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    get{{capitalize component}}Props
  };
}
