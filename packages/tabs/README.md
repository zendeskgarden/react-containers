# @zendeskgarden/container-tabs [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-tabs
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-tabs

This package includes containers relating to tabs in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-tabs
```

## Usage

This container implements the
[tabs](https://www.w3.org/TR/wai-aria-practices/#tabpanel) design pattern and
can be used to build a tabbed interface. Check out
[storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useTabs

```jsx
import { useTabs } from '@zendeskgarden/container-tabs';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabRefs = tabs.map(() => createRef(null));

const Tabs = () => {
  const { selectedValue, getTabProps, getTabListProps, getTabPanelProps } = useTabs();
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
            borderBottom: `3px solid ${tab === selectedValue ? '#1f73b7' : 'transparent'}`
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

```jsx
import { TabsContainer } from '@zendeskgarden/container-tabs';

const Tabs = () => {
  const tabComponents = [];
  const tabPanels = [];

  return (
    <TabsContainer>
      {({ selectedValue, getTabProps, getTabListProps, getTabPanelProps }) => {
        tabs.forEach((tab, index) => {
          tabComponents.push(
            <li
              {...getTabProps({
                item: tab,
                index,
                ref: tabRefs[index],
                key: tab,
                style: {
                  borderBottom: `3px solid ${tab === selectedValue ? '#1f73b7' : 'transparent'}`
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
