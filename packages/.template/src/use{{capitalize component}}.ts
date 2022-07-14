/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUse{{capitalize component}}Props, IUse{{capitalize component}}ReturnValue } from './types';

export const use{{capitalize component}} = ({ label }: IUse{{capitalize component}}Props): IUse{{capitalize component}}ReturnValue => {
  const get{{capitalize component}}Props: IUse{{capitalize component}}ReturnValue['get{{capitalize component}}Props'] = ({
    role = 'region',
    'aria-label': ariaLabel = label,
    ...props
  }) => ({
    role: role === null ? undefined : role,
    'aria-label': ariaLabel,
    'data-garden-container-id': 'containers.{{snakecase component}}',
    'data-garden-container-version': PACKAGE_VERSION,
    ...props
  });

  return {
    get{{capitalize component}}Props
  };
};
