/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
  useSelection,
  IUseSelectionProps,
  IUseSelectionState,
  IGetItemPropsOptions
} from '@zendeskgarden/container-selection';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUsePaginationProps<Item> extends IUseSelectionProps<Item> {}

export interface IGetPageProps<Item> extends Omit<IGetItemPropsOptions<Item>, 'role'> {
  role?: string | null;
  page?: number;
  current?: any;
  ariaLabel?: any;
}

export interface IGetContainerProps extends Omit<React.HTMLProps<any>, 'role'> {
  role?: string | null;
  ariaLabel?: string;
}

export interface IUsePaginationReturnValue<Item> extends IUseSelectionState<Item> {
  getContainerProps: (options?: IGetContainerProps & any) => any;
  getPageProps: <T extends IGetPageProps<Item>>(options?: T) => any;
  getPreviousPageProps: <T extends IGetPageProps<Item>>(options?: T) => any;
  getNextPageProps: <T extends IGetPageProps<Item>>(options?: T) => any;
}

export function usePagination<Item = any>(
  options: IUsePaginationProps<Item>
): IUsePaginationReturnValue<Item> {
  const {
    selectedItem,
    focusedItem,
    getContainerProps: getControlledContainerProps,
    getItemProps
  } = useSelection(options);

  const getContainerProps = ({ role = 'list', ...other } = {} as any) => {
    return {
      role,
      'data-garden-container-id': 'containers.pagination',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getPreviousPageProps = ({ ariaLabel, role = 'listitem', ...props } = {} as any) => {
    return {
      selectedAriaKey: null,
      role,
      'aria-label': ariaLabel || 'Previous Page',
      ...props
    };
  };

  const getNextPageProps = ({ ariaLabel, role = 'listitem', ...props } = {} as any) => {
    return {
      selectedAriaKey: null,
      role,
      'aria-label': ariaLabel || 'Next Page',
      ...props
    };
  };

  const getPageProps = ({ ariaLabel, page, current, role = 'listitem', ...other } = {} as any) => {
    let ariaLabelText = `Page ${page}`;

    if (current && !ariaLabel) {
      ariaLabelText = `Current page, Page ${page}`;
    }

    return {
      selectedAriaKey: 'aria-current',
      role,
      'aria-label': ariaLabel || ariaLabelText,
      ...other
    };
  };

  return {
    selectedItem,
    focusedItem,
    getContainerProps: props => getControlledContainerProps(getContainerProps(props)),
    getPageProps: props => getItemProps(getPageProps(props), 'getPageProps'),
    getPreviousPageProps: props =>
      getItemProps(getPreviousPageProps(props), 'getPreviousPageProps'),
    getNextPageProps: props => getItemProps(getNextPageProps(props), 'getNextPageProps')
  };
}
