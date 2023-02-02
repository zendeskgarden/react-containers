/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { IUseComboboxProps } from '@zendeskgarden/container-combobox';

export const OPTIONS: IUseComboboxProps['options'] = [
  { value: 'option-01', label: 'Apple' },
  { value: 'option-02', label: 'Banana' },
  { value: 'option-03', label: 'Carrot', disabled: true },
  { value: 'option-04', label: 'Grape' },
  { value: 'option-05', label: 'Kiwi' },
  { value: 'option-06', label: 'Quince' }
];
