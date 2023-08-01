/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, useMemo, useCallback } from 'react';
import {
  KEY_CODES,
  composeEventHandlers,
  getControlledValue,
  useId
} from '@zendeskgarden/container-utilities';

import { IUseAccordionProps, IUseAccordionReturnValue } from './types';

export function useAccordion<Value>({
  idPrefix,
  sections,
  expandedSections,
  defaultExpandedSections,
  onChange = () => undefined,
  expandable = true,
  collapsible = true
}: IUseAccordionProps<Value>): IUseAccordionReturnValue<Value> {
  const prefix = useId(idPrefix);
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;

  const isControlled = expandedSections !== null && expandedSections !== undefined;
  const [expandedState, setExpandedState] = useState<Value[]>(
    defaultExpandedSections || expandedSections || sections.slice(0, 1)
  );
  const [disabledState, setDisabledState] = useState(collapsible ? [] : expandedState);
  const internalExpandedState = getControlledValue(expandedSections, expandedState)!;

  const toggle = useCallback(
    (value: Value) => {
      const expanded: Value[] = [];
      const disabled: Value[] = [];

      sections.forEach(sectionValue => {
        let isExpanded = false;

        if (sectionValue === value) {
          isExpanded = collapsible ? internalExpandedState.includes(sectionValue) === false : true;
        } else if (expandable) {
          isExpanded = internalExpandedState.includes(sectionValue);
        }

        if (isExpanded) {
          expanded.push(sectionValue);

          if (!collapsible) {
            disabled.push(sectionValue);
          }
        }
      });

      onChange(value);

      if (isControlled === false) {
        setExpandedState(expanded);
      }

      setDisabledState(disabled);
    },
    [sections, internalExpandedState, collapsible, expandable, isControlled, onChange]
  );

  const getHeaderProps = useCallback(
    ({ role = 'heading', 'aria-level': ariaLevel, ...props } = {}) => {
      if (ariaLevel === undefined) {
        throw new Error(
          'Accessibility Error: You must apply the `aria-level` prop to `getHeaderProps()`'
        );
      }

      return {
        role,
        'aria-level': ariaLevel,
        'data-garden-container-id': 'containers.accordion',
        'data-garden-container-version': PACKAGE_VERSION,
        ...props
      };
    },
    []
  );

  const getTriggerProps = useCallback(
    ({ value, role = 'button', tabIndex = 0, ...props } = {}) => {
      if (value === undefined) {
        throw new Error(
          'Accessibility Error: You must provide an `value` option to `getTriggerProps()`'
        );
      }

      return {
        id: `${TRIGGER_ID}:${value}`,
        role,
        tabIndex,
        'aria-controls': `${PANEL_ID}:${value}`,
        'aria-disabled': disabledState.includes(value) || null,
        'aria-expanded': internalExpandedState.includes(value),
        onClick: composeEventHandlers(props.onClick, () => toggle(value)),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event: KeyboardEvent) => {
          if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.ENTER) {
            toggle(value);
            event.preventDefault();
          }
        }),
        ...props
      };
    },
    [PANEL_ID, TRIGGER_ID, internalExpandedState, disabledState, toggle]
  );

  const getPanelProps = useCallback(
    ({ value, role = 'region', ...props } = {}) => {
      if (value === undefined) {
        throw new Error(
          'Accessibility Error: You must provide an `value` option to `getPanelProps()`'
        );
      }

      return {
        id: `${PANEL_ID}:${value}`,
        role,
        'aria-hidden': !internalExpandedState.includes(value),
        'aria-labelledby': `${TRIGGER_ID}:${value}`,
        ...props
      };
    },
    [PANEL_ID, TRIGGER_ID, internalExpandedState]
  );

  return useMemo(
    () => ({
      getHeaderProps,
      getTriggerProps,
      getPanelProps,
      expandedSections: internalExpandedState,
      disabledSections: disabledState
    }),
    [getHeaderProps, getTriggerProps, getPanelProps, internalExpandedState, disabledState]
  );
}
