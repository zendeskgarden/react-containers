/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { DependencyList } from 'react';
import { useTimingMeasurement } from './useTimingMeasurement';
import type { UseTimingHookConfiguration } from './types';
import { useActionLogRef } from './useActionLogRef';

export const useTiming = <CustomMetadata extends Record<string, unknown> = never>(
  options: UseTimingHookConfiguration<CustomMetadata>,
  restartWhenChanged: DependencyList = []
): void => {
  const actionLogRef = useActionLogRef<CustomMetadata>(options);

  if (options.metadata) {
    actionLogRef.current.customMetadataBySource.set(options.placement, options.metadata);
  }

  useTimingMeasurement({ ...options, actionLogRef }, restartWhenChanged);
};
