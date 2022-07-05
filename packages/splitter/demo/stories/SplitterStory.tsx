/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, forwardRef } from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  ISplitterContainerProps,
  IUseSplitterProps,
  IUseSplitterReturnValue,
  SplitterContainer,
  useSplitter
} from '@zendeskgarden/container-splitter';

interface IComponentProps extends IUseSplitterReturnValue {
  orientation: IUseSplitterProps['orientation'];
  isFixed: IUseSplitterProps['isFixed'];
  isLeading: IUseSplitterProps['isLeading'];
  rtl: IUseSplitterProps['rtl'];
}

const Component = forwardRef<HTMLDivElement, IComponentProps>(
  (
    {
      getPrimaryPaneProps,
      getSeparatorProps,
      valueNow,
      orientation = 'vertical',
      isFixed,
      isLeading,
      rtl
    },
    ref
  ) => (
    <div
      className={classNames('border', 'border-solid', 'flex', 'overflow-hidden', {
        'flex-col': orientation === 'horizontal',
        'flex-row-reverse': rtl
      })}
      style={{
        height: orientation === 'horizontal' ? 800 : 240,
        width: orientation === 'horizontal' ? 240 : undefined
      }}
    >
      <div
        className={classNames('overflow-auto', {
          'flex-auto': isLeading,
          'shrink-0': !isLeading
        })}
        {...(!isLeading && getPrimaryPaneProps({ style: { flexBasis: valueNow } }))}
      >
        <div className="p-4">
          <b>{isLeading ? 'Secondary' : 'Primary'}</b>
          <p className="mt-2">
            Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
            blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
          </p>
        </div>
      </div>
      <div
        className={classNames('flex', 'flex-none', {
          'cursor-pointer': isFixed,
          'cursor-col-resize': !isFixed && orientation === 'vertical',
          'cursor-row-resize': !isFixed && orientation === 'horizontal',
          'w-4': orientation === 'vertical',
          'h-4': orientation === 'horizontal'
        })}
        {...getSeparatorProps({
          'aria-label': `${orientation === 'horizontal' ? 'Horizontal' : 'Vertical'} splitter`
        })}
        ref={ref}
      >
        <div
          className={classNames('bg-blue-300', 'm-auto', {
            'h-full w-1': orientation === 'vertical',
            'h-1 w-full': orientation === 'horizontal'
          })}
        />
      </div>
      <div
        className={classNames('overflow-auto', {
          'flex-auto': !isLeading,
          'shrink-0': isLeading
        })}
        {...(isLeading && getPrimaryPaneProps({ style: { flexBasis: valueNow } }))}
      >
        <div className="p-4">
          <b>{isLeading ? 'Primary' : 'Secondary'}</b>
          <p className="mt-2">
            Grains spring soba noodles pomegranate veggie burgers picnic cocoa green tea lime maple
            orange tempeh ginger tofu leek basmati double dark chocolate figs artichoke hearts
            raspberry fizz lemon lime minty summertime scotch bonnet pepper banana four-layer pine
            nuts Thai sun pepper sesame soba noodles mediterranean vegetables chocolate cookie. Udon
            noodles toasted hazelnuts peach strawberry mango ginger lemongrass agave green tea
            homemade balsamic.
          </p>
        </div>
      </div>
    </div>
  )
);

Component.displayName = 'Component';

const Container = ({ separatorRef, ...props }: ISplitterContainerProps<HTMLDivElement>) => (
  <SplitterContainer separatorRef={separatorRef} {...props}>
    {containerProps => (
      <Component
        {...containerProps}
        orientation={props.orientation}
        isFixed={props.isFixed}
        isLeading={props.isLeading}
        rtl={props.rtl}
        ref={separatorRef}
      />
    )}
  </SplitterContainer>
);

const Hook = ({ separatorRef, ...props }: IUseSplitterProps<HTMLDivElement>) => {
  const hookProps = useSplitter<HTMLDivElement>({ separatorRef, ...props });

  return (
    <Component
      {...hookProps}
      orientation={props.orientation}
      isFixed={props.isFixed}
      isLeading={props.isLeading}
      rtl={props.rtl}
      ref={separatorRef}
    />
  );
};

interface IArgs extends ISplitterContainerProps<HTMLDivElement> {
  as: 'hook' | 'container';
}

export const SplitterStory: Story<IArgs> = ({ as, ...props }) => {
  const separatorRef = createRef<HTMLDivElement>();

  switch (as) {
    case 'container':
      return <Container {...props} separatorRef={separatorRef} />;

    case 'hook':
    default:
      return <Hook {...props} separatorRef={separatorRef} />;
  }
};
