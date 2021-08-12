# @zendeskgarden/container-{{lowercase component}} [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-{{lowercase component}}
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-{{lowercase component}}

This package includes containers relating to {{capitalize component}} in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-{{lowercase component}}
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### use{{capitalize component}}

```jsx static
import { use{{capitalize component}} } from '@zendeskgarden/container-{{lowercase component}}';

const {{capitalize component}} = () => {
  const { get{{capitalize component}}Props } = use{{capitalize component}}();

  return <div {...get{{capitalize component}}Props()} />;
};
```

### {{capitalize component}}Container

```jsx static
import { {{capitalize component}}Container } from '@zendeskgarden/container-{{lowercase component}}';

<{{capitalize component}}Container>{({ get{{capitalize component}}Props }) => <div {...get{{capitalize component}}Props()} />}</{{capitalize component}}Container>;
```

<!--
  TODO:

  * [ ] Add {{capitalize component}} to root README table.
  * [ ] Delete this comment block.
-->
