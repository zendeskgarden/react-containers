/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import classNames from 'classnames';
import {
  ISplitterContainerProps,
  IUseSplitterProps,
  IUseSplitterReturnValue,
  SplitterContainer,
  SplitterOrientation,
  SplitterPosition,
  SplitterType,
  useSplitter
} from '@zendeskgarden/container-splitter';

interface IComponentProps extends IUseSplitterReturnValue {
  orientation: IUseSplitterProps['orientation'];
  position: IUseSplitterProps['position'];
  rtl: IUseSplitterProps['rtl'];
  type: IUseSplitterProps['type'];
}

const Component = ({
  getPrimaryPaneProps,
  getSeparatorProps,
  orientation,
  position,
  rtl,
  type,
  valueNow
}: IComponentProps) => {
  return (
    <div
      className={classNames('border', 'border-solid', 'flex', 'overflow-hidden', {
        'flex-col': orientation === SplitterOrientation.HORIZONTAL,
        'flex-row-reverse': rtl
      })}
      style={{
        height: orientation === SplitterOrientation.HORIZONTAL ? 800 : 240,
        width: orientation === SplitterOrientation.HORIZONTAL ? 240 : undefined
      }}
    >
      <div
        className={classNames('overflow-auto', {
          'flex-auto': position === SplitterPosition.LEADS,
          'shrink-0': position === SplitterPosition.TRAILS
        })}
        {...(position === SplitterPosition.TRAILS &&
          getPrimaryPaneProps({ style: { flexBasis: valueNow } }))}
      >
        <div className="p-4">
          <b>{position === SplitterPosition.TRAILS ? 'Primary' : 'Secondary'}</b>
          <p className="mt-2">
            Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful
            blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta.
          </p>
        </div>
      </div>
      <div
        className={classNames('flex', 'flex-none', {
          'cursor-pointer': type === SplitterType.FIXED,
          'cursor-col-resize w-4': orientation === SplitterOrientation.VERTICAL,
          'cursor-row-resize h-4': orientation === SplitterOrientation.HORIZONTAL
        })}
        {...getSeparatorProps()}
      >
        <div
          className={classNames('bg-blue-300', 'm-auto', {
            'h-full w-1': orientation === SplitterOrientation.VERTICAL,
            'h-1 w-full': orientation === SplitterOrientation.HORIZONTAL
          })}
        />
      </div>
      <div
        className={classNames('overflow-auto', {
          'flex-auto': position === SplitterPosition.TRAILS,
          'shrink-0': position === SplitterPosition.LEADS
        })}
        {...(position &&
          SplitterPosition.LEADS &&
          getPrimaryPaneProps({ style: { flexBasis: valueNow } }))}
      >
        <div className="p-4">
          <b>{position === SplitterPosition.TRAILS ? 'Secondary' : 'Primary'}</b>
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
  );
};

const Container = ({ ...props }: ISplitterContainerProps) => (
  <SplitterContainer {...props}>
    {containerProps => (
      <Component
        {...containerProps}
        orientation={props.orientation}
        position={props.position}
        rtl={props.rtl}
        type={props.type}
      />
    )}
  </SplitterContainer>
);

const Hook = ({ ...props }: IUseSplitterProps) => {
  const hookProps = useSplitter(props);

  return (
    <Component
      {...hookProps}
      orientation={props.orientation}
      position={props.position}
      rtl={props.rtl}
      type={props.type}
    />
  );
};

interface IArgs extends ISplitterContainerProps {
  as: 'hook' | 'container';
}

export const SplitterStory: Story<IArgs> = ({ as, ...props }) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
