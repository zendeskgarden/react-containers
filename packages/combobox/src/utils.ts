/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { KEYS } from '@zendeskgarden/container-utilities';
import { useCombobox as useDownshift } from 'downshift';
import { OptionValue } from './types';

/** Map Downshift to Garden state change types */
const typeMap: Record<string, string> = {
  [useDownshift.stateChangeTypes.FunctionCloseMenu]: 'fn:setExpansion',
  [useDownshift.stateChangeTypes.FunctionOpenMenu]: 'fn:setExpansion',
  [useDownshift.stateChangeTypes.FunctionToggleMenu]: 'fn:setExpansion',
  [useDownshift.stateChangeTypes.FunctionReset]: 'fn:reset',
  [useDownshift.stateChangeTypes.FunctionSelectItem]: 'fn:setSelectionValue',
  [useDownshift.stateChangeTypes.FunctionSetHighlightedIndex]: 'fn:setActiveIndex',
  [useDownshift.stateChangeTypes.FunctionSetInputValue]: 'fn:setInputValue',
  [useDownshift.stateChangeTypes.InputBlur]: 'input:blur',
  [useDownshift.stateChangeTypes.InputChange]: 'input:change',
  [useDownshift.stateChangeTypes.InputClick]: 'input:click',
  [useDownshift.stateChangeTypes.InputKeyDownArrowDown]: `input:keyDown:${KEYS.DOWN}`,
  [useDownshift.stateChangeTypes.InputKeyDownArrowUp]: `input:keyDown:${KEYS.UP}`,
  [useDownshift.stateChangeTypes.InputKeyDownEnd]: `input:keyDown:${KEYS.END}`,
  [useDownshift.stateChangeTypes.InputKeyDownEnter]: `input:keyDown:${KEYS.ENTER}`,
  [useDownshift.stateChangeTypes.InputKeyDownEscape]: `input:keyDown:${KEYS.ESCAPE}`,
  [useDownshift.stateChangeTypes.InputKeyDownHome]: `input:keyDown:${KEYS.HOME}`,
  [useDownshift.stateChangeTypes.InputKeyDownPageDown]: `input:keyDown:${KEYS.PAGE_DOWN}`,
  [useDownshift.stateChangeTypes.InputKeyDownPageUp]: `input:keyDown:${KEYS.PAGE_UP}`,
  [useDownshift.stateChangeTypes.ItemClick]: 'option:click',
  [useDownshift.stateChangeTypes.ItemMouseMove]: 'option:mouseMove',
  [useDownshift.stateChangeTypes.MenuMouseLeave]: 'listbox:mouseLeave',
  [useDownshift.stateChangeTypes.ToggleButtonClick]: 'toggle:click'
};

/**
 * Convert Downshift types to Garden.
 *
 * @param downshiftType A Downshift state change type.
 *
 * @returns A preferred Garden type.
 */
export const toType = (downshiftType: string) => {
  return typeMap[downshiftType] || downshiftType;
};

/**
 * Convert the given option value to a label.
 *
 * @param labels A stored record of label key value pairs.
 * @param value The value to convert to a valid key.
 *
 * @returns A label from the `labels` record based on the given value.
 */
export const toLabel = (labels: Record<string, string>, value: OptionValue) => {
  if (value === undefined) {
    return '';
  }

  const key = typeof value === 'string' ? value : JSON.stringify(value);

  return labels[key];
};
