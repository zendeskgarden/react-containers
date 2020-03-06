# @zendeskgarden/container-field [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-field
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-field

This package includes containers relating to field in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-field
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/field-container--usefield).

The `useField` hook will supply the prop getters to handle `aria-labelledby` along
with for/id mapping and `aria-describedby` mapping when a hint is applied.

### useField

```jsx static
import { useField } from '@zendeskgarden/container-field';

const Field = () => {
  const { getLabelProps, getInputProps, getHintProps } = useField();

  return (
    <>
      <label {...getLabelProps()}>Accessible Native Input</label>
      <p {...getHintProps()}>Optional Hint</p>
      <input {...getInputProps()} />
    </>
  );
};
```

### FieldContainer

FieldContainer is a render-prop wrapper for the `useField` hook.

```jsx static
import { FieldContainer } from '@zendeskgarden/container-field';

<FieldContainer>
  {({ getLabelProps, getInputProps, getHintProps }) => (
    <>
      <label {...getLabelProps()}>Accessible Native Input</label>
      <p {...getHintProps()}>Optional Hint</p>
      <input {...getInputProps()} />
    </>
  )}
</FieldContainer>;
```
