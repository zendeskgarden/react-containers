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

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live
examples.

The `useField` hook will supply the prop getters to handle `aria-labelledby` along
with for/id mapping and `aria-describedby` mapping when a hint and/or status message
is applied.

### useField

```jsx
import { useField } from '@zendeskgarden/container-field';

const Field = () => {
  const { getLabelProps, getInputProps, getHintProps, getMessageProps } = useField();

  return (
    <>
      <label {...getLabelProps()}>Accessible Native Input</label>
      <p {...getHintProps()}>Optional Hint</p>
      <input {...getInputProps()} />
      <p {...getMessageProps()}>Optional Status Message</p>
    </>
  );
};
```

### FieldContainer

FieldContainer is a render-prop wrapper for the `useField` hook.

```jsx
import { FieldContainer } from '@zendeskgarden/container-field';

<FieldContainer>
  {({ getLabelProps, getInputProps, getHintProps, getMessageProps }) => (
    <>
      <label {...getLabelProps()}>Accessible Native Input</label>
      <p {...getHintProps()}>Optional Hint</p>
      <input {...getInputProps()} />
      <p {...getMessageProps()}>Optional Status Message</p>
    </>
  )}
</FieldContainer>;
```
