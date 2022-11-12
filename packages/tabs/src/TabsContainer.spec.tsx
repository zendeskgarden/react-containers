/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { TabsContainer, ITabsContainerProps } from './';

describe('TabsContainer', () => {
  const user = userEvent.setup();

  const idPrefix = 'test_id';
  const tabs = ['tab-1', 'tab-2', 'tab-3'];
  const tabRefs = tabs.map(() => createRef<HTMLDivElement>());
  const getPanelId = (index: number) => `${idPrefix}__panel:${index}`;
  const getTabId = (index: number) => `${idPrefix}__tab:${index}`;

  const BasicExample: React.FunctionComponent<ITabsContainerProps<string>> = ({
    orientation,
    onSelect,
    defaultSelectedIndex = 0
  } = {}) => (
    <TabsContainer
      orientation={orientation}
      onSelect={onSelect}
      idPrefix={idPrefix}
      defaultSelectedIndex={defaultSelectedIndex}
    >
      {({ getTabListProps, getTabProps, getTabPanelProps, selectedItem, focusedItem }) => (
        <div>
          <div data-test-id="tab-list" {...getTabListProps()}>
            {tabs.map((tab, index) => (
              <div
                data-test-id="tab"
                data-selected={tab === selectedItem}
                data-focused={tab === focusedItem}
                {...getTabProps({
                  index,
                  key: tab,
                  item: tab,
                  focusRef: tabRefs[index]
                })}
              >
                {tab}
              </div>
            ))}
          </div>
          {tabs.map((tab, index) => (
            <div data-test-id="tab-panel" {...getTabPanelProps({ index, item: tab, key: tab })}>
              {tab} content
            </div>
          ))}
        </div>
      )}
    </TabsContainer>
  );

  it('calls onSelect with selectedItem when Tab is selected', async () => {
    const onSelectSpy = jest.fn();
    const { getAllByTestId } = render(<BasicExample onSelect={onSelectSpy} />);
    const [tab] = getAllByTestId('tab');

    await user.click(tab);

    expect(onSelectSpy).toHaveBeenCalledWith('tab-1');
  });

  describe('TabList', () => {
    it('applies correct accessibility role', () => {
      const { getByTestId } = render(<BasicExample />);

      expect(getByTestId('tab-list')).toHaveAttribute('role', 'tablist');
      expect(getByTestId('tab-list')).toHaveAttribute('aria-orientation', 'horizontal');
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

      it('defaultSelectedIndex applies correct accessibility attributes', () => {
        const { getAllByTestId } = render(<BasicExample defaultSelectedIndex={1} />);
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
        expect(tabPanel).toHaveAttribute('aria-labelledby', getTabId(index));
      });
    });

    it('defaultSelectedIndex applies correct accessibility attributes', () => {
      const { getAllByTestId } = render(<BasicExample defaultSelectedIndex={1} />);
      const [, tabPanel] = getAllByTestId('tab-panel');

      expect(tabPanel).not.toHaveAttribute('hidden');
    });

    describe('when tab selected', () => {
      it('enables hidden if tab is currently not selected', async () => {
        const { getAllByTestId } = render(<BasicExample />);
        const [, , tab] = getAllByTestId('tab');
        const [firstPanel, secondPanel] = getAllByTestId('tab-panel');

        await user.click(tab);

        expect(firstPanel).toHaveAttribute('hidden');
        expect(secondPanel).toHaveAttribute('hidden');
      });

      it('disables hidden if tab is currently selected', async () => {
        const { getAllByTestId } = render(<BasicExample />);
        const [, tab] = getAllByTestId('tab');
        const [, tabPanel] = getAllByTestId('tab-panel');

        await user.click(tab);

        expect(tabPanel).not.toHaveAttribute('hidden');
      });
    });
  });
});
