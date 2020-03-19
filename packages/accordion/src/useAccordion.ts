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
  idPrefix?: string;
  expandedSections?: number | number[];
  defaultExpandedSections?: number | number[];
  onChange?: (index: number) => any;
  isCollapsible?: boolean;
  isExpandable?: boolean;
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
  expandedSections: number | number[];
}
export function useAccordion({
  idPrefix,
  expandedSections,
  defaultExpandedSections = 0,
  onChange,
  isCollapsible,
  isExpandable
}: IUseAccordionProps = {}): IUseAccordionReturnValue {
  // eslint-disable-next-line
  const isControlled = expandedSections != null;
  const seed = useUIDSeed();
  const [prefix] = useState<string>(idPrefix || seed(`accordion_${PACKAGE_VERSION}`));
  const TRIGGER_ID = `${prefix}--trigger`;
  const PANEL_ID = `${prefix}--panel`;

  // For uncontrolled usages, the hook depends on the state being an array.
  const [expandedState, setExpandedState] = useState(
    Array.isArray(defaultExpandedSections) ? defaultExpandedSections : [defaultExpandedSections]
  );

  const internalExpandedSections = getControlledValue(expandedSections, expandedState);

  const toggle = (index: number) => {
    if (onChange) {
      onChange(index);
    }

    if (isControlled) {
      return undefined;
    }

    if (isExpandable && isCollapsible) {
      if (internalExpandedSections.includes(index)) {
        setExpandedState(internalExpandedSections.filter((n: number) => n !== index));
      } else {
        setExpandedState([...internalExpandedSections, index]);
      }
    } else if (isExpandable) {
      if (!internalExpandedSections.includes(index)) {
        setExpandedState([...internalExpandedSections, index]);
      } else if (internalExpandedSections.length > 1) {
        setExpandedState(internalExpandedSections.filter((n: number) => n !== index));
      }
    } else if (isCollapsible) {
      if (internalExpandedSections[0] === index) {
        setExpandedState([]);
      } else {
        setExpandedState([index]);
      }
    } else {
      setExpandedState([index]);
    }

    return undefined;
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

    const isExpanded = Array.isArray(internalExpandedSections)
      ? internalExpandedSections.includes(index)
      : internalExpandedSections === index;

    return {
      id: `${TRIGGER_ID}:${index}`,
      role,
      tabIndex,
      'aria-controls': `${PANEL_ID}:${index}`,
      'aria-disabled': isCollapsible ? 'false' : isExpanded,
      'aria-expanded': isExpanded,
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

    const ariaHidden = Array.isArray(internalExpandedSections)
      ? !internalExpandedSections.includes(index)
      : internalExpandedSections !== index;

    return {
      id: `${PANEL_ID}:${index}`,
      role,
      'aria-hidden': ariaHidden,
      'aria-labelledby': `${TRIGGER_ID}:${index}`,
      ...props
    };
  };

  return {
    getHeaderProps,
    getTriggerProps,
    getPanelProps,
    expandedSections: internalExpandedSections
  };
}
