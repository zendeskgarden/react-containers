/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { generateId } from '@zendeskgarden/container-utilities';

export interface IUseFieldPropGetters {
  getHintProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getLabelProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getInputProps: <T>(
    options?: T,
    isDescribedOptions?: { isDescribed: boolean }
  ) => T & React.HTMLProps<any>;
}

export function useField(idPrefix?: string): IUseFieldPropGetters {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const inputId = `${prefix}--input`;
  const labelId = `${prefix}--label`;
  const hintId = `${prefix}--hint`;

  const getLabelProps = ({ id = labelId, htmlFor = inputId, ...other } = {}) => {
    return {
      id,
      htmlFor,
      'data-garden-container-id': 'containers.field',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    } as any;
  };

  const getInputProps = ({ id = inputId, ...other } = {}, { isDescribed = false } = {}) => {
    return {
      id,
      'aria-labelledby': labelId,
      'aria-describedby': isDescribed ? hintId : null,
      ...other
    } as any;
  };

  const getHintProps = ({ id = hintId, ...other } = {}) => {
    return {
      id,
      ...other
    } as any;
  };

  return {
    getLabelProps,
    getInputProps,
    getHintProps
  };
}
