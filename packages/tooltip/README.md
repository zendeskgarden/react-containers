# @zendeskgarden/container-tooltip [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-tooltip.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-tooltip)

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
import { useRef } from 'react';
import { useTooltip } from '@zendeskgarden/container-tooltip';

const Tooltip = () => {
  const tooltipRef = useRef(null);

  const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({
    tooltipRef,
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
      <div {...getTooltipProps({ ref: tooltipRef, style: styles })}>Tooltip</div>
      <button {...getTriggerProps({ ref: triggerRef })}>Trigger</button>
    </>
  );
};
```

### TooltipContainer

```jsx static
import { useRef } from 'react';
import { TooltipContainer } from '@zendeskgarden/container-tooltip';

const Tooltip = () => {
  const tooltipRef = useRef(null);

  return (
    <TooltipContainer tooltipRef={tooltipRef} isVisible={false} delayMilliseconds={500}>
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
                ref: tooltipRef,
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
