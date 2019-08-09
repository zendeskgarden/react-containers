# @zendeskgarden/container-focusvisible [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-focusvisible.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-focusvisible)

This package includes containers relating to the `:focus-visible`
polyfill in the [Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-focusvisible
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers).

### useFocusVisible

```jsx static
import { useRef } from 'react';
import styled from 'styled-components';
import { useExample } from '@zendeskgarden/container-focusvisible';

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

```jsx static
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

<Example />;
```
