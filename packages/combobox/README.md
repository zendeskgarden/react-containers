# @zendeskgarden/container-combobox [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-combobox
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-combobox

This package includes containers relating to Combobox in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-combobox
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useCombobox

```jsx
import { useCombobox } from '@zendeskgarden/container-combobox';

const Combobox = () => {
  const { getComboboxProps } = useCombobox();

  return <div {...getComboboxProps()} />;
};
```

### ComboboxContainer

```jsx
import { ComboboxContainer } from '@zendeskgarden/container-combobox';

<ComboboxContainer>{({ getComboboxProps }) => <div {...getComboboxProps()} />}</ComboboxContainer>;
```

<!--
  TODO:

  * [ ] Add Combobox to root README table.
  * [ ] Delete this comment block.
-->
