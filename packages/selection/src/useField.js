/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import IdManager from './utils/IdManager';
import useControlledState from './useControlled';

export default function useField(idPrefix) {
  const id = idPrefix || IdManager.generateId('garden-field-container');

  const retrieveInputId = () => `${id}--input`;

  const retrieveLabelId = () => `${id}--label`;

  const retrieveHintId = () => `${id}--hint`;

  const getLabelProps = ({
    id = retrieveLabelId(),
    htmlFor = retrieveInputId(),
    ...other
  } = {}) => {
    return {
      id,
      htmlFor,
      ...other
    };
  };

  const getInputProps = (
    { id = retrieveInputId(), ...other } = {},
    { isDescribed = false } = {}
  ) => {
    return {
      id,
      'aria-labelledby': retrieveLabelId(),
      'aria-describedby': isDescribed ? retrieveHintId() : null,
      ...other
    };
  };

  const getHintProps = ({ id = retrieveHintId(), ...other } = {}) => {
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
