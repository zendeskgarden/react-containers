# @zendeskgarden/container-treeview [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-treeview
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-treeview

This package includes containers relating to Treeview in the
[Garden Design System](https://zendeskgarden.github.io/).

This package offers a headless implementation to
[W3C TreeView Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) and offers
[accessible navigation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html#kbd_label)

## WIP progress

### Support list for [WAI-ARIA Roles, States, and Properties](https://www.w3.org/TR/wai-aria-practices-1.1/#tree_roles_states_props)

- ✅ All tree nodes are contained in or owned by an element with role `tree`.
- ✅ Each element serving as a `tree` node has role `treeitem`.
- ✅ Each root node is contained in the element with role `tree` or **❌❓referenced by an `aria-owns`
  property set on the `tree` element.**
- ✅ Each parent node contains or owns an element with role `group`.
- ✅ Each child node is contained in or owned by an element with role `group` that is contained in or
  owned by the node that serves as the parent of that child.
- ✅ Each element with role `treeitem` that serves as a parent node has `aria-expanded` set to false
  when the node is in a closed state and set to true when the node is in an open state. End nodes do
  not have the `aria-expanded` attribute because, if they were to have it, they would be incorrectly
  described to assistive technologies as parent nodes.
- ❌ If the `tree` supports selection of more than one node, the element with role `tree`
  has `aria-multiselectable` set to true. Otherwise, `aria-multiselectable` is either set to false
  or the default value of false is implied.
- ❌ If the `tree` does not support multiple selection, `aria-selected` is set to true for the
  selected node and it is not present on any other node in the tree.
- ❌ if the `tree` supports multiple selection:
  - All selected nodes have `aria-selected` set to true.
  - All nodes that are selectable but not selected have `aria-selected` set to false.
  - If the `tree` contains nodes that are not selectable, those nodes do not have
    the `aria-selected` state.
- ✅ ❓The element with role `tree` has either a visible label referenced by `aria-labelledby` or a
  value specified for `aria-label`.
- ❌ If the complete set of available nodes is not present in the DOM due to dynamic loading as the
  user moves focus in or scrolls the tree, each node has `aria-level`, `aria-setsize`,
  and `aria-posinset` specified.
- ❌ If the `tree` element is horizontally oriented, it has `aria-orientation` set to `horizontal`.
  The default value of `aria-orientation` for a tree is `horizontal`.

### Implementation questions for reviewers

1. What should the behaviour be when a different `role` is passed? Nothing, throw error, forces the
   right role...
2. For the `tree` element, should I throw an error if both the `label` or `labelledBy` props are
   nil?
3. Do I need to implement a `expandable`, `collapsible` logic like in the accordion container?

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
