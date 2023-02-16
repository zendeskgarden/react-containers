/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useMemo } from 'react';
import { useId } from '@zendeskgarden/container-utilities';
import { IUseFieldProps, IUseFieldReturnValue } from './types';

export const useField = ({
  idPrefix,
  hasHint,
  hasMessage
}: IUseFieldProps): IUseFieldReturnValue => {
  const prefix = useId(idPrefix);
  const inputId = `${prefix}--input`;
  const labelId = `${prefix}--label`;
  const hintId = `${prefix}--hint`;
  const messageId = `${prefix}--message`;

  const getLabelProps = useCallback<IUseFieldReturnValue['getLabelProps']>(
    ({ id = labelId, htmlFor = inputId, ...other } = {}) => ({
      'data-garden-container-id': 'containers.field.label',
      'data-garden-container-version': PACKAGE_VERSION,
      id,
      htmlFor,
      ...other
    }),
    [labelId, inputId]
  );

  const getHintProps = useCallback<IUseFieldReturnValue['getInputProps']>(
    ({ id = hintId, ...other } = {}) => ({
      'data-garden-container-id': 'containers.field.hint',
      'data-garden-container-version': PACKAGE_VERSION,
      id,
      ...other
    }),
    [hintId]
  );

  const getInputProps = useCallback<IUseFieldReturnValue['getInputProps']>(
    ({ id = inputId, ...other } = {}) => {
      const describedBy = [];

      if (hasHint) {
        describedBy.push(hintId);
      }

      if (hasMessage) {
        describedBy.push(messageId);
      }

      return {
        'data-garden-container-id': 'containers.field.input',
        'data-garden-container-version': PACKAGE_VERSION,
        id,
        'aria-labelledby': labelId,
        'aria-describedby': describedBy ? describedBy.join(' ') : undefined,
        ...other
      };
    },
    [inputId, labelId, hintId, messageId, hasHint, hasMessage]
  );

  const getMessageProps = useCallback<IUseFieldReturnValue['getMessageProps']>(
    ({ id = messageId, role = 'alert', ...other } = {}) => ({
      'data-garden-container-id': 'containers.field.message',
      'data-garden-container-version': PACKAGE_VERSION,
      role: role === null ? undefined : role,
      id,
      ...other
    }),
    [messageId]
  );

  return useMemo<IUseFieldReturnValue>(
    () => ({
      getLabelProps,
      getHintProps,
      getInputProps,
      getMessageProps
    }),
    [getLabelProps, getHintProps, getInputProps, getMessageProps]
  );
};
