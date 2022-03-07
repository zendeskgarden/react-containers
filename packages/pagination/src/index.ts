/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/* Hooks */
export { usePagination } from './usePagination';
export type {
  IUsePaginationProps,
  IUsePaginationReturnValue,
  IGetContainerProps,
  IGetPageProps
} from './usePagination';

/* Render-props */
export { PaginationContainer } from './PaginationContainer';
export type { IPaginationContainerProps } from './PaginationContainer';
