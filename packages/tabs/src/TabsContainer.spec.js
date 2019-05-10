/* eslint-disable no-console */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { mount } from 'enzyme';

import { TabsContainer } from './TabsContainer';

describe('TabsContainer', () => {
  let wrapper;
  const idPrefix = 'test_id';
  const tabs = ['tab-1', 'tab-2', 'tab-3'];
  const tabRefs = tabs.map(() => createRef(null));
  const getPanelId = index => `${idPrefix}--panel:${index}`;
  const getTabId = index => `${idPrefix}--tab:${index}`;

  // eslint-disable-next-line react/prop-types
  const basicExample = ({ vertical, onSelect } = {}) => (
    <TabsContainer vertical={vertical} onSelect={onSelect} idPrefix={idPrefix}>
      {({ getTabListProps, getTabProps, getTabPanelProps, selectedItem, focusedItem }) => (
        <div>
          <div {...getTabListProps({ 'data-test-id': 'tab-list' })}>
            {tabs.map((tab, index) => (
              <div
                {...getTabProps({
                  index,
                  key: tab,
                  item: tab,
                  focusRef: tabRefs[index],
                  'data-test-id': 'tab',
                  'data-selected': tab === selectedItem,
                  'data-focused': tab === focusedItem
                })}
              >
                {tab}
              </div>
            ))}
          </div>
          {tabs.map((tab, index) => (
            <div {...getTabPanelProps({ index, item: tab, key: tab, 'data-test-id': 'tab-panel' })}>
              {tab} content
            </div>
          ))}
        </div>
      )}
    </TabsContainer>
  );

  beforeEach(() => {
    wrapper = mount(basicExample());
  });

  const findTabList = enzymeWrapper => enzymeWrapper.find('[data-test-id="tab-list"]');
  const findTabs = enzymeWrapper => enzymeWrapper.find('[data-test-id="tab"]');
  const findTabPanels = enzymeWrapper => enzymeWrapper.find('[data-test-id="tab-panel"]');

  it('calls onSelect with selectedItem when Tab is selected', () => {
    const onSelectSpy = jest.fn();

    wrapper = mount(basicExample({ onSelect: onSelectSpy }));
    findTabs(wrapper)
      .first()
      .simulate('click');

    expect(onSelectSpy).toHaveBeenCalledWith('tab-1');
  });

  describe('TabList', () => {
    it('applies correct accessibility role', () => {
      expect(findTabList(wrapper)).toHaveProp('role', 'tablist');
    });

    describe('Tab', () => {
      it('applies the correct accessibility role', () => {
        findTabs(wrapper).forEach((tab, index) => {
          expect(tab).toHaveProp('role', 'tab');
          expect(tab).toHaveProp('id', getTabId(index));
          expect(tab).toHaveProp('aria-controls', getPanelId(index));
        });
      });
    });
  });

  describe('TabPanel', () => {
    it('applies the correct accessibility role', () => {
      findTabPanels(wrapper).forEach((tabPanel, index) => {
        expect(tabPanel).toHaveProp('role', 'tabpanel');
        expect(tabPanel).toHaveProp('id', getPanelId(index));
        expect(tabPanel).toHaveProp('tabIndex', 0);
        expect(tabPanel).toHaveProp('aria-labelledby', getTabId(index));
      });
    });

    describe('when tab selected', () => {
      beforeEach(() => {
        findTabs(wrapper)
          .at(1)
          .simulate('click');
      });

      it('enables aria-hidden if tab is currently not selected', () => {
        expect(findTabPanels(wrapper).at(1)).toHaveProp('hidden', false);
      });

      it('disables aria-hidden if tab is currently selected', () => {
        const items = findTabPanels(wrapper);

        expect(items.at(0)).toHaveProp('hidden', true);
        expect(items.at(2)).toHaveProp('hidden', true);
      });
    });
  });

  describe('getTabProps', () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    it('throws if no index prop is applied', () => {
      expect(() => {
        mount(<TabsContainer>{({ getTabProps }) => <div {...getTabProps()} />}</TabsContainer>);
      }).toThrow('Accessibility Error: You must provide an "index" option to "getTabProps()"');
    });
  });

  describe('getTabPanelProps', () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    it('throws if no index prop is applied', () => {
      expect(() => {
        mount(
          <TabsContainer>{({ getTabPanelProps }) => <div {...getTabPanelProps()} />}</TabsContainer>
        );
      }).toThrow('Accessibility Error: You must provide an "index" option to "getTabPanelProps()"');
    });

    it('throws if no item prop is applied', () => {
      expect(() => {
        mount(
          <TabsContainer>
            {({ getTabPanelProps }) => <div {...getTabPanelProps({ index: 0 })} />}
          </TabsContainer>
        );
      }).toThrow('Accessibility Error: You must provide an "item" option to "getTabPanelProps()"');
    });
  });
});
