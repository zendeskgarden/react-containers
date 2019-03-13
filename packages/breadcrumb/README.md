# @zendeskgarden/container-breadcrumb [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-breadcrumb.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-breadcrumb)

This package includes containers relating to breadcrumb in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-breadcrumb
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?selectedKind=Bread%20Container).

### As a Render Prop Component

```jsx static
import { BreadcrumbContainer } from '@zendeskgarden/container-breadcrumb';

<BreadcrumbContainer>
  {(getContainerProps, getCurrentPageProps) => (
    <div {...getContainerProps()}>
      <a href="#">Home</a>
      <a {...getCurrentPageProps({ href: '#' })}>Items</a>
    </div>
  )}
</BreadcrumbContainer>;
```

### As a hook

```jsx static
import { useBreadcrumb } from '@zendeskgarden/container-breadcrumb';

const Breadcrumb = () => {
  const { getContainerProps, getCurrentPageProps } = useBreadcrumb();

  return (
    <div {...getContainerProps()}>
      <a href="#">Home</a>
      <a {...getCurrentPageProps({ href: '#' })}>Items</a>
    </div>
  );
};
```

## Info

See [react-breadcrumbs][breadcrumbs link] component.

[breadcrumbs link]: https://github.com/zendeskgarden/react-components/tree/master/packages/breadcrumbs
