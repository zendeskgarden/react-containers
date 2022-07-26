/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useMemo } from 'react';
import { useUIDSeed } from 'react-uid';

import { IUseFieldPropGetters } from './types';

export function useField(idPrefix?: string): IUseFieldPropGetters {
  const seed = useUIDSeed();
  const prefix = useMemo(() => idPrefix || seed(`field_${PACKAGE_VERSION}`), [idPrefix, seed]);
  const inputId = `${prefix}--input`;
  const labelId = `${prefix}--label`;
  const hintId = `${prefix}--hint`;
  const messageId = `${prefix}--message`;

  const getLabelProps = ({ id = labelId, htmlFor = inputId, ...other } = {}) => {
    return {
      id,
      htmlFor,
      'data-garden-container-id': 'containers.field',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    } as any;
  };

  const getInputProps = (
    { id = inputId, ...other } = {},
    { isDescribed = false, hasMessage = false } = {}
  ) => {
    return {
      id,
      'aria-labelledby': labelId,
      'aria-describedby':
        isDescribed || hasMessage
          ? ([] as string[])
              .concat(isDescribed ? hintId : [], hasMessage ? messageId : [])
              .join(' ')
          : null,
      ...other
    } as any;
  };

  const getHintProps = ({ id = hintId, ...other } = {}) => {
    return {
      id,
      ...other
    } as any;
  };

  const getMessageProps = ({ id = messageId, ...other } = {}) => {
    return {
      id,
      ...other
    } as any;
  };

  return {
    getLabelProps,
    getInputProps,
    getHintProps,
    getMessageProps
  };
}
