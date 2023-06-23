/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  ITabsContainerProps,
  IUseTabsProps,
  IUseTabsReturnValue,
  TabsContainer,
  useTabs
} from '@zendeskgarden/container-tabs';
import classNames from 'classnames';
import { ITab } from '../../src/types';

interface TabItemProps {
  tab: ITab<string>;
  selectedValue: IUseTabsReturnValue<string>['selectedValue'];
  orientation: IUseTabsProps<string>['orientation'];
  rtl?: IUseTabsProps<string>['rtl'];
  getTabProps: IUseTabsReturnValue<string>['getTabProps'];
}

const TabItem = ({
  tab: { value, disabled },
  getTabProps,
  selectedValue,
  orientation,
  rtl
}: TabItemProps) => (
  <li
    key={value}
    className={classNames('border-3 border-solid border-transparent px-2 py-1', {
      'border-b-blue-600': selectedValue === value && orientation !== 'vertical',
      'border-r-blue-600': selectedValue === value && orientation === 'vertical' && !rtl,
      'border-l-blue-600': selectedValue === value && orientation === 'vertical' && rtl,
      'cursor-pointer': !disabled,
      'opacity-50 cursor-default': disabled
    })}
    {...getTabProps({ value })}
  >
    {value}
  </li>
);

interface IComponentProps extends IUseTabsReturnValue<string> {
  tabs: IUseTabsProps<string>['tabs'];
  orientation: IUseTabsProps<any>['orientation'];
  rtl: IUseTabsProps<any>['rtl'];
}

const Component = ({
  tabs,
  getTabListProps,
  getTabPanelProps,
  getTabProps,
  selectedValue,
  orientation,
  rtl
}: IComponentProps) => {
  return (
    <div
      className={classNames({
        flex: orientation === 'vertical',
        'flex-row-reverse': orientation === 'vertical' && rtl
      })}
    >
      <ul
        {...getTabListProps()}
        className={classNames('border-solid', 'border-transparent', 'flex', {
          'flex-col': orientation === 'vertical',
          'border-b-grey-600': orientation !== 'vertical',
          'flex-row-reverse': orientation !== 'vertical' && rtl,
          'border-r-grey-600': orientation === 'vertical' && !rtl,
          'border-l-grey-600': orientation === 'vertical' && rtl
        })}
      >
        {tabs.map(tab => (
          <TabItem
            key={tab.value}
            tab={tab}
            getTabProps={getTabProps}
            selectedValue={selectedValue}
            orientation={orientation}
            rtl={rtl}
          />
        ))}
      </ul>
      {tabs.map(tab => (
        <div key={tab.value} {...getTabPanelProps({ value: tab.value })} className="p-2">
          {tab.value}
        </div>
      ))}
    </div>
  );
};

const Container = (props: IUseTabsProps<string>) => {
  const { rtl, orientation, tabs } = props;

  return (
    <TabsContainer {...props}>
      {containerProps => (
        <Component tabs={tabs} orientation={orientation} rtl={rtl} {...containerProps} />
      )}
    </TabsContainer>
  );
};

const Hook = (props: IUseTabsProps<string>) => {
  const { tabs, orientation, rtl } = props;
  const hookProps = useTabs(props);

  return <Component tabs={tabs} orientation={orientation} rtl={rtl} {...hookProps} />;
};

interface IArgs extends ITabsContainerProps<string> {
  as: 'hook' | 'container';
}

export const TabsStory: StoryFn<IArgs> = ({ as, ...props }: IArgs) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
