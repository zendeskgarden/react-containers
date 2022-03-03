# @zendeskgarden/container-focusvisible [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-focusvisible
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-focusvisible

This package includes containers relating to [the `:focus-visible`
polyfill](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) in
the [Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-focusvisible
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live
examples.

### useFocusVisible

```jsx
import { useRef } from 'react';
import styled from 'styled-components';
import { useFocusVisible } from '@zendeskgarden/container-focusvisible';

const FocusVisibleButton = styled.button`
  :focus {
    outline: none;
  }

  /* Apply custom focus styling based on className */
  &.garden-focus-visible {
    outline: 2px dashed red;
  }

  /* Apply custom focus styling based on data attribute */
  &[data-garden-focus-visible] {
    outline: 2px dashed red;
  }
`;

const Example = () => {
  const scope = useRef();
  useFocusVisible({ scope });

  return (
    <div ref={scope}>
      <FocusVisibleButton>
        This element receives focus-visible className and data attribute
      </FocusVisibleButton>
    </div>
  );
};
```

### FocusVisibleContainer

```jsx
import { FocusVisibleContainer } from '@zendeskgarden/container-focusvisible';

const Example = () => {
  const scope = useRef();

  return (
    <FocusVisibleContainer scope={scope} className="custom-focus-visible-class">
      <div ref={scope}>
        <button>Hello world</button>
        <input placeholder="some elements always receive focus-visible" />
      </div>
    </FocusVisibleContainer>
  );
};
```
