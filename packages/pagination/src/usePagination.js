/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useSelection } from '@zendeskgarden/container-selection';

/**
 * A React Hook used to create accessible widgets with the Pagination Interaction Pattern
 *
 * https://www.w3.org/TR/wai-aria-practices/#Listbox
 */
export function usePagination(options) {
  const {
    selectedItem,
    focusedItem,
    getContainerProps: getControlledContainerProps,
    getItemProps
  } = useSelection(options);

  const getContainerProps = (props = {}) => {
    return {
      'aria-label': 'Pagination navigation',
      ...props
    };
  };

  const getPreviousPageProps = (props = {}) => {
    return {
      'aria-label': 'Previous Page',
      ...props
    };
  };

  const getNextPageProps = (props = {}) => {
    return {
      'aria-label': 'Next Page',
      ...props
    };
  };

  const getPageProps = ({ page, current, ...other } = {}) => {
    let ariaLabel = `Page ${page}`;

    if (current) {
      ariaLabel = `Current page, Page ${page}`;
    }

    return {
      'aria-label': ariaLabel,
      current,
      ...other
    };
  };

  return {
    selectedItem,
    focusedItem,
    getContainerProps: props => getControlledContainerProps(getContainerProps(props)),
    getPageProps: props => getItemProps(getPageProps(props)),
    getPreviousPageProps: props => getItemProps(getPreviousPageProps(props)),
    getNextPageProps: props => getItemProps(getNextPageProps(props))
  };
}
