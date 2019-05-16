# @zendeskgarden/container-tabs [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-tabs.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-tabs)

This package includes containers relating to tabs in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-tabs
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/tabs-container--usetabs).

### useTabs

```jsx static
import { useTabs } from '@zendeskgarden/container-tabs';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabRefs = tabs.map(() => createRef(null));

const Tabs = () => {
  const [selectedItem, setSelectedItem] = useState(tabs[0]);
  const { getTabProps, getTabListProps, getTabPanelProps } = useTabs({
    selectedItem,
    onSelect: setSelectedItem
  });
  const tabComponents = [];
  const tabPanels = [];

  tabs.forEach((tab, index) => {
    tabComponents.push(
      <li
        {...getTabProps({
          item: tab,
          index,
          ref: tabRefs[index],
          key: tab,
          style: {
            borderBottom: `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`
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
            padding: '10px 0',
            borderTop: '1px solid'
          }
        })}
      >
        {tab} Content
      </div>
    );
  });

  return (
    <>
      <ul
        {...getTabListProps({
          style: {
            display: 'flex'
          }
        })}
      >
        {tabComponents}
      </ul>
      {tabPanels}
    </>
  );
};
```

### TabsContainer

```jsx static
import { TabsContainer } from '@zendeskgarden/container-tabs';

const Tabs = () => {
  const [selectedItem, setSelectedItem] = useState(tabs[0]);
  const tabComponents = [];
  const tabPanels = [];

  return (
    <TabsContainer selectedItem={selectedItem} onSelect={setSelectedItem}>
      {({ getTabProps, getTabListProps, getTabPanelProps }) => {
        tabs.forEach((tab, index) => {
          tabComponents.push(
            <li
              {...getTabProps({
                item: tab,
                index,
                ref: tabRefs[index],
                key: tab,
                style: {
                  borderBottom: `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`
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
                  padding: '10px 0',
                  borderTop: '1px solid'
                }
              })}
            >
              {tab} Content
            </div>
          );
        });

        return (
          <>
            <ul
              {...getTabListProps({
                style: {
                  display: 'flex'
                }
              })}
            >
              {tabComponents}
            </ul>
            {tabPanels}
          </>
        );
      }}
      }
    </TabsContainer>
  );
};
```
