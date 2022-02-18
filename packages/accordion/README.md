# @zendeskgarden/container-accordion [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-accordion
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-accordion

This package includes containers relating to accordions in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-accordion
```

## Usage

Check out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.

### useAccordion

The `useAccordion` hook manages toggle state and required accessibility
attributes for a group of sections.

```jsx
import { useAccordion } from '@zendeskgarden/container-accordion';

const Accordion = ({ expandable = true, collapsible = true } = {}) => {
  const { getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections } =
    useAccordion({
      expandedSections: [0],
      expandable,
      collapsible
    });

  return (
    <>
      {sections.map((section, index) => {
        const disabled = disabledSections.indexOf(index) !== -1;
        const hidden = expandedSections.indexOf(index) === -1;

        return (
          <div key={index}>
            <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
              <button
                {...getTriggerProps({
                  index,
                  role: null,
                  tabIndex: null,
                  disabled,
                  style: { width: '100%' }
                })}
              >
                {index}
              </button>
            </h2>
            <section
              {...getPanelProps({
                index,
                role: null,
                hidden
              })}
            >
              {section}
            </section>
          </div>
        );
      })}
    </>
  );
};

return <Accordion expandable={true} collapsible={true} />;
```

### AccordionContainer

`AccordionContainer` is a render-prop wrapper for the `useAccordion` hook.

```jsx
import { AccordionContainer } from '@zendeskgarden/container-accordion';

const Accordion = ({ expandable = true, collapsible = true } = {}) => (
  <AccordionContainer expandable={expandable} collapsible={collapsible}>
    {({ getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections }) => (
      <>
        {sections.map((section, index) => {
          const disabled = disabledSections.indexOf(index) !== -1;
          const hidden = expandedSections.indexOf(index) === -1;

          return (
            <div key={index}>
              <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
                <button
                  {...getTriggerProps({
                    index,
                    role: null,
                    tabIndex: null,
                    disabled,
                    style: { width: '100%' }
                  })}
                >
                  {index}
                </button>
              </h2>
              <section
                {...getPanelProps({
                  index,
                  role: null,
                  hidden
                })}
              >
                {section}
              </section>
            </div>
          );
        })}
      </>
    )}
  </AccordionContainer>
);

return <Accordion expandable={true} collapsible={true} />;
```
