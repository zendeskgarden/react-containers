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
  sections = [],
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
    defaultExpandedSections || sections.slice(0, 1)
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

  const getHeaderProps = useCallback<IUseAccordionReturnValue<any>['getHeaderProps']>(
    ({ role = 'heading', 'aria-level': ariaLevel, ...props }) => ({
      role: role === null ? undefined : role,
      'aria-level': ariaLevel,
      'data-garden-container-id': 'containers.accordion',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    }),
    []
  );

  const getTriggerProps = useCallback<IUseAccordionReturnValue<any>['getTriggerProps']>(
    ({ value, role = 'button', tabIndex = 0, ...props }) => ({
      id: `${TRIGGER_ID}:${value}`,
      role: role === null ? undefined : role,
      tabIndex,
      'aria-controls': `${PANEL_ID}:${value}`,
      'aria-disabled': disabledState.includes(value) || undefined,
      'aria-expanded': internalExpandedState.includes(value),
      onClick: composeEventHandlers(props.onClick, () => toggle(value)),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event: KeyboardEvent) => {
        if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.ENTER) {
          toggle(value);
          event.preventDefault();
        }
      }),
      ...props
    }),
    [PANEL_ID, TRIGGER_ID, internalExpandedState, disabledState, toggle]
  );

  const getPanelProps = useCallback<IUseAccordionReturnValue<any>['getPanelProps']>(
    ({ value, role = 'region', ...props }) => ({
      id: `${PANEL_ID}:${value}`,
      role: role === null ? undefined : role,
      'aria-hidden': !internalExpandedState.includes(value),
      'aria-labelledby': `${TRIGGER_ID}:${value}`,
      ...props
    }),
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
