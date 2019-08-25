/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Utility to determine controlled vs uncontrolled values
 */
export function getControlledValue(...values) {
  // eslint-disable-next-line no-unused-vars
  for (const value of values) {
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}
