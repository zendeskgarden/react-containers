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

Check out
[storybook](https://zendeskgarden.github.io/react-containers/?path=/story/splitter-container--container)
for live examples.

### useSplitter

The `useSplitter` hook manages positioning and required
accessibility attributes for the window splitting separator.

```jsx static
import {
  useSplitter,
  SplitterType,
  SplitterOrientation,
  SplitterPlacement
} from '@zendeskgarden/container-splitter';

const Splitter = () => {
  const { getSeparatorProps, getPrimaryPaneProps, valueNow } = useSplitter({
    label: 'primary-pane',
    type: SplitterType.VARIABLE,
    orientation: SplitterOrientation.VERTICAL,
    min: 50,
    max: 100,
    position: SplitterPosition.TRAILS
  });

  const separatorProps = getSeparatorProps();
  const primaryPaneProps = getPrimaryPaneProps();

  return (
    <div style={{ display: 'flex' }}>
      <div {...primaryPaneProps} style={{ flex: `0 0 ${valueNow}px` }}>
        <p>Primary Pane</p>
      </div>
      <div style={{ flex: '0 0 5px' }} {...separatorProps} />
      <div style={{ flex: '1 1 auto' }}>
        <p>Secondary Pane</p>
      </div>
    </div>
  );
};
```

### SplitterContainer

`SplitterContainer` is a render-prop wrapper for the `useSplitter` hook.

```jsx static
import {
  SplitterContainer,
  SplitterType,
  SplitterOrientation,
  SplitterPlacement
} from '@zendeskgarden/container-splitter';

<SplitterContainer
  label="primary-pane"
  type={SplitterType.VARIABLE}
  orientation={SplitterOrientation.VERTICAL}
  min={50}
  max={100}
  position={SplitterPosition.TRAILS}
>
  {({ getSeparatorProps, getPrimaryPaneProps, valueNow }) => {
    const separatorProps = getSeparatorProps();
    const primaryPaneProps = getPrimaryPaneProps();

    return (
      <div id="container" style={{ display: 'flex' }}>
        <div {...primaryPaneProps} style={{ flex: `0 0 ${valueNow}px` }}>
          <p>Primary Pane</p>
        </div>
        <div style={{ flex: '0 0 5px' }} {...separatorProps} />
        <div style={{ flex: '1 1 auto' }}>
          <p>Secondary Pane</p>
        </div>
      </div>
    );
  }}
</SplitterContainer>;
```
