/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/* eslint-disable-next-line no-undef */
const lib = jest.requireActual('../../../../packages/focusjail/node_modules/tabbable');

const tabbable = {
  ...lib,
  tabbable: (node, options) => lib.tabbable(node, { ...options, displayCheck: 'none' }),
  focusable: (node, options) => lib.focusable(node, { ...options, displayCheck: 'none' }),
  isFocusable: (node, options) => lib.isFocusable(node, { ...options, displayCheck: 'none' }),
  isTabbable: (node, options) => lib.isTabbable(node, { ...options, displayCheck: 'none' })
};

module.exports = tabbable;
