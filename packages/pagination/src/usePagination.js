/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useSelection } from '@zendeskgarden/container-selection';

const HOOK_ID = 'pagination';
let PKG_VERSION;

if (process.env.NODE_ENV === 'development') {
  // In the prod build this is handled in the webpack build
  // storybook doesn't run each packages build so we need to get the
  // version here
  // eslint-disable-next-line global-require
  const packageManifest = require('../package.json');

  PKG_VERSION = packageManifest.version;
}

export function usePagination(options) {
  const {
    selectedItem,
    focusedItem,
    getContainerProps: getControlledContainerProps,
    getItemProps
  } = useSelection(options);

  const getContainerProps = ({ role = 'navigation', ariaLabel, ...props } = {}) => {
    return {
      role,
      'aria-label': ariaLabel || 'Pagination navigation',
      'data-garden-container-id': HOOK_ID,
      'data-garden-container-version': PKG_VERSION || PACKAGE_VERSION,
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

    if (current && !ariaLabel) {
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
    getPageProps: props => getItemProps(getPageProps(props), 'getPageProps'),
    getPreviousPageProps: props =>
      getItemProps(getPreviousPageProps(props), 'getPreviousPageProps'),
    getNextPageProps: props => getItemProps(getNextPageProps(props), 'getNextPageProps')
  };
}
