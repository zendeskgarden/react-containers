# @zendeskgarden/container-selection [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-selection
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-selection

This package includes containers relating to selection in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-selection
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live
examples.

### useSelection

The `useSelection` hook which manages an items focus state including keyboard controls,
aria attributes and RTL support. It uses the
[roving tab index strategy](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).

```jsx
import { useSelection } from '@zendeskgarden/container-selection';

const values = ['Value 1', 'Value 2', 'Value 3'];

const Selection = ({ direction }) => {
  const { focusedValue, selectedValue, getGroupProps, getElementProps } = useSelection({
    values,
    direction
  });

  return (
    <ul {...getGroupProps()}>
      {values.map(value => {
        const isSelected = selectedValue === value;
        const isFocused = focusedValue === value;

        return (
          <li {...getElementProps({ key: value, value })}>
            {value}
            {isSelected && <div>[Selected]</div>}
            {isFocused && <div>(Focused)</div>}
          </li>
        );
      })}
    </ul>
  );
};
```

### SelectionContainer

```jsx
import { SelectionContainer } from '@zendeskgarden/container-selection';

const values = ['Value 1', 'Value 2', 'Value 3'];

<SelectionContainer direction="vertical" values={values}>
  {({ selectedValue, focusedValue, getGroupProps, getElementProps }) => (
    <ul {...getGroupProps()}>
      {values.map(value => {
        const isSelected = value === selectedValue;
        const isFocused = value === focusedValue;

        return (
          <li {...getElementProps({ key: value, value })}>
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
