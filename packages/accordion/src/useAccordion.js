/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { generateId } from './utils/IdManager';

export function useAccordion({ accordionId }) {
  const [prefix] = useState(accordionId || generateId('garden-accordion-container'));
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
    ariaDisabled = false,
    ariaExpanded = false,
    ...props
  } = {}) => {
    return {
      id,
      role,
      'aria-controls': panelId,
      'aria-disabled': ariaDisabled,
      'aria-expanded': ariaExpanded,
      ...props
    };
  };

  const getPanelProps = ({ id = panelId, role = 'region', ariaHidden = true, ...props } = {}) => {
    return {
      id,
      role,
      'aria-hidden': ariaHidden,
      'aria-labelledby': triggerId,
      ...props
    };
  };

  return {
    getHeaderProps,
    getTriggerProps,
    getPanelProps
  };
}
