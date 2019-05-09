/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, createRef } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { TabsContainer, useTabs } from './src';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabRefs = tabs.map(() => createRef(null));

storiesOf('Tabs Container', module)
  .addDecorator(withKnobs)
  .add('useTabs', () => {
    const Tabs = () => {
      const [selectedItem, setSelectedItem] = useState(tabs[0]);
      const vertical = boolean('vertical', false);
      const { getTabProps, getTabListProps, getTabPanelProps, getTabsProps } = useTabs({
        selectedItem,
        onSelect: setSelectedItem,
        vertical
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
            {tabs.map((tab, index) => {
              return (
                <li
                  {...getTabProps({
                    item: tab,
                    index,
                    focusRef: tabRefs[index],
                    ref: tabRefs[index],
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
            })}
          </ul>
          {tabs.map((tab, index) => (
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
          ))}
        </div>
      );
    };

    return <Tabs />;
  })
  .add('TabsContainer', () => {
    const Tabs = () => {
      const [selectedItem, setSelectedItem] = useState(tabs[0]);
      const vertical = boolean('vertical', false);

      return (
        <TabsContainer vertical={vertical} selectedItem={selectedItem} onSelect={setSelectedItem}>
          {({ getTabProps, getTabListProps, getTabPanelProps }) => (
            <div style={{ display: vertical && 'flex' }}>
              <ul
                {...getTabListProps({
                  style: {
                    display: 'flex',
                    flexDirection: vertical && 'column'
                  }
                })}
              >
                {tabs.map((tab, index) => (
                  <li
                    {...getTabProps({
                      item: tab,
                      key: tab,
                      focusRef: tabRefs[index],
                      style: {
                        padding: '5px 5px 0',
                        borderBottom:
                          !vertical &&
                          `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`,
                        borderLeft:
                          vertical &&
                          `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`,
                        color: tab === selectedItem && '#1f73b7'
                      }
                    })}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
              {tabs.map(tab => (
                <div
                  {...getTabPanelProps({
                    key: tab,
                    style: {
                      display: tab === selectedItem ? 'block' : 'none',
                      padding: !vertical && '10px 0',
                      borderTop: !vertical && '1px solid'
                    }
                  })}
                >
                  {tab} Content
                </div>
              ))}
            </div>
          )}
        </TabsContainer>
      );
    };

    return <Tabs />;
  });
