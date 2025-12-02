/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useId as useReachId } from '@reach/auto-id';

let idCounter = 0;

/**
 * Hook for generating a unique ID
 *
 * @param id A user provided ID
 *
 * @returns A generated ID that can be passed to accessibility attributes
 */
export const useId = (id?: any) => {
  let retVal = useReachId(id);

  if (retVal === undefined) {
    retVal = `id:${idCounter++}`;
  } else {
    retVal = `${retVal}`;
  }

  return retVal;
};
