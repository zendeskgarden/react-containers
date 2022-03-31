/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { ITreeNode } from './types';

export const TREE: ITreeNode[] = [
  {
    name: 'Fruits',
    children: [
      { name: 'Oranges' },
      { name: 'Pineapple' },
      {
        name: 'Apples',
        children: [{ name: 'Macintosh' }, { name: 'Granny Smith' }, { name: 'Fuji' }]
      },
      { name: 'Bananas' },
      {
        name: 'Pears',
        children: [
          { name: 'Anjou' },
          { name: 'Bartlett' },
          { name: 'Bosc' },
          { name: 'Concorde' },
          { name: 'Seckel' },
          { name: 'Starkrimson' }
        ]
      }
    ]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Podded Vegetables',
        children: [{ name: 'Lentil' }, { name: 'Pea' }, { name: 'Peanut' }]
      },
      {
        name: 'Bulb and Stem Vegetables',
        children: [{ name: 'Asparagus' }, { name: 'Celery' }, { name: 'Leek' }, { name: 'Onion' }]
      },
      {
        name: 'Root and Tuberous Vegetables',
        children: [{ name: 'Carrot' }, { name: 'Ginger' }, { name: 'Parsnip' }, { name: 'Potato' }]
      }
    ]
  },
  {
    name: 'Grains',
    children: [
      {
        name: 'Cereal Grains',
        children: [{ name: 'Barley' }, { name: 'Oats' }, { name: 'Rice' }]
      },
      {
        name: 'Pseudocereal Grains',
        children: [
          { name: 'Amaranth' },
          { name: 'Buckwheat' },
          { name: 'Chia' },
          { name: 'Quinoa' }
        ]
      },
      {
        name: 'Oilseeds',
        children: [
          { name: 'India Mustard' },
          { name: 'Safflower' },
          { name: 'Flax Seed' },
          { name: 'Poppy Seed' }
        ]
      }
    ]
  }
];
