/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useCallback, useMemo } from 'react';
import { useId } from '@zendeskgarden/container-utilities';
import { useSelection } from '@zendeskgarden/container-selection';
import { ITab, IUseTabsProps, IUseTabsReturnValue } from './types';

export const useTabs = <Value>({
  tabs,
  orientation = 'horizontal',
  idPrefix,
  ...options
}: IUseTabsProps<Value>): IUseTabsReturnValue<Value> => {
  const prefix = useId(idPrefix);
  const PANEL_ID = `${prefix}__panel`;
  const TAB_ID = `${prefix}__tab`;

  const values = useMemo(
    () =>
      tabs.reduce((all: any[], tab: ITab<Value>) => {
        !tab.disabled && all.push(tab.value);

        return all;
      }, []),
    [tabs]
  );

  const { selectedValue, focusedValue, getGroupProps, getElementProps } = useSelection<Value>({
    values,
    direction: orientation,
    defaultSelectedValue: values[0],
    ...options
  });

  const getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'] = useCallback(
    ({ role = 'tablist', ...other } = {}) => ({
      ...getGroupProps(other),
      role: role === null ? undefined : role,
      'aria-orientation': orientation,
      'data-garden-container-id': 'containers.tabs',
      'data-garden-container-version': PACKAGE_VERSION
    }),
    [getGroupProps, orientation]
  );

  const getTabProps: IUseTabsReturnValue<Value>['getTabProps'] = useCallback(
    ({ role = 'tab', value, ...other }) => {
      const isDisabled = values.indexOf(value) === -1;
      const { onClick, onKeyDown, onFocus, onBlur, ...elementProps } = getElementProps({
        value,
        role: role === null ? undefined : role,
        ...other
      });

      return {
        ...elementProps,
        onClick: isDisabled ? undefined : onClick,
        onFocus: isDisabled ? undefined : onFocus,
        onKeyDown: isDisabled ? undefined : onKeyDown,
        onBlur: isDisabled ? undefined : onBlur,
        id: `${TAB_ID}:${value}`,
        'aria-disabled': isDisabled || undefined,
        'aria-controls': `${PANEL_ID}:${value}`
      };
    },
    [getElementProps, values, PANEL_ID, TAB_ID]
  );

  const getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'] = useCallback(
    ({ role = 'tabpanel', value, ...other }) => ({
      role: role === null ? undefined : role,
      id: `${PANEL_ID}:${value}`,
      hidden: value !== selectedValue,
      'aria-labelledby': `${TAB_ID}:${value}`,
      ...other
    }),
    [selectedValue, PANEL_ID, TAB_ID]
  );

  return useMemo(
    () => ({
      selectedValue,
      focusedValue,
      getTabListProps,
      getTabProps,
      getTabPanelProps
    }),
    [selectedValue, focusedValue, getTabListProps, getTabProps, getTabPanelProps]
  );
};
