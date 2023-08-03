/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useAccordion } from './useAccordion';
import type { IAccordionContainerProps } from './types';

export const AccordionContainer: React.FunctionComponent<IAccordionContainerProps<any>> = props => {
  const { children, render = children, ...options } = props;

  return <>{render!(useAccordion(options)) as React.ReactElement}</>;
};

AccordionContainer.defaultProps = {
  expandable: true,
  collapsible: true
};

AccordionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  sections: PropTypes.array.isRequired,
  expandedSections: PropTypes.array,
  defaultExpandedSections: PropTypes.array,
  expandable: PropTypes.bool,
  collapsible: PropTypes.bool,
  idPrefix: PropTypes.string,
  onChange: PropTypes.func
};
