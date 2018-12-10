# Garden Containers

A `Container` component is an abstraction of the state and accessibility logic of a composite component.

These Containers are implemented with the [render prop pattern](https://reactjs.org/docs/render-props.html) and **do not provide any UI**. They simply provide attributes, events, and internal state to a function which applies the information to any elements of its choosing.

* **Keyboard Navigable**
  * Consistent navigation and component interaction strategy
* **Accessible**
  * Built-in accessibility for standard and custom visualizations
* **Localizable**
  * Built-in RTL aware and localizable components

If we wish to create a tab like interface, we would use `TabsContainer`:

```jsx
<TabsContainer>
  {({ getTabListProps, getTabProps, getTabPanelProps, selectedKey, focusedKey }) => (
    <div>
      <div {...getTabListProps()}>
        <div {...getTabProps({ key: 'tab-1' })}>
          Tab 1
          {'tab-1' === selectedKey && 'SELECTED'}
          {'tab-1' === focusedKey && 'FOCUSED'}
        </div>
        <div {...getTabProps({ key: 'tab-2' })}>
          Tab 2
          {'tab-2' === selectedKey && 'SELECTED'}
          {'tab-2' === focusedKey && 'FOCUSED'}
        </div>
      </div>
      <div {...getTabPanelProps({ key: 'tab-1' })}>Tab 1 content</div>
      <div {...getTabPanelProps({ key: 'tab-2' })}>Tab 2 content</div>
    </div>
  )}
</TabsContainer>
```

The `Container` implementation has the following requirements

* Accepts both the `render` and `children` props as valid render-props
* All collections of props that are meant to be spread to an element have the signature `getFooProps()`
  * These props include all events necessary for component interaction as well as required accessibility roles and information
  * To allow chaining of props and events, apply all props within the method. This allows the container to still apply any events if needed in the interaction model.
  * Example implementation
    ```jsx
    <div
      {...getFooProps({
        onClick: event => alert('clicked!'),
        'data-clicked': true,
        selected: 'all props are proxied through'
      })}
    />
    ```
  * You are able to prevent an event from being handled within the container by calling `event.preventDefault()`
* All internal state is provided within the render prop
* All `Container` components allow [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html) and [controlled](https://reactjs.org/docs/forms.html#controlled-components) state management using the `onStateChanged` prop.
  * An example `controlled` usage would be
  ```jsx
  <TabsContainer
    selectedKey={state.selectedKey}
    focusedKey={state.focusedKey}
    onStateChange={setState}
  >
    ...
  </TabsContainer>
  ```

`Container` components ensure that **ANY UI** is able to provide a consistent keyboard navigation and accessibility experience.

The render prop pattern is incredibly flexible in that it only enforces accessibility. If you find that the Containers are not flexible enough for your implementation, take a hard look at any negative accessiblity side-effects you would be introducing... then use the container :smile:

## Supporting Architecture

### Selection

All keyboard navigation is provided by the `<SelectionContainer />` component within the [@zendeskgarden/ontainer-selection-selection-selection-selection-selection-selection-selection-selection-selection](../packages/selection) package.

This abstraction provides a base level of accessible keyboard navigation that is consumed within the other packages, but can also be used for custom components that require keyboard integration.
