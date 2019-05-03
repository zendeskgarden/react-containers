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
  const tabs = ['tab-1', 'tab-2', 'tab-3'];
  const tabRefs = tabs.map(() => createRef(null));

  const basicExample = ({ vertical, onSelect } = {}) => (
    <TabsContainer vertical={vertical} onSelect={onSelect}>
      {({ getTabListProps, getTabProps, getTabPanelProps, selectedItem, focusedItem }) => (
        <div>
          <div {...getTabListProps({ 'data-test-id': 'tab-list' })}>
            {tabs.map((tab, index) => (
              <div
                {...getTabProps({
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
          {tabs.map(tab => (
            <div {...getTabPanelProps({ key: tab, 'data-test-id': 'tab-panel' })}>
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
        findTabs(wrapper).forEach(tab => {
          expect(tab).toHaveProp('role', 'tab');
        });
      });
    });
  });

  describe('TabPanel', () => {
    it('applies the correct accessibility role', () => {
      findTabPanels(wrapper).forEach(tabPanel => {
        expect(tabPanel).toHaveProp('role', 'tabpanel');
      });
    });

    describe('when tab selected', () => {
      beforeEach(() => {
        findTabs(wrapper)
          .at(1)
          .simulate('click');
      });

      it('enables aria-hidden if tab is currently not selected', () => {
        expect(findTabPanels(wrapper).at(1)).toHaveProp('aria-hidden', false);
      });

      it('disables aria-hidden if tab is currently selected', () => {
        const items = findTabPanels(wrapper);

        expect(items.at(0)).toHaveProp('aria-hidden', true);
        expect(items.at(2)).toHaveProp('aria-hidden', true);
      });
    });
  });
});
