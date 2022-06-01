# @zendeskgarden/container-focusjail [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-focusjail
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-focusjail

This package includes containers relating to focus looping in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-focusjail
```

## Usage

This container implements the
[dialog focus loop](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) design pattern and
can be used to build a modal component. Check out
[storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useFocusJail

The `useFocusJail` hook allows you to trap focus to a container element. Useful for modals and
widgets. Garden uses this in react-components for the modals package.

```jsx
import { useRef } from 'react';
import { useFocusJail } from '@zendeskgarden/container-focusjail';

const FocusJail = () => {
  const containerRef = useRef(null);
  const { getContainerProps } = useFocusJail({
    focusOnMount: false,
    environment: window.parent.document,
    containerRef
  });

  return (
    <>
      <input />
      <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>
        <p>Focus is locked within the parent element</p>
        <input />
        <button>Focusable Items</button>
      </div>
    </>
  );
};
```

### FocusJailContainer

`FocusJailContainer` is a render-prop wrapper for the `useFocusJail` hook.

```jsx
import { createRef } from 'react';
import { FocusJailContainer } from '@zendeskgarden/container-focusjail';

const containerRef = createRef(null);

<FocusJailContainer
  containerRef={containerRef}
  focusOnMount={false}
  environment={window.parent.document}
>
  {({ getContainerProps }) => (
    <>
      <input />
      <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>
        <p>Focus is locked within the parent element</p>
        <input />
        <button>Focusable Items</button>
      </div>
    </>
  )}
</FocusJailContainer>;
```
