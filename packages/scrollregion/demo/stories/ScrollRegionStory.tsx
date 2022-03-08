/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, HTMLAttributes, RefObject } from 'react';
import { Story } from '@storybook/react';
import {
  IScrollRegionContainerProps,
  IUseScrollRegionProps,
  ScrollRegionContainer,
  useScrollRegion
} from '@zendeskgarden/container-scrollregion';
import classNames from 'classnames';

interface IComponentProps extends HTMLAttributes<HTMLDivElement> {
  height: number;
  width: number;
}

const Component = forwardRef<HTMLElement, IComponentProps>(
  ({ children, height, width, ...props }, ref) => (
    <div
      className={classNames(
        'border',
        'border-solid',
        'overflow-scroll',
        props.tabIndex === 0 ? 'border-blue-600' : 'border-grey-300'
      )}
      style={{ height, width }}
      ref={ref as RefObject<HTMLDivElement>}
      {...props}
    >
      <p className="p-2">{children}</p>
    </div>
  )
);

Component.displayName = 'Component';

interface IProps extends IUseScrollRegionProps {
  height: number;
  width: number;
}

const Container = ({ containerRef, height, width, ...props }: IProps) => (
  <ScrollRegionContainer containerRef={containerRef} {...props}>
    {containerTabIndex => (
      <Component height={height} width={width} tabIndex={containerTabIndex} ref={containerRef}>
        {props.dependency}
      </Component>
    )}
  </ScrollRegionContainer>
);

const Hook = ({ containerRef, height, width, ...props }: IProps) => {
  const containerTabIndex = useScrollRegion({ containerRef, ...props });

  return (
    <Component height={height} width={width} tabIndex={containerTabIndex} ref={containerRef}>
      {props.dependency}
    </Component>
  );
};

interface IArgs extends IScrollRegionContainerProps {
  as: 'hook' | 'container';
  height: number;
  width: number;
}

export const ScrollRegionStory: Story<IArgs> = ({ as, ...props }) => {
  const ScrollRegion = () => {
    switch (as) {
      case 'container':
        return <Container {...props} />;

      case 'hook':
      default:
        return <Hook {...props} />;
    }
  };

  return <ScrollRegion />;
};
