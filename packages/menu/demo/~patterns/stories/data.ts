/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export const BASE_ITEMS = [
  { value: 'Orange' },
  { value: 'Berry', isNext: true },
  { value: 'Apple' }
];

export const NESTED_ITEMS = [
  { value: 'Fruits', isPrevious: true },
  { value: 'separator', separator: true },
  { value: 'Strawberry' },
  { value: 'Loganberry' },
  { value: 'Boysenberry' }
];
