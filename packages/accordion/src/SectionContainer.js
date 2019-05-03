/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useSection } from './useSection';

export function SectionContainer({ children, render = children, ...props }) {
  return render(useSection(props));
}

SectionContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  idPrefix: PropTypes.string,
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func
};
