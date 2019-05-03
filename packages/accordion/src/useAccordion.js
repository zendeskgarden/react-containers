/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useReducer } from 'react';
import { useSection } from './useSection';

export function useAccordion({
  expandedSections = [],
  expandable = true,
  collapsible = true
} = {}) {
  const reducer = (state, action) => {
    const retVal = [];

    action.sections.forEach(section => {
      let expanded = false;

      if (section === action.section) {
        expanded = collapsible ? state.indexOf(section) === -1 : true;
      } else if (expandable) {
        expanded = state.indexOf(section) !== -1;
      }

      if (expanded) {
        retVal.push(section);
      }
    });

    return retVal;
  };
  const [state, dispatch] = useReducer(reducer, expandedSections);
  const sections = [];

  const Section = ({ section, idPrefix } = {}) => {
    if (section === undefined) {
      throw new Error(
        'Accessibility Error: You must provide a `section` option to `getSectionProps()`'
      );
    }

    const expanded = state.indexOf(section) !== -1;
    const disabled = expanded && !collapsible;

    sections.push(section);

    return useSection({
      idPrefix,
      expanded,
      disabled,
      onToggle: () => dispatch({ section, sections })
    });
  };

  return { getSectionProps: Section };
}
