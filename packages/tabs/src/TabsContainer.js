/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useTabs } from './useTabs';

export function TabsContainer({ children, render = children, ...options }) {
  return render(useTabs(options));
}

TabsContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  vertical: PropTypes.bool,
  idPrefix: PropTypes.string
};
