/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Same as Omit, but does not merge types with unions, rather omits each union type individually
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
