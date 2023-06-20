/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import {
  ITabsContainerProps,
  IUseTabsProps,
  IUseTabsReturnValue,
  TabsContainer,
  useTabs
} from '@zendeskgarden/container-tabs';
import classNames from 'classnames';

interface TabItemProps {
  item: string;
  getTabProps: IUseTabsReturnValue<string>['getTabProps'];
  selectedItem: IUseTabsReturnValue<string>['selectedItem'];
  orientation: IUseTabsProps<string>['orientation'];
  rtl?: IUseTabsProps<string>['rtl'];
}

const TabItem = ({ item, getTabProps, selectedItem, orientation, rtl }: TabItemProps) => (
  <li
    key={item}
    {...getTabProps({ item })}
    className={classNames(
      'border-3',
      'border-solid',
      'border-transparent',
      'cursor-pointer',
      'px-2',
      'py-1',
      {
        'border-b-blue-600': selectedItem === item && orientation !== 'vertical',
        'border-r-blue-600': selectedItem === item && orientation === 'vertical' && !rtl,
        'border-l-blue-600': selectedItem === item && orientation === 'vertical' && rtl
      }
    )}
  >
    {item}
  </li>
);

interface IComponentProps extends IUseTabsReturnValue<string> {
  items: IUseTabsProps<string>['items'];
  orientation: IUseTabsProps<any>['orientation'];
  rtl: IUseTabsProps<any>['rtl'];
}

const Component = ({
  items,
  getTabListProps,
  getTabPanelProps,
  getTabProps,
  selectedItem,
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
        {items.map(item => (
          <TabItem
            key={item}
            item={item}
            getTabProps={getTabProps}
            selectedItem={selectedItem}
            orientation={orientation}
            rtl={rtl}
          />
        ))}
      </ul>
      {items.map(item => (
        <div key={item} {...getTabPanelProps({ item })} className="p-2">
          {item}
        </div>
      ))}
    </div>
  );
};

interface IProps extends IUseTabsProps<string> {
  items: IUseTabsProps<string>['items'];
}

const Container = (props: IProps) => {
  const { rtl, orientation, items } = props;

  return (
    <TabsContainer {...props}>
      {containerProps => (
        <Component items={items} orientation={orientation} rtl={rtl} {...containerProps} />
      )}
    </TabsContainer>
  );
};

const Hook = (props: IProps) => {
  const { items, orientation, rtl } = props;
  const hookProps = useTabs(props);

  return <Component items={items} orientation={orientation} rtl={rtl} {...hookProps} />;
};

interface IArgs extends ITabsContainerProps<string> {
  as: 'hook' | 'container';
  items: IUseTabsProps<string>['items'];
}

export const TabsStory: Story<IArgs> = ({ as, ...props }: IArgs) => {
  switch (as) {
    case 'container':
      return <Container {...props} />;

    case 'hook':
    default:
      return <Hook {...props} />;
  }
};
