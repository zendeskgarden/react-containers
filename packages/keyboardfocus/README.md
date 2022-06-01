# @zendeskgarden/container-keyboardfocus [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-keyboardfocus
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-keyboardfocus

This package includes containers relating to keyboardfocus in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-keyboardfocus
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useKeyboardFocus

The `useKeyboardFocus` hook supplies state and props that help you to distinguish between mouse and
keyboard focus.

```jsx
import { useKeyboardFocus } from '@zendeskgarden/container-keyboardfocus';

const KeyboardFocus = () => {
  const { getFocusProps, keyboardFocused } = useKeyboardFocus();

  return (
    <div {...getFocusProps()}>{keyboardFocused ? 'Keyboard focused!' : 'Not keyboard focused'}</div>
  );
};
```

### KeyboardFocusContainer

`KeyboardFocsuContainer` is a render-prop wrapper for the `useKeyboardFocus` hook.

```jsx
import { KeyoardFocusContainer } from '@zendeskgarden/container-keyboardfocus';

<KeyboardFocusContainer>
  {({ keyboardFocused, getFocusProps }) => (
    <div {...getFocusProps()}>{keyboardFocused ? 'Keyboard focused!' : 'Not keyboard focused'}</div>
  )}
</KeyboardFocusContainer>;
```
