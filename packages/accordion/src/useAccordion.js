/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import {
  composeEventHandlers,
  generateId,
  KEY_CODES,
  getControlledValue
} from '@zendeskgarden/container-utilities';

export function useAccordion({
  idPrefix,
  expandedSections,
  onChange,
  expandable = true,
  collapsible = true
} = {}) {
  const [prefix] = useState(idPrefix || generateId('garden-accordion-container'));
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;
  const [expandedState, setExpandedState] = useState(expandedSections || []);

  const controlledExpandedState = getControlledValue(onChange && expandedSections, expandedState);

  const [disabledState, setDisabledState] = useState(collapsible ? [] : controlledExpandedState);

  const sections = [];
  const toggle = index => {
    const expanded = [];
    const disabled = [];

    sections.forEach(section => {
      let isExpanded = false;

      if (section === index) {
        isExpanded = collapsible ? controlledExpandedState.indexOf(section) === -1 : true;
      } else if (expandable) {
        isExpanded = controlledExpandedState.indexOf(section) !== -1;
      }

      if (isExpanded) {
        expanded.push(section);

        if (!collapsible) {
          disabled.push(section);
        }
      }
    });

    if (onChange) {
      onChange(expanded);
    } else {
      setExpandedState(expanded);
    }

    setDisabledState(disabled);
  };

  const getHeaderProps = ({ role = 'heading', ariaLevel, ...props } = {}) => {
    if (ariaLevel === undefined) {
      throw new Error(
        'Accessibility Error: You must apply the `ariaLevel` prop to the element that contains your heading.'
      );
    }

    return {
      role,
      'aria-level': ariaLevel,
      'data-garden-container-id': 'accordion',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  const getTriggerProps = ({ index, role = 'button', tabIndex = 0, ...props } = {}) => {
    if (index === undefined) {
      throw new Error(
        'Accessibility Error: You must provide an `index` option to `getTriggerProps()`'
      );
    }

    sections.push(index);

    return {
      id: `${TRIGGER_ID}:${index}`,
      role,
      tabIndex,
      'aria-controls': `${PANEL_ID}:${index}`,
      'aria-disabled': disabledState.indexOf(index) !== -1,
      'aria-expanded': controlledExpandedState.indexOf(index) !== -1,
      onClick: composeEventHandlers(props.onClick, () => toggle(index)),
      onKeyDown: composeEventHandlers(props.onKeyDown, event => {
        if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.ENTER) {
          toggle(index);
          event.preventDefault();
        }
      }),
      ...props
    };
  };

  const getPanelProps = ({ index, role = 'region', ...props } = {}) => {
    if (index === undefined) {
      throw new Error(
        'Accessibility Error: You must provide an `index` option to `getSectionProps()`'
      );
    }

    return {
      id: `${PANEL_ID}:${index}`,
      role,
      'aria-hidden': controlledExpandedState.indexOf(index) === -1,
      'aria-labelledby': `${TRIGGER_ID}:${index}`,
      ...props
    };
  };

  return {
    getHeaderProps,
    getTriggerProps,
    getPanelProps,
    expandedSections: controlledExpandedState,
    disabledSections: disabledState
  };
}
