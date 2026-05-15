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

This container implements the
[tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern
and can be used to build a tooltip component. Check out
[storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useTooltip

```jsx
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

#### Toggletip Usage

Toggletips provide click-to-toggle behavior following accessibility best practices:

```jsx
import { useTooltip } from '@zendeskgarden/container-tooltip';

const Toggletip = () => {
  const triggerRef = useRef(null);
  const { isVisible, isAnnouncementReady, getTooltipProps, getTriggerProps } = useTooltip({
    isToggletip: true,
    triggerRef
  });

  const styles = {
    background: '#1f73b7',
    padding: '10px',
    margin: '6px 0',
    color: '#fff'
  };

  return (
    <>
      <div {...getTooltipProps({ style: styles })}>
        {isAnnouncementReady && 'Toggletip content'}
      </div>
      <button {...getTriggerProps()}>Trigger</button>
    </>
  );
};
```

**Key differences from tooltips:**

- Opens/closes on click, not hover
- Closes on outside clicks and Escape key
- Trigger must be a button element with an accessible name (visible text or `aria-label`) so
  keyboard and screen reader users can interact with it as expected
- Uses `role="status"` for live region announcements
- Use `isAnnouncementReady` to control when content is populated for screen reader
  re-announcements

**Content requirements:**

Toggletip content should be text-only. When the toggletip opens, screen readers announce
the text content via the `role="status"` live region. If the content includes interactive elements
(buttons, links) or complex markup, screen readers will only announce the text portion. For complex
interactive content, consider using a popover or dialog pattern instead.

**Accessibility requirements:**

The following requirements are essential for toggletip accessibility:

- Toggletip triggers **must** be native `<button>` elements (not `<div role="button">` or other
  elements). Native buttons provide correct keyboard focus behavior and screen reader semantics
  automatically.
- Toggletip triggers **must** have an accessible name via visible text content, `aria-label`, or
  `aria-labelledby`.
- Toggletip content **should not** contain interactive elements (links, buttons, form controls).
  Use [Tooltip Dialog](https://garden.zendesk.com/components/tooltip-dialog) for lightweight
  interactive overlays, or [Modal](https://garden.zendesk.com/components/modal) for complex forms.

For TypeScript users, the `IUseToggletipProps` helper type enforces `HTMLButtonElement` as the
trigger ref type:

```tsx
import { useTooltip, IUseToggletipProps } from '@zendeskgarden/container-tooltip';

const triggerRef = useRef<HTMLButtonElement>(null);
const tooltip = useTooltip({
  isToggletip: true,
  triggerRef
} satisfies IUseToggletipProps);
```

### TooltipContainer

```jsx
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
