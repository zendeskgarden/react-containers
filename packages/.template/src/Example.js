/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';

import { useExample } from './useExample';

export function ExampleContainer({ children, render = children, coolProp }) {
  return render(useExample({ coolProp }));
}

ExampleContainer.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  coolProp: PropTypes.string
};
