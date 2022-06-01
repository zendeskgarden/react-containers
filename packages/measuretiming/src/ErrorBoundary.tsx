/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useEffect } from 'react';

interface ErrorMetadata {
  error: Error;
  info: React.ErrorInfo;
}

let errorMetadataCurrentlyBeingThrown: null | ErrorMetadata = null;

export const useOnErrorBoundaryDidCatch = (
  onCaughtError: (metadata: ErrorMetadata) => void
): void => {
  useEffect(() => {
    return () => {
      if (!errorMetadataCurrentlyBeingThrown) return;
      // this will only run if React decides to unmount the tree that threw the error
      onCaughtError(errorMetadataCurrentlyBeingThrown);
    };
  });
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // since 'componentDidCatch' runs synchronously right before useEffect clean-up functions
    // belonging to the component that has thrown,
    // that means this metadata is available within that synchronous frame to the component
    // this should even in concurrent mode;
    // at least for the purpose of reporting metadata, or metrics such as counts, this is good enough
    errorMetadataCurrentlyBeingThrown = { error, info };
    setTimeout(() => {
      // we want this data to be available synchronously - only in the same JS frame
      // so we clean-up immediately after:
      errorMetadataCurrentlyBeingThrown = null;
    });
  }

  render(): React.ReactNode {
    const { children } = this.props;

    return children;
  }
}
