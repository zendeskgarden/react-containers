# @zendeskgarden/container-tooltip [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-tooltip
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-tooltip

This package includes containers relating to tooltip in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-tooltip
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/tooltip-container--usetooltip).

### useTooltip

```jsx static
import { useTooltip } from '@zendeskgarden/container-tooltip';

const Tooltip = () => {
  const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({
    isVisible: false,
    delayMilliseconds: 500
  });

  const styles = {
    visibility: isVisible ? 'visible' : 'hidden',
    background: '#1f73b7',
    padding: '10px',
    margin: '6px 0',
    color: '#fff'
  };

  return (
    <>
      <div {...getTooltipProps({ style: styles })}>Tooltip</div>
      <button {...getTriggerProps()}>Trigger</button>
    </>
  );
};
```

### TooltipContainer

```jsx static
import { TooltipContainer } from '@zendeskgarden/container-tooltip';

const Tooltip = () => {
  return (
    <TooltipContainer isVisible={false} delayMilliseconds={500}>
      {({ isVisible, getTooltipProps, getTriggerProps }) => {
        const styles = {
          visibility: isVisible ? 'visible' : 'hidden',
          background: '#1f73b7',
          padding: '10px',
          margin: '6px 0',
          color: '#fff'
        };

        return (
          <>
            <div
              {...getTooltipProps({
                style: styles
              })}
            >
              Tooltip
            </div>
            <button {...getTriggerProps()}>Trigger</button>
          </>
        );
      }}
    </TooltipContainer>
  );
};
```
