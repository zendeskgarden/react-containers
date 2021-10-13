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

The `useSplitter` hook manages positioning and required
accessibility attributes for the window splitting separator.

```jsx static
import { useSplitter, SplitterType, SplitterOrientation } from '@zendeskgarden/container-splitter';

const Splitter = () => {
  const { getSplitterProps } = useSplitter({
    label: 'sidepane',
    controls: 'sidepane',
    type: SplitterType.VARIABLE,
    orientation: SplitterOrientation.VERTICAL,
    min: 50,
    max: 100
  });

  const splitterProps = getSplitterProps();

  return (
    <div id="container" style={{ display: 'flex' }}>
      <div id="sidepane" style={{ flex: `0 0 ${splitterProps['aria-valuenow']}px` }}>
        <p>Sidepane</p>
      </div>
      <hr style={{ flex: '0 0 5px' }} {...splitterProps} />
      <div id="pane" style={{ flex: '1 1 auto' }}>
        <p>Pane</p>
      </div>
    </div>
  );
};
```

### SplitterContainer

`SplitterContainer` is a render-prop wrapper for the `useSplitter` hook.

```jsx static
import { useSplitter, SplitterType, SplitterOrientation } from '@zendeskgarden/container-splitter';

<SplitterContainer
  label="sidepane"
  controls="sidepane"
  type={SplitterType.VARIABLE}
  orientation={SplitterOrientation.VERTICAL}
  min={50}
  max={100}
>
  {({ getSplitterProps }) => {
    const splitterProps = getSplitterProps();

    return (
      <div id="container" style={{ display: 'flex' }}>
        <div id="sidepane" style={{ flex: `0 0 ${splitterProps['aria-valuenow']}px` }}>
          <p>Sidepane</p>
        </div>
        <hr style={{ flex: '0 0 5px' }} {...splitterProps} />
        <div id="pane" style={{ flex: '1 1 auto' }}>
          <p>Pane</p>
        </div>
      </div>
    );
  }}
</SplitterContainer>;
```
