# @zendeskgarden/container-focusjail [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-focusjail.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-focusjail)

This package includes containers relating to focusjail in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-focusjail
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/focusjail-container--usefocusjail).

### useFocusJail

The `useFocusJail` hook allows you to trap focus to a container element. Useful
for modals and widgets. Garden uses this in react-components for the modals package.

```jsx static
import { useFocusJail } from '@zendeskgarden/container-focusjail';

const FocusJail = () => {
  const { getContainerProps, containerRef } = useFocusJail({
    focusOnMount: false,
    environment: window.parent.document
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

```jsx static
import { FocusJailContainer } from '@zendeskgarden/container-focusjail';

<FocusJailContainer focusOnMount={false} environment={window.parent.document}>
  {({ getContainerProps, containerRef }) => (
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
