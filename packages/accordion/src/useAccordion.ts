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

import {
  IUseAccordionProps,
  IUseAccordionReturnValue,
  IHeaderProps,
  ITriggerProps,
  IPanelProps
} from './types';

export function useAccordion({
  idPrefix,
  sections,
  expandedSections,
  defaultExpandedSections,
  onChange,
  expandable = true,
  collapsible = true
}: IUseAccordionProps = {}): IUseAccordionReturnValue {
  const prefix = useId(idPrefix);
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;

  const isControlled = expandedSections !== null && expandedSections !== undefined;
  const [expandedState, setExpandedState] = useState<number[]>(defaultExpandedSections || [0]);
  const [disabledState, setDisabledState] = useState(collapsible ? [] : expandedState);
  const internalExpandedState = getControlledValue(expandedSections, expandedState)!;

  const toggle = useCallback(
    (index: number) => {
      const expanded: number[] = [];
      const disabled: number[] = [];

      sections!.forEach(sectionIndex => {
        let isExpanded = false;

        if (sectionIndex === index) {
          isExpanded = collapsible ? expandedState.indexOf(sectionIndex) === -1 : true;
        } else if (expandable) {
          isExpanded = expandedState.indexOf(sectionIndex) !== -1;
        }

        if (isExpanded) {
          expanded.push(sectionIndex);

          if (!collapsible) {
            disabled.push(sectionIndex);
          }
        }
      });

      if (onChange) {
        onChange(index);
      }

      if (isControlled === false) {
        setExpandedState(expanded);
      }

      setDisabledState(disabled);
    },
    [sections, expandedState, collapsible, expandable, isControlled, onChange]
  );

  const getHeaderProps = useCallback(
    ({ role = 'heading', ariaLevel, ...props }: IHeaderProps = {}) => {
      if (ariaLevel === undefined) {
        throw new Error(
          'Accessibility Error: You must apply the `ariaLevel` prop to `getHeaderProps()`'
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
    ({ index, role = 'button', tabIndex = 0, ...props }: ITriggerProps = {}) => {
      if (index === undefined) {
        throw new Error(
          'Accessibility Error: You must provide an `index` option to `getTriggerProps()`'
        );
      }

      return {
        id: `${TRIGGER_ID}:${index}`,
        role,
        tabIndex,
        'aria-controls': `${PANEL_ID}:${index}`,
        'aria-disabled': disabledState.includes(index),
        'aria-expanded': internalExpandedState.includes(index),
        onClick: composeEventHandlers(props.onClick, () => toggle(index)),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event: KeyboardEvent) => {
          if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.ENTER) {
            toggle(index);
            event.preventDefault();
          }
        }),
        ...props
      };
    },
    [PANEL_ID, TRIGGER_ID, internalExpandedState, disabledState, toggle]
  );

  const getPanelProps = useCallback(
    ({ index, role = 'region', ...props }: IPanelProps = {}) => {
      if (index === undefined) {
        throw new Error(
          'Accessibility Error: You must provide an `index` option to `getPanelProps()`'
        );
      }

      return {
        id: `${PANEL_ID}:${index}`,
        role,
        'aria-hidden': !internalExpandedState.includes(index),
        'aria-labelledby': `${TRIGGER_ID}:${index}`,
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
