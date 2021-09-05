# @zendeskgarden/container-treeview [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-treeview
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-treeview

This package includes containers relating to Treeview in the
[Garden Design System](https://zendeskgarden.github.io/).

This package offers a headless implementation to
[W3C TreeView Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) and offers
[accessible navigation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html#kbd_label)

## WAI-ARIA support

For a vertically oriented tree (horizontal and RTL are supported as well):

### [Keyboard interactions](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-22)

- When a single-select tree receives focus:
  - If none of the nodes are selected before the tree receives focus, focus is set on the first node.
  - If a node is selected before the tree receives focus, focus is set on the selected node.
- ❌ When a multi-select tree receives focus:
  - If none of the nodes are selected before the tree receives focus, focus is set on the first
    node.
  - If one or more nodes are selected before the tree receives focus, focus is set on the first
    selected node.
- ✅ `Right arrow`:
  - When focus is on a closed node, opens the node; focus does not move.
  - When focus is on a open node, moves focus to the first child node.
  - When focus is on an end node, does nothing.
- ✅ `Left arrow`:
  - When focus is on an open node, closes the node.
  - When focus is on a child node that is also either an end node or a closed node, moves focus
    to its parent node.
  - When focus is on a root node that is also either an end node or a closed node, does nothing.
- ✅ `Down Arrow`: Moves focus to the next node that is focusable without opening or closing a node.
- ✅ `Up Arrow`: Moves focus to the previous node that is focusable without opening or closing a
  node.
- ✅ `Home`: Moves focus to the first node in the tree without opening or closing a node.
- ✅ `End`: Moves focus to the last node in the tree that is focusable without opening a node.
- ✅ `Enter`: activates a node, i.e., performs its default action. For parent nodes, one possible
  default action is to open or close the node. In single-select trees where selection does not
  follow focus (see note below), the default action is typically to select the focused node.
- ❌ Type-ahead is recommended for all trees, especially for trees with more than 7 root nodes:
  - Type a character: focus moves to the next node with a name that starts with the typed character.
  - Type multiple characters in rapid succession: focus moves to the next node with a name that
    starts with the string of characters typed.
- ❌ `*` (Optional): Expands all siblings that are at the same level as the current node.
- ❌ **Selection in multi-select trees:**

### [WAI-ARIA Roles, States, and Properties](https://www.w3.org/TR/wai-aria-practices-1.1/#tree_roles_states_props)

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
- ❌ The `tree` role supports the aria-activedescendant property, which provides an alternative to
  moving DOM focus among `treeitem` elements when implementing keyboard navigation.
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
