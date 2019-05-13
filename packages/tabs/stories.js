/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, createRef } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { TabsContainer, useTabs } from './src';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabRefs = tabs.map(() => createRef(null));

storiesOf('Tabs Container', module)
  .addDecorator(withKnobs)
  .add('useTabs', () => {
    const Tabs = () => {
      const [selectedItem, setSelectedItem] = useState(tabs[0]);
      const vertical = boolean('vertical', false);
      const { getTabProps, getTabListProps, getTabPanelProps } = useTabs({
        selectedItem,
        onSelect: setSelectedItem,
        vertical,
        idPrefix: text('idPrefix')
      });
      const tabComponents = [];
      const tabPanels = [];

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
                  !vertical && `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`,
                borderLeft:
                  vertical && `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`,
                color: tab === selectedItem && '#1f73b7'
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
                padding: !vertical && '10px 0',
                borderTop: !vertical && '1px solid'
              }
            })}
          >
            {tab} Content
          </div>
        );
      });

      return (
        <div style={{ display: vertical && 'flex' }}>
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

    return <Tabs />;
  })
  .add('TabsContainer', () => {
    const Tabs = () => {
      const [selectedItem, setSelectedItem] = useState(tabs[0]);
      const vertical = boolean('vertical', false);
      const idPrefix = text('idPrefix');

      return (
        <TabsContainer
          vertical={vertical}
          selectedItem={selectedItem}
          onSelect={setSelectedItem}
          idPrefix={idPrefix}
        >
          {({ getTabProps, getTabListProps, getTabPanelProps }) => {
            const tabComponents = [];
            const tabPanels = [];

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
                        !vertical &&
                        `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`,
                      borderLeft:
                        vertical && `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`,
                      color: tab === selectedItem && '#1f73b7'
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
                      padding: !vertical && '10px 0',
                      borderTop: !vertical && '1px solid'
                    }
                  })}
                >
                  {tab} Content
                </div>
              );
            });

            return (
              <div style={{ display: vertical && 'flex' }}>
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

    return <Tabs />;
  });
