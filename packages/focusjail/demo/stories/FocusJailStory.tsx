/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef } from 'react';
import { Story } from '@storybook/react';
import {
  FocusJailContainer,
  IFocusJailContainerProps,
  IUseFocusJailProps,
  IUseFocusJailReturnValue,
  useFocusJail
} from '@zendeskgarden/container-focusjail';

const Component = forwardRef<HTMLDivElement, IUseFocusJailReturnValue>(
  ({ getContainerProps }, ref) => (
    <>
      <button className="m-1 px-2 py-1" type="button">
        Tabbable
      </button>
      <label className="m-1">
        <span>Tabbable</span>
        <input className="ml-1" />
      </label>
      <button className="m-1 px-2 py-1" type="button">
        Tabbable
      </button>
      <h1 className="m-1 mt-4 text-lg">Focus loop container</h1>
      <div
        className="border-2 border-dashed border-grey-400 m-1 p-2"
        {...getContainerProps({ ref, tabIndex: -1 })}
      >
        <label className="m-1 mt-2">
          <span>Tabbable</span>
          <input className="block ml-1" />
        </label>
        <label className="m-1 mt-2">
          <span>Tabbable</span>
          <input className="block ml-1" />
        </label>
        <button className="m-1 mt-2 px-2 py-1" type="button">
          Tabbable
        </button>
      </div>
    </>
  )
);

Component.displayName = 'Component';

const Container = ({ containerRef, ...props }: IFocusJailContainerProps<HTMLDivElement>) => (
  <FocusJailContainer containerRef={containerRef} {...props}>
    {containerProps => <Component {...containerProps} ref={containerRef} />}
  </FocusJailContainer>
);

const Hook = ({ containerRef, ...props }: IUseFocusJailProps<HTMLDivElement>) => {
  const hookProps = useFocusJail({ containerRef, ...props });

  return <Component {...hookProps} ref={containerRef} />;
};

interface IArgs extends IFocusJailContainerProps<HTMLDivElement> {
  as: 'hook' | 'container';
}

export const FocusJailStory: Story<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
