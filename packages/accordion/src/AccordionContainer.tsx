/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useAccordion, IUseAccordionProps, IUseAccordionReturnValue } from './useAccordion';

export interface IAccordionContainerProps extends IUseAccordionProps {
  render?: (options: IUseAccordionReturnValue) => React.ReactNode;
  children?: (options: IUseAccordionReturnValue) => React.ReactNode;
}

export const AccordionContainer: React.FunctionComponent<IAccordionContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useAccordion(options)) as React.ReactElement}</>;
};

AccordionContainer.defaultProps = {
  expandable: true,
  collapsible: true
};

AccordionContainer.propTypes = {
  /** A children render prop function which receives accordion state and prop getters */
  children: PropTypes.func,
  /** A render prop function which receives accordion state and prop getters */
  render: PropTypes.func,
  /** Determines which sections are expanded in a controlled accordion */
  expandedSections: PropTypes.array,
  /** Determines if multiple panels can be expanded at the same time in an uncontrolled accordion */
  expandable: PropTypes.bool,
  /** Determines if panels can be collapsed in an uncontrolled accordion */
  collapsible: PropTypes.bool,
  /** Prefixes IDs for the accordion trigger and panels  */
  idPrefix: PropTypes.string
};
