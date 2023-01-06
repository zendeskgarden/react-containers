/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { KEYS } from '@zendeskgarden/container-utilities';
import { useCombobox as useDownshift } from 'downshift';

/**
 * Convert Downshift types to Garden.
 *
 * @param downshiftType A Downshift state change type.
 *
 * @returns A preferred Garden type.
 */
export const toType = (downshiftType: string) => {
  switch (downshiftType) {
    case useDownshift.stateChangeTypes.FunctionCloseMenu:
    case useDownshift.stateChangeTypes.FunctionOpenMenu:
    case useDownshift.stateChangeTypes.FunctionToggleMenu:
      return 'fn:setExpansion';

    case useDownshift.stateChangeTypes.FunctionReset:
      return 'fn:reset';

    case useDownshift.stateChangeTypes.FunctionSelectItem:
      return 'fn:setSelectionValue';

    case useDownshift.stateChangeTypes.FunctionSetHighlightedIndex:
      return 'fn:setActiveIndex';

    case useDownshift.stateChangeTypes.FunctionSetInputValue:
      return 'fn:setInputValue';

    case useDownshift.stateChangeTypes.InputBlur:
      return 'input:blur';

    case useDownshift.stateChangeTypes.InputChange:
      return 'input:change';

    case useDownshift.stateChangeTypes.InputFocus:
      return 'input:focus';

    case useDownshift.stateChangeTypes.InputKeyDownArrowDown:
      return `input:keyDown:${KEYS.DOWN}`;

    case useDownshift.stateChangeTypes.InputKeyDownArrowUp:
      return `input:keyDown:${KEYS.UP}`;

    case useDownshift.stateChangeTypes.InputKeyDownEnd:
      return `input:keyDown:${KEYS.END}`;

    case useDownshift.stateChangeTypes.InputKeyDownEnter:
      return `input:keyDown:${KEYS.ENTER}`;

    case useDownshift.stateChangeTypes.InputKeyDownEscape:
      return `input:keyDown:${KEYS.ESCAPE}`;

    case useDownshift.stateChangeTypes.InputKeyDownHome:
      return `input:keyDown:${KEYS.HOME}`;

    case useDownshift.stateChangeTypes.InputKeyDownPageDown:
      return `input:keyDown:${KEYS.PAGE_DOWN}`;

    case useDownshift.stateChangeTypes.InputKeyDownPageUp:
      return `input:keyDown:${KEYS.PAGE_UP}`;

    case useDownshift.stateChangeTypes.ItemClick:
      return 'option:click';

    case useDownshift.stateChangeTypes.ItemMouseMove:
      return 'option:mouseMove';

    case useDownshift.stateChangeTypes.MenuMouseLeave:
      return 'listbox:mouseLeave';

    case useDownshift.stateChangeTypes.ToggleButtonClick:
      return 'toggle:click';

    default:
      return downshiftType;
  }
};
