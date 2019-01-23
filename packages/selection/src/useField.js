/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import IdManager from './utils/IdManager';
import useControlledState from './useControlled';

export default function useField(userID) {
  const id = userID || IdManager.generateId('garden-field-container');
  const [controlledState] = useControlledState({ id });

  const retrieveInputId = () => `${controlledState.id}--input`;

  const retrieveLabelId = () => `${controlledState.id}--label`;

  const retrieveHintId = () => `${controlledState.id}--hint`;

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

  const getMessageProps = props => {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable no-console */
      console.warn(
        'Warning: the `getMessageProps` render prop is deprecated. It will be removed in an upcoming major release.'
      );
      /* eslint-enable */
    }

    return props;
  };

  return {
    getLabelProps,
    getInputProps,
    getHintProps,
    getMessageProps
  };
}
