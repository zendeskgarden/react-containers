/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { composeEventHandlers } from './utils/composeEventHandlers';
import { generateId } from './utils/IdManager';

export function useSection({ idPrefix, expanded = false, disabled = false, onToggle } = {}) {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const triggerId = `${prefix}--trigger`;
  const panelId = `${prefix}--panel`;

  const getHeaderProps = ({ role = 'heading', ariaLevel, ...props } = {}) => {
    if (ariaLevel === undefined) {
      throw new Error(
        'Accessibility Error: You must apply the `ariaLevel` prop to the element that contains your heading.'
      );
    }

    return {
      role,
      'aria-level': ariaLevel,
      ...props
    };
  };

  const getTriggerProps = ({ role = 'button', ...props } = {}) => {
    return {
      id: triggerId,
      role,
      'aria-controls': panelId,
      'aria-disabled': disabled,
      'aria-expanded': expanded,
      onClick: composeEventHandlers(props.onClick, onToggle),
      ...props
    };
  };

  const getPanelProps = ({ role = 'region', ...props } = {}) => {
    return {
      id: panelId,
      role,
      'aria-hidden': !expanded,
      'aria-labelledby': triggerId,
      ...props
    };
  };

  return {
    expanded,
    disabled,
    getHeaderProps,
    getTriggerProps,
    getPanelProps
  };
}
