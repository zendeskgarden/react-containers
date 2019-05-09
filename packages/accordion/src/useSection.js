/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { composeEventHandlers, generateId } from '@zendeskgarden/container-utilities';

export function useSection({ idPrefix, expanded = false, disabled = false, onToggle } = {}) {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;

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
      id: TRIGGER_ID,
      role,
      'aria-controls': PANEL_ID,
      'aria-disabled': disabled,
      'aria-expanded': expanded,
      onClick: composeEventHandlers(props.onClick, onToggle),
      ...props
    };
  };

  const getPanelProps = ({ role = 'region', ...props } = {}) => {
    return {
      id: PANEL_ID,
      role,
      'aria-hidden': !expanded,
      'aria-labelledby': TRIGGER_ID,
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
