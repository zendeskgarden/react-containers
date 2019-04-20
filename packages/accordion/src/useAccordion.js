/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { composeEventHandlers } from './utils/composeEventHandlers';

export function useAccordion() {
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
    id,
    panelId,
    role = 'button',
    ariaExpanded = false,
    ariaDisabled = false,
    onToggle,
    ...props
  } = {}) => {
    if (id === undefined) {
      throw new Error('Accessibility Error: You must apply an `id` prop to the trigger element.');
    }

    if (panelId === undefined) {
      throw new Error(
        'Accessibility Error: You must apply a `panelId` prop that identifies the panel this trigger controls.'
      );
    }

    return {
      id,
      role,
      'aria-controls': panelId,
      'aria-disabled': ariaDisabled,
      'aria-expanded': ariaExpanded,
      onClick: composeEventHandlers(props.onClick, onToggle),
      ...props
    };
  };

  const getPanelProps = ({ id, triggerId, role = 'region', ariaHidden = true, ...props } = {}) => {
    if (id === undefined) {
      throw new Error('Accessibility Error: You must apply an `id` prop to the panel element.');
    }

    if (triggerId === undefined) {
      throw new Error(
        'Accessibility Error: You must apply a `triggerId` prop that identifies the trigger this panel is labeled by.'
      );
    }

    return {
      id,
      role,
      'aria-hidden': !ariaHidden,
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
