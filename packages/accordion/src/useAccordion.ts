/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState, HTMLProps } from 'react';
import { useUIDSeed } from 'react-uid';
import {
  composeEventHandlers,
  KEY_CODES,
  getControlledValue
} from '@zendeskgarden/container-utilities';

export interface IUseAccordionProps {
  /** Prefixes IDs for the accordion trigger and panels  */
  idPrefix?: string;
  /** Sets the expanded sections in a controlled accordion */
  expandedSections?: number[];
  /** Sets the default expanded sections in a uncontrolled accordion */
  defaultExpandedSections?: number[];
  onChange?: (expanded: number) => any;
  /** Determines if multiple panels can be expanded at the same time in an uncontrolled accordion */
  expandable?: boolean;
  /** Determines if panels can be collapsed in an uncontrolled accordion */
  collapsible?: boolean;
}

interface IHeaderProps extends HTMLProps<any> {
  ariaLevel?: number | null;
  role?: any;
}

interface ITriggerProps extends HTMLProps<any> {
  index?: number;
  role?: any;
  tabIndex?: any;
}

interface IPanelProps extends HTMLProps<any> {
  index?: number;
  role?: any;
}

export interface IUseAccordionPropGetters {
  getHeaderProps: <T>(options?: T & IHeaderProps) => any;
  getTriggerProps: <T>(options?: T & ITriggerProps) => any;
  getPanelProps: <T>(options?: T & IPanelProps) => any;
}

export interface IUseAccordionReturnValue extends IUseAccordionPropGetters {
  expandedSections: number[];
  disabledSections: number[];
}

export function useAccordion({
  idPrefix,
  expandedSections,
  onChange,
  expandable = true,
  collapsible = true,
  defaultExpandedSections
}: IUseAccordionProps = {}): IUseAccordionReturnValue {
  const isControlled = expandedSections !== null && expandedSections !== undefined;
  const seed = useUIDSeed();
  const [prefix] = useState<string>(idPrefix || seed(`accordion_${PACKAGE_VERSION}`));
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;
  const [expandedState, setExpandedState] = useState<number[]>(defaultExpandedSections || [0]);

  const controlledExpandedState = getControlledValue(expandedSections, expandedState)!;

  const [disabledState, setDisabledState] = useState(collapsible ? [] : expandedState);

  const sectionIndices: number[] = [];
  const toggle = (index: number) => {
    const expanded: number[] = [];
    const disabled: number[] = [];

    sectionIndices.forEach(sectionIndex => {
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
  };

  const getHeaderProps = ({ role = 'heading', ariaLevel, ...props }: IHeaderProps = {}) => {
    if (ariaLevel === undefined) {
      throw new Error(
        'Accessibility Error: You must apply the `ariaLevel` prop to the element that contains your heading.'
      );
    }

    return {
      role,
      'aria-level': ariaLevel,
      'data-garden-container-id': 'containers.accordion',
      'data-garden-container-version': PACKAGE_VERSION,
      ...props
    };
  };

  const getTriggerProps = ({
    index,
    role = 'button',
    tabIndex = 0,
    ...props
  }: ITriggerProps = {}) => {
    if (index === undefined) {
      throw new Error(
        'Accessibility Error: You must provide an `index` option to `getTriggerProps()`'
      );
    }

    sectionIndices.push(index);

    return {
      id: `${TRIGGER_ID}:${index}`,
      role,
      tabIndex,
      'aria-controls': `${PANEL_ID}:${index}`,
      'aria-disabled': disabledState.indexOf(index) !== -1,
      'aria-expanded': isControlled
        ? controlledExpandedState.includes(index)
        : expandedState.includes(index),
      onClick: composeEventHandlers(props.onClick, () => toggle(index)),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event: KeyboardEvent) => {
        if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.ENTER) {
          toggle(index);
          event.preventDefault();
        }
      }),
      ...props
    };
  };

  const getPanelProps = ({ index, role = 'region', ...props }: IPanelProps = {}) => {
    if (index === undefined) {
      throw new Error(
        'Accessibility Error: You must provide an `index` option to `getSectionProps()`'
      );
    }

    return {
      id: `${PANEL_ID}:${index}`,
      role,
      'aria-hidden': isControlled
        ? !controlledExpandedState.includes(index)
        : !expandedState.includes(index),
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
