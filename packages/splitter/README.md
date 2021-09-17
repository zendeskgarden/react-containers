# @zendeskgarden/container-splitter [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-splitter
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-splitter

This package includes containers relating to Splitter in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-splitter
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useSplitter

```jsx static
import { useSplitter } from '@zendeskgarden/container-splitter';

const Splitter = () => {
  const { getSplitterProps } = useSplitter();

  return <div {...getSplitterProps()} />;
};
```

### SplitterContainer

```jsx static
import { SplitterContainer } from '@zendeskgarden/container-splitter';

<SplitterContainer>{({ getSplitterProps }) => <div {...getSplitterProps()} />}</SplitterContainer>;
```

<!--
  TODO:

  * [ ] Add Splitter to root README table.
  * [ ] Delete this comment block.
-->
