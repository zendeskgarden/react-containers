# @zendeskgarden/container-tooltip [![npm version](https://img.shields.io/npm/v/@zendeskgarden/container-tooltip.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/container-tooltip)

This package includes containers relating to tooltip in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-tooltip
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/tooltip-container--usetooltip).

### useExample

```jsx static
import { useRef } from 'react';
import { useTooltip } from '@zendeskgarden/container-tooltip';

const Tooltip = () => {
  const triggerRef = useRef(null);
  const popperRef = useRef(null);

  const { style, placement, getTooltipProps, getTriggerProps } = useTooltip({
    triggerRef,
    popperRef,
    isVisible: boolean('isVisible', false),
    delayMilliseconds: number('Tooltip delay', 500),
    placement: select('Placement', Object.values(GARDEN_PLACEMENTS), 'top')
  });

  const styles = {
    ...style,
    background: '#1f73b7',
    padding: '10px',
    margin: '6px',
    color: '#fff'
  };
  return (
    <>
      <button {...getTriggerProps({ ref: triggerRef })}>Trigger</button>
      <div {...getTooltipProps({ ref: popperRef, style: styles, 'data-placement': placement })}>
        Tooltip
      </div>
    </>
  );
};
```

### ExampleContainer

```jsx static
import { useRef } from 'react';
import { TooltipContainer } from '@zendeskgarden/container-tooltip';

const Tooltip = () => {
  const triggerRef = useRef(null);
  const popperRef = useRef(null);

  return (
    <TooltipContainer
      triggerRef={triggerRef}
      popperRef={popperRef}
      isVisible={boolean('isVisible', false)}
      delayMilliseconds={number('Tooltip delay', 500)}
      placement={select('Placement', Object.values(GARDEN_PLACEMENTS), 'top')}
    >
      {({ style, placement, getTooltipProps, getTriggerProps }) => {
        const styles = {
          ...style,
          background: '#1f73b7',
          padding: '10px',
          margin: '6px',
          color: '#fff'
        };
        return (
          <>
            <button {...getTriggerProps({ ref: triggerRef })}>Trigger</button>
            <div
              {...getTooltipProps({
                ref: popperRef,
                style: styles,
                'data-placement': placement
              })}
            >
              Tooltip
            </div>
          </>
        );
      }}
    </TooltipContainer>
  );
};
```
