# @zendeskgarden/container-utilities [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-utilities.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-utilities)

This package includes containers relating to utilities in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-utilities
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers).

### useExample

```jsx static
import { useExample } from '@zendeskgarden/container-utilities';

const Example = () => {
  const { getExampleProps } = useExample();

  return <div {...getExampleProps()} />;
};
```

### ExampleContainer

```jsx static
import { ExampleContainer } from '@zendeskgarden/container-utilities';

<ExampleContainer>{({ getExampleProps }) => <div {...getExampleProps()} />}</ExampleContainer>;
```

<!--
  TODO:

  * [ ] Add utilities to root README table.
  * [ ] Add utilities stories.js.
  * [ ] Delete this comment block.
-->
