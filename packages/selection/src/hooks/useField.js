/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { generateId } from '../utils/IdManager';

export function useField(idPrefix) {
  const id = idPrefix || generateId('garden-field-container');

  const retrieveInputId = () => `${id}--input`;

  const retrieveLabelId = () => `${id}--label`;

  const retrieveHintId = () => `${id}--hint`;

  const getLabelProps = ({
    id: labelId = retrieveLabelId(),
    htmlFor = retrieveInputId(),
    ...other
  } = {}) => {
    return {
      id: labelId,
      htmlFor,
      ...other
    };
  };

  const getInputProps = (
    { id: inputId = retrieveInputId(), ...other } = {},
    { isDescribed = false } = {}
  ) => {
    return {
      id: inputId,
      'aria-labelledby': retrieveLabelId(),
      'aria-describedby': isDescribed ? retrieveHintId() : null,
      ...other
    };
  };

  const getHintProps = ({ id: hintId = retrieveHintId(), ...other } = {}) => {
    return {
      id: hintId,
      ...other
    };
  };

  return {
    getLabelProps,
    getInputProps,
    getHintProps
  };
}
