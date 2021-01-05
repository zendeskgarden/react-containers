/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';

import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { TabsContainer, useTabs } from './src';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

export const Container = () => {
  const vertical = boolean('vertical', false);
  const idPrefix = text('idPrefix', '');
  const tabRefs = tabs.map(() => createRef());

  return (
    <TabsContainer vertical={vertical} idPrefix={idPrefix}>
      {({ selectedItem, getTabProps, getTabListProps, getTabPanelProps }) => {
        const tabComponents: React.ReactElement[] = [];
        const tabPanels: React.ReactElement[] = [];

        tabs.forEach((tab, index) => {
          tabComponents.push(
            <li
              {...getTabProps({
                item: tab,
                index,
                focusRef: tabRefs[index],
                key: tab,
                style: {
                  padding: '5px 5px 0',
                  borderBottom:
                    vertical === false
                      ? `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`
                      : undefined,
                  borderLeft: vertical
                    ? `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`
                    : undefined,
                  color: tab === selectedItem ? '#1f73b7' : undefined
                }
              })}
            >
              {tab}
            </li>
          );

          tabPanels.push(
            <div
              {...getTabPanelProps({
                index,
                item: tab,
                key: tab,
                style: {
                  padding: vertical === false ? '10px 0' : undefined,
                  borderTop: vertical === false ? '1px solid' : undefined
                }
              })}
            >
              {tab} Content
            </div>
          );
        });

        return (
          <div style={{ display: vertical ? 'flex' : undefined }}>
            <ul
              {...getTabListProps({
                style: {
                  display: 'flex',
                  flexDirection: vertical && 'column'
                }
              })}
            >
              {tabComponents}
            </ul>
            {tabPanels}
          </div>
        );
      }}
    </TabsContainer>
  );
};

export const Hook = () => {
  const vertical = boolean('vertical', false);
  const { selectedItem, getTabProps, getTabListProps, getTabPanelProps } = useTabs<string>({
    vertical,
    idPrefix: text('idPrefix', '')
  });
  const tabComponents: React.ReactElement[] = [];
  const tabPanels: React.ReactElement[] = [];
  const tabRefs = tabs.map(() => createRef());

  tabs.forEach((tab, index) => {
    tabComponents.push(
      <li
        {...getTabProps({
          item: tab,
          index,
          focusRef: tabRefs[index],
          key: tab,
          style: {
            padding: '5px 5px 0',
            borderBottom:
              vertical === false
                ? `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`
                : undefined,
            borderLeft: vertical
              ? `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`
              : undefined,
            color: tab === selectedItem ? '#1f73b7' : undefined
          }
        })}
      >
        {tab}
      </li>
    );

    tabPanels.push(
      <div
        {...getTabPanelProps({
          index,
          item: tab,
          key: tab,
          style: {
            padding: vertical === false ? '10px 0' : undefined,
            borderTop: vertical === false ? '1px solid' : undefined
          }
        })}
      >
        {tab} Content
      </div>
    );
  });

  return (
    <div style={{ display: vertical ? 'flex' : undefined }}>
      <ul
        {...getTabListProps({
          style: {
            display: 'flex',
            flexDirection: vertical && 'column'
          }
        })}
      >
        {tabComponents}
      </ul>
      {tabPanels}
    </div>
  );
};

Container.storyName = 'TabsContainer';

Hook.storyName = 'useTabs';

Hook.parameters = {
  docs: {
    description: {
      story: `The \`useTabs\` hook implements the [tabs pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) and can be used to build a tabs component.`
    }
  }
};

export default {
  title: 'Tabs Container',
  decorators: [withKnobs],
  component: TabsContainer,
  parameters: {
    layout: 'centered',
    componentSubtitle: `A container component which wraps the useTabs hook.`
  }
};
