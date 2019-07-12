/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { generateId } from '@zendeskgarden/container-utilities';

const HOOK_ID = 'field';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function useField(idPrefix) {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const inputId = `${prefix}--input`;
  const labelId = `${prefix}--label`;
  const hintId = `${prefix}--hint`;

  const getLabelProps = ({ id = labelId, htmlFor = inputId, ...other } = {}) => {
    return {
      id,
      htmlFor,
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
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
