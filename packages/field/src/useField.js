/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { generateId } from './utils/IdManager';

export function useField(idPrefix) {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const inputId = `${prefix}--input`;
  const labelId = `${prefix}--label`;
  const hintId = `${prefix}--hint`;

  const getLabelProps = ({ id = labelId, htmlFor = inputId, ...other } = {}) => {
    return {
      id,
      htmlFor,
      ...other
    };
  };

  const getInputProps = ({ id = inputId, ...other } = {}, { isDescribed = false } = {}) => {
    return {
      id,
      'aria-labelledby': labelId,
      'aria-describedby': isDescribed ? hintId : null,
      ...other
    };
  };

  const getHintProps = ({ id = hintId, ...other } = {}) => {
    return {
      id,
      ...other
    };
  };

  return {
    getLabelProps,
    getInputProps,
    getHintProps
  };
}
