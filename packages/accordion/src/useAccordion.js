/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { composeEventHandlers, generateId, KEY_CODES } from '@zendeskgarden/container-utilities';

const HOOK_ID = 'accordion';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function useAccordion({
  idPrefix,
  expandedSections = [],
  expandable = true,
  collapsible = true
} = {}) {
  const [prefix] = useState(idPrefix || generateId('garden-field-container'));
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;
  const [expandedState, setExpandedState] = useState(expandedSections);
  const [disabledState, setDisabledState] = useState(collapsible ? [] : expandedSections);
  const sections = [];
  const toggle = index => {
    const expanded = [];
    const disabled = [];

    sections.forEach(section => {
      let isExpanded = false;

      if (section === index) {
        isExpanded = collapsible ? expandedState.indexOf(section) === -1 : true;
      } else if (expandable) {
        isExpanded = expandedState.indexOf(section) !== -1;
      }

      if (isExpanded) {
        expanded.push(section);

        if (!collapsible) {
          disabled.push(section);
        }
      }
    });

    setExpandedState(expanded);
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
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
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
      'aria-expanded': expandedState.indexOf(index) !== -1,
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
      'aria-hidden': expandedState.indexOf(index) === -1,
      'aria-labelledby': `${TRIGGER_ID}:${index}`,
      ...props
    };
  };

  return {
    getHeaderProps,
    getTriggerProps,
    getPanelProps,
    expandedSections: expandedState,
    disabledSections: disabledState
  };
}
