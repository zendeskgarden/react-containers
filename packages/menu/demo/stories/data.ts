/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { MenuItem } from '@zendeskgarden/container-menu';

export const ITEMS: MenuItem[] = [
  { value: 'plant-01', label: 'Petunia' },
  { value: 'plant-02', label: 'Hydrangea' },
  { value: 'separator-01', separator: true },
  { value: 'plant-03', label: 'Violet' },
  { value: 'plant-04', label: 'Succulent' },
  {
    label: 'Fruits',
    items: [
      { value: 'fruit-01', label: 'Apple', type: 'checkbox' },
      { value: 'fruit-02', label: 'Banana', disabled: true, type: 'checkbox' },
      { value: 'Cherry', type: 'checkbox' },
      { value: 'fruit-04', label: 'Kiwi', type: 'checkbox' }
    ]
  },
  {
    label: 'Veggies',
    items: [
      { value: 'vegetable-01', label: 'Asparagus', type: 'radio' },
      { value: 'vegetable-02', label: 'Broccoli', disabled: true, type: 'radio' },
      { value: 'vegetable-03', label: 'Brussel sprouts', type: 'radio' },
      { value: 'vegetable-04', label: 'Kale', type: 'radio' }
    ]
  }
];
