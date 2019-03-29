# @zendeskgarden/container-accordion [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-accordion.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-accordion)

This package includes containers relating to accordion in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-accordion
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers).

### useExample

```jsx static
import { useExample } from '@zendeskgarden/container-accordion';

const Example = () => {
  const { getExampleProps } = useExample();

  return <div {...getExampleProps()} />;
};
```

### ExampleContainer

```jsx static
import { ExampleContainer } from '@zendeskgarden/container-accordion';

<ExampleContainer>{({ getExampleProps }) => <div {...getExampleProps()} />}</ExampleContainer>;
```

<!--
  TODO:

  * [ ] Add accordion to root README table.
  * [ ] Add accordion stories.js.
  * [ ] Delete this comment block.
-->
