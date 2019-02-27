# @zendeskgarden/container-selection [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-selection.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-selection)

This package includes containers relating to selection in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-selection
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?selectedKind=Selection%20Containers).

### SelectionContainer

SelectionContainer is a render-prop around the `useSelection` hook which manages an items focus
state including keyboard controls, aria attributes and RTL support. It uses the
[roving tab index strategy](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).

```jsx static
import { SelectionContainer } from '@zendeskgarden/container-selection';

const items = ['Item 1', 'Item 2', 'Item 3'];

<SelectionContainer direction="vertical">
  {({ selectedItem, focusedItem, getContainerProps, getItemProps }) => (
    <ul {...getContainerProps()}>
      {items.map(item => {
        const ref = React.createRef();
        const isSelected = item === selectedItem;
        const isFocused = item === focusedItem;

        return (
          <li
            {...getItemProps({
              key: item,
              item,
              ref,
              focusRef: ref
            })}
          >
            {item}
            {isSelected && <span> - Selected</span>}
            {isFocused && <span> - Focused</span>}
          </li>
        );
      })}
    </ul>
  )}
</SelectionContainer>;
```

### useSelection

```jsx static
import { useSelection } from '@zendeskgarden/container-selection';

const items = ['Item 1', 'Item 2', 'Item 3'];

const Selection = ({ direction }) => {
  const { focusedItem, selectedItem, getContainerProps, getItemProps } = useSelection({
    direction
  });

  return (
    <ul {...getContainerProps()}>
      {items.map(item => {
        const ref = React.createRef();
        const isSelected = selectedItem === item;
        const isFocused = focusedItem === item;

        return (
          <li
            {...getItemProps({
              key: item,
              item,
              ref,
              focusRef: ref
            })}
          >
            {item}
            {isSelected && <div>[Selected]</div>}
            {isFocused && <div>(Focused)</div>}
          </li>
        );
      })}
    </ul>
  );
};
```
