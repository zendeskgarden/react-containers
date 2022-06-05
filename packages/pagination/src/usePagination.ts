/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  IUseSelectionProps as IUsePaginationProps,
  useSelection
} from '@zendeskgarden/container-selection';
import { IUsePaginationReturnValue } from './types';

export const usePagination = <Item>(
  options: IUsePaginationProps<Item>
): IUsePaginationReturnValue<Item> => {
  const {
    selectedItem,
    focusedItem,
    getContainerProps: getSelectionContainerProps,
    getItemProps
  } = useSelection(options);

  const getContainerProps: IUsePaginationReturnValue<Item>['getContainerProps'] = ({
    role = 'list',
    ...other
  } = {}) => ({
    ...getSelectionContainerProps(other),
    role: role === null ? undefined : role,
    'data-garden-container-id': 'containers.pagination',
    'data-garden-container-version': PACKAGE_VERSION
  });

  const getPreviousPageProps: IUsePaginationReturnValue<Item>['getPreviousPageProps'] = ({
    role = 'listitem',
    ...other
  }) => ({
    ...getItemProps({ selectedAriaKey: null, ...other }),
    role: role === null ? undefined : role
  });

  const getNextPageProps: IUsePaginationReturnValue<Item>['getNextPageProps'] = ({
    role = 'listitem',
    ...other
  }) => ({
    ...getItemProps({ selectedAriaKey: null, ...other }),
    role: role === null ? undefined : role
  });

  const getPageProps: IUsePaginationReturnValue<Item>['getPageProps'] = ({
    role = 'listitem',
    ...other
  }) => ({
    ...getItemProps({ selectedAriaKey: 'aria-current', ...other }),
    role: role === null ? undefined : role
  });

  return {
    selectedItem,
    focusedItem,
    getContainerProps,
    getPageProps,
    getPreviousPageProps,
    getNextPageProps
  };
};
