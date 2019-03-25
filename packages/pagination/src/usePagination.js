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

  const getContainerProps = ({ ariaLabel, ...props } = {}) => {
    return {
      'aria-label': ariaLabel || 'Pagination navigation',
      ...props
    };
  };

  const getPreviousPageProps = ({ ariaLabel, ...props } = {}) => {
    return {
      'aria-label': ariaLabel || 'Previous Page',
      ...props
    };
  };

  const getNextPageProps = ({ ariaLabel, ...props } = {}) => {
    return {
      'aria-label': ariaLabel || 'Next Page',
      ...props
    };
  };

  const getPageProps = ({ ariaLabel, page, current, ...other } = {}) => {
    let ariaLabelText = `Page ${page}`;

    if (current) {
      ariaLabelText = `Current page, Page ${page}`;
    }

    return {
      'aria-label': ariaLabel || ariaLabelText,
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
