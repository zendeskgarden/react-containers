/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useAccordion, IUseAccordionProps, IUseAccordionReturnValue } from './useAccordion';

export interface IAccordionContainerProps extends IUseAccordionProps {
  render?: (options: IUseAccordionReturnValue) => React.ReactNode;
  children?: (options: IUseAccordionReturnValue) => React.ReactNode;
}

export const AccordionContainer: React.FunctionComponent<IAccordionContainerProps> = props => {
  const { children, render = children, ...options } = props;

  return render!(useAccordion(options)) as React.ReactElement;
};

AccordionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  expandedSections: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  defaultExpandedSections: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  isExpandable: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  idPrefix: PropTypes.string
};
