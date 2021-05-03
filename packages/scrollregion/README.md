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

For live examples check out [storybook](https://zendeskgarden.github.io/react-containers?path=/story/scrollregion-container--usescrollregion).

A scroll region is an area of the web page that contains scrollable content. The scroll region hook
allows keyboard users to focus and scroll a scroll region.

A scroll region with a dynamic layout should use the `dependency` option. The hook re-calculates the
tab-index when the `dependency` value changes. If there are multiple dependency values, a memoized
object can be used as the `dependency` value. There is a Storybook demo that shows an example of
this scenario.

### As a Render Prop Component

```jsx static
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

### As a hook

```jsx static
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
