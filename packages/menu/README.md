# @zendeskgarden/container-menu [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-menu
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-menu

This package includes containers relating to Menu in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-menu
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useMenu

```jsx
import { useMenu } from '@zendeskgarden/container-menu';

const Menu = () => {
  const { getMenuProps } = useMenu();

  return <div {...getMenuProps()} />;
};
```

### MenuContainer

```jsx
import { MenuContainer } from '@zendeskgarden/container-menu';

<MenuContainer>{({ getMenuProps }) => <div {...getMenuProps()} />}</MenuContainer>;
```

<!--
  TODO:

  * [ ] Add Menu to root README table.
  * [ ] Delete this comment block.
-->
