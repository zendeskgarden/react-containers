/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useAccordion } from './useAccordion';

export function AccordionContainer({ children, render = children, key, expanded }) {
  return render(useAccordion({ key, expanded }));
}

AccordionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  id: PropTypes.string
};
