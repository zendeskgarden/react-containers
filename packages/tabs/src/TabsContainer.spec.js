/* eslint-disable no-console */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import { render, fireEvent } from 'react-testing-library';

import { TabsContainer } from './TabsContainer';

describe('TabsContainer', () => {
  const idPrefix = 'test_id';
  const tabs = ['tab-1', 'tab-2', 'tab-3'];
  const tabRefs = tabs.map(() => createRef(null));
  const getPanelId = index => `${idPrefix}--panel:${index}`;
  const getTabId = index => `${idPrefix}--tab:${index}`;

  // eslint-disable-next-line react/prop-types
  const BasicExample = ({ vertical, onSelect, defaultSelectedTab = tabs[0] } = {}) => (
    <TabsContainer
      vertical={vertical}
      onSelect={onSelect}
      defaultSelectedTab={defaultSelectedTab}
      idPrefix={idPrefix}
    >
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

  it('calls onSelect with selectedItem when Tab is selected', () => {
    const onSelectSpy = jest.fn();
    const { getAllByTestId } = render(<BasicExample onSelect={onSelectSpy} />);
    const [tab] = getAllByTestId('tab');

    fireEvent.click(tab);

    expect(onSelectSpy).toHaveBeenCalledWith('tab-1');
  });

  describe('TabList', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('tab-list')).toHaveAttribute('role', 'tablist');
    });

    describe('Tab', () => {
      it('applies the correct accessibility role', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const tabItems = getAllByTestId('tab');

        tabItems.forEach((tab, index) => {
          expect(tab).toHaveAttribute('role', 'tab');
          expect(tab).toHaveAttribute('id', getTabId(index));
          expect(tab).toHaveAttribute('aria-controls', getPanelId(index));
          expect(tab).toHaveAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });
      });

      it('defaultSelectedTab applies correct accessibility attributes', () => {
        const { getAllByTestId } = render(<BasicExample defaultSelectedTab={tabs[1]} />);
        const [, tab] = getAllByTestId('tab');

        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('TabPanel', () => {
    it('applies the correct accessibility role', () => {
      const { getAllByTestId } = render(<BasicExample />);
      const tabPanels = getAllByTestId('tab-panel');

      tabPanels.forEach((tabPanel, index) => {
        expect(tabPanel).toHaveAttribute('role', 'tabpanel');
        expect(tabPanel).toHaveAttribute('id', getPanelId(index));
        expect(tabPanel).toHaveAttribute('tabIndex', '0');
        expect(tabPanel).toHaveAttribute('aria-labelledby', getTabId(index));
      });
    });

    it('defaultSelectedTab applies correct accessibility attributes', () => {
      const { getAllByTestId } = render(<BasicExample defaultSelectedTab={tabs[1]} />);
      const [, tabPanel] = getAllByTestId('tab-panel');

      expect(tabPanel).not.toHaveAttribute('hidden');
    });

    describe('when tab selected', () => {
      it('enables hidden if tab is currently not selected', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const [, , tab] = getAllByTestId('tab');
        const [firstPanel, secondPanel] = getAllByTestId('tab-panel');

        fireEvent.click(tab);

        expect(firstPanel).toHaveAttribute('hidden');
        expect(secondPanel).toHaveAttribute('hidden');
      });

      it('disables hidden if tab is currently selected', () => {
        const { getAllByTestId } = render(<BasicExample />);
        const [, tab] = getAllByTestId('tab');
        const [, tabPanel] = getAllByTestId('tab-panel');

        fireEvent.click(tab);

        expect(tabPanel).not.toHaveAttribute('hidden');
      });
    });
  });

  describe('getTabProps', () => {
    it('throws if no index prop is applied', () => {
      const originalError = console.error;

      console.error = jest.fn(); // eslint-disable-line no-console

      expect(() => {
        render(
          <TabsContainer defaultSelectedTab={tabs[0]}>
            {({ getTabProps }) => <div {...getTabProps()} />}
          </TabsContainer>
        );
      }).toThrow('Accessibility Error: You must provide an "index" option to "getTabProps()"');

      console.error = originalError;
    });
  });

  describe('getTabPanelProps', () => {
    it('throws if no index prop is applied', () => {
      const originalError = console.error;

      console.error = jest.fn(); // eslint-disable-line no-console

      expect(() => {
        render(
          <TabsContainer defaultSelectedTab={tabs[0]}>
            {({ getTabPanelProps }) => <div {...getTabPanelProps()} />}
          </TabsContainer>
        );
      }).toThrow('Accessibility Error: You must provide an "index" option to "getTabPanelProps()"');

      console.error = originalError;
    });

    it('throws if no item prop is applied', () => {
      const originalError = console.error;

      console.error = jest.fn(); // eslint-disable-line no-console

      expect(() => {
        render(
          <TabsContainer defaultSelectedTab={tabs[0]}>
            {({ getTabPanelProps }) => <div {...getTabPanelProps({ index: 0 })} />}
          </TabsContainer>
        );
      }).toThrow('Accessibility Error: You must provide an "item" option to "getTabPanelProps()"');

      console.error = originalError;
    });
  });
});
