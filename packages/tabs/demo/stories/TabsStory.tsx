/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef, RefObject } from 'react';
import { Story } from '@storybook/react';
import {
  ITabsContainerProps,
  IUseTabsProps,
  IUseTabsReturnValue,
  TabsContainer,
  useTabs
} from '@zendeskgarden/container-tabs';
import classNames from 'classnames';

interface IComponentProps extends IUseTabsReturnValue<string> {
  tabs: RefObject<HTMLLIElement>[];
  vertical: IUseTabsProps<any>['vertical'];
  rtl: IUseTabsProps<any>['rtl'];
}

const Component = ({
  tabs,
  getTabListProps,
  getTabPanelProps,
  getTabProps,
  selectedItem,
  vertical,
  rtl
}: IComponentProps) => (
  <div
    className={classNames({
      flex: vertical,
      'flex-row-reverse': vertical && rtl
    })}
  >
    <ul
      {...getTabListProps()}
      className={classNames('border-solid', 'border-transparent', 'flex', {
        'flex-col': vertical,
        'border-b-grey-600': !vertical,
        'flex-row-reverse': !vertical && rtl,
        'border-r-grey-600': vertical && !rtl,
        'border-l-grey-600': vertical && rtl
      })}
    >
      {tabs.map((tab, index) => (
        <li
          key={index}
          {...getTabProps({ index, item: index.toString(), focusRef: tab })}
          className={classNames(
            'border-3',
            'border-solid',
            'border-transparent',
            'cursor-pointer',
            'px-2',
            'py-1',
            {
              'border-b-blue-600': selectedItem === index.toString() && !vertical,
              'border-r-blue-600': selectedItem === index.toString() && vertical && !rtl,
              'border-l-blue-600': selectedItem === index.toString() && vertical && rtl
            }
          )}
        >{`Tab ${index + 1}`}</li>
      ))}
    </ul>
    {tabs.map((_, index) => (
      <div
        key={index}
        {...getTabPanelProps({ index, item: index.toString() })}
        className="p-2"
      >{`Panel ${index + 1}`}</div>
    ))}
  </div>
);

interface IProps extends IUseTabsProps<string> {
  tabRefs: RefObject<HTMLLIElement>[];
}

const Container = ({ tabRefs, ...props }: IProps) => (
  <TabsContainer {...props}>
    {containerProps => (
      <Component tabs={tabRefs} vertical={props.vertical} rtl={props.rtl} {...containerProps} />
    )}
  </TabsContainer>
);

const Hook = ({ tabRefs, ...props }: IProps) => {
  const hookProps = useTabs(props);

  return <Component tabs={tabRefs} vertical={props.vertical} rtl={props.rtl} {...hookProps} />;
};

interface IArgs extends ITabsContainerProps {
  as: 'hook' | 'container';
  tabs: number;
}

export const TabsStory: Story<IArgs> = ({ as, tabs, ...props }: IArgs) => {
  const Tabs = () => {
    const tabRefs = Array.from({ length: tabs }, () => createRef<HTMLLIElement>());

    switch (as) {
      case 'container':
        return <Container tabRefs={tabRefs} {...props} />;

      case 'hook':
      default:
        return <Hook tabRefs={tabRefs} {...props} />;
    }
  };

  return <Tabs />;
};
