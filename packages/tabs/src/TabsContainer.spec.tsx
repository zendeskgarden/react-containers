/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { TabsContainer, ITabsContainerProps } from './';

describe('TabsContainer', () => {
  const user = userEvent.setup();

  const idPrefix = 'test_id';
  const values = ['tab-1', 'tab-2', 'tab-3'];
  const getPanelId = (tab: string) => `${idPrefix}__panel:${tab}`;
  const getTabId = (tab: string) => `${idPrefix}__tab:${tab}`;

  const BasicExample: React.FunctionComponent<Omit<ITabsContainerProps<string>, 'values'>> = ({
    orientation,
    onSelect,
    defaultSelectedItem = values[0]
  } = {}) => (
    <TabsContainer
      values={values}
      orientation={orientation}
      onSelect={onSelect}
      idPrefix={idPrefix}
      defaultSelectedItem={defaultSelectedItem}
    >
      {({ getTabListProps, getTabProps, getTabPanelProps, selectedItem, focusedItem }) => (
        <div>
          <div data-test-id="tab-list" {...getTabListProps()}>
            {values.map(value => (
              <div
                key={value}
                data-test-value={value}
                data-test-id="tab"
                data-selected={value === selectedItem}
                data-focused={value === focusedItem}
                {...getTabProps({ value })}
              >
                {value}
              </div>
            ))}
          </div>
          {values.map(value => (
            <div
              key={value}
              data-test-value={value}
              data-test-id="tab-panel"
              {...getTabPanelProps({ value })}
            >
              {value} content
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
          expect(tab).toHaveAttribute('id', getTabId(tab.dataset.testValue!));
          expect(tab).toHaveAttribute('aria-controls', getPanelId(tab.dataset.testValue!));
          expect(tab).toHaveAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });
      });

      it('defaultSelectedItem applies correct accessibility attributes', () => {
        const { getAllByTestId } = render(<BasicExample defaultSelectedItem={values[1]} />);
        const [, tab] = getAllByTestId('tab');

        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('TabPanel', () => {
    it('applies the correct accessibility role', () => {
      const { getAllByTestId } = render(<BasicExample />);
      const tabPanels = getAllByTestId('tab-panel');

      tabPanels.forEach(tabPanel => {
        expect(tabPanel).toHaveAttribute('role', 'tabpanel');
        expect(tabPanel).toHaveAttribute('id', getPanelId(tabPanel.dataset.testValue!));
        expect(tabPanel).toHaveAttribute('aria-labelledby', getTabId(tabPanel.dataset.testValue!));
      });
    });

    it('defaultSelectedItem applies correct accessibility attributes', () => {
      const { getAllByTestId } = render(<BasicExample defaultSelectedItem={values[1]} />);
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
