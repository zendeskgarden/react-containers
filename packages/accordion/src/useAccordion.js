/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { composeEventHandlers, generateId, KEY_CODES } from '@zendeskgarden/container-utilities';

export function useAccordion({
  idPrefix,
  expandedSections = [],
  expandable = true,
  collapsible = true
} = {}) {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;
  const [toggledSections, setToggledSections] = useState({
    expanded: expandedSections,
    disabled: collapsible ? [] : expandedSections
  });
  const sections = [];
  const toggle = index => {
    const state = {
      expanded: [],
      disabled: []
    };

    sections.forEach(section => {
      let expanded = false;

      if (section === index) {
        expanded = collapsible ? toggledSections.expanded.indexOf(section) === -1 : true;
      } else if (expandable) {
        expanded = toggledSections.expanded.indexOf(section) !== -1;
      }

      if (expanded) {
        state.expanded.push(section);

        if (!collapsible) {
          state.disabled.push(section);
        }
      }
    });

    setToggledSections(state);
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
      'aria-disabled': toggledSections.disabled.indexOf(index) !== -1,
      'aria-expanded': toggledSections.expanded.indexOf(index) !== -1,
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
      'aria-hidden': toggledSections.expanded.indexOf(index) === -1,
      'aria-labelledby': `${TRIGGER_ID}:${index}`,
      ...props
    };
  };

  return {
    getHeaderProps,
    getTriggerProps,
    getPanelProps,
    expandedSections: toggledSections.expanded,
    disabledSections: toggledSections.disabled
  };
}
