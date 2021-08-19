# @zendeskgarden/container-treeview [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-treeview
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-treeview

This package includes containers relating to Treeview in the
[Garden Design System](https://zendeskgarden.github.io/).

This package offers a headless implementation to
[W3C TreeView Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) and offers
[accessible navigation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html#kbd_label)

## Installation

```sh
npm install @zendeskgarden/container-treeview
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useTreeview

```jsx static
import { useTreeview } from '@zendeskgarden/container-treeview';

const Treeview = () => {
  const { getTreeviewProps } = useTreeview();

  return <div {...getTreeviewProps()} />;
};
```

### TreeviewContainer

```jsx static
import { TreeviewContainer } from '@zendeskgarden/container-treeview';

<TreeviewContainer>{({ getTreeviewProps }) => <div {...getTreeviewProps()} />}</TreeviewContainer>;
```

<!--
  TODO:

  * [ ] Add Treeview to root README table.
  * [ ] Delete this comment block.
-->
