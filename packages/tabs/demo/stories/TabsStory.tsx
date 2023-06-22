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

interface TabItemProps {
  value: string;
  getTabProps: IUseTabsReturnValue<string>['getTabProps'];
  selectedItem: IUseTabsReturnValue<string>['selectedItem'];
  orientation: IUseTabsProps<string>['orientation'];
  rtl?: IUseTabsProps<string>['rtl'];
}

const TabItem = ({ value, getTabProps, selectedItem, orientation, rtl }: TabItemProps) => (
  <li
    key={value}
    {...getTabProps({ value })}
    className={classNames(
      'border-3',
      'border-solid',
      'border-transparent',
      'cursor-pointer',
      'px-2',
      'py-1',
      {
        'border-b-blue-600': selectedItem === value && orientation !== 'vertical',
        'border-r-blue-600': selectedItem === value && orientation === 'vertical' && !rtl,
        'border-l-blue-600': selectedItem === value && orientation === 'vertical' && rtl
      }
    )}
  >
    {value}
  </li>
);

interface IComponentProps extends IUseTabsReturnValue<string> {
  values: IUseTabsProps<string>['values'];
  orientation: IUseTabsProps<any>['orientation'];
  rtl: IUseTabsProps<any>['rtl'];
}

const Component = ({
  values,
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
        {values.map(value => (
          <TabItem
            key={value}
            value={value}
            getTabProps={getTabProps}
            selectedItem={selectedItem}
            orientation={orientation}
            rtl={rtl}
          />
        ))}
      </ul>
      {values.map(value => (
        <div key={value} {...getTabPanelProps({ value })} className="p-2">
          {value}
        </div>
      ))}
    </div>
  );
};

const Container = (props: IUseTabsProps<string>) => {
  const { rtl, orientation, values } = props;

  return (
    <TabsContainer {...props}>
      {containerProps => (
        <Component values={values} orientation={orientation} rtl={rtl} {...containerProps} />
      )}
    </TabsContainer>
  );
};

const Hook = (props: IUseTabsProps<string>) => {
  const { values, orientation, rtl } = props;
  const hookProps = useTabs(props);

  return <Component values={values} orientation={orientation} rtl={rtl} {...hookProps} />;
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
