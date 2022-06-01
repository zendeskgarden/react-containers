# @zendeskgarden/container-scrollregion [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-scrollregion
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-scrollregion

This package includes containers relating to scroll region in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-scrollregion
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### As a hook

A scroll region is an area of the web page that contains scrollable content. The scroll region hook
allows keyboard users to focus and scroll the region. A scroll region with a dynamic layout should
use the `dependency` option. The hook re-calculates the tab-index when the `dependency` value
changes. If there are multiple dependency values, a memoized object can be used as the `dependency`
value.

```jsx
import { useScrollRegion } from '@zendeskgarden/container-scrollregion';

const ScrollRegion = () => {
  const containerRef = useRef();
  const containerTabIndex = useScrollRegion({ containerRef });

  return (
    <div ref={containerRef} tabIndex={containerTabIndex}>
      <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea.</p>
    </div>
  );
};
```

### As a Render Prop Component

```jsx
import { ScrollRegionContainer } from '@zendeskgarden/container-scrollregion';

const ScrollRegion = () => {
  const containerRef = useRef();

  return (
    <ScrollRegionContainer containerRef={containerRef}>
      {containerTabIndex => (
        <div ref={containerRef} tabIndex={containerTabIndex}>
          <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea.</p>
        </div>
      )}
    </ScrollRegionContainer>;
  )
}
```
