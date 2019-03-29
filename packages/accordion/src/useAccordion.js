/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { generateId } from './utils/IdManager';
import { composeEventHandlers } from './utils/composeEventHandlers';

export function useAccordion({ key, expanded }) {
  const [isExpanded, setExpanded] = useState(expanded);
  const [prefix] = useState(key || generateId('garden-accordion-container'));
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

  const getTriggerProps = ({
    id = triggerId,
    role = 'button',
    disabled = false,
    ...props
  } = {}) => {
    const onClick = () => {
      if (!disabled) {
        setExpanded(!isExpanded);
      }
    };

    return {
      id,
      role,
      'aria-controls': panelId,
      'aria-disabled': disabled,
      'aria-expanded': isExpanded,
      onClick: composeEventHandlers(props.onClick, onClick),
      ...props
    };
  };

  const getPanelProps = ({ id = panelId, role = 'region', ...props } = {}) => {
    return {
      id,
      role,
      'aria-hidden': !isExpanded,
      'aria-labelledby': triggerId,
      ...props
    };
  };

  return {
    getHeaderProps,
    getTriggerProps,
    getPanelProps,
    expanded: isExpanded
  };
}
