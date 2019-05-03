# @zendeskgarden/container-tabs [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-tabs.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-tabs)

This package includes containers relating to tabs in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-tabs
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers).

### useTabs

```jsx static
import { useTabs } from '@zendeskgarden/container-tabs';

const Tabs = () => {
  const { getTabsProps } = useTabs();

  return <div {...getTabsProps()} />;
};
```

### TabsContainer

```jsx static
import { TabsContainer } from '@zendeskgarden/container-tabs';

<TabsContainer>{({ getTabsProps }) => <div {...getTabsProps()} />}</TabsContainer>;
```

<!--
  TODO:

  * [ ] Add tabs to root README table.
  * [ ] Add tabs stories.js.
  * [ ] Delete this comment block.
-->
